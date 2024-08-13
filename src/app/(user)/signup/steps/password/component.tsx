'use client'
import { useCallback, useEffect, useState } from "react";
import { Pane, TextInputField } from "evergreen-ui";
import { useSignupContext } from "../context";

export default function NameComponent() {
  const { data, pending, isLoading, setInvalid } = useSignupContext()
  const [errorPassMessage, setErrorPassMessage] = useState<undefined|string>()
  const [errorRepMessage, setErrorRepMessage] = useState<undefined|string>()
  const [password, setPassword] = useState<undefined|string>()
  const [repeatPassword, setRepeatPassword] = useState<undefined|string>()
  const onInputChange = useCallback(async (ev: any) => {
    ev.preventDefault()
    const pwd = ev.target.value
    setPassword(pwd)
  }, [])
  const onRepeatChange = useCallback(async (ev: any) => {
    ev.preventDefault()
    const pwd = ev.target.value
    setRepeatPassword(pwd)
  }, [])

  useEffect(() => {
    if (!password && !repeatPassword) {
      setInvalid(false)
      setErrorPassMessage(undefined)
      setErrorRepMessage(undefined)
      return
    }
    if (!password) {
      setInvalid(true)
      setErrorPassMessage(undefined)
      return
    }
    if (!!password && password.length < 8) {
      setInvalid(true)
      setErrorPassMessage("Password must be at least 8 characters")
      return
    } else {
      setErrorPassMessage(undefined)
    }
    if (!repeatPassword) {
      setInvalid(true)
      setErrorRepMessage(undefined)
      return
    }
    if (repeatPassword !== password) {
      setInvalid(true)
      setErrorPassMessage(undefined)
      setErrorRepMessage("Passwords do not match")
    } else {
      setInvalid(false)
      setErrorPassMessage(undefined)
      setErrorRepMessage(undefined)
    }
  }, [password, repeatPassword, setInvalid])

  return (
    <Pane className="flex flex-col pb-8">
      <Pane className="min-w-[400px] mb-4">
        <Pane className="flex flex-col justify-start whitespace-normal">
          <span className="text-2xl flex-grow">Create your BAL-OBP Account</span>
          <span>Create your password (Step 3)</span>
        </Pane>
      </Pane>
      <Pane className="flex flex-col justify-start whitespace-normal space-y-2 mb-2 md:mb-0 border-b-1 md:border-none">
        <TextInputField
          required
          type="password"
          title="Password"
          label="Enter a password"
          disabled={!data || pending}
          readOnly={isLoading}
          name="password"
          placeholder="Enter your password"
          onInput={onInputChange}
          isInvalid={errorPassMessage === undefined ? undefined : !!errorPassMessage}
          validationMessage={errorPassMessage}
        />
        <TextInputField
          required
          type="password"
          title="Repeat Password"
          label="Repeat your password"
          disabled={!data || pending}
          readOnly={isLoading}
          value={repeatPassword}
          placeholder="Repeat your password"
          onInput={onRepeatChange}
          isInvalid={errorRepMessage === undefined ? undefined : !!errorRepMessage}
          validationMessage={errorRepMessage}
        />
      </Pane>
    </Pane>
  )
}