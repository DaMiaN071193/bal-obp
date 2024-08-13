'use client'
import { useCallback, useState } from "react";
import { Pane, TextInputField } from "evergreen-ui";
import { useSignupContext } from "../context";

export default function NameComponent() {
  const { data, pending, isLoading, setInvalid } = useSignupContext()
  const [hasExistsEmail, setHasExistsEmail] = useState<undefined|boolean>()
  const [errorMessage, setErrorMessage] = useState<undefined|string>()
  const [abortController, setAbortController] = useState<AbortController>(new AbortController())
  const [emailVal, setEmailVal] = useState<string>('')
  const onAbort = useCallback((_: Event) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setInvalid(emailVal.length > 0 && regex.test(emailVal));
  }, [setInvalid, emailVal])

  const onInputChange = useCallback(async (ev: any) => {
    ev.preventDefault()
    setInvalid(true)
    const email = ev.target.value as string
    setEmailVal(email)
    if (email.length === 0) {
      setErrorMessage(undefined)
      setHasExistsEmail(undefined)
    } else {
      // make a regex to check if email is valid
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(email)) {
        setHasExistsEmail(true)
        setErrorMessage("Not a valid email address")
        return
      }
      abortController.abort()
      const newAbortController = new AbortController()
      newAbortController.signal.onabort = onAbort;
      setAbortController(newAbortController)
      const url = new URL('/signup/steps/api/exists', window.location.origin)
      url.searchParams.append('email', email)
      setInvalid(true)
      fetch(url, { signal: newAbortController.signal })
        .then((response: Response) => response.json())
        .then((exists: boolean) => {
          setInvalid(exists)
          setHasExistsEmail(exists)
          setErrorMessage(exists ? "Email is already taken" : undefined)
        })
        .catch(() => {
          setInvalid(true)
          setErrorMessage(undefined)
          setHasExistsEmail(undefined)
        })
    }
  }, [setInvalid, abortController, onAbort]);

  return (
    <Pane className="flex flex-col pb-8">
      <Pane className="min-w-[400px] mb-4">
        <Pane className="flex flex-col justify-start whitespace-normal">
          <span className="text-2xl flex-grow">Create your BAL-OBP Account</span>
          <span>(Step 2)</span>
        </Pane>
      </Pane>
      <Pane className="flex flex-col justify-start whitespace-normal space-y-2 mb-2 md:mb-0 border-b-1 md:border-none">
        <TextInputField
          required
          title="Email Address"
          label="Enter your email address"
          disabled={!data || pending}
          readOnly={isLoading}
          name="email"
          placeholder="Enter your email address"
          onInput={onInputChange}
          isInvalid={hasExistsEmail}
          validationMessage={errorMessage}
        />
      </Pane>
    </Pane>
  )
}