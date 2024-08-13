import { Metadata } from "next";
import DashboardPage from "./component";

export const metadata: Metadata = {
  title: "Dashboard - MPDC",
};

export default function Page() {
  return <DashboardPage />
}