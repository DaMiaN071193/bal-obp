'use client';
import { signupComplete, signupSteps } from "@/actions/signup";
import { updateSignupSession } from "@/lib/session";
import { Button, toaster } from "evergreen-ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SignupContext } from "./context";
import LoadingComponent from "@/components/loading";

export default function SignupProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const q = useSearchParams()
  const suid = useMemo(() => q.get("suid"), [q])
  const dth = useMemo(() => q.get("dth"), [q])
  const pathname = usePathname()
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInvalid, setInvalid] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (suid && dth) {
      setIsLoading(true)
      const url = new URL('/signup/steps/api/session', window.location.origin)
      url.searchParams.append('suid', suid)
      url.searchParams.append('dth', dth)
      fetch(url)
        .then((response: Response) => response.json())
        .then(({ data: d }: { data: any }) => {
          if ((pathname === '/signup/steps/name' && !!d) || (pathname === "/signup/steps/email"
              && !!d?.firstName && !!d?.lastName && !!d?.address
            ) || (pathname === "/signup/steps/password"
              && !!d?.firstName && !!d?.lastName && !!d?.address && !!d?.email
            ) || (pathname === "/signup/steps/contact"
            && !!d?.firstName && !!d?.lastName && !!d?.address && !!d?.email
            && !!d?.password
            ) || (pathname === "/signup/steps/confirm" && !!d?.firstName && !!d?.lastName
              && !!d?.address && !!d?.email && !!d?.password && !!d?.contactNo
              && !!d?.contactVerified
            )
          ) {
            setData(d)
          }
        }).catch(console.error)
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [pathname, suid, dth])

  useEffect(() => {
    setInvalid(true);
  }, [pathname])

  const actSignup = useMemo(() => signupSteps.bind(null, pathname, suid, dth), [pathname, suid, dth])

  const [state, action] = useFormState(actSignup as any, {
    success: false,
    errors: '',
    pathname: '',
    formData: {}
  })
  const { pending } = useFormStatus()

  useEffect(() => {
    if (!pending && state.success && state.pathname === pathname) {
      switch (state.pathname) {
        case "/signup/steps/name":
          (async () => {
            setIsLoading(true);
            const newStep = await updateSignupSession(suid, dth, { ...data, ...state.formData })
            if (!!newStep) {
              const urlSearchParams = new URLSearchParams({ suid: newStep.suid, dth: newStep.dth });
              const redirectUrl = `/signup/steps/email?${urlSearchParams.toString()}`;
              router.push(redirectUrl);
            }
          })()
          break
        case "/signup/steps/email":
          (async () => {
            setIsLoading(true);
            const newStep = await updateSignupSession(suid, dth, { ...data, ...state.formData })
            if (!!newStep) {
              const urlSearchParams = new URLSearchParams({ suid: newStep.suid, dth: newStep.dth });
              const redirectUrl = `/signup/steps/password?${urlSearchParams.toString()}`;
              router.push(redirectUrl);
            }
          })()
          break
        case "/signup/steps/password":
          (async () => {
            setIsLoading(true);
            const newStep = await updateSignupSession(suid, dth, { ...data, ...state.formData })
            if (!!newStep) {
              const urlSearchParams = new URLSearchParams({ suid: newStep.suid, dth: newStep.dth });
              const redirectUrl = `/signup/steps/contact?${urlSearchParams.toString()}`;
              router.push(redirectUrl);
            }
          })()
          break
        case "/signup/steps/contact":
          (async () => {
            setIsLoading(true);
            const newStep = await updateSignupSession(suid, dth, { ...data, ...state.formData })
            if (!!newStep) {
              const urlSearchParams = new URLSearchParams({ suid: newStep.suid, dth: newStep.dth });
              const redirectUrl = `/signup/steps/confirm?${urlSearchParams.toString()}`;
              router.push(redirectUrl);
            }
          })()
          break
        case "/signup/steps/confirm":
          (async () => {
            setIsLoading(true);
            const signUpCompleteNow = signupComplete.bind(null, data)
            const response = await signUpCompleteNow()
            if (response.success) {
              toaster.success(response.message)
              window.location.href = "/user/permit/application"
            } else {
              setData(null)
            }
          })()
          break
        default:
          router.push("/signup/steps/email")
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return !isLoading && !data
  ? (
    <div className="rounded-2xl min-h-[200px] bg-white pt-12 p-8 text-xl flex flex-col">
      Something went went wrong. Please try again later.
      <div className="max-w-[100px] self-end mt-8">
        <Button intent="danger" appearance="primary" onClick={() => router.back()}>Back</Button>
      </div>
    </div>
  ) : (
    <SignupContext.Provider value={{ data, pending, isLoading, setInvalid }}>
      <form action={action} className="rounded-2xl min-h-[200px] bg-white pt-12 p-8 min-w-[400px]">
        {(!data && isLoading) ? <LoadingComponent /> : children}
        <div className="flex flex-col md:flex-row md:justify-evenly">
        {(!!data && pathname === "/signup/steps/confirm") && (
            <Button intent="primary" onClick={() => router.back()}>Cancel</Button>
          )
        }
        { !!data && (
          <Button isLoading={(isLoading || pending)} type="submit" intent={pathname === "/signup/steps/confirm" ? "success" : "primary"} appearance="primary" disabled={isInvalid}>
            {pathname === "/signup/steps/confirm" ? 'Complete Sign Up' : 'Next'}
          </Button>
        )}
        </div>
      </form>
    </SignupContext.Provider>
  )
}
