'use client';;
import { Group, Pane, TextInputField } from "evergreen-ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSignupContext } from "../context";

export default function NameComponent() {
  const { data, pending, isLoading, setInvalid } = useSignupContext()
  const [contactNo, setContactNo] = useState<string>("")
  const [isInvalidContact, setIsInvalidContact] = useState<undefined|boolean>(true)
  const [invalidContactMessage, setInvalidContactMessage] = useState<undefined|string>("Please enter your phone number")
  const [hasSentValidation, setHasSentValidation] = useState<Date|null>(null)
  const [counter, setCounter] = useState<number>(0)
  const [tick, setTick] = useState<boolean>(false)
  // const [invalidOTPMessage, setInvalidOTPMessage] = useState<undefined|string>()
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  // const [otpValue, setOTPValue] = useState<string>("")
  const [abortController, setAbortController] = useState<AbortController>(new AbortController())
  const [isChecking, setIsChecking] = useState<boolean>(false)

  const onAbort = useCallback((_: Event) => {
    setIsChecking(false);
  }, [setIsChecking])

  const onContactChange = useCallback(async (e: any) => {
    setIsChecking(true)
    let contact = e.target.value
    if (/^9/.test(contact)) {
      contact = '+63' + contact;
    } else if (/^09/.test(contact)) {
      contact = '+63' + contact.substring(1);
    } else if (/^639/.test(contact)) {
      contact = '+63' + contact.substring(2);
    }
    setContactNo(contact)
    setCounter(0)
    if (contact.length === 0) {
      setInvalid(true)
      setIsInvalidContact(true)
      setInvalidContactMessage("Please enter your phone number")
    } else {
      const isValidContact = /^\+639[0-9]{9}$/.test(contact)
      if (!isValidContact) {
        setIsInvalidContact(true)
        setInvalidContactMessage("Invalid phone number")
      } else {
        abortController.abort();
        const newAbortController = new AbortController()
        newAbortController.signal.onabort = onAbort;
        setAbortController(newAbortController)
        const url = new URL('/signup/steps/api/exists', window.location.origin)
        url.searchParams.append('phone', contact)
        setIsChecking(true)
        fetch(url, { signal: newAbortController.signal })
        .then((response: Response) => response.json())
        .then((exists: boolean) => {
          setIsInvalidContact(exists)
          setInvalidContactMessage(exists ? "Phone number already taken" : undefined)
          setIsChecking(false)
          setIsCompleted(!exists)
          if (!exists) {
            setInvalid(false)
          }
        })
        .catch(() => {
          setIsInvalidContact(true)
          setInvalidContactMessage("Server Error. Try again")
          setIsChecking(false)
        });
      }
    }
  }, [setInvalid, abortController, onAbort])

  // const onSendOTP = useCallback(async (e: any) => {
  //   e.preventDefault()
  //   if (/^\+639[0-9]{9}$/.test(contactNo) && !isInvalidContact) {
  //     setCounter(counter + 1);
  //     setHasSentValidation(new Date());
  //     const sendOTP = sendSMSVerificationCodeForNewUser.bind(null, contactNo)
  //     try {
  //       await sendOTP();
  //     } catch (e: any) {
  //       console.log(e)
  //     }
  //   }
  // }, [contactNo, isInvalidContact, counter])

  const countdownMessage = useMemo(() => {
    const tk = tick;
    if (!!hasSentValidation) {
      const tsv = hasSentValidation.getTime();
      const now = (new Date()).getTime();
      const timer = Math.floor(now - tsv);
      let t = "0";
      t += Math.floor(((5 * 60 * 1000) - timer) / 1000 / 60).toString();
      t += ":"
      const sec = Math.floor(((5 * 60 * 1000) - timer) / 1000) % 60
      t += sec > 10 ? sec.toString() : "0" + sec;
      if (t === "00:00") {
        setHasSentValidation(null);
        return "0:00"
      }
      return t;
    }
    return '00:00'
  }, [tick, hasSentValidation])

  useEffect(() => {
    setTimeout(() => {
      setTick(!tick)
    }, 1000)
    if (!!hasSentValidation && countdownMessage === '0:00') {
      setHasSentValidation(null)
    }
    // eslint-disable-next-line
  }, [tick])

  // const onOTPInput = useCallback(async (e: any) => {
  //   e.preventDefault()
  //   const otp = e.target.value
  //   setOTPValue(otp)
  //   if (/^[0-9]{6}$/.test(otp)) {
  //     // verify otp
  //     const verifyOTP = verifySMSVerificationCodeForNewUser.bind(null, contactNo, otp)
  //     try {
  //       const verified = await verifyOTP();
  //       if (verified) {
  //         setInvalidOTPMessage(undefined)
  //         setInvalid(false)
  //         setIsCompleted(true)
  //       } else {
  //         setInvalidOTPMessage("Invalid OTP")
  //         setInvalid(true)
  //         setOTPValue("")
  //       }
  //     } catch (e: any) {
  //       setInvalidOTPMessage("Invalid OTP")
  //       setInvalid(true)
  //       setOTPValue("")
  //     }
  //   } else if (otp.length > 0) {
  //     setInvalidOTPMessage("")
  //     setInvalid(true)
  //   }
  // }, [contactNo, setInvalid])

  return (
    <Pane className="flex flex-col pb-8">
      <Pane className="min-w-[400px] mb-4">
        <Pane className="flex flex-col justify-start whitespace-normal">
          <span className="text-2xl flex-grow">Create your BAL-OBP Account</span>
          <span>Phone Contact Verification (Step 4)</span>
        </Pane>
      </Pane>
      <Pane className="flex flex-col md:flex-row md:justify-evenly space-x-0 md:space-x-4">
        <Pane className="flex flex-col justify-start whitespace-normal space-y-2 mb-2 md:mb-0 border-b-1 md:border-none">
          <Group>
            <button className="mt-[26px] cursor-default text-slate-600 border rounded-l bg-slate-200 w-fit h-fit text-[12px] p-[6px]">+63</button>
            <input type="hidden" name="contactNo" value={contactNo} />
            <input type="hidden" name="contactVerified"
              // value={isCompleted ? 'true' : ''}
              value="true"
            />
            <TextInputField
              required
              type="tel"
              title="Phone Number"
              label="Enter your phone number"
              disabled={!data || pending || !!hasSentValidation}
              onInput={onContactChange}
              placeholder="9xxxxxxxxxx"
              isInvalid={isInvalidContact}
              validationMessage={invalidContactMessage}
              readOnly={!!hasSentValidation || isCompleted || isLoading}
            />
          </Group>
        </Pane>
        {/* <Pane className="flex flex-col justify-start whitespace-normal space-y-2">
          { isCompleted ? (
            <div className="h-full w-full flex items-center justify-start text-green-500">
              <TickCircleIcon color="success" marginRight={16} /> Successfully Verified
            </div>
          ) : (<>
            <span>Verify Phone Number</span>
            <Button disabled={!data || pending || isInvalidContact || !!hasSentValidation || isLoading || isChecking} onClick={onSendOTP}>
              {counter === 0 ? 'Send OTP' : (!!hasSentValidation ? countdownMessage : 'Resend OTP')}
            </Button>
            <TextInputField
              required
              type="tel"
              title="OTP Code"
              label="Enter OTP code sent to your phone number"
              disabled={!data || pending || isInvalidContact || isChecking}
              readOnly={isCompleted || isLoading}
              value={otpValue}
              placeholder="XXXXXX"
              maxLength={6}
              onInput={onOTPInput}
              isInvalid={!!invalidOTPMessage}
              validationMessage={invalidOTPMessage}
            />
          </>)
          }
        </Pane> */}
      </Pane>
    </Pane>
  )
}