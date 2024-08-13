'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function PermitApplicationsPage({ appNo }: { appNo?: string }) {

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
      label: 'Permit Application List',
      url: '/' + role + '/permit/applications',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Permit Application List"
        icon={PeopleIcon}
        description="Manage Permit Application List"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Permit Application List">
          <PermitManagementTable viewable={true} printable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/application'} role={session!.user.role} step={1} refreshNotification={refreshNotification}  />
        </CardContainer>
      </div>
    </>
  )
}