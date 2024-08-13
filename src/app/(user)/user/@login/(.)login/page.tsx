import Modal from "@/components/modal";
import { Metadata } from "next";
import Login from "./component";

export const metadata: Metadata = {
  title: "Login"
}

export default function LoginModal() {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-20 bg-slate-400/70 transition-opacity ease-in-out duration-500">
      <Modal path="/user/login">
        <Login />
      </Modal>
    </div>
  )
}