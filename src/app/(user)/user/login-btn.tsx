'use client';
import { useSession } from "@/components/useSession";
import { Spinner } from "evergreen-ui";
import NextLink from 'next/link';
import { usePathname } from "next/navigation";

export default function LoginButton(props: any) {
  const { status } = useSession({
    redirect: false,
  })
  const pathname = usePathname();

  return status === 'loading'
    ? <li className="p-3"><Spinner /></li>
    : status === 'unauthenticated' && pathname !== '/user/login'
    ? (<li className="p-3">
        <NextLink {...props} className="text-xl font-semibold md:p-0 text-emerald-200 hover:text-blue-400" href="/user/login">Login</NextLink>
      </li>)
    : null
}