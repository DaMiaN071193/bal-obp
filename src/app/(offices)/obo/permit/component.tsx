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
                href={'/' + session?.user.role + '/permit/assessment'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                On Going Assessment
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/mpdc/forward'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                To Be Forward to MPDC
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/mpdc/pending'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                MPDC On Going Assessment
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/payment'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                Total Assessment Payment
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/bfp/forward'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                To Be Forward to BFP
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/bfp/pending'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                BFP On Going Assessment
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/bfp'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow-lg flex items-center justify-center flex-wrap text-center"
              >
                BFP Assessment Completed
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/mayors'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                {"Mayor's Permit Process"}
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/claimable'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                Claimable Permit Applications
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/completed'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                Completed Permit Applications
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
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/mpdc/rejects'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                MPDC Rejected Applications
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/bfp/rejects'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                BFP Rejected Applications
              </NextLink>
            </div>
            <div className="text-xs sm:text-sm md:text-md lg:text-lg p-2 lg:p-6 xl:p-10">
              <NextLink
                href={'/' + session?.user.role + '/permit/declined'}
                className="aspect-square font-bold uppercase text-white bg-green-600  rounded shadow flex items-center justify-center flex-wrap text-center"
              >
                Declined / Cancelled Applications
              </NextLink>
            </div>
          </div>
        </CardContainer>
      </div>
    </>
  )
}