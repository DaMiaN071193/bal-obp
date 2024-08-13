import NotFoundPage from "@/components/errorpages/404";
import { Metadata } from "next";
import PrintComponent from "./component";

export const metadata: Metadata = {
  title: "Building Permit",
}

type SearchParamProp = {
  searchParams: {
    appNo: string,
    permit: string,
  }
}

export default function PrintDocument({ searchParams: { appNo, permit }}: SearchParamProp) {
  return !appNo && (permit !== '1' && permit !== '2' && permit !== '3') ? <NotFoundPage /> : (
    <PrintComponent appNo={appNo} permit={permit} />
  )
}