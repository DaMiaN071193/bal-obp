'use client';
import { buildingPermitApply, buildingPermitBackAction } from "@/actions/permit";
import { FormButton } from "@/components/forms/button";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { TypeOfPermit } from "@/lib/models/interfaces";
import { ResponseFormState } from "@/lib/types";
import { Pane, Paragraph, Radio, Spinner, StatusIndicator, toaster } from "evergreen-ui";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import BuildingPermitForm from "./building-permit-form";
import CompletePermitForm from "./complete-permit-form";
import ElectricalPermitForm from "./electrical-permit-form";
import NextStepChoiceForm from "./next-step-choice-form";
import SanitaryPermitForm from "./sanitary-permit-form";

export default function PermitApplicationPage() {
  const { data: session, status } = useSession({
    redirect: true,
  })
  const role = useMemo(() => session?.user.role, [session?.user.role])
  const [step, setStep] = useState(0)
  const [redirectToTrack, setRedirectToTrack] = useState<string|undefined>()
  const [draftData, setDraftData] = useState(null)
  const [typeOfPermits] = useState(Object.entries(TypeOfPermit).map(([key, value]) => ({ id: key, label: <span className="capitalize text-[4.5mm]">{value}</span>, value })))
  const [typeOfPermit, setTypeOfPermit] = useState<TypeOfPermit>(TypeOfPermit.BuildingPermit)

  const formAction = useMemo(() => buildingPermitApply.bind(null, step), [step])
  const [state, action] = useFormState<ResponseFormState>(formAction as any, undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [backLoading, setBackLoading] = useState<boolean>(false)
  const { pending } = useFormStatus()
  const fetchApplicationData = useCallback(() => {
    setLoading(true);
    const url = new URL('/' + role + '/api/permits/recent/step', window.location.origin)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.step === 200) {
          setRedirectToTrack(data.applicationNo)
        } else if (state?.message === 'Success' && !!(state as any)?.applicationNo) {
          redirect('/' + role + '/permit/track/' + (state as any)?.applicationNo)
        } else {
          setStep(data.step); setDraftData(data.draftData);
        }
      })
      .catch((e) => toaster.danger('An error occurred: ' + e.message))
      .finally(() => {setBackLoading(false);setLoading(false);})
  }, [role, state])

  useEffect(() => {
    if (!!redirectToTrack) {
      redirect('/' + role + '/permit/track/' + redirectToTrack)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToTrack])

  const backAction = useCallback(async (ev: any) => {
    ev.preventDefault()
    setBackLoading(true)
    const result = await buildingPermitBackAction()
    if (result.success) {
      fetchApplicationData()
    } else {
      toaster.danger('An error occurred:'+ result.message)
    }
  }, [fetchApplicationData])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchApplicationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    if (!pending && !!state?.success) {
      fetchApplicationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, pending])

  const stepName = useMemo(() => step === 7
    ? 'Step 2'
    : step === 8
    ? 'Step 4'
    : step === 9
    ? 'Step 5'
    : step === 100
    ? 'Confirm'
    : 'Step ' + step
  , [step])

  if (status === 'loading') {
    return <LoadingComponent />
  }

  return status === 'unauthenticated' ? <LoadingComponent /> : step > 0 && (
    <form action={action}  className="max-w-[300mm] mx-auto pt-8 drop-shadow-lg mb-8">
      <div className="text-[20pt] w-full bg-white p-4 border">Permit Registration ({stepName})</div>
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
        { step === 1 && (
          <Pane aria-label="Type of Permit" role="group">
            <Paragraph fontSize={18} fontWeight={"bold"}>Select Permit Application</Paragraph>
            { typeOfPermits.map(({ id, label, value }) => (
                <Radio key={id} name="typeOfPermit" marginLeft={8} marginTop={16} value={value} label={label} checked={typeOfPermit === value} onChange={(ev) => setTypeOfPermit(value)} />
              )
            )}
          </Pane>
        )}
        { step === 2 && <BuildingPermitForm draftData={draftData} />}
        { (step == 3 || step === 5 || step === 8) && <NextStepChoiceForm step={step} /> }
        { (step === 4 || step === 7) && <ElectricalPermitForm step={step} draftData={draftData} />}
        { (step === 6 || step === 9) && <SanitaryPermitForm step={step} draftData={draftData} />}
        { step === 100 && <CompletePermitForm draftData={draftData} />}
      </div>
      <div className="flex justify-between p-4 shadow bg-green-50">
        {step > 1 ? <FormButton type="reset" label={"Back"} isLoading={backLoading} disabled={loading || pending} onClick={backAction} size="large" fontWeight="bold" textTransform="uppercase" /> : <div></div>}
        <FormButton label={step !== 100 ? "Next" : "Submit"} disabled={backLoading || loading} isLoading={loading || pending} loading={<Spinner size={24} />} size="large" fontWeight="bold" textTransform="uppercase" appearance="primary" />
      </div>
    </form>
  )
}