'use client';;
import SelectBarangay from "@/components/forms/select-barangay";
import { Barangay } from "@/lib/barangays";
import { BuildingPermitType, BuildingScopeOfWork, cooGroup, UserDocument, UserRoles } from "@/lib/models/interfaces";
import { Checkbox, Label, SelectField, TextInputField, toaster } from "evergreen-ui";
import { useEffect, useMemo, useState } from "react";


export default function BuildingPermitEditForm({ data: draftData }: { data: any; }) {
  const [user, setUser] = useState<UserDocument|undefined>()
  const [permitType, setPermitType] = useState<BuildingPermitType|string|undefined>(draftData?.buildingPermit?.permitType)
  const [formOfOwnership, setFormOfOwnership] = useState<BuildingPermitType|string|undefined>(draftData?.formOfOwnership)
  const [lotNo, setLotNo] = useState<string|undefined>(draftData?.locationOfConstruction?.lotNo)
  const [blkNo, setBlkNo] = useState<string|undefined>(draftData?.locationOfConstruction?.blkNo)
  const [tctNo, setTCTNo] = useState<string|undefined>(draftData?.locationOfConstruction?.tctNo)
  const [taxDecNo, setTaxDecNo] = useState<string|undefined>(draftData?.locationOfConstruction?.taxDecNo)
  const [street, setStreet] = useState<string|undefined>(draftData?.locationOfConstruction?.street)
  const barangay = useMemo(() => draftData?.locationOfConstruction?.barangay || Barangay.Aclan, [draftData])
  const [scopeOfWork, setScopeOfWork] = useState<BuildingScopeOfWork|string|undefined>(draftData?.buildingPermit?.box1?.scopeOfWork?.name)
  const [scopeOfWorkSpecify, setScopeOfWorkSpecify] = useState<string|undefined>(draftData?.buildingPermit?.box1?.scopeOfWork?.specify)
  const [characterOfOccupancy, setCharacterOfOccupancy] = useState<string>(draftData?.buildingPermit?.box1?.characterOfOccupancy?.name)
  const characterOfOccupancyValue = useMemo(() => Object.entries(cooGroup).find(([k, v]) => v.name === characterOfOccupancy)?.[0] || '', [characterOfOccupancy])
  const [characterOfOccupancyGroup, setCharacterOfOccupancyGroup] = useState<string>(draftData?.buildingPermit?.box1?.characterOfOccupancy?.group)
  const [characterOfOccupancySpecify, setCharacterOfOccupancySpecify] = useState<string>(draftData?.buildingPermit?.box1?.characterOfOccupancy?.specify)
  const [architectCivilEngineer, setArchitectCivilEngineer] = useState<string|undefined>(draftData?.buildingPermit?.box2?.architectCivilEngineer)
  const [arcAddress, setArcAddress] = useState<string|undefined>(draftData?.buildingPermit?.box2?.address)
  const [arcPRCNo, setArcPRCNo] = useState<string|undefined>(draftData?.buildingPermit?.box2?.prcNo)
  const [arcPTRNo, setArcPTRNo] = useState<string|undefined>(draftData?.buildingPermit?.box2?.ptrNo)
  const [arcValidity, setArcValidity] = useState<string|undefined>(draftData?.buildingPermit?.box2?.validity)
  const [arcDateIssued, setArcDateIssued] = useState<string|undefined>(draftData?.buildingPermit?.box2?.dateIssued)
  const [arcIssuedAt, setArcIssuedAt] = useState<string|undefined>(draftData?.buildingPermit?.box2?.issuedAt)
  const [arcTin, setArcTin] = useState<string|undefined>(draftData?.buildingPermit?.box2?.tin)
  const [useRepresentative, setUseRepresentative] = useState<boolean>(!!draftData?.representative?.lotOwnerAuthorizedRepresentative)
  const [lotOwnerAuthorizedRepresentative, setLotOwnerAuthorizedRepresentative] = useState<string|undefined>(draftData?.representative?.lotOwnerAuthorizedRepresentative)
  const [loarAddress, setLoarAddress] = useState<string|undefined>(draftData?.representative?.address)
  const [loarGovId, setLoarGovId] = useState<string|undefined>(draftData?.representative?.govId?.no)
  const [loarDateIssued, setLoarDateIssued] = useState<string|undefined>(draftData?.representative?.govId?.dateIssued)
  const [loarPlaceIssued, setLoarPlaceIssued] = useState<string|undefined>(draftData?.representative?.govId?.placeIssued)

  useEffect(() => {
    const url = new URL('/' + UserRoles.User + '/api/profile', window.location.origin)
    url.searchParams.append('role', UserRoles.User)
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => setUser(data))
      .catch((e) => toaster.danger('An error occurred:'+ e.message))
  }, [])

  return (
    <div className="rounded pb-4 mx-auto">
      <div className="text-center font-bold text-[16pt] leading-none">UNIFIED APPLICATION FORM FOR BUILDING PERMIT</div>
      <div className="text-center font-bold text-[16pt]">AND FIRE SAFETY EVALUATION CLEARANCE</div>
      <h4 className="italic text-xs my-2">Fill in required (*) fields:</h4>
      <div className="text-center font-bold text-[12pt] text-green-900 border-x border-x-lime-500 border-t border-t-lime-500 rounded-t rounded-x">Select Permit Type *:</div>
      <div className="text-center text-[10pt] mb-2 shadow font-bold rounded-x rounded-b border-x border-b border-x-lime-500 border-b-lime-500 pb-1">
        <label className="mr-5 space-x-2 square-radio">
          <input type="radio" name="permitType" value={BuildingPermitType.New} checked={permitType === BuildingPermitType.New} onChange={(ev: any) => setPermitType(ev.target.value)} required />
          <span>NEW</span>
        </label>
        <label className="mr-5 space-x-2 square-radio">
          <input type="radio" name="permitType" value={BuildingPermitType.Renewal} checked={permitType === BuildingPermitType.Renewal} onChange={(ev: any) => setPermitType(ev.target.value)} required/>
          <span>RENEW</span>
        </label>
        <label className="space-x-2 square-radio">
          <input type="radio" name="permitType" value={BuildingPermitType.Amendatory} checked={permitType === BuildingPermitType.Amendatory} onChange={(ev: any) => setPermitType(ev.target.value)} required />
          <span>AMENDATORY</span>
        </label>
      </div>
      <div className="mx-auto py-4">
        <div className="flex flex-col md:flex-row md:justify-evenly md:gap-x-4">
          <div className="w-full px-4 pt-4 mb-4 border shadow border-gray-200 bg-lime-50 rounded-md md:ml-2">
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              OWNER / APPLICANT
            </h2>
            <TextInputField
              label="Last Name"
              value={user?.lastName?.toUpperCase() || ''}
              disabled
              readOnly
            />
            <TextInputField
              label="First Name"
              value={user?.firstName.toUpperCase() || ''}
              disabled
              readOnly
            />
            <TextInputField
              label="M.I."
              value={user?.middleName ? user.middleName[0] + '.' : ''}
              disabled
              readOnly
            />
            <TextInputField
              label="TIN"
              value={user?.tin?.toUpperCase() || 'N/A'}
              disabled
              readOnly
            />
            <TextInputField
              label="Government Issued ID No."
              value={user?.govId?.no?.toUpperCase() || 'N/A'}
              disabled
              readOnly
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type={!user?.govId?.dateIssued ? "text" : "date"}
                label="Date Issued"
                value={user?.govId?.dateIssued ? user.govId.dateIssued.toString().substring(0, 10) : 'N/A'}
                disabled
                readOnly
              />
              <TextInputField
                label="Place Issued"
                value={user?.govId?.placeIssued?.toUpperCase() || 'N/A'}
                disabled
                readOnly
              />
            </div>
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              ADDRESS
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <TextInputField
                label="Zip Code"
                value={user?.address.zipCode || ''}
                disabled
                readOnly
              />
              <TextInputField
                label="House No."
                value={user?.address.no?.toUpperCase() || ''}
                disabled
                readOnly
              />
              <TextInputField
                label="Street"
                value={user?.address.street?.toUpperCase() || ''}
                disabled
                readOnly
              />
            </div>
            <div className="mb-2">
              <TextInputField
                label="Barangay"
                value={user?.address.barangay?.toUpperCase() || ''}
                disabled
                readOnly
              />
            </div>
            <div className="mb-2">
              <TextInputField
                label="City / Municipality"
                value={user?.address.cityMunicipality?.toUpperCase() || ''}
                disabled
                readOnly
              />
            </div>
            <div className="mb-2">
              <TextInputField
                label="Contact No."
                value={user?.contactNo || ''}
                disabled
                readOnly
              />
            </div>
            <Checkbox
              label={<span className="text-[3.8mm] text-green-700 italic font-bold font-sans">Have Lot Owner / Authorized Representative?</span>}
              size={16}
              checked={useRepresentative}
              onChange={e => setUseRepresentative(e.target.checked)}
            />
            { useRepresentative && (<>
              <h2  className="border-b mb-2 font-bold text-center text-green-800">
                LOT OWNER / AUTHORIZED REPRESENTATIVE
              </h2>
              <TextInputField
                label="Full Name of Representative"
                name="representative.lotOwnerAuthorizedRepresentative"
                value={lotOwnerAuthorizedRepresentative}
                onChange={(event: any) => setLotOwnerAuthorizedRepresentative(event.target.value?.toUpperCase())}
                required={useRepresentative}
              />
              <TextInputField
                label="Address"
                name="representative.address"
                value={loarAddress || ''}
                onChange={(event: any) => setLoarAddress(event.target.value?.toUpperCase())}
                required={useRepresentative}
              />
              <TextInputField
                label="Government Issued ID No."
                name="representative.govId.no"
                value={loarGovId || ''}
                onChange={(event: any) => setLoarGovId(event.target.value?.toUpperCase())}
                required={useRepresentative}
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInputField
                  type="date"
                  label="Date Issued"
                  name="representative.govId.dateIssued"
                  value={loarDateIssued || ''}
                  onChange={(event: any) => setLoarDateIssued(event.target.value?.toUpperCase())}
                  required={useRepresentative}
                />
                <TextInputField
                  label="Place Issued"
                  name="representative.govId.placeIssued"
                  value={loarPlaceIssued || ''}
                  onChange={(event: any) => setLoarPlaceIssued(event.target.value?.toUpperCase())}
                  required={useRepresentative}
                />
              </div>
            </>)}
          </div>
          <div className="w-full px-4 py-4 mb-4 border-2 shadow border-gray-200 bg-lime-50 rounded-md md:mr-2">
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              CONSTRUCTION OWNED BY AN ENTERPRISE
            </h2>
            <TextInputField
              label="Form of Ownership"
              name="formOfOwnership"
              value={formOfOwnership || ''}
              onChange={(event: any) => setFormOfOwnership(event.target.value?.toUpperCase())}
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              LOCATION OF CONSTRUCTION
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                label="Lot No."
                name="locationOfConstruction.lotNo"
                value={lotNo || ''}
                onChange={(event: any) => setLotNo(event.target.value?.toUpperCase())}
              />
              <TextInputField
                label="Blk No."
                name="locationOfConstruction.blkNo"
                value={blkNo || ''}
                onChange={(event: any) => setBlkNo(event.target.value?.toUpperCase())}
              />
            </div>
            <span className="italic text-red-400 text-xs font-sans">Required at lease on field *</span>
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                label="TCT No."
                name="locationOfConstruction.tctNo"
                value={tctNo || ''}
                onChange={(event: any) => setTCTNo(event.target.value?.toUpperCase())}
                required={!!tctNo ? true : !tctNo && !taxDecNo}
              />
              <TextInputField
                label="Current Tax Dec. No."
                name="locationOfConstruction.taxDecNo"
                value={taxDecNo || ''}
                onChange={(event: any) => setTaxDecNo(event.target.value?.toUpperCase())}
                required={!!taxDecNo ? true : !tctNo && !taxDecNo}
              />
            </div>
            <TextInputField
              label="Street"
              name="locationOfConstruction.street"
              value={street || ''}
              onChange={(event: any) => setStreet(event.target.value?.toUpperCase())}
              required
            />
            <Label>
              Barangay *
            </Label>
            <SelectBarangay
              title="Barangay"
              name="locationOfConstruction.barangay"
              defaultValue={barangay as Barangay|undefined || Barangay.Aclan}
              buttonProps={{
                width: '100%',
                marginTop: 8,
                marginBottom: 16,
                borderColor: 'slate-600',
                textTransform: 'uppercase'
              }}
              required
            />
            <TextInputField
              label="Municipality of"
              name="locationOfConstruction.cityMunicipality"
              value="NASIPIT"
              readOnly
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SCOPE OF WORK
            </h2>
            <SelectField
              label="Select Scope of Work"
              value={scopeOfWork}
              onChange={event => setScopeOfWork(event.target.value)}
              name="box1.scopeOfWork.name"
              required
            >
              <option value=""></option>
              {Object.entries(BuildingScopeOfWork).map(([key, value]) => (
                <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
              ))}
            </SelectField>
            {!(!scopeOfWork || scopeOfWork === BuildingScopeOfWork.NewConstruction) && (
              <TextInputField
                label="Specify"
                name="box1.scopeOfWork.specify"
                value={scopeOfWorkSpecify || ''}
                onChange={(event: any) => setScopeOfWorkSpecify(event.target.value?.toUpperCase())}
                required={scopeOfWork === BuildingScopeOfWork.Others}
              />
            )}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              USE OR CHARACTER OF OCCUPANCY
            </h2>
            <SelectField
              label="Select CHARACTER OF OCCUPANCY GROUP"
              value={characterOfOccupancy}
              onChange={event => { setCharacterOfOccupancy(event.target.value); setCharacterOfOccupancyGroup(''); }}
              name="box1.characterOfOccupancy.name"
            >
              <option value=""></option>
              {Object.entries(cooGroup).map(([key, obj]) => (
                <option key={key} value={obj.name} className="uppercase">{key.substring(0, 5).toUpperCase()} {key.substring(5).toUpperCase()} - {obj.name.toUpperCase()}</option>
              ))}
            </SelectField>
            {!!characterOfOccupancy && (
              <SelectField
                label="CHARACTER OF OCCUPANCY"
                value={characterOfOccupancyGroup}
                onChange={event => setCharacterOfOccupancyGroup(event.target.value)}
                name="box1.characterOfOccupancy.group"
              >
                <option value=""></option>
                {(cooGroup as any)?.[characterOfOccupancyValue]?.group.map(([key, value]: [key: string, value: string]) => (
                  <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
                ))}
              </SelectField>
            )}
            {!!characterOfOccupancy && characterOfOccupancyGroup === 'others' && (
              <TextInputField
                label="Specify"
                name="box1.characterOfOccupancy.specify"
                value={characterOfOccupancySpecify || ''}
                onChange={(event: any) => setCharacterOfOccupancySpecify(event.target.value?.toUpperCase())}
              />
            )}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              ARCHITECT OR CIVIL ENGINEER
            </h2>
            <TextInputField
              label="Full Name of Architect or Civil Engineer"
              name="box2.architectCivilEngineer"
              value={architectCivilEngineer || ''}
              onChange={(event: any) => setArchitectCivilEngineer(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="box2.address"
              value={arcAddress || ''}
              onChange={(event: any) => setArcAddress(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="box2.prcNo"
              value={arcPRCNo || ''}
              onChange={(event: any) => setArcPRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="box2.ptrNo"
              value={arcPTRNo || ''}
              onChange={(event: any) => setArcPTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="box2.validity"
              value={arcValidity || ''}
              onChange={(event: any) => setArcValidity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="box2.dateIssued"
                value={arcDateIssued || ''}
                onChange={(event: any) => setArcDateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="box2.issuedAt"
                value={arcIssuedAt || ''}
                onChange={(event: any) => setArcIssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="box2.tin"
              value={arcTin || ''}
              onChange={(event: any) => setArcTin(event.target.value?.toUpperCase())}
            />
          </div>
        </div>
      </div>
    </div>
  )
}