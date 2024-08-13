import VerifyEmailComponent from "@/components/verifications/verify-email-component";
import { UserRoles } from "@/lib/models/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Verification - OBO",
};

type ParamProp = { searchParams: { resend?: string; } }

export default function Page({ searchParams: { resend } }: ParamProp ) {
  return <VerifyEmailComponent role={UserRoles.OBO} resend={resend} />
}