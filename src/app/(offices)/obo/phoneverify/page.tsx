import OfficePhoneVerificationComponent from "@/components/verifications/office-phone-verification";
import { UserRoles } from "@/lib/models/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phone Verification - OBO",
};

export default function Page() {
  return <OfficePhoneVerificationComponent role={UserRoles.OBO} />
}