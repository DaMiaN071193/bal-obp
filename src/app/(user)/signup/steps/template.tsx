'use client'
import { Suspense, useEffect } from "react";
import SignupProvider from "./provider";
import LoadingComponent from "@/components/loading";
import { Button } from "evergreen-ui";
import { useRouter } from "next/navigation";

const FallbackRefresh = () => {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [router])
  return <div><LoadingComponent /><span>Loading</span><br /><br /><Button onClick={() => router.refresh()}>Refresh</Button></div>
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<FallbackRefresh />}>
      <SignupProvider>
        {children}
      </SignupProvider>
    </Suspense>
  );
}