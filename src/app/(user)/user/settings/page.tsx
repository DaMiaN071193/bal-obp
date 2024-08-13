import { Metadata } from "next";
import SettingsPage from "./component";

export const metadata: Metadata = {
  title: "Settings - Admin",
};

export default function Page() {
  return <SettingsPage />
}