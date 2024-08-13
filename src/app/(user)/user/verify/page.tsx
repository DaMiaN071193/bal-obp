import { Metadata } from "next";
import VerifyEmailComponent from "@/components/verifications/verify-email-component";

export const metadata: Metadata = {
  title: "User Email Verification",
};

type ParamProp = { searchParams: { resend?: string; } }

export default function Page({ searchParams: { resend } }: ParamProp ) {
  return <VerifyEmailComponent resend={resend} />
}