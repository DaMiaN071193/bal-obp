'use client'

import { createContext, useContext } from "react"

export const SignupContext = createContext<{
  data: any,
  pending: boolean,
  isLoading: boolean,
  setInvalid: (value: boolean) => void
}>({
  data: null,
  pending: false,
  isLoading: false,
  setInvalid: () => {}
})

export function useSignupContext() {
  const context = useContext(SignupContext)
  const { data, pending, setInvalid, isLoading } = context

  return {
    data,
    pending,
    setInvalid,
    isLoading
  }
}