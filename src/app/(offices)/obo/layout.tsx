import { SessionProvider } from "@/components/useSession";
import { UserRoles } from "@/lib/models/interfaces";
import { Metadata } from "next";
import SidebarProvider from "../sidebar-context";

export const metadata: Metadata = {
  title: "Office of the Building Official",
};


export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider role={UserRoles.OBO}>
      <SidebarProvider role={UserRoles.OBO}>
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}