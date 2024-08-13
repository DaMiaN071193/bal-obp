import { Metadata } from "next";
import ForwardAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "To be Forwarded to BFP - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <ForwardAssessmentPermitApplicationsPage appNo={appNo} />
}