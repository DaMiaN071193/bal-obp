'use client';;
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { redirect } from "next/navigation";

export default function DashboardPage() {

  const { data: session, status } = useSession({
    redirect: true,
  });

  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === 'authenticated' && (
    redirect('/' + session!.user.role + '/notifications')
    // <>
    //   <BannerWithBreadcrumb
    //     role={session.user.role}
    //     title="Dashboard"
    //     icon={DashboardIcon}
    //     description="View BFP Dashboard"
    //   />
    //   <div className="p-6">
    //     <CardContainer title="Dashboard">
    //       <p>
    //         Welcome to Dashboard Page!
    //       </p>
    //     </CardContainer>
    //   </div>
    // </>
  )
}