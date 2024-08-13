'use client'
import HamburgerIcon from "@/components/icons/hamburgerIcon";
import clsx from "clsx";
import { IconButton, Pane, SideSheet } from "evergreen-ui";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import LoginButton from "./login-btn";
import SignupBtnNav from "./signup-btn-nav";

export default function HeaderNavMenuOverlay() {
  const [isShown, setIsShown] = useState(false)
  const pathname = usePathname()

  return (
    <Fragment>
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Pane maxWidth="460px" paddingY="25px" paddingX="25px" position="relative" onClick={() => setIsShown(false)}>
          <div className="text-2xl font-semibold">Menu</div>
          <ul className="flex flex-col p-4">
            <li className="p-3">
              <Link onClick={() => setIsShown(false)} className={clsx("text-xl font-semibold md:p-0 hover:text-blue-400", pathname === '/user' ? 'text-emerald-800': 'text-slate-800')} href="/user">Home</Link>
            </li>
            <li className="p-3">
              <Link onClick={() => setIsShown(false)} className={clsx("text-xl font-semibold md:p-0 hover:text-blue-400", pathname === '/about' ? 'text-emerald-800': 'text-slate-800')} href="/user/aboutus">About</Link>
            </li>
            <li className="p-3">
              <Link onClick={() => setIsShown(false)} className={'text-xl font-semibold md:p-0 hover:text-blue-400 text-slate-800'} href="#footer">Contact</Link>
            </li>
            <LoginButton onClick={() => setIsShown(false)} />
            <SignupBtnNav onClick={() => setIsShown(false)} />
          </ul>
        </Pane>
      </SideSheet>
      <div className="block md:hidden">
        <IconButton icon={<HamburgerIcon />} onClick={() => setIsShown(true)} appearance="minimal" color="white" className="hover:text-black" />
      </div>
  </Fragment>
  )
}