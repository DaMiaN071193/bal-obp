import { Metadata } from "next";
import PermitPage from "./component";

export const metadata: Metadata = {
  title: "Permit Management - MPDC",
};

export default function Page() {
  return <PermitPage />
}