'use client';;
import BannerWithBreadcrumb from "@/app/(offices)/banner-with-breadcrumb";
import CardContainer from "@/app/(offices)/card-container";
import PermitManagementTable from "@/app/(offices)/permit-management";
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import { useEffect, useMemo, useState } from "react";

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
      label: 'Rejected Application List',
      url: '/' + role + '/permit/rejects',
    }
  ], [role])

  const [latestStep, setLatestStep] = useState<number>(2);
  useEffect(() => {
    const url = new URL('/' + role + '/api/permit/lateststep', window.location.origin);
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => setLatestStep(Math.min(3, Math.max(2, data))))
      .catch(console.log)
  }, [role])

  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === "authenticated" && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Rejected Application List"
        icon={PeopleIcon}
        description="Manage Rejected Applications for Compliance"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Rejected Application List for Compliance">
          <PermitManagementTable editable={true} viewable={true} printable={true} searchParam={appNo} permitUrl={'/' + role + '/api/permits/rejects'} role={session!.user.role} step={latestStep} isRejects={true} refreshNotification={refreshNotification} />
        </CardContainer>
      </div>
    </>
  )
}