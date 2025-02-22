'use client';
import { FormButton } from "@/components/forms/button";
import LoadingComponent from "@/components/loading";
import { UserDocument, UserRoles } from "@/lib/models/interfaces";
import { Button, Paragraph, TextInputField } from "evergreen-ui";
import { useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

export default function ProfileSettingsForm({
  data,
  isEditing = false,
  onCancel= () => {},
  action = () => {},
  pending = false,
  state,
  ...props
} : {
  data: UserDocument|null,
  isEditing: boolean,
  onCancel?: () => void,
  action?: () => void,
  pending?: boolean,
  state: any
} & React.HTMLAttributes<HTMLFormElement>) {
  const [firstName, setFirstName] = useState<string|undefined>(data?.firstName)
  const [middleName, setMiddleName] = useState<string|undefined>(data?.middleName)
  const [lastName, setLastName] = useState<string|undefined>(data?.lastName)
  const [addressNo, setAddressNo] = useState<string|undefined>(data?.address?.no)
  const [addressStreet, setAddressStreet] = useState<string|undefined>(data?.address?.street)
  const [addressBarangay, setAddressBarangay] = useState<string|undefined>(data?.address?.barangay)
  const [addressCityMunicipality, setAddressCityMunicipality] = useState<string|undefined>(data?.address?.cityMunicipality)
  const [addressProvince, setAddressProvince] = useState<string|undefined>(data?.address?.province)
  const [addressZipCode, setAddressZipCode] = useState<string|undefined>(data?.address?.zipCode)
  const [govId, setGovId] = useState<string|undefined>(data?.govId?.no)
  const [govDateIssued, setGovDateIssued] = useState<Date|undefined>(data?.govId?.dateIssued ? new Date(data!.govId.dateIssued) : undefined)
  const [govPlaceIssued, setGovPlaceIssued] = useState<string|undefined>(data?.govId?.placeIssued)
  const [tin, setTin] = useState<string|undefined>(data?.tin)
  const [ctcNo, setCtcNo] = useState<string|undefined>(data?.ctc?.no)
  const [ctcDateIssued, setCTCDateIssued] = useState<Date|undefined>(data?.ctc?.dateIssued ? new Date(data!.ctc.dateIssued) : undefined)
  const [ctcPlaceIssued, setCTCPlaceIssued] = useState<string|undefined>(data?.ctc?.placeIssued)
  const [position, setPosition] = useState<string|undefined>(data?.position)

  const role = useMemo(() => data?.role, [data?.role])

  const { pending: isPending } = useFormStatus()

  useEffect(() => {
    if (!isEditing) {
      setFirstName(data?.firstName)
      setMiddleName(data?.middleName)
      setLastName(data?.lastName)
      setAddressNo(data?.address?.no)
      setAddressStreet(data?.address?.street)
      setAddressBarangay(data?.address?.barangay)
      setAddressCityMunicipality(data?.address?.cityMunicipality)
      setAddressProvince(data?.address?.province)
      setAddressZipCode(data?.address?.zipCode)
      setGovId(data?.govId?.no)
      setGovDateIssued(data?.govId?.dateIssued? new Date(data?.govId?.dateIssued) : undefined)
      setGovPlaceIssued(data?.govId?.placeIssued)
      setTin(data?.tin)
      setCtcNo(data?.ctc?.no)
      setCTCDateIssued(data?.ctc?.dateIssued? new Date(data?.ctc?.dateIssued) : undefined)
      setCTCPlaceIssued(data?.ctc?.placeIssued)
      setPosition(data?.position)
    }
  }, [isEditing, data])

  if (data === null) {
    return <LoadingComponent />
  }

  return (
    <form action={action} {...props}>
      <div>
        <Paragraph fontWeight="bold" color="green500" textTransform="uppercase">Profile Name</Paragraph>
        <hr className="mb-2" />
        { isEditing ? (
          <>
            <TextInputField
              required
              type="text"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(ev: any) => setFirstName(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              type="text"
              label="Middle Name"
              name="middleName"
              value={middleName}
              onChange={(ev: any) => setMiddleName(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required
              type="text"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(ev: any) => setLastName(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <Paragraph fontWeight="bold" color="green500" textTransform="uppercase" marginTop={4}>Address</Paragraph>
            <hr className="mb-2" />
            <TextInputField
              type="text"
              label="No."
              name="address.no"
              value={addressNo}
              onChange={(ev: any) => setAddressNo(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required
              type="text"
              label="Street"
              name="address.street"
              value={addressStreet}
              onChange={(ev: any) => setAddressStreet(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required
              type="text"
              label="Barangay"
              name="address.barangay"
              value={addressBarangay}
              onChange={(ev: any) => setAddressBarangay(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required
              type="text"
              label="City/Municipality"
              name="address.cityMunicipality"
              value={addressCityMunicipality}
              onChange={(ev: any) => setAddressCityMunicipality(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required
              type="text"
              label="Province"
              name="address.province"
              value={addressProvince}
              onChange={(ev: any) => setAddressProvince(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required
              type="tel"
              label="Zip Code"
              name="address.zipCode"
              minLength={4}
              maxLength={4}
              value={addressZipCode}
              onChange={(ev: any) => setAddressZipCode(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
          </>
        ) : (
          <>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">First Name:</label>
            <div className="pt-1 mb-2">{firstName}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Middle Name:</label>
            <div className="pt-1">{middleName}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Last Name:</label>
            <div className="pt-1 mb-2">{lastName}</div>
            <Paragraph fontWeight="bold" color="green500" textTransform="uppercase" marginTop={4}>Address</Paragraph>
            <hr className="mb-2" />
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">No.:</label>
            <div className="pt-1 mb-2">{addressNo}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Street:</label>
            <div className="pt-1 mb-2">{addressStreet}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Barangay:</label>
            <div className="pt-1 mb-2">{addressBarangay}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">City/Municipality:</label>
            <div className="pt-1 mb-2">{addressCityMunicipality}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Province:</label>
            <div className="pt-1 mb-2">{addressProvince}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Zip Code:</label>
            <div className="pt-1 mb-2">{addressZipCode}</div>
          </>
        )}
      </div>
      <div>
        {
          role !== UserRoles.User && (
            <>
              <Paragraph fontWeight="bold" color="green500" textTransform="uppercase">Position <span className="lowercase italic text-gray-500 text-xs font-normal">(title shown below your name)</span></Paragraph>
              <hr className="mb-2" />
              { isEditing ? (
                <TextInputField
                  type="text"
                  label="Position"
                  name="position"
                  value={position}
                  onChange={(ev: any) => setGovId(ev.target.value ? ev.target.value : undefined)}
                  readOnly={!isEditing || role === UserRoles.Admin}
                  disabled={pending || isPending}
                />
              ) : (
                <>
                  <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Position:</label>
                  <div className="pt-1 mb-2">{position || <span className="text-sm text-gray-400">N/A</span>}</div>
                </>
              )}
            </>
          )
        }
        <Paragraph fontWeight="bold" color="green500" textTransform="uppercase" marginTop={role !== UserRoles.User ? undefined : 4}>Government ID</Paragraph>
        <hr className="mb-2" />
        { isEditing ? (
          <>
            <TextInputField
              type="text"
              label="ID number"
              name="govId.no"
              value={!govId ? '' : govId}
              onInput={(ev: any) => {
                const value = ev.target.value;
                setGovId(value)
                if (!value) {
                  setGovDateIssued(undefined)
                  setGovPlaceIssued('')
                }
              }}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required={!!govId}
              type="date"
              label="Date Issued"
              name="govId.dateIssued"
              value={!govDateIssued ? '' : `${govDateIssued.toISOString().split('T')[0]}`}
              onChange={(ev: any) => setGovDateIssued(!!govId ? (!!ev.target.value ? new Date(ev.target.value) : undefined) : undefined)}
              readOnly={!isEditing}
              disabled={pending || isPending || !govId}
            />
            <TextInputField
              required={!!govId}
              type="text"
              label="Place Issued"
              name="govId.placeIssued"
              value={!govPlaceIssued ? '' : govPlaceIssued}
              onChange={(ev: any) => setGovPlaceIssued(!!govId ? (!!ev.target.value ? ev.target.value : '') : '')}
              readOnly={!isEditing || !govId}
              disabled={pending || isPending}
            />
            <TextInputField
              type="text"
              label="TIN"
              name="tin"
              value={!tin ? '' : tin}
              onChange={(ev: any) => setTin(ev.target.value)}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              type="text"
              label="CTC No."
              name="ctc.no"
              value={!ctcNo ? '' : ctcNo}
              onInput={(ev: any) => {
                const value = ev.target.value;
                setCtcNo(value)
                if (!value) {
                  setCTCDateIssued(undefined)
                  setCTCPlaceIssued('')
                }
              }}
              readOnly={!isEditing}
              disabled={pending || isPending}
            />
            <TextInputField
              required={!!ctcNo}
              type="date"
              label="CTC Date Issued"
              name="ctc.dateIssued"
              value={!ctcDateIssued ? '' : `${ctcDateIssued.toISOString().split('T')[0]}`}
              onChange={(ev: any) => setCTCDateIssued(!!ctcNo ? (!!ev.target.value ? new Date(ev.target.value) : undefined) : undefined)}
              readOnly={!isEditing}
              disabled={pending || isPending || !ctcNo}
            />
            <TextInputField
              required={!!ctcNo}
              type="text"
              label="CTC Place Issued"
              name="ctc.placeIssued"
              value={!ctcPlaceIssued ? '' : ctcPlaceIssued}
              onChange={(ev: any) => setCTCPlaceIssued(!!ctcNo ? (!!ev.target.value ? ev.target.value : '') : '')}
              readOnly={!isEditing || !ctcNo}
              disabled={pending || isPending}
            />
          </>
        ) : (
          <>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">ID number:</label>
            <div className="pt-1 mb-2">{govId || <span className="text-sm text-gray-400">N/A</span>}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Date Issued:</label>
            <div className="pt-1">{govDateIssued ? govDateIssued?.toDateString() : <span className="text-sm text-gray-400">N/A</span>}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">Place Issued:</label>
            <div className="pt-1 mb-2">{govPlaceIssued || <span className="text-sm text-gray-400">N/A</span>}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">TIN:</label>
            <div className="pt-1 mb-2">{tin || <span className="text-sm text-gray-400">N/A</span>}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">CTC No.:</label>
            <div className="pt-1 mb-2">{ctcNo || <span className="text-sm text-gray-400">N/A</span>}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">CTC Date Issued:</label>
            <div className="pt-1">{ctcDateIssued ? ctcDateIssued?.toDateString() : <span className="text-sm text-gray-400">N/A</span>}</div>
            <label className="font-[500] text-[#101840] text-[14px] ub-fnt-fam_b77syt">CTC Place Issued:</label>
            <div className="pt-1 mb-2">{ctcPlaceIssued || <span className="text-sm text-gray-400">N/A</span>}</div>
          </>
        )}
      </div>
      <div className="w-full flex justify-evenly md:col-span-2">
        <FormButton disabled={!isEditing} appearance="primary" intent="success" label="Update Profile" />
        <Button type="reset" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}