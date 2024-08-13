import { Metadata } from "next";
import MPDCAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "MPDC On Going Assessment List - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <MPDCAssessmentPermitApplicationsPage appNo={appNo} />
}