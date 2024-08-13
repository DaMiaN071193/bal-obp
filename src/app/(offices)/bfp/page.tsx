import { Metadata } from "next";
import DashboardPage from "./component";

export const metadata: Metadata = {
  title: "Dashboard - BFP",
};

export default function Page() {
  return <DashboardPage />
}