import { Metadata } from "next";
import RejectedPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Rejected Assessments (Subject for compliance) - BFP",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <RejectedPermitApplicationsPage appNo={appNo} />
}