
'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function CompletedAssessmentPermitApplicationsPage({ appNo }: { appNo?: string }) {

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
      label: "Completed Assessments",
      url: '/' + role + '/permit/complete',
    }
  ], [role])

  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="MPDC Completed Asessment"
        icon={PeopleIcon}
        description="View MPDC Completed Assessments"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="MPDC Completed Asessment">
          <PermitManagementTable searchParam={appNo} permitUrl={'/' + role + '/api/permits/complete'} role={session!.user.role} isDisabled={true} refreshNotification={refreshNotification} isCompleted={true} />
        </CardContainer>
      </div>
    </>
  )
}