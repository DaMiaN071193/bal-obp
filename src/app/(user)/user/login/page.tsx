import LoginPageComponent from "@/components/login-page-component";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return <LoginPageComponent />
}