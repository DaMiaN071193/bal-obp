import { LoginForm } from "@/components/forms/login";
import clsx from "clsx";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ['latin'] })

export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-4 w-[320px] px-4 mb-4">
      <h2 className={clsx(nunito.className, "text-center font-bold mb-4 text-xl text-emerald-500")}>LOGIN</h2>
      <LoginForm />
    </div>
  )
}