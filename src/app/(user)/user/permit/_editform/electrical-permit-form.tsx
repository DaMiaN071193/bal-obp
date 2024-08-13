'use client'

import SelectBarangay from "@/components/forms/select-barangay";
import { Barangay } from "@/lib/barangays";
import { ElectricalScopeOfWork, UserDocument, UserRoles } from "@/lib/models/interfaces";
import { Checkbox, Label, SelectField, TextInputField, toaster } from "evergreen-ui";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ElectricalPermitEditForm({ data: draftData, isElectricalPermitOnly }: { data: any; isElectricalPermitOnly: boolean; }) {
  const [user, setUser] = useState<UserDocument|undefined>()
  const userFullName = useMemo(() => user?.firstName.toUpperCase() + ' ' + (!!user?.middleName ? user?.middleName[0].toUpperCase() + '. ' : '') + user?.lastName.toUpperCase(), [user])
  const userFullAddress = useMemo(() => user?.address?.no + ' ' + user?.address?.street + ', ' + user?.address?.barangay + ', ' + user?.address?.cityMunicipality, [user])
  const userCTC = useMemo(() => ({ no: user?.ctc?.no, dateIssued: !!user?.ctc?.dateIssued ? user?.ctc?.dateIssued?.toString().substring(0, 10) : '', placeIssued: user?.ctc?.placeIssued }), [user])
  const [formOfOwnership, setFormOfOwnership] = useState<string|undefined>(draftData?.formOfOwnership)
  const [lotNo, setLotNo] = useState<string|undefined>(draftData?.locationOfConstruction?.lotNo)
  const [blkNo, setBlkNo] = useState<string|undefined>(draftData?.locationOfConstruction?.blkNo)
  const [tctNo, setTCTNo] = useState<string|undefined>(draftData?.locationOfConstruction?.tctNo)
  const [taxDecNo, setTaxDecNo] = useState<string|undefined>(draftData?.locationOfConstruction?.taxDecNo)
  const [street, setStreet] = useState<string|undefined>(draftData?.locationOfConstruction?.street)
  const barangay = useMemo(() => (draftData?.locationOfConstruction?.barangay) || Barangay.Aclan, [draftData])
  const [scopeOfWork, setScopeOfWork] = useState<ElectricalScopeOfWork|string|undefined>(draftData?.electricalPermit?.box1?.scopeOfWork?.name)
  const [scopeOfWorkSpecify, setScopeOfWorkSpecify] = useState<string|undefined>(draftData?.electricalPermit?.box1?.scopeOfWork?.specify)
  const [useOrCharacterOfOccupancy, setUseOrCharacterOfOccupancy] = useState<string|undefined>(draftData?.electricalPermit?.box1?.useOrCharacterOfOccupancy)
  const [electricalEngineer, setElectricalEngineer] = useState<string|undefined>(draftData?.electricalPermit?.box2?.electricalEngineer)
  const [elecAddress, setElecAddress] = useState<string|undefined>(draftData?.electricalPermit?.box2?.address)
  const [elecPRCNo, setElecPRCNo] = useState<string|undefined>(draftData?.electricalPermit?.box2?.prcNo)
  const [elecPTRNo, setElecPTRNo] = useState<string|undefined>(draftData?.electricalPermit?.box2?.ptrNo)
  const [elecValidity, setElecValidity] = useState<string|undefined>(draftData?.electricalPermit?.box2?.validity?.toString().substring(0, 10))
  const [elecDateIssued, setElecDateIssued] = useState<string|undefined>(draftData?.electricalPermit?.box2?.dateIssued?.toString().substring(0, 10))
  const [elecIssuedAt, setElecIssuedAt] = useState<string|undefined>(draftData?.electricalPermit?.box2?.issuedAt)
  const [elecTin, setElecTin] = useState<string|undefined>(draftData?.electricalPermit?.box2?.tin)
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
  const [lotOwnerAuthorizedRepresentative, setLotOwnerAuthorizedRepresentative] = useState<string|undefined>(draftData?.representative?.lotOwnerAuthorizedRepresentative)
  const [loarAddress, setLoarAddress] = useState<string|undefined>(draftData?.representative?.address)
  const [loarCtcNo, setLoarCtcNo] = useState<string|undefined>(draftData?.representative?.ctc?.no)
  const [loarDateIssued, setLoarDateIssued] = useState<string|undefined>(draftData?.representative?.ctc?.dateIssued)
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
              readOnly={!useNotMyBuildingOwner}
              required
            />
            <TextInputField
              label="Address"
              name="buildingOwner.address"
              value={!useNotMyBuildingOwner ? userFullAddress : customBuildingOwner?.address || ''}
              onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, address: event.target.value?.toUpperCase()})}
              readOnly={!useNotMyBuildingOwner}
              required
            />
            <TextInputField
              label="C.T.C. No."
              name="buildingOwner.ctcNo"
              value={!useNotMyBuildingOwner ? userCTC.no || '' : customBuildingOwner?.ctcNo || ''}
              onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, ctcNo: event.target.value?.toUpperCase() })}
              readOnly={!useNotMyBuildingOwner}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="buildingOwner.dateIssued"
                value={!useNotMyBuildingOwner ? userCTC.dateIssued || '' : customBuildingOwner?.dateIssued || ''}
                onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, dateIssued: event.target.value?.toUpperCase() })}
                readOnly={!useNotMyBuildingOwner}
                required
              />
              <TextInputField
                label="Place Issued"
                name="buildingOwner.placeIssued"
                value={!useNotMyBuildingOwner ? userCTC.placeIssued || '' : customBuildingOwner?.placeIssued || ''}
                onChange={(event: any) => setCustomBuildingOwner({...customBuildingOwner, placeIssued: event.target.value?.toUpperCase() })}
                readOnly={!useNotMyBuildingOwner}
                required
              />
            </div>
            <Checkbox
              label={<span className="text-[3.8mm] text-green-700 italic font-bold font-sans">Have Lot Owner / Authorized Representative?</span>}
              size={16}
              checked={useRepresentative}
              onChange={e => setUseRepresentative(e.target.checked)}
              disabled={!isElectricalPermitOnly}
            />
            { useRepresentative && (<>
              <h2  className="border-b mb-2 font-bold text-center text-green-800">
                LOT OWNER / AUTHORIZED REPRESENTATIVE
              </h2>
              <TextInputField
                label="Full Name of Representative"
                name="representative.lotOwnerFullName"
                value={lotOwnerAuthorizedRepresentative}
                onChange={(event: any) => setLotOwnerAuthorizedRepresentative(event.target.value?.toUpperCase())}
                required={useRepresentative}
                readOnly={!isElectricalPermitOnly}
              />
              <TextInputField
                label="Address"
                name="representative.address"
                value={loarAddress || ''}
                onChange={(event: any) => setLoarAddress(event.target.value?.toUpperCase())}
                required={useRepresentative}
                readOnly={!isElectricalPermitOnly}
              />
              <TextInputField
                label="C.T.C. No."
                name="representative.ctc.no"
                value={loarCtcNo || ''}
                onChange={(event: any) => setLoarCtcNo(event.target.value?.toUpperCase())}
                required={useRepresentative}
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInputField
                  type="date"
                  label="Date Issued"
                  name="representative.ctc.dateIssued"
                  value={loarDateIssued || ''}
                  onChange={(event: any) => setLoarDateIssued(event.target.value?.toUpperCase())}
                  required={useRepresentative}
                />
                <TextInputField
                  label="Place Issued"
                  name="representative.ctc.placeIssued"
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
              readOnly={!isElectricalPermitOnly}
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
                readOnly={!isElectricalPermitOnly}
              />
              <TextInputField
                label="Blk No."
                name="locationOfConstruction.blkNo"
                value={blkNo || ''}
                onChange={(event: any) => setBlkNo(event.target.value?.toUpperCase())}
                readOnly={!isElectricalPermitOnly}
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
                readOnly={!isElectricalPermitOnly}
              />
              <TextInputField
                label="Current Tax Dec. No."
                name="locationOfConstruction.taxDecNo"
                value={taxDecNo || ''}
                onChange={(event: any) => setTaxDecNo(event.target.value?.toUpperCase())}
                required={!!taxDecNo ? true : !tctNo && !taxDecNo}
                readOnly={!isElectricalPermitOnly}
              />
            </div>
            <TextInputField
              label="Street"
              name="locationOfConstruction.street"
              value={street || ''}
              onChange={(event: any) => setStreet(event.target.value?.toUpperCase())}
              readOnly={!isElectricalPermitOnly}
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
              readOnly={!isElectricalPermitOnly}
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
              value={scopeOfWork || ''}
              onChange={event => setScopeOfWork(event.target.value)}
              name="box1.scopeOfWork.name"
              required
            >
              <option value=""></option>
              {Object.entries(ElectricalScopeOfWork).map(([key, value]) => (
                <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
              ))}
            </SelectField>
            { scopeOfWork === ElectricalScopeOfWork.Others && (
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
              DESIGN PROFESSIONAL, PLANS AND SPECIFICATION
            </h2>
            <TextInputField
              label="Full Name of Professional Electrical Engineer"
              name="box2.electricalEngineer"
              value={electricalEngineer || ''}
              onChange={(event: any) => setElectricalEngineer(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="box2.address"
              value={elecAddress || ''}
              onChange={(event: any) => setElecAddress(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="box2.prcNo"
              value={elecPRCNo || ''}
              onChange={(event: any) => setElecPRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="box2.ptrNo"
              value={elecPTRNo || ''}
              onChange={(event: any) => setElecPTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="box2.validity"
              value={elecValidity || ''}
              onChange={(event: any) => setElecValidity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="box2.dateIssued"
                value={elecDateIssued || ''}
                onChange={(event: any) => setElecDateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="box2.issuedAt"
                value={elecIssuedAt || ''}
                onChange={(event: any) => setElecIssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="box2.tin"
              value={elecTin || ''}
              onChange={(event: any) => setElecTin(event.target.value?.toUpperCase())}
            />
          </div>
        </div>
      </div>
    </div>
  )
}