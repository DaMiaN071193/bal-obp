
'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function ClaimableAssessmentPermitApplicationsPage({ appNo }: { appNo?: string }) {

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
      label: "Claimable Completed Permit",
      url: '/' + role + '/permit/claimable',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Claimable Approved Permits"
        icon={PeopleIcon}
        description="Manage Claimable Completed Permit Applications"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Claimable Completed Permits">
          <PermitManagementTable viewable={true} displayMayorsPermit={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/claimable'} role={session!.user.role} step={10} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}