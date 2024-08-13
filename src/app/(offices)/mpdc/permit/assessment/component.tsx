'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function AssessmentPermitApplicationsPage({ appNo }: { appNo?: string }) {

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
      label: 'Assessment',
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
        title="Assessment of Documents Permit Applications"
        icon={PeopleIcon}
        description="Manage Assessment of Documents Permit Application List"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Assessment of Documents Permit Applications">
          <PermitManagementTable viewable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/assessment'} role={session!.user.role} step={4} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}