import { Metadata } from "next";
import DeclinePermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Declined or Completely Rejected Application List - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <DeclinePermitApplicationsPage appNo={appNo} />
}