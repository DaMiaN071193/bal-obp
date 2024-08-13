'use client';;
import { buildingPermitModify } from "@/actions/permit";
import { FormButton } from "@/components/forms/button";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { Permits, ResponseFormState } from "@/lib/types";
import { Paragraph, Spinner, StatusIndicator, toaster } from "evergreen-ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import BuildingPermitEditForm from "../_editform/building-permit-form";
import ElectricalPermitEditForm from "../_editform/electrical-permit-form";
import SanitaryPermitEditForm from "../_editform/sanitary-permit-form";
export default function PermitApplicationEditPage({ applicationNo, permit, isElectricalPermitOnly, hasElectricalPermit } : { applicationNo: string; permit: Permits, isElectricalPermitOnly: boolean; hasElectricalPermit: boolean; }) {
  const { data: session, status } = useSession({
    redirect: true,
  })
  const role = useMemo(() => session?.user.role, [session?.user.role])
  const [draftData, setDraftData] = useState(null)

  const formAction = useMemo(() => buildingPermitModify.bind(null, permit, applicationNo, isElectricalPermitOnly, hasElectricalPermit), [permit, applicationNo, isElectricalPermitOnly, hasElectricalPermit])
  const [state, action] = useFormState<ResponseFormState>(formAction as any, undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [backLoading, setBackLoading] = useState<boolean>(false)
  const { pending } = useFormStatus()
  const fetchApplicationData = useCallback(() => {
    setLoading(true);
    const url = new URL('/' + role + '/api/permits/tracking/' + applicationNo + '?populate=false', window.location.origin)
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => { console.log(data); setDraftData(data); })
      .catch((e) => toaster.danger('An error occurred: ' + e.message))
      .finally(() => {setBackLoading(false);setLoading(false);})
  }, [role, applicationNo])

  const backAction = useCallback(async (ev: any) => {
    ev.preventDefault()
    window.close()
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchApplicationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    if (!pending && !!state?.success) {
      fetchApplicationData()
      toaster.success('Update Successfully')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, pending])

  if (status === 'loading') {
    return <LoadingComponent />
  }

  return status === 'unauthenticated' ? <LoadingComponent /> : (
    <form action={action}  className="max-w-[300mm] mx-auto pt-8 drop-shadow-lg mb-8">
      <div className="text-[20pt] w-full bg-white p-4 border">Edit Permit Application Form <span className="capitalize text-sm">({permit})</span> <span className="text-xs italic">Application No: {applicationNo}</span></div>
      <div className="pt-4 px-16 pb-10 bg-green-100 shadow">
        <div className="mb-4">
          {
            !!state?.errors && Object.values(state?.errors).map((vals: any, i: number) => vals.map((msg: string, index: number) => (
              <StatusIndicator key={(index + 1) * (i + 1)} color="danger">
                <Paragraph color="danger">{msg}</Paragraph>
              </StatusIndicator>
            )))
          }
        </div>
        {!draftData && <LoadingComponent />}
        { permit === Permits.BuildingPermit && !!draftData && <BuildingPermitEditForm data={draftData} />}
        { permit === Permits.ElectricalPermit && !!draftData && <ElectricalPermitEditForm isElectricalPermitOnly={isElectricalPermitOnly} data={draftData} />}
        { permit === Permits.SanitaryPermit && !!draftData && <SanitaryPermitEditForm hasElectricalPermit={hasElectricalPermit} data={draftData} />}
      </div>
      <div className="flex justify-between p-4 shadow bg-green-50">
        <FormButton type="reset" label={"Close"} isLoading={backLoading} disabled={loading || pending} onClick={backAction} size="large" fontWeight="bold" textTransform="uppercase" />
        <FormButton label={"Update"} disabled={backLoading || loading} isLoading={loading || pending} loading={<Spinner size={24} />} size="large" fontWeight="bold" textTransform="uppercase" appearance="primary" />
      </div>
    </form>
  )
}