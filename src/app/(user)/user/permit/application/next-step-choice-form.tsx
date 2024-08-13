'use client'

import { Pane, Paragraph, Radio } from "evergreen-ui";
import { useMemo, useState } from "react";

export default function NextStepChoiceForm({ step } : { step: number }) {
  const nextPermitName = useMemo(() => step === 5 || step === 8
    ? 'Sanitary Permit'
    : 'Electrical Permit'
  , [step])
  const yesChoiceValue = useMemo(() => step === 3
    ? '4' // yes
    : step === 5
    ? '6'
    : '9'
  , [step])
  const noChoiceValue = useMemo(() => step === 3
    ? '8' // no
    : '100'
  , [step])
  const [choice, setChoice] = useState(yesChoiceValue)

  return (
    <Pane aria-label="Type of Permit" role="group">
      <Paragraph fontSize={18} fontWeight={"bold"}>Do you want to fill up {nextPermitName}?</Paragraph>
      <Radio name="nextStepOption" size={16} marginLeft={8} marginTop={16} value={yesChoiceValue} checked={choice === yesChoiceValue} onChange={(ev) => setChoice(ev.target.value)} label={<span className="font-bold">Yes, Fill up form</span>}/>
      <Radio name="nextStepOption" size={16} marginLeft={8} marginTop={16} value={noChoiceValue} checked={choice === noChoiceValue} onChange={(ev) => setChoice(ev.target.value)} label={<span className="font-bold">No, Skip</span>} />
    </Pane>
  )
}