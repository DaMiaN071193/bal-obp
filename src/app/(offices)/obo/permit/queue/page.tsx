import { Metadata } from "next";
import QueuedPermitApplicationsPage from "./component";

export const metadata: Metadata = {
  title: "Queued Application List - OBO",
};

type ParamProp = {
  searchParams: {
    appNo?: string
  }
}

export default function Page({ searchParams: { appNo } }: ParamProp) {
  return <QueuedPermitApplicationsPage appNo={appNo} />
}