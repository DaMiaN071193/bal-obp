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
      label: "BFP Assessment Completed",
      url: '/' + role + '/permit/bfp',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="BFP Assessment Completed"
        icon={PeopleIcon}
        description="Confirm received forwarded documents from BFP"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Receiving Completed Assessment from BFP">
          <PermitManagementTable searchParam={appNo} permitUrl={'/' + role + '/api/permits/bfp'} role={session!.user.role} step={8} receivingOnly={true} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}