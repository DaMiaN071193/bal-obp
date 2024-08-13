import { Metadata } from "next";
import RejectedPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Rejected Applications (Subject for compliance) - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <RejectedPermitApplicationsPage appNo={appNo} />
}