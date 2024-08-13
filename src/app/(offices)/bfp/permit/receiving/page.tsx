import { Metadata } from "next";
import PermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Application List - BFP",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <PermitApplicationsPage appNo={appNo} />
}