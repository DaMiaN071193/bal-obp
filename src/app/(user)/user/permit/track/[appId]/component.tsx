'use client';

import { buildingPermitApply } from "@/actions/permit";
import BuildingPermitPrintDocument from "@/app/(offices)/obo/permit/_print/building-permit";
import ElectricalPermitPrintDocument from "@/app/(offices)/obo/permit/_print/electrical-permit";
import SanitaryPermitPrintDocument from "@/app/(offices)/obo/permit/_print/sanitary-permit";
import NotFoundPage from "@/components/errorpages/404";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { ApplicationDocument, StatusType, TypeOfPermit, UserDocument } from "@/lib/models/interfaces";
import { Permits } from "@/lib/types";
import clsx from "clsx";
import {
  AddLocationIcon,
  Button,
  ConfirmIcon,
  CrossIcon,
  Dialog,
  EditIcon,
  EyeOpenIcon,
  Group,
  IconButton,
  KeyEscapeIcon,
  Pane,
  RefreshIcon,
  Tab,
  Tablist,
  TimeIcon,
  toaster,
} from "evergreen-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

export default function TrackPermitApplicationPage({ applicationNo }: { applicationNo?: string }) {
  const { data: session, status } = useSession({
    redirect: true,
  })

  const router = useRouter()
  const role = useMemo(() => session?.user.role, [session?.user.role])

  const [trackData, setTrackData] = useState<ApplicationDocument|undefined>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const isCompleteOrCancelled = useMemo(() => (trackData?.user as UserDocument)?._id === session?.user?.userId && trackData?.status.find(status => (status.statusType === StatusType.Completed || status.statusType === StatusType.Cancelled)), [trackData, session])

  const onRequestNewPermit = useCallback(async () => {
    try {
      const bApply = buildingPermitApply.bind(null, 0, undefined, new FormData())
      await bApply()
      router.push('/' + role + '/permit/application')
    } catch (e) {
      console.log(e)
    }
  }, [role, router])

  const fetchDataFromAppNo = useCallback(async () => {
    const url = new URL('/' + role + '/api/permits/track/' + applicationNo, window.location.origin)
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => setTrackData(data))
      .catch((e) => toaster.danger('Failed to Retrieve Data'))
      .finally(() => setLoading(false))
  }, [applicationNo, role])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDataFromAppNo()
      new Date().toLocaleDateString()
    }
    // eslint-disable-next-line
  }, [status])

  const [selectedApplication, setApplication] = useState<ApplicationDocument>()

  const fetchApplication = useCallback(() => {
    const url = new URL('/' + role + '/api/permits/tracking/' + applicationNo, window.location.origin)
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => setApplication(data))
      .catch(() => toaster.danger('Failed to Retrieve Data'))
      .finally(() => setLoading(false))
  }, [applicationNo, role])

  useEffect(() => {
    if (!!applicationNo && !!role) {
      fetchApplication()
    }
    // eslint-disable-next-line
  }, [applicationNo, role])

  const [isShownPreview, setShowPreview] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabs = useMemo(() => selectedApplication?.typeOfPermit === TypeOfPermit.BuildingPermit
    ? [
        Permits.BuildingPermit,
        !!selectedApplication.electricalPermit ? Permits.ElectricalPermit : undefined,
        !!selectedApplication.sanitaryPermit ? Permits.SanitaryPermit : undefined
      ].filter(v => !!v)
    : selectedApplication?.typeOfPermit === TypeOfPermit.ElectricalPermitOnly
    ? [Permits.ElectricalPermit]
    : []
  , [selectedApplication])
  const maxTabs = useMemo(() => tabs.length, [tabs])
  const selectedTabPermitFormIndex = useMemo(() => maxTabs <= selectedIndex ? maxTabs - 1 : selectedIndex, [maxTabs, selectedIndex])

  if (status === 'loading') {
    return <LoadingComponent />
  }
  return status === 'unauthenticated' || isLoading ? <LoadingComponent /> : (
    !trackData ? <NotFoundPage /> : (
      <Fragment>
      <div className="w-full bg-gray-100 shadow pb-8 mb-8 border border-slate-200 rounded-lg pt-4 relative">
        { isCompleteOrCancelled && (
          <div className="w-full flex justify-end px-4 border-b pb-3 mb-3">
            <Button iconAfter={ConfirmIcon} size="large" appearance="primary" onClick={onRequestNewPermit}>Request New Permit</Button>
          </div>
        )}
        <IconButton icon={EyeOpenIcon} onClick={() => setShowPreview(true)} marginLeft="20px" size="large" title="View Permit Application Form" appearance="primary" intent="success"/>
        <div className="mx-auto leading-8 w-fit">
          <h2 className="font-sans text-[1.5rem] leading-8 mb-4 text-center">Track the process of your permit application<br /> <span className="ml-2 text-[1.25rem] italic">Application No. # {applicationNo}</span></h2>
          <hr />
          <div className="mt-2">
            <div>
              <ol className="font-sans max-w-[500px] ml-40">
                { trackData?.status?.map((state, index) => (
                  <li key={index} className={clsx("ml-6 relative pl-8", state.statusType === StatusType.Cancelled || state.statusType === StatusType.Completed ? '' : 'border-l border-double border-l-green-500')}>
                    <span className="ring-3 -left-4 pt-2 absolute bg-slate-100 rounded-full p-2">
                      { state.statusType === StatusType.Pending
                        ? <TimeIcon color="gray" />
                        : state.statusType === StatusType.Approved
                        ? <AddLocationIcon color="blue" />
                        : state.statusType === StatusType.Rejected
                        ? <KeyEscapeIcon color="red" />
                        : state.statusType === StatusType.Cancelled
                        ? <CrossIcon color="red" />
                        : <ConfirmIcon color="green" />
                      }
                    </span>
                    <time className="text-gray-600 text-[0.9rem] absolute w-full -left-[110%] sm:-left-[105%] md:-left-[500px] text-end">{(new Date(state.createdAt as string|Date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: "long"  })}</time>
                    <h3 className="font-semibold">{state.name}</h3>
                    <p>{state.messages}</p>
                  </li>
                ))}
              </ol>
              <hr className="mt-4" />
            </div>
          </div>
        </div>
      </div>
      <Pane>
        <Dialog
          isShown={!!selectedApplication && isShownPreview}
          shouldCloseOnOverlayClick={false}
          title={"Application # " + selectedApplication?.applicationNo}
          onCloseComplete={() => setShowPreview(false)}
          hasFooter={false}
          width={1200}
        >
          {({ close }) => (
            <div className="overflow-hidden h-[560px] w-full">
              <div className="relative w-full mb-4 max-h-[500px]">
                <div className="absolute w-[50px] right-16 bg-white rounded-b text-right space-x-2">
                  <Group>
                    <Button iconBefore={EditIcon} is={Link} target={'_blank'} href={'/' + role + '/permit/edit?appNo=' + selectedApplication?.applicationNo + '&permit=' + ([Permits.BuildingPermit, Permits.ElectricalPermit, Permits.SanitaryPermit].indexOf(tabs[selectedTabPermitFormIndex] as Permits)) + '&isElectricalPermitOnly=' + (selectedApplication?.typeOfPermit === TypeOfPermit.ElectricalPermitOnly) + '&hasElectricalPermit=' + !!selectedApplication?.electricalPermit}>Edit</Button>
                    <IconButton icon={RefreshIcon} onClick={() => fetchApplication()} title="Refresh Preview" />
                  </Group>
                </div>
                <div className="px-4 pb-4 pt-1 h-full w-full">
                  <Tablist marginBottom={16} flexBasis={340}>
                    {tabs.map((tab, index) => (
                      <Tab
                        aria-controls={`form-panel-${tab}`}
                        isSelected={index === selectedTabPermitFormIndex}
                        key={tab}
                        onSelect={() => setSelectedIndex(index)}
                      >
                        {tab}
                      </Tab>
                    ))}
                  </Tablist>
                  <Pane padding={16} background="tint1" flex="1" maxHeight={450} overflowY="auto">
                    {tabs.map((tab, index) => (
                      <Pane
                        aria-labelledby={tab}
                        aria-hidden={index !== selectedTabPermitFormIndex}
                        display={index === selectedTabPermitFormIndex ? 'block' : 'none'}
                        key={tab}
                        role="tabpanel"
                      >
                        {tab === Permits.BuildingPermit && <BuildingPermitPrintDocument data={selectedApplication} />}
                        {tab === Permits.ElectricalPermit && <ElectricalPermitPrintDocument data={selectedApplication} />}
                        {tab === Permits.SanitaryPermit && <SanitaryPermitPrintDocument data={selectedApplication} />}
                      </Pane>
                    ))}
                  </Pane>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </Pane>
      </Fragment>
    )
  )
}