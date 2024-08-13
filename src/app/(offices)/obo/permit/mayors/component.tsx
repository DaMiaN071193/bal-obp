
'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function ForwardAssessmentPermitApplicationsPage({ appNo }: { appNo?: string }) {

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
      label: "Process for Mayor's Permit",
      url: '/' + role + '/permit/mayors',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Process for Mayor's Permit"
        icon={PeopleIcon}
        description="View Application List to process for Mayor's Permit"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Process for Mayor's Permit and Received">
          <PermitManagementTable viewable={true} searchParam={appNo} withMayorsPermit={true} permitUrl={'/' + role + '/api/permits/mayors'} role={session!.user.role} step={9} receivingOnly={true} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}