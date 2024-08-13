import { Metadata } from "next";
import PermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Permit Application List - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <PermitApplicationsPage appNo={appNo} />
}