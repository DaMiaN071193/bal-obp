import VerifyEmailComponent from "@/components/verifications/verify-email-component";
import { UserRoles } from "@/lib/models/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Verification - BFP",
};

type ParamProp = { searchParams: { resend?: string; } }

export default function Page({ searchParams: { resend } }: ParamProp ) {
  return <VerifyEmailComponent role={UserRoles.BFP} resend={resend} />
}