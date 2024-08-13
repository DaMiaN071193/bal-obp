'use client';
import { createSignupSession } from "@/lib/session";
import { useSession } from "@/components/useSession";
import { Spinner } from "evergreen-ui";
import NextLink from 'next/link';
import { useCallback } from "react";

export default function SignupBtnHome() {
  const { status } = useSession({
    redirect: false,
  })

  const onRequestSignUp = useCallback(async () => {
    const newSignUpSession = await createSignupSession()
    if (!!newSignUpSession) {
      const urlSearchParams = new URLSearchParams({ suid: newSignUpSession.suid as string, dth: newSignUpSession.dth as string });
      window.location.href = `/signup/steps/name?${urlSearchParams.toString()}`
    }
  }, []);

  return status === 'loading'
    ? <Spinner />
    : status === 'authenticated'
    ? (<NextLink
        className="relative lg:w-48 mt-2 px-12 py-4 w-full sm:w-fit rounded-full font-semibold text-lg lg:text-xl bg-green-600 text-white hover:bg-blue-400"
        href="/user/permit/application"
      >
        Request Building Permit
      </NextLink>)
    : (<button
        onClick={onRequestSignUp}
        className="relative lg:w-86 mt-2 px-12 py-4 w-full sm:w-fit rounded-full font-semibold text-lg lg:text-xl bg-green-600 text-white hover:bg-blue-400"
      >
        Request Building Permit
      </button>)
}