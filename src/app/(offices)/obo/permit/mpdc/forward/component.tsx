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
      label: 'To Be Forwarded To MPDC',
      url: '/' + role + '/permit/mpdc/forward',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="To Be Forwarded To MPDC"
        icon={PeopleIcon}
        description="View Application List to be forwarded to MPDC"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="To Be Forwarded To MPDC Permit Applications">
          <PermitManagementTable viewable={true} printable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/forward'} role={session!.user.role} isDisabled={true} />
        </CardContainer>
      </div>
    </>
  )
}