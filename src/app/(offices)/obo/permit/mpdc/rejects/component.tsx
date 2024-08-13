'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useMemo } from "react";

export default function RejectedPermitApplicationsPage({ appNo }: { appNo?: string }) {

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
      label: 'Rejected MPDC Assessment',
      url: '/' + role + '/permit/mpdc/rejects',
    }
  ], [role])


  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Rejected MPDC Assessment (for compliance)"
        icon={PeopleIcon}
        description="View Rejected MPDC Assessment for Compliance"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Rejected MPDC Assessment List for Compliance">
          <PermitManagementTable viewable={true} printable={true} editable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/mpdc/rejects'} role={session!.user.role} isDisabled={true} isRejects={true} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}