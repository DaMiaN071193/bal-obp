'use client';
import LoadingComponent from "@/components/loading";
import { useSession } from "@/components/useSession";
import { HomeIcon, PeopleIcon } from "evergreen-ui";
import NextLink from 'next/link';
import { useMemo } from "react";
import BannerWithBreadcrumb from "../../banner-with-breadcrumb";
import CardContainer from "../../card-container";

export default function PermitsPage() {

  const { data: session, status } = useSession({
    redirect: true,
  });

  const breadcrumb = useMemo(() => [
    {
      icon: HomeIcon,
      url: '/' + session?.user.role,
    },
    {
      label: 'Permit Management',
      url: '/' + session?.user.role + '/permit',
    },
  ], [session?.user.role])

  if (status === 'loading') {
    return <div className="h-screen w-full"><LoadingComponent /></div>
  }

  return status === 'authenticated' && (
    <>
      <BannerWithBreadcrumb
        role={session!.user.role}
        title="Permit Management"
        icon={PeopleIcon}
        description="Permit Management Menu"
        breadcrumb={breadcrumb}
      />
      <div className="p-6">
        <CardContainer title="Permit Management">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/applications'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                Application List
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/queue'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                Queued Applications
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/bfp'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                BFP Applications
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/mpdc'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                MPDC Applications
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/rejects'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                Rejected Applications
              </NextLink>
            </div>
          </div>
        </CardContainer>
      </div>
    </>
  )
}