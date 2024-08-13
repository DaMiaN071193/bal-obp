import LoginPageComponent from "@/components/login-page-component";
import OBODefaultContainer from "@/components/office-default-container";
import { UserRoles } from "@/lib/models/interfaces";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Office of the Building Official",
};

export default function Login() {
  return (<OBODefaultContainer>
    <LoginPageComponent role={UserRoles.OBO} />
  </OBODefaultContainer>)
}