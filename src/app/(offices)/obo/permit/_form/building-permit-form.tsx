'use client';
import SelectBarangay from "@/components/forms/select-barangay";
import { Barangay } from "@/lib/barangays";
import {
  ApplicationDocument,
  BuildingPermitType,
  BuildingScopeOfWork,
  cooGroup,
  UserDocument,
} from "@/lib/models/interfaces";
import { Button, Group, Label, SelectField, TextInput, TextInputField } from "evergreen-ui";
import { useMemo, useState } from "react";

interface Box1Prop {
  occupancyClassified?: number
  numberOfUnits?: number
  numberOfStorey?: number
  totalFloorArea?: number
  lotArea?: number
  totalEstimatedCost?: number
  building?: string
  electrical?: string
  mechanical?: string
  electronics?: string
  plumbing?: string
  costOfEquipmentInstalled?: number[]
  proposedDateOfConstruction?: Date|string
  expectedDateOfCompletion?: Date|string
}

// interface Box6Prop {
//   zoningAdministrator: {
//     locationalZoningOfLand: BuildingPermitProcessingAndEvaluationColumns
//   }
//   obo: {
//     filinGFee: BuildingPermitProcessingAndEvaluationColumns
//     lineAndGrace: BuildingPermitProcessingAndEvaluationColumns
//     fencing: BuildingPermitProcessingAndEvaluationColumns
//     architectural: BuildingPermitProcessingAndEvaluationColumns
//     civilStructural: BuildingPermitProcessingAndEvaluationColumns
//     electrical: BuildingPermitProcessingAndEvaluationColumns
//     mechanical: BuildingPermitProcessingAndEvaluationColumns
//     sanitary: BuildingPermitProcessingAndEvaluationColumns
//     plumbing: BuildingPermitProcessingAndEvaluationColumns
//     electronics: BuildingPermitProcessingAndEvaluationColumns
//     interior: BuildingPermitProcessingAndEvaluationColumns
//     surcharges: BuildingPermitProcessingAndEvaluationColumns
//     penalties: BuildingPermitProcessingAndEvaluationColumns
//   }
//   bfp: {
//     fireCodeConstructionTax: BuildingPermitProcessingAndEvaluationColumns
//     hotWorks: BuildingPermitProcessingAndEvaluationColumns
//   }
// }

export default function BuildingPermitForm({ data }: { data?: ApplicationDocument }) {
  const [permitType, setPermitType] = useState<BuildingPermitType|string|undefined>(data?.buildingPermit?.permitType)
  const [areaNo, setAreaNo] = useState<string|undefined>(data?.buildingPermit?.areaNo)
  const [formOfOwnership, setFormOfOwnership] = useState<BuildingPermitType|string|undefined>(data?.formOfOwnership)
  const [lotNo, setLotNo] = useState<string|undefined>(data?.locationOfConstruction?.lotNo)
  const [blkNo, setBlkNo] = useState<string|undefined>(data?.locationOfConstruction?.blkNo)
  const [tctNo, setTCTNo] = useState<string|undefined>(data?.locationOfConstruction?.tctNo)
  const [taxDecNo, setTaxDecNo] = useState<string|undefined>(data?.locationOfConstruction?.taxDecNo)
  const [street, setStreet] = useState<string|undefined>(data?.locationOfConstruction?.street)
  const barangay = useMemo(() => data?.locationOfConstruction?.barangay || Barangay.Aclan, [data])
  const [scopeOfWork, setScopeOfWork] = useState<BuildingScopeOfWork|string|undefined>(data?.buildingPermit?.box1?.scopeOfWork?.name)
  const [scopeOfWorkSpecify, setScopeOfWorkSpecify] = useState<string|undefined>(data?.buildingPermit?.box1?.scopeOfWork?.specify)
  const [characterOfOccupancy, setCharacterOfOccupancy] = useState<string|undefined>(data?.buildingPermit?.box1?.characterOfOccupancy?.name)
  const characterOfOccupancyValue = useMemo(() => Object.entries(cooGroup).find(([k, v]) => v.name === characterOfOccupancy)?.[0] || '', [characterOfOccupancy])
  const [characterOfOccupancyGroup, setCharacterOfOccupancyGroup] = useState<string|undefined>(data?.buildingPermit?.box1?.characterOfOccupancy?.group)
  const [characterOfOccupancySpecify, setCharacterOfOccupancySpecify] = useState<string|undefined>(data?.buildingPermit?.box1?.characterOfOccupancy?.specify)
  const [architectCivilEngineer, setArchitectCivilEngineer] = useState<string|undefined>(data?.buildingPermit?.box2?.architectCivilEngineer)
  const [arcAddress, setArcAddress] = useState<string|undefined>(data?.buildingPermit?.box2?.address)
  const [arcPRCNo, setArcPRCNo] = useState<string|undefined>(data?.buildingPermit?.box2?.prcNo)
  const [arcPTRNo, setArcPTRNo] = useState<string|undefined>(data?.buildingPermit?.box2?.ptrNo)
  const [arcValidity, setArcValidity] = useState<string|undefined>(data?.buildingPermit?.box2?.validity?.toString().substring(0, 10))
  const [arcDateIssued, setArcDateIssued] = useState<string|undefined>(data?.buildingPermit?.box2?.dateIssued?.toString().substring(0, 10))
  const [arcIssuedAt, setArcIssuedAt] = useState<string|undefined>(data?.buildingPermit?.box2?.issuedAt)
  const [arcTin, setArcTin] = useState<string|undefined>(data?.buildingPermit?.box2?.tin)
  const useRepresentative = useMemo(() => !!data?.representative?.lotOwnerAuthorizedRepresentative, [data])
  const lotOwnerAuthorizedRepresentative = useMemo(() => data?.representative?.lotOwnerAuthorizedRepresentative, [data])
  const loarAddress = useMemo(() => data?.representative?.address, [data])
  const loarGovId = useMemo(() => data?.representative?.govId?.no, [data])
  const loarDateIssued = useMemo(() => data?.representative?.govId?.dateIssued?.toString().substring(0, 10), [data])
  const loarPlaceIssued = useMemo(() => data?.representative?.govId?.placeIssued, [data])
  const [box1, setBox1] = useState<Box1Prop | undefined>(data?.buildingPermit?.box1 as Box1Prop)
  // const [box6, setBox6] = useState<Box6Prop | undefined>(data?.buildingPermit?.box6)
  const user = useMemo(() => (data?.user as UserDocument), [data])

  return (
    <div className="rounded mx-auto">
      <div className="text-center font-bold text-[16pt] leading-none">UNIFIED APPLICATION FORM FOR BUILDING PERMIT</div>
      <div className="text-center font-bold text-[16pt] mb-2">AND FIRE SAFETY EVALUATION CLEARANCE</div>
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
      <div className="flex justify-between">
        <div>
          <Label>APPLICATION NO.</Label>
          <div className="tracking-wider text-lg">{data?.applicationNo}</div>
        </div>
        <TextInputField
          label="AREA NO."
          name="buildingPermit.areaNo"
          value={areaNo}
          maxLength={10}
          onChange={(ev: any) => setAreaNo(ev.target.value?.toUpperCase())}
          required
        />
      </div>
      <div className="mx-auto pb-4">
        <div className="flex flex-col md:flex-row md:justify-evenly md:gap-x-4">
          <div className="w-full px-4 pt-4 mb-4 border shadow border-gray-200 bg-lime-50 rounded-md md:ml-2">
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              OWNER / APPLICANT
            </h2>
            <TextInputField
              label="Last Name"
              value={user?.lastName?.toUpperCase() || ''}
              readOnly
            />
            <TextInputField
              label="First Name"
              value={user?.firstName.toUpperCase() || ''}
              readOnly
            />
            <TextInputField
              label="M.I."
              value={user?.middleName ? user.middleName[0] + '.' : ''}
              readOnly
            />
            <TextInputField
              label="TIN"
              value={user?.tin?.toUpperCase() || 'N/A'}
              readOnly
            />
            <TextInputField
              label="Government Issued ID No."
              value={user?.govId?.no?.toUpperCase() || 'N/A'}
              readOnly
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type={!user?.govId?.dateIssued ? "text" : "date"}
                label="Date Issued"
                value={user?.govId?.dateIssued ? user.govId.dateIssued.toString().substring(0, 10) : 'N/A'}
                readOnly
              />
              <TextInputField
                label="Place Issued"
                value={user?.govId?.placeIssued?.toUpperCase() || 'N/A'}
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
                readOnly
              />
              <TextInputField
                label="House No."
                value={user?.address.no?.toUpperCase() || ''}
                readOnly
              />
              <TextInputField
                label="Street"
                value={user?.address.street?.toUpperCase() || ''}
                readOnly
              />
            </div>
            <div className="mb-2">
              <TextInputField
                label="Barangay"
                value={user?.address.barangay?.toUpperCase() || ''}
                readOnly
              />
            </div>
            <div className="mb-2">
              <TextInputField
                label="City / Municipality"
                value={user?.address.cityMunicipality?.toUpperCase() || ''}
                readOnly
              />
            </div>
            <div className="mb-2">
              <TextInputField
                label="Contact No."
                value={user?.contactNo || ''}
                readOnly
              />
            </div>
            { useRepresentative && (<>
              <h2 className="border-b mb-2 font-bold text-center text-red-700">
                LOT OWNER / AUTHORIZED REPRESENTATIVE
              </h2>
              <TextInputField
                label="Full Name of Representative"
                value={lotOwnerAuthorizedRepresentative}
                readOnly
              />
              <TextInputField
                label="Address"
                value={loarAddress || ''}
                readOnly
              />
              <TextInputField
                label="Government Issued ID No."
                value={loarGovId || ''}
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
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              ARCHITECT OR CIVIL ENGINEER
            </h2>
            <TextInputField
              label="Full Name of Architect or Civil Engineer"
              name="buildingPermit.box2.architectCivilEngineer"
              value={architectCivilEngineer || ''}
              onChange={(event: any) => setArchitectCivilEngineer(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="buildingPermit.box2.address"
              value={arcAddress || ''}
              onChange={(event: any) => setArcAddress(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="buildingPermit.box2.prcNo"
              value={arcPRCNo || ''}
              onChange={(event: any) => setArcPRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="buildingPermit.box2.ptrNo"
              value={arcPTRNo || ''}
              onChange={(event: any) => setArcPTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="buildingPermit.box2.validity"
              value={arcValidity || ''}
              onChange={(event: any) => setArcValidity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="buildingPermit.box2.dateIssued"
                value={arcDateIssued || ''}
                onChange={(event: any) => setArcDateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="buildingPermit.box2.issuedAt"
                value={arcIssuedAt || ''}
                onChange={(event: any) => setArcIssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="buildingPermit.box2.tin"
              value={arcTin || ''}
              onChange={(event: any) => setArcTin(event.target.value?.toUpperCase())}
            />
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
              name="buildingPermit.box1.scopeOfWork.name"
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
                name="buildingPermit.box1.scopeOfWork.specify"
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
              name="buildingPermit.box1.characterOfOccupancy.name"
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
                name="buildingPermit.box1.characterOfOccupancy.group"
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
                name="buildingPermit.box1.characterOfOccupancy.specify"
                value={characterOfOccupancySpecify || ''}
                onChange={(event: any) => setCharacterOfOccupancySpecify(event.target.value?.toUpperCase())}
              />
            )}
            {/* Classification of Occupancy */}
            <h2  className="border-b mb-2 font-bold text-center text-green-800"></h2>
            <TextInputField
              type="number"
              label="Occupancy Classified"
              name="buildingPermit.box1.occupancyClassified"
              value={box1?.occupancyClassified || ''}
              onChange={(event: any) => setBox1({...box1, occupancyClassified: event.target.value?.toUpperCase() })}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="number"
                label="Number of Units"
                name="buildingPermit.box1.numberOfUnits"
                value={box1?.numberOfUnits || ''}
                onChange={(event: any) => setBox1({...box1, numberOfUnits: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                type="number"
                label="Number of Storey"
                name="buildingPermit.box1.numberOfStorey"
                value={box1?.numberOfStorey || ''}
                onChange={(event: any) => setBox1({...box1, numberOfStorey: event.target.value?.toUpperCase() })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="number"
                label="Total Floor Area (SQ. M.)"
                name="buildingPermit.box1.totalFloorArea"
                value={box1?.totalFloorArea || ''}
                onChange={(event: any) => setBox1({...box1, totalFloorArea: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                type="number"
                label="Lot Area (SQ. M.)"
                name="buildingPermit.box1.lotArea"
                value={box1?.lotArea || ''}
                onChange={(event: any) => setBox1({...box1, lotArea: event.target.value?.toUpperCase() })}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <TextInputField
                label="Building"
                name="buildingPermit.box1.building"
                value={box1?.building || ''}
                onChange={(event: any) => setBox1({...box1, building: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                label="Electrical"
                name="buildingPermit.box1.electrical"
                value={box1?.electrical || ''}
                onChange={(event: any) => setBox1({...box1, electrical: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                label="Mechanical"
                name="buildingPermit.box1.mechanical"
                value={box1?.mechanical || ''}
                onChange={(event: any) => setBox1({...box1, mechanical: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                label="Electronics"
                name="buildingPermit.box1.electronics"
                value={box1?.electronics || ''}
                onChange={(event: any) => setBox1({...box1, electronics: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                label="Plumbing"
                name="buildingPermit.box1.plumbing"
                value={box1?.plumbing || ''}
                onChange={(event: any) => setBox1({...box1, plumbing: event.target.value?.toUpperCase() })}
              />
            </div>
            <h2 className="mb-2 font-bold text-center text-sm">COST OF EQUIPMENT INSTALLED</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Group>
                <Button type="button" disabled cursor="text"><span className="text-black/80">&#8369;</span></Button>
                <TextInput
                  type="number"
                  name="buildingPermit.box1.costOfEquipmentInstalled.0"
                  value={box1?.costOfEquipmentInstalled?.[0] || ''}
                  onChange={(event: any) => setBox1({
                    ...box1,
                    costOfEquipmentInstalled: !!box1?.costOfEquipmentInstalled
                      ? [
                          event.target.value?.toUpperCase(),
                          box1.costOfEquipmentInstalled[1],
                          box1.costOfEquipmentInstalled[2],
                          box1.costOfEquipmentInstalled[3],
                        ]
                      : [event.target.value?.toUpperCase(), 0, 0, 0]
                  })}
                  width="100%"
                />
              </Group>
              <Group>
                <Button type="button" disabled cursor="text"><span className="text-black/80">&#8369;</span></Button>
                <TextInput
                  type="number"
                  name="buildingPermit.box1.costOfEquipmentInstalled.1"
                  value={box1?.costOfEquipmentInstalled?.[1] || ''}
                  onChange={(event: any) => setBox1({
                    ...box1,
                    costOfEquipmentInstalled: !!box1?.costOfEquipmentInstalled
                      ? [
                          box1.costOfEquipmentInstalled[0],
                          event.target.value?.toUpperCase(),
                          box1.costOfEquipmentInstalled[2],
                          box1.costOfEquipmentInstalled[3],
                        ]
                      : [0, event.target.value?.toUpperCase(), 0, 0]
                  })}
                  width="100%"
                />
              </Group>
              <Group>
                <Button type="button" disabled cursor="text"><span className="text-black/80">&#8369;</span></Button>
                <TextInput
                  type="number"
                  name="buildingPermit.box1.costOfEquipmentInstalled.2"
                  value={box1?.costOfEquipmentInstalled?.[2] || ''}
                  onChange={(event: any) => setBox1({
                    ...box1,
                    costOfEquipmentInstalled: !!box1?.costOfEquipmentInstalled
                        ? [
                          box1.costOfEquipmentInstalled[0],
                          box1.costOfEquipmentInstalled[1],
                          event.target.value?.toUpperCase(),
                          box1.costOfEquipmentInstalled[3],
                        ]
                      : [0, 0, event.target.value?.toUpperCase(), 0]
                  })}
                  width="100%"
                />
              </Group>
              <Group>
                <Button type="button" disabled cursor="text"><span className="text-black/80">&#8369;</span></Button>
                <TextInput
                  type="number"
                  name="buildingPermit.box1.costOfEquipmentInstalled.3"
                  value={box1?.costOfEquipmentInstalled?.[3] || ''}
                  onChange={(event: any) => setBox1({
                    ...box1,
                    costOfEquipmentInstalled: !!box1?.costOfEquipmentInstalled
                      ? [
                          box1.costOfEquipmentInstalled[0],
                          box1.costOfEquipmentInstalled[1],
                          box1.costOfEquipmentInstalled[2],
                          event.target.value?.toUpperCase()
                        ]
                      : [0, 0, 0, event.target.value?.toUpperCase()]
                  })}
                  width="100%"
                />
              </Group>
            </div>
            <TextInputField
              type="number"
              label={<>Total Estimated Cost: &#8369;</>}
              name="buildingPermit.box1.totalEstimatedCost"
              value={box1?.totalEstimatedCost || ''}
              onChange={(event: any) => setBox1({...box1, totalEstimatedCost: event.target.value?.toUpperCase() })}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Proposed Date of Construction"
                name="buildingPermit.box1.proposedDateOfConstruction"
                value={box1?.proposedDateOfConstruction?.toString()?.substring(0, 10) || ''}
                onChange={(event: any) => setBox1({...box1, proposedDateOfConstruction: event.target.value?.toUpperCase() })}
              />
              <TextInputField
                type="date"
                label="Expected Date of Completion"
                name="buildingPermit.box1.expectedDateOfCompletion"
                value={box1?.expectedDateOfCompletion?.toString()?.substring(0, 10) || ''}
                onChange={(event: any) => setBox1({...box1, expectedDateOfCompletion: event.target.value?.toUpperCase() })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}