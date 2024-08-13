import { Metadata } from "next";
import CompletedAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Completed Assessments - MPDC",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <CompletedAssessmentPermitApplicationsPage appNo={appNo} />
}