'use client';
import AccountsPageContent from "@/app/_settings/account/content";
import ChangePasswordPageContent from "@/app/_settings/change/content";
import ProfilePageContent from "@/app/_settings/profile/content";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { Paragraph } from "evergreen-ui";
import { useEffect } from "react";

export default function SettingsPage() {

  const { data: session, status, refresh, update } = useSession({
    redirect: true,
  });

  useEffect(() => {
    update()
    // eslint-disable-next-line
  }, [])

  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return (<>
    <Paragraph fontWeight={600} fontSize={28} marginLeft={42} marginTop={16} color={"green"}>Settings</Paragraph>
    <ProfilePageContent session={session} refresh={refresh} />
    <AccountsPageContent session={session} refresh={refresh} />
    <ChangePasswordPageContent session={session} />
  </>)
}