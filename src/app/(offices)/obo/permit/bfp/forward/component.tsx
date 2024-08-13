'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function ForwardAssessmentPermitApplicationsPage({ appNo }: { appNo?: string }) {

  const { data: session, status } = useSession({
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
      label: 'To Be Forwarded To BFP',
      url: '/' + role + '/permit/bfp/forward',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="To Be Forwarded To BFP"
        icon={PeopleIcon}
        description="View Application List to be forwarded to BFP"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="To Be Forwarded To BFP Permit Applications">
          <PermitManagementTable viewable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/bfp/forward'} role={session!.user.role} isDisabled={true} />
        </CardContainer>
      </div>
    </>
  )
}