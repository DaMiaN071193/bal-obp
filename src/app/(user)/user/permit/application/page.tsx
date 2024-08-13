import { Metadata } from "next";
import PermitApplicationPage from "./component";

export const metadata: Metadata = {
  title: "Permit Application",
}

export default function PermitApplication() {
  return <PermitApplicationPage />
}