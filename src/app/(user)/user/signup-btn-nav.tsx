'use client';
import { createSignupSession } from "@/lib/session";
import { useSession } from "@/components/useSession";
import { Spinner } from "evergreen-ui";
import { useCallback } from "react";
import NextLink from 'next/link';
import { useRouter } from "next/navigation";

export default function SignupBtnNav(props: any) {
  const { status } = useSession({
    redirect: false,
  })

  const router = useRouter()

  const onRequestSignUp = useCallback(async () => {
    const newSignUpSession = await createSignupSession()
    if (!!newSignUpSession) {
      const urlSearchParams = new URLSearchParams({ suid: newSignUpSession.suid as string, dth: newSignUpSession.dth as string });
      window.location.href = `/signup/steps/name?${urlSearchParams.toString()}`
    }
  }, []);

  return status === 'loading'
    ? <li className="p-3"><Spinner /></li>
    : status === 'authenticated'
    ? (<li className="p-3 bg-yellow-300 rounded-full max-h-[50px] hover:scale-[110%] cursor-pointer flex items-center" onClick={() => router.push('/user/permit/application')}>
        <NextLink {...props} className="text-xl font-semibold md:p-0 hover:text-[#4764FD]" href="/user/permit/application"><span>Request Now!</span></NextLink>
      </li>)
    : (<li className="p-3 bg-yellow-300 rounded-full max-h-[50px] hover:scale-[110%] cursor-pointer flex items-center">
        <button {...props} className="text-xl font-semibold md:p-0 hover:text-[#4764FD]" onClick={onRequestSignUp}>Request Now!</button>
      </li>)
}