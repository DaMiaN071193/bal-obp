import { Metadata } from "next";
import HeaderNav from "./header";

export const metadata: Metadata = {
  title: "Sign Up | Municipal Engineering Office of Agusan del Norte",
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderNav />
      <main className="mx-auto container min-h-[88vh] relative">
        <div className="pt-4 flex justify-center items-center w-full h-full">
          {children}
        </div>
      </main>
    </>
  )
}