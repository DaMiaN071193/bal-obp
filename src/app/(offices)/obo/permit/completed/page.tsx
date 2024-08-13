import { Metadata } from "next";
import CompletedAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Completed Permit - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <CompletedAssessmentPermitApplicationsPage appNo={appNo} />
}