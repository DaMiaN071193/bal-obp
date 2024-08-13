'use client'

import SelectBarangay from "@/components/forms/select-barangay";
import { Barangay } from "@/lib/barangays";
import { SanitaryScopeOfWork, UserDocument, UserRoles } from "@/lib/models/interfaces";
import { Checkbox, Label, SelectField, TextInputField, toaster } from "evergreen-ui";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function SanitaryPermitEditForm({ data: draftData, hasElectricalPermit }: { data: any; hasElectricalPermit: boolean; }) {
  const [user, setUser] = useState<UserDocument|undefined>()
  const userFullName = useMemo(() => user?.firstName.toUpperCase() + ' ' + (!!user?.middleName ? user?.middleName[0].toUpperCase() + '. ' : '') + user?.lastName.toUpperCase(), [user])
  const userFullAddress = useMemo(() => user?.address?.no + ' ' + user?.address?.street + ', ' + user?.address?.barangay + ', ' + user?.address?.cityMunicipality, [user])
  const userCTC = useMemo(() => ({ no: user?.ctc?.no, dateIssued: !!user?.ctc?.dateIssued ? user?.ctc?.dateIssued?.toString().substring(0, 10) : '', placeIssued: user?.ctc?.placeIssued }), [user])
  const formOfOwnership = useMemo(() => draftData?.formOfOwnership || '', [draftData])
  const lotNo = useMemo(() => draftData?.locationOfConstruction?.lotNo, [draftData])
  const blkNo = useMemo(() => draftData?.locationOfConstruction?.blkNo, [draftData])
  const tctNo = useMemo(() => draftData?.locationOfConstruction?.tctNo, [draftData])
  const taxDecNo = useMemo(() => draftData?.locationOfConstruction?.taxDecNo, [draftData])
  const street = useMemo(() => draftData?.locationOfConstruction?.street, [draftData])
  const barangay = useMemo(() => (draftData?.locationOfConstruction?.barangay) || Barangay.Aclan, [draftData])
  const [scopeOfWork, setScopeOfWork] = useState<SanitaryScopeOfWork|string|undefined>(hasElectricalPermit ? draftData?.electricalPermit?.box1?.scopeOfWork?.name : draftData?.sanitaryPermit?.box1?.scopeOfWork?.name)
  const [scopeOfWorkSpecify, setScopeOfWorkSpecify] = useState<string|undefined>(hasElectricalPermit ? draftData?.electricalPermit?.box1?.scopeOfWork?.specify : draftData?.sanitaryPermit?.box1?.scopeOfWork?.specify)
  const [useOrCharacterOfOccupancy, setUseOrCharacterOfOccupancy] = useState<string|undefined>(hasElectricalPermit ? draftData?.electricalPermit?.box1?.useOrCharacterOfOccupancy : draftData?.sanitaryPermit?.box1?.useOrCharacterOfOccupancy)
  const [sanitaryEngineer1, setSanitaryEngineer1] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.sanitaryEngineer)
  const [se1Address, setSe1Address] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.address)
  const [se1PRCNo, setSe1PRCNo] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.prcNo)
  const [se1PTRNo, setSe1PTRNo] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.ptrNo)
  const [se1Validity, setSe1Validity] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.validity?.toString().substring(0, 10))
  const [se1DateIssued, setSe1DateIssued] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.dateIssued?.toString().substring(0, 10))
  const [se1IssuedAt, setSe1IssuedAt] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.issuedAt)
  const [se1Tin, setSe1Tin] = useState<string|undefined>(draftData?.sanitaryPermit?.box3?.tin)
  // const [sanitaryEngineer2, setSanitaryEngineer2] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.sanitaryEngineer)
  // const [se2Address, setSe2Address] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.address)
  // const [se2PRCNo, setSe2PRCNo] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.prcNo)
  // const [se2PTRNo, setSe2PTRNo] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.ptrNo)
  // const [se2Validity, setSe2Validity] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.validity?.toString().substring(0, 10))
  // const [se2DateIssued, setSe2DateIssued] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.dateIssued?.toString().substring(0, 10))
  // const [se2IssuedAt, setSe2IssuedAt] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.issuedAt)
  // const [se2Tin, setSe2Tin] = useState<string|undefined>(draftData?.sanitaryPermit?.box4?.tin)
  const [useNotMyBuildingOwner, setUseNotMyBuildingOwner] = useState<boolean>(!!draftData?.useNotMyBuildingOwner)
  const getOriginalBuildingOwner = useCallback(() => !!draftData?.buildingOwner ? ({
    ...draftData.buildingOwner,
    dateIssued: draftData.buildingOwner?.dateIssued?.toString().substring(0, 10)
  }) : undefined, [draftData])
  const [customBuildingOwner, setCustomBuildingOwner] = useState<{
    buildingOwnerFullName?: string
    address?: string
    ctcNo?: string
    dateIssued?: string
    placeIssued?: string
  }|undefined>(getOriginalBuildingOwner())
  const [useRepresentative, setUseRepresentative] = useState<boolean>(!!draftData?.representative?.lotOwnerAuthorizedRepresentative)
  const lotOwnerAuthorizedRepresentative = useMemo(() => draftData?.representative?.lotOwnerAuthorizedRepresentative, [draftData])
  const loarAddress = useMemo(() => draftData?.representative?.address, [draftData])
  const [loarCtcNo, setLoarCtcNo] = useState<string|undefined>(draftData?.representative?.ctc?.no)
  const [loarDateIssued, setLoarDateIssued] = useState<string|undefined>(draftData?.representative?.ctc?.dateIssued?.toString().substring(0, 10))
  const [loarPlaceIssued, setLoarPlaceIssued] = useState<string|undefined>(draftData?.representative?.ctc?.placeIssued)

  useEffect(() => {
    const url = new URL('/' + UserRoles.User + '/api/profile', window.location.origin)
    url.searchParams.append('role', UserRoles.User)
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => setUser(data))
      .catch((e) => toaster.danger('An error occurred:'+ e.message))
  }, [])

  return (
    <div className="rounded-lg pb-4 mx-auto bg-white/40 p-3">
      <div className="text-center font-bold text-[16pt] leading-none">ELECTRICAL PERMIT</div>
      <h4 className="italic text-xs my-2">Fill in required (*) fields:</h4>
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
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              BUILDING OWNER
            </h2>
            <Checkbox
              label={<span className="text-[3.8mm] text-green-700 italic font-bold font-sans">You are not the Building Owner?</span>}
              size={16}
              checked={useNotMyBuildingOwner}
              name="useNotMyBuildingOwner"
              value="yes"
              disabled={hasElectricalPermit}
              onChange={e => setUseNotMyBuildingOwner(() => {
                const value = e.target.checked;
                if (value) {
                  setCustomBuildingOwner(getOriginalBuildingOwner());
                } else {
                  setCustomBuildingOwner(!!draftData?.buildingOwner ? ({
                    buildingOwnerFullName: userFullName,
                    address: userFullAddress,
                    ctcNo: draftData.buildingOwner?.ctcNo || '',
                    dateIssued: draftData.buildingOwner?.dateIssued?.toString().substring(0, 10) || '',
                    placeIssued: draftData.buildingOwner?.placeIssued || '',
                  }) : undefined);
                }
                return value
              })}
            />
            <TextInputField
              label="Full Name of Building Owner"
              name="buildingOwner.buildingOwnerFullName"
              value={!useNotMyBuildingOwner ? userFullName : customBuildingOwner?.buildingOwnerFullName || ''}
              onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, buildingOwnerFullName: event.target.value?.toUpperCase()})}
              readOnly={hasElectricalPermit || !useNotMyBuildingOwner}
              required
            />
            <TextInputField
              label="Address"
              name="buildingOwner.address"
              value={!useNotMyBuildingOwner ? userFullAddress : customBuildingOwner?.address || ''}
              onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, address: event.target.value?.toUpperCase()})}
              readOnly={hasElectricalPermit || !useNotMyBuildingOwner}
              required
            />
            <TextInputField
              label="C.T.C. No."
              name="buildingOwner.ctcNo"
              value={!useNotMyBuildingOwner ? userCTC.no || '' : customBuildingOwner?.ctcNo || ''}
              onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, ctcNo: event.target.value?.toUpperCase() })}
              readOnly={hasElectricalPermit || !useNotMyBuildingOwner}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="buildingOwner.dateIssued"
                value={!useNotMyBuildingOwner ? userCTC.dateIssued || '' : customBuildingOwner?.dateIssued || ''}
                onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, dateIssued: event.target.value?.toUpperCase() })}
                readOnly={hasElectricalPermit || !useNotMyBuildingOwner}
                required
              />
              <TextInputField
                label="Place Issued"
                name="buildingOwner.placeIssued"
                value={!useNotMyBuildingOwner ? userCTC.placeIssued || '' : customBuildingOwner?.placeIssued || ''}
                onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, placeIssued: event.target.value?.toUpperCase() })}
                readOnly={hasElectricalPermit || !useNotMyBuildingOwner}
                required
              />
            </div>
            { useRepresentative && (<>
              <h2  className="border-b mb-2 font-bold text-center text-green-800">
                LOT OWNER / AUTHORIZED REPRESENTATIVE
              </h2>
              <TextInputField
                label="Full Name of Representative"
                name="representative.lotOwnerFullName"
                value={lotOwnerAuthorizedRepresentative}
                required={useRepresentative}
                readOnly
              />
              <TextInputField
                label="Address"
                name="representative.address"
                value={loarAddress}
                required={useRepresentative}
                readOnly
              />
              <TextInputField
                label="C.T.C. No."
                name="representative.ctc.no"
                value={loarCtcNo || ''}
                onChange={(event: any) => setLoarCtcNo(event.target.value?.toUpperCase())}
                required={useRepresentative}
                readOnly={hasElectricalPermit}
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInputField
                  type="date"
                  label="Date Issued"
                  name="representative.ctc.dateIssued"
                  value={loarDateIssued || ''}
                  onChange={(event: any) => setLoarDateIssued(event.target.value?.toUpperCase())}
                  required={useRepresentative}
                  readOnly={hasElectricalPermit}
                />
                <TextInputField
                  label="Place Issued"
                  name="representative.ctc.placeIssued"
                  value={loarPlaceIssued || ''}
                  onChange={(event: any) => setLoarPlaceIssued(event.target.value?.toUpperCase())}
                  required={useRepresentative}
                  readOnly={hasElectricalPermit}
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
              readOnly
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              LOCATION OF CONSTRUCTION
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                label="Lot No."
                value={lotNo || ''}
                readOnly
              />
              <TextInputField
                label="Blk No."
                value={blkNo || ''}
                readOnly
              />
            </div>
            <span className="italic text-red-400 text-xs font-sans">Required at lease on field *</span>
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                label="TCT No."
                value={tctNo || ''}
                readOnly
              />
              <TextInputField
                label="Current Tax Dec. No."
                value={taxDecNo || ''}
                readOnly
              />
            </div>
            <TextInputField
              label="Street"
              value={street || ''}
              readOnly
            />
            <Label>
              Barangay *
            </Label>
            <SelectBarangay
              title="Barangay"
              defaultValue={barangay as Barangay|undefined || Barangay.Aclan}
              buttonProps={{
                width: '100%',
                marginTop: 8,
                marginBottom: 16,
                borderColor: 'slate-600',
                textTransform: 'uppercase'
              }}
              readOnly
            />
            <TextInputField
              label="Municipality of"
              value="NASIPIT"
              readOnly
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SCOPE OF WORK
            </h2>
            <SelectField
              label="Select Scope of Work"
              value={scopeOfWork || ''}
              onChange={event => setScopeOfWork(event.target.value)}
              name="box1.scopeOfWork.name"
              required
            >
              <option value=""></option>
              {Object.entries(SanitaryScopeOfWork).map(([key, value]) => (
                <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
              ))}
            </SelectField>
            { !([SanitaryScopeOfWork.NewConstruction, SanitaryScopeOfWork.Erection,
              SanitaryScopeOfWork.Addition, SanitaryScopeOfWork.Alteration].includes(scopeOfWork as SanitaryScopeOfWork)) && (
              <TextInputField
                label="Specify"
                name="box1.scopeOfWork.specify"
                value={scopeOfWorkSpecify || ''}
                onChange={(event: any) => setScopeOfWorkSpecify(event.target.value?.toUpperCase())}
                required
              />
            )}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              USE OR CHARACTER OF OCCUPANCY
            </h2>
            <TextInputField
              label="Use or Character of Occupancy"
              name="box1.useOrCharacterOfOccupancy"
              value={useOrCharacterOfOccupancy || ''}
              onChange={(event: any) => setUseOrCharacterOfOccupancy(event.target.value?.toUpperCase())}
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              DESIGN PROFESSIONAL, PLANS AND SPECIFICATIONS
            </h2>
            <TextInputField
              label="Full Name of Sanitary Engineer"
              name="box3.sanitaryEngineer"
              value={sanitaryEngineer1 || ''}
              onChange={(event: any) => setSanitaryEngineer1(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="box3.address"
              value={se1Address || ''}
              onChange={(event: any) => setSe1Address(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="box3.prcNo"
              value={se1PRCNo || ''}
              onChange={(event: any) => setSe1PRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="box3.ptrNo"
              value={se1PTRNo || ''}
              onChange={(event: any) => setSe1PTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="box3.validity"
              value={se1Validity || ''}
              onChange={(event: any) => setSe1Validity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="box3.dateIssued"
                value={se1DateIssued || ''}
                onChange={(event: any) => setSe1DateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="box3.issuedAt"
                value={se1IssuedAt || ''}
                onChange={(event: any) => setSe1IssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="box3.tin"
              value={se1Tin || ''}
              onChange={(event: any) => setSe1Tin(event.target.value?.toUpperCase())}
            />
            {/* <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SUPERVISOR / IN-CHARGE OF SANITARY WORKS
            </h2>
            <TextInputField
              label="Full Name of Sanitary Engineer"
              name="box4.sanitaryEngineer"
              value={sanitaryEngineer2 || ''}
              onChange={(event: any) => setSanitaryEngineer2(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="box4.address"
              value={se2Address || ''}
              onChange={(event: any) => setSe2Address(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="box4.prcNo"
              value={se2PRCNo || ''}
              onChange={(event: any) => setSe2PRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="box4.ptrNo"
              value={se2PTRNo || ''}
              onChange={(event: any) => setSe2PTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="box4.validity"
              value={se2Validity || ''}
              onChange={(event: any) => setSe2Validity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="box4.dateIssued"
                value={se2DateIssued || ''}
                onChange={(event: any) => setSe2DateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="box4.issuedAt"
                value={se2IssuedAt || ''}
                onChange={(event: any) => setSe2IssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="box4.tin"
              value={se2Tin || ''}
              onChange={(event: any) => setSe2Tin(event.target.value?.toUpperCase())}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}