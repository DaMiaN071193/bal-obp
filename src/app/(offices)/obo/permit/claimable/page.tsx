import { Metadata } from "next";
import ClaimableAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Claimable Completed Permit - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <ClaimableAssessmentPermitApplicationsPage appNo={appNo} />
}