'use client'
import { useEffect } from "react";
import { Pane, TextInputField } from "evergreen-ui";
import { useSignupContext } from "../context";

export default function NameComponent() {
  const { data, setInvalid } = useSignupContext()

  useEffect(() => {
    setInvalid(false);
  }, [setInvalid])

  return (
    <Pane className="flex flex-col pb-8">
      <Pane className="min-w-[400px] mb-4">
        <Pane className="flex flex-col justify-start whitespace-normal">
          <span className="text-2xl flex-grow">Create your BAL-OBP Account</span>
          <span>Confirm your account information (Step 5)</span>
        </Pane>
      </Pane>
      <Pane className="flex flex-col md:flex-row md:justify-evenly space-x-0 md:space-x-4">
        <Pane className="flex flex-col lg:min-w-[200px] justify-start whitespace-normal space-y-2 mb-2 md:mb-0 border-b-1 md:border-none">
          <span>Full Name</span>
          <TextInputField
            readOnly
            hint="First Name"
            value={data?.firstName}
          />
          <TextInputField
            readOnly
            hint="Middle Name"
            value={data?.middleName}
          />
          <TextInputField
            readOnly
            hint="Last Name"
            value={data?.lastName}
          />
          <span>Address</span>
          <TextInputField
            readOnly
            hint="No."
            value={data?.address?.no}
          />
          <TextInputField
            readOnly
            hint="Street"
            value={data?.address?.street}
          />
          <TextInputField
            readOnly
            hint="Barangay"
            value={data?.address?.barangay}
          />
          <TextInputField
            readOnly
            hint="City/Municipality"
            value={data?.address?.cityMunicipality}
          />
          <TextInputField
            readOnly
            hint="Province"
            value={data?.address?.province}
          />
          <TextInputField
            readOnly
            hint="Zip Code"
            value={data?.address?.zipCode}
          />
        </Pane>
        <Pane className="flex flex-col lg:min-w-[200px] justify-start whitespace-normal space-y-2">
          <span>Account Credentials</span>
          <TextInputField
            readOnly
            hint="Email address"
            value={data?.email}
          />
          <TextInputField
            readOnly
            hint="Contact Number"
            value={data?.contactNo}
          />
        </Pane>
      </Pane>
    </Pane>
  )
}