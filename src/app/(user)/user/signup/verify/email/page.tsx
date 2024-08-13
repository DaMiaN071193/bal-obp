import { Metadata } from "next";
import EmailVerificationComponent from "@/components/verifications/email-verification";

export const metadata: Metadata = {
  title: "User Email Verification",
};

type ParamProp = { searchParams: { token?: string; code?: string; } }

export default function Page({ searchParams: { token, code }}: ParamProp) {
  return <EmailVerificationComponent token={token} code={code} />
}