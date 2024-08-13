import ProfileSettingsPage from "@/app/_settings/profile/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings - MPDC",
};

export default function Page() {
  return <ProfileSettingsPage />
}