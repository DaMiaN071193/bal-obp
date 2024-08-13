import { Metadata } from "next";
import PaymentAssessmentPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Pending Payments for Assessment of Documents - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <PaymentAssessmentPermitApplicationsPage appNo={appNo} />
}