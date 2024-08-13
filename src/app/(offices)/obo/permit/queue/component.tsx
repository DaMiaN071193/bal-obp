'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";


export default function QueuedPermitApplicationsPage({ appNo }: { appNo?: string }) {

  const { data: session, status, refreshNotification } = useSession({
    redirect: true,
  });
  const role = useMemo(() => session?.user.role, [session])

  const breadcrumb = useMemo(() => [
    {
      icon: HomeIcon,
      url: '/' + role,
    },
    {
      label: 'Permit Management',
      url: '/' + role + '/permit',
    },
    {
      label: 'Queued Permit Application List',
      url: '/' + role + '/permit/queue',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Queued Permit Application List"
        icon={PeopleIcon}
        description="Manage Queued Permit Application List"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Queued Permit Application List">
          <PermitManagementTable printable={true} viewable={true} editable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/queue'} role={session!.user.role} step={2} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}