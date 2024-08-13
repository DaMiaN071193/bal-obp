import LoginPageComponent from "@/components/login-page-component";
import MPDCDefaultContainer from "@/components/office-default-container";
import { UserRoles } from "@/lib/models/interfaces";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MPDC Login",
};

export default function Login() {
  return (<MPDCDefaultContainer>
    <LoginPageComponent role={UserRoles.MPDC} />
  </MPDCDefaultContainer>)
}