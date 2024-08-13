'use client';

import { useMemo } from "react";

export default function CompletePermitForm({ draftData }: { draftData: any }) {
  const forms = useMemo(() => [
    !!draftData?.buildingPermit ? 'Building Permit' : undefined,
    !!draftData?.electricalPermit ? 'Electrical Permit' : undefined,
    !!draftData?.sanitaryPermit ? 'Sanitary Permit' : undefined
  ].filter(v => !!v), [draftData])
  return (
    <div className="leading-loose">
      <div className="font-bold">Your have filled-up the following forms for permit registration:</div>
      <ul className="list-disc list-inside ml-8 mt-2">
        {forms.map((v, index) => (
          <li key={index}>{v}</li>
        ))}
      </ul>
      <br />
      <div className="italic text-sm text-green-900">Complete your permit registration by clicking the submit button. You will then be redirected to the tracking page of your permit application.</div>
    </div>
  )
}