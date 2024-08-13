'use client'

import { UserRoles } from "@/lib/models/interfaces";
import { usePathname } from "next/navigation";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import MainComponent from "../main";

export default function TemplateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  return <>{ pathname.startsWith('/' + UserRoles.OBO + '/permit/print')
    ? children
    : (<>
      <HeaderComponent />
      <MainComponent>
        {children}
      </MainComponent>
      <FooterComponent />
    </>)
  }</>
}