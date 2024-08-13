import { Metadata } from "next";
import AssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Assessment of Documents Permit Application List - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <AssessmentPermitApplicationsPage appNo={appNo} />
}