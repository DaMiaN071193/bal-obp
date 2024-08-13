import EmailVerificationComponent from "@/components/verifications/email-verification";
import { UserRoles } from "@/lib/models/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Verification - BFP",
};

type ParamsProp = Readonly<{
  searchParams: {
    token?: string;
    code?: string;
  }
}>

export default function Page({ searchParams: { token, code } }: ParamsProp) {
  return <EmailVerificationComponent role={UserRoles.BFP} token={token} code={code} />
}