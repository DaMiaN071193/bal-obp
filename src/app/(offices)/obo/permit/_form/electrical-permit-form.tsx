'use client'

import SelectBarangay from "@/components/forms/select-barangay";
import { Barangay } from "@/lib/barangays";
import { ApplicationDocument, ElectricalScopeOfWork, ElectricalSupervisorTypeOfProfession, TypeOfPermit, UserDocument } from "@/lib/models/interfaces";
import { Checkbox, Label, SelectField, TextInputField } from "evergreen-ui";
import { useCallback, useMemo, useState } from "react";

interface BuildingOwnerProp {
  buildingOwnerFullName?: string
  address?: string,
  ctcNo?: string
  dateIssued?: string
  placeIssued?: string
}

export default function ElectricalPermitForm({ data }: { data?: ApplicationDocument }) {
  const user = useMemo(() => (data?.user as UserDocument), [data])
  const userFullName = useMemo(() => user?.firstName.toUpperCase() + ' ' + (!!user?.middleName ? user?.middleName[0].toUpperCase() + '. ' : '') + user?.lastName.toUpperCase(), [user])
  const userFullAddress = useMemo(() => user?.address?.no + ' ' + user?.address?.street + ', ' + user?.address?.barangay + ', ' + user?.address?.cityMunicipality, [user])
  const userCTC = useMemo(() => ({ no: user?.ctc?.no, dateIssued: !!user?.ctc?.dateIssued ? user?.ctc?.dateIssued?.toString().substring(0, 10) : '', placeIssued: user?.ctc?.placeIssued }), [user])
  const typeOfPermit = useMemo(() => data?.typeOfPermit, [data])
  const [epNo, setEpNo] = useState<string|undefined>(data?.electricalPermit?.epNo)
  const [buildingPermitNo, setBuildingPermitNo] = useState<string|undefined>(data?.electricalPermit?.buildingPermitNo)
  const [formOfOwnership, setFormOfOwnership] = useState<string|undefined>(data?.formOfOwnership)
  const [lotNo, setLotNo] = useState<string|undefined>(data?.locationOfConstruction?.lotNo)
  const [blkNo, setBlkNo] = useState<string|undefined>(data?.locationOfConstruction?.blkNo)
  const [tctNo, setTCTNo] = useState<string|undefined>(data?.locationOfConstruction?.tctNo)
  const [taxDecNo, setTaxDecNo] = useState<string|undefined>(data?.locationOfConstruction?.taxDecNo)
  const [street, setStreet] = useState<string|undefined>(data?.locationOfConstruction?.street)
  const barangay = useMemo(() => (data?.locationOfConstruction?.barangay) || Barangay.Aclan, [data])
  const [useOrCharacterOfOccupancy, setUseOrCharacterOfOccupancy] = useState<string|undefined>(data?.electricalPermit?.box1?.useOrCharacterOfOccupancy)
  const [scopeOfWork, setScopeOfWork] = useState<ElectricalScopeOfWork|string|undefined>(data?.electricalPermit?.box1?.scopeOfWork?.name)
  const [scopeOfWorkSpecify, setScopeOfWorkSpecify] = useState<string|undefined>(data?.electricalPermit?.box1?.scopeOfWork?.specify)
  const [totalConnectedLoad, setTotalConnectedLoad] = useState<string|number|undefined>(data?.electricalPermit?.box1?.totalConnectedLoad)
  const [totalTransformerCapacity, setTotalTransformerCapacity] = useState<string|number|undefined>(data?.electricalPermit?.box1?.totalTransformerCapacity)
  const [totalGeneratorUPSCapacity, setTotalGeneratorUPSCapacity] = useState<string|number|undefined>(data?.electricalPermit?.box1?.totalGeneratorUPSCapacity)
  const [electricalEngineer, setElectricalEngineer] = useState<string|undefined>(data?.electricalPermit?.box2?.electricalEngineer)
  const [elecAddress, setElecAddress] = useState<string|undefined>(data?.electricalPermit?.box2?.address)
  const [elecPRCNo, setElecPRCNo] = useState<string|undefined>(data?.electricalPermit?.box2?.prcNo)
  const [elecPTRNo, setElecPTRNo] = useState<string|undefined>(data?.electricalPermit?.box2?.ptrNo)
  const [elecValidity, setElecValidity] = useState<string|undefined>(data?.electricalPermit?.box2?.validity?.toString().substring(0, 10))
  const [elecDateIssued, setElecDateIssued] = useState<string|undefined>(data?.electricalPermit?.box2?.dateIssued?.toString().substring(0, 10))
  const [elecIssuedAt, setElecIssuedAt] = useState<string|undefined>(data?.electricalPermit?.box2?.issuedAt)
  const [elecTin, setElecTin] = useState<string|undefined>(data?.electricalPermit?.box2?.tin)
  const [useNotMyBuildingOwner, setUseNotMyBuildingOwner] = useState<boolean>(!(userFullName === data?.buildingOwner?.buildingOwnerFullName && user?.ctc?.no === data?.buildingOwner?.ctcNo))
  const getOriginalBuildingOwner = useCallback(() => !!data?.buildingOwner ? ({
    ...data.buildingOwner,
    dateIssued: data.buildingOwner?.dateIssued?.toString().substring(0, 10)
  }) : undefined, [data])
  const [customBuildingOwner, setCustomBuildingOwner] = useState<BuildingOwnerProp|undefined>(getOriginalBuildingOwner())
  const useRepresentative = useMemo(() => !!data?.representative?.lotOwnerAuthorizedRepresentative, [data])
  const lotOwnerAuthorizedRepresentative = useMemo(() => data?.representative?.lotOwnerAuthorizedRepresentative, [data])
  const loarAddress = useMemo(() => data?.representative?.address, [data])
  const loarCtcNo = useMemo(() => data?.representative?.ctc?.no, [data])
  const loarDateIssued = useMemo(() => data?.representative?.ctc?.dateIssued?.toString().substring(0, 10), [data])
  const loarPlaceIssued = useMemo(() => data?.representative?.ctc?.placeIssued, [data])
  const [supervisorTypeOfProfession, setSupervisorTypeOfProfession] = useState<ElectricalSupervisorTypeOfProfession|string|undefined>(data?.electricalPermit?.box3?.supervisorTypeOfProfession)
  const [supervisorFullName, setSupervisorFullName] = useState<string|undefined>(data?.electricalPermit?.box3?.supervisorFullName)
  const [supervisorPRCNo, setSupervisorPRCNo] = useState<string|undefined>(data?.electricalPermit?.box3?.prcNo)
  const [supervisorPTRNo, setSupervisorPTRNo] = useState<string|undefined>(data?.electricalPermit?.box3?.ptrNo)
  const [supervisorValidity, setSupervisorValidity] = useState<string|undefined>(data?.electricalPermit?.box3?.validity?.toString().substring(0, 10))
  const [supervisorDateIssued, setSupervisorDateIssued] = useState<string|undefined>(data?.electricalPermit?.box3?.dateIssued?.toString().substring(0, 10))
  const [supervisorIssuedAt, setSupervisorIssuedAt] = useState<string|undefined>(data?.electricalPermit?.box3?.issuedAt)
  const [supervisorTin, setSupervisorTin] = useState<string|undefined>(data?.electricalPermit?.box3?.tin)
  const [supervisorAddress, setSupervisorAddress] = useState<string|undefined>(data?.electricalPermit?.box3?.address)

  return (
    <div className="rounded-lg pb-4 mx-auto bg-white/40 p-3">
      <div className="text-center font-bold text-[16pt] leading-none mb-2">ELECTRICAL PERMIT</div>
      <h4 className="italic text-xs my-2">Fill in required (*) fields:</h4>
      <div className="flex justify-between">
        <div>
          <Label>APPLICATION NO.</Label>
          <div className="tracking-wider text-lg">{data?.applicationNo}</div>
        </div>
        <TextInputField
          label="EP NO."
          name="electricalPermit.epNo"
          value={epNo}
          maxLength={8}
          onChange={(ev: any) => setEpNo(ev.target.value?.toUpperCase())}
          required
        />
        <TextInputField
          label="BUILDING PERMIT NO."
          name="electricalPermit.buildingPermitNo"
          value={buildingPermitNo}
          maxLength={8}
          onChange={(ev: any) => setBuildingPermitNo(ev.target.value?.toUpperCase())}
          required
        />
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
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              BUILDING OWNER
            </h2>
            <Checkbox
              label={<span className="text-[3.8mm] text-green-700 italic font-bold font-sans">Applicant is not the Building Owner?</span>}
              size={16}
              checked={useNotMyBuildingOwner}
              name="useNotMyBuildingOwner"
              value="yes"
              onChange={e => setUseNotMyBuildingOwner(() => {
                const value = e.target.checked;
                if (value) {
                  setCustomBuildingOwner(getOriginalBuildingOwner())
                } else {
                  setCustomBuildingOwner(!!data?.buildingOwner ? ({
                    buildingOwnerFullName: userFullName,
                    address: userFullAddress,
                    ctcNo: data.buildingOwner?.ctcNo || '',
                    dateIssued: data.buildingOwner?.dateIssued?.toString().substring(0, 10) || '',
                    placeIssued: data.buildingOwner?.placeIssued || '',
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
            { useRepresentative && (<>
              <h2  className="border-b mb-2 font-bold text-center text-green-800">
                LOT OWNER / AUTHORIZED REPRESENTATIVE
              </h2>
              <TextInputField
                label="Full Name of Representative"
                value={lotOwnerAuthorizedRepresentative}
                required={useRepresentative}
                readOnly
              />
              <TextInputField
                label="Address"
                value={loarAddress || ''}
                required={useRepresentative}
                readOnly
              />
              <TextInputField
                label="C.T.C. No."
                value={loarCtcNo || ''}
                readOnly
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInputField
                  type="date"
                  label="Date Issued"
                  value={loarDateIssued || ''}
                  readOnly
                />
                <TextInputField
                  label="Place Issued"
                  value={loarPlaceIssued || ''}
                  readOnly
                />
              </div>
            </>)}
          </div>
          <div className="w-full px-4 py-4 mb-4 border-2 shadow border-gray-200 bg-lime-50 rounded-md md:mr-2">
            { typeOfPermit === TypeOfPermit.ElectricalPermitOnly && (<>
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
            </>)}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              USE OR CHARACTER OF OCCUPANCY
            </h2>
            <TextInputField
              label="Use or Character of Occupancy"
              name="electricalPermit.box1.useOrCharacterOfOccupancy"
              value={useOrCharacterOfOccupancy || ''}
              onChange={(event: any) => setUseOrCharacterOfOccupancy(event.target.value?.toUpperCase())}
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SCOPE OF WORK
            </h2>
            <SelectField
              label="Select Scope of Work"
              value={scopeOfWork || ''}
              onChange={event => setScopeOfWork(event.target.value)}
              name="electricalPermit.box1.scopeOfWork.name"
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
                name="electricalPermit.box1.scopeOfWork.specify"
                value={scopeOfWorkSpecify || ''}
                onChange={(event: any) => setScopeOfWorkSpecify(event.target.value?.toUpperCase())}
                required
              />
            )}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SUMMARY OF ELECTRICAL LOAD/CAPACITIES APPLIED FOR
            </h2>
            <TextInputField
              type="number"
              label="Total Connected Load (kVA)"
              name="electricalPermit.box1.totalConnectedLoad"
              value={totalConnectedLoad || ''}
              onChange={(event: any) => setTotalConnectedLoad(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="number"
              label="Total Transformer Capacity (kVA)"
              name="electricalPermit.box1.totalTransformerCapacity"
              value={totalTransformerCapacity || ''}
              onChange={(event: any) => setTotalTransformerCapacity(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="number"
              label="Total Generator/UPS Capacity (kVA)"
              name="electricalPermit.box1.totalGeneratorUPSCapacity"
              value={totalGeneratorUPSCapacity || ''}
              onChange={(event: any) => setTotalGeneratorUPSCapacity(event.target.value?.toUpperCase())}
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              DESIGN PROFESSIONAL, PLANS AND SPECIFICATION
            </h2>
            <TextInputField
              label="Full Name of Professional Electrical Engineer"
              name="electricalPermit.box2.electricalEngineer"
              value={electricalEngineer || ''}
              onChange={(event: any) => setElectricalEngineer(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="electricalPermit.box2.address"
              value={elecAddress || ''}
              onChange={(event: any) => setElecAddress(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="electricalPermit.box2.prcNo"
              value={elecPRCNo || ''}
              onChange={(event: any) => setElecPRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="electricalPermit.box2.ptrNo"
              value={elecPTRNo || ''}
              onChange={(event: any) => setElecPTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="electricalPermit.box2.validity"
              value={elecValidity || ''}
              onChange={(event: any) => setElecValidity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="electricalPermit.box2.dateIssued"
                value={elecDateIssued || ''}
                onChange={(event: any) => setElecDateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="electricalPermit.box2.issuedAt"
                value={elecIssuedAt || ''}
                onChange={(event: any) => setElecIssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="electricalPermit.box2.tin"
              value={elecTin || ''}
              onChange={(event: any) => setElecTin(event.target.value?.toUpperCase())}
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SUPERVISOR / IN-CHARGE OF ELECTRICAL WORKS
            </h2>
            <SelectField
              label="Select Type of Profession"
              value={supervisorTypeOfProfession || ''}
              onChange={event => setSupervisorTypeOfProfession(event.target.value)}
              name="electricalPermit.box3.supervisorTypeOfProfession"
            >
              {Object.entries(ElectricalSupervisorTypeOfProfession).map(([key, value]) => (
                <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
              ))}
            </SelectField>
            { !!supervisorTypeOfProfession && (<>
              <TextInputField
                label="Full Name of Professional Electrical Engineer"
                name="electricalPermit.box3.supervisorFullName"
                value={supervisorFullName || ''}
                onChange={(event: any) => setSupervisorFullName(event.target.value?.toUpperCase())}
              />
              <TextInputField
                label="Address"
                name="electricalPermit.box3.address"
                value={supervisorAddress || ''}
                onChange={(event: any) => setSupervisorAddress(event.target.value?.toUpperCase())}
              />
              <TextInputField
                label="PRC No."
                name="electricalPermit.box3.prcNo"
                value={supervisorPRCNo || ''}
                onChange={(event: any) => setSupervisorPRCNo(event.target.value?.toUpperCase())}
              />
              <TextInputField
                label="PTR No."
                name="electricalPermit.box3.ptrNo"
                value={supervisorPTRNo || ''}
                onChange={(event: any) => setSupervisorPTRNo(event.target.value?.toUpperCase())}
              />
              <TextInputField
                type="date"
                label="Validity"
                name="electricalPermit.box3.validity"
                value={supervisorValidity || ''}
                onChange={(event: any) => setSupervisorValidity(event.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInputField
                  type="date"
                  label="Date Issued"
                  name="electricalPermit.box3.dateIssued"
                  value={supervisorDateIssued || ''}
                  onChange={(event: any) => setSupervisorDateIssued(event.target.value)}
                />
                <TextInputField
                  label="Issued At"
                  name="electricalPermit.box3.issuedAt"
                  value={supervisorIssuedAt || ''}
                  onChange={(event: any) => setSupervisorIssuedAt(event.target.value?.toUpperCase())}
                />
              </div>
              <TextInputField
                label="TIN"
                name="electricalPermit.box3.tin"
                value={supervisorTin || ''}
                onChange={(event: any) => setSupervisorTin(event.target.value?.toUpperCase())}
              />
            </>)}
          </div>
        </div>
      </div>
    </div>
  )
}