import { Metadata } from "next";
import BFPAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "BFP On Going Assessment List - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <BFPAssessmentPermitApplicationsPage appNo={appNo} />
}