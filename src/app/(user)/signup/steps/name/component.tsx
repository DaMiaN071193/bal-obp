"use client"

import { useEffect } from "react";
import { Pane, TextInput } from "evergreen-ui";
import { useSignupContext } from "../context";

export default function NameComponent() {
  const { data, pending, isLoading, setInvalid } = useSignupContext()

  useEffect(() => {
    setInvalid(false);
  }, [setInvalid])

  return (
    <Pane className="flex flex-col pb-8">
      <Pane className="min-w-[400px] mb-4">
        <Pane className="flex flex-col justify-start whitespace-normal">
          <span className="text-2xl flex-grow">Create your BAL-OBP Account</span>
          <span>Enter your name and address (Step 1)</span>
        </Pane>
      </Pane>
      <Pane className="flex flex-col md:flex-row md:justify-evenly space-x-0 md:space-x-4">
        <Pane className="flex flex-col justify-start whitespace-normal space-y-2 mb-2 md:mb-0 border-b-1 md:border-none">
          <span>Full Name</span>
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            name="firstName"
            placeholder="First Name"
          />
          <TextInput
            disabled={!data || pending}
            readOnly={isLoading}
            name="middleName"
            placeholder="Middle Name"
          />
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            name="lastName"
            placeholder="Last Name"
          />
        </Pane>
        <Pane className="flex flex-col justify-start whitespace-normal space-y-2">
          <span>Address</span>
          <TextInput
            disabled={!data || pending}
            readOnly={isLoading}
            name="no"
            placeholder="No."
          />
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            name="street"
            placeholder="Street"
          />
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            name="barangay"
            placeholder="Barangay"
          />
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            name="cityMunicipality"
            placeholder="City/Municipality"
          />
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            name="province"
            placeholder="Province"
          />
          <TextInput
            required
            disabled={!data || pending}
            readOnly={isLoading}
            type="tel"
            name="zipCode"
            placeholder="Zip Code"
            maxLength={4}
          />
        </Pane>
      </Pane>
    </Pane>
  )
}