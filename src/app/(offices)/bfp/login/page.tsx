import LoginPageComponent from "@/components/login-page-component";
import BFPDefaultContainer from "@/components/office-default-container";
import { UserRoles } from "@/lib/models/interfaces";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BFP Login",
};

export default function Login() {
  return (<BFPDefaultContainer>
    <LoginPageComponent role={UserRoles.BFP} />
  </BFPDefaultContainer>)
}