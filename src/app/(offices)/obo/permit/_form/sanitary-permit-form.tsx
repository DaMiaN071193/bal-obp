'use client';;
import { ApplicationDocument, SanitaryScopeOfWork, SanitarySystemOfDisposal, SanitaryWaterSupply, UserDocument } from "@/lib/models/interfaces";
import { Checkbox, Label, SelectField, TextInputField } from "evergreen-ui";
import { useCallback, useMemo, useState } from "react";

interface BuildingOwnerProp {
  buildingOwnerFullName?: string
  address?: string
  ctcNo?: string
  dateIssued?: string
  placeIssued?: string
}

export default function SanitaryPermitForm({ data }: { data?: ApplicationDocument }) {
  const user = useMemo(() => (data?.user as UserDocument), [data])
  const userFullName = useMemo(() => user?.firstName.toUpperCase() + ' ' + (!!user?.middleName ? user?.middleName[0].toUpperCase() + '. ' : '') + user?.lastName.toUpperCase(), [user])
  const userFullAddress = useMemo(() => user?.address?.no + ' ' + user?.address?.street + ', ' + user?.address?.barangay + ', ' + user?.address?.cityMunicipality, [user])
  const userCTC = useMemo(() => ({ no: user?.ctc?.no, dateIssued: !!user?.ctc?.dateIssued ? user?.ctc?.dateIssued?.toString().substring(0, 10) : '', placeIssued: user?.ctc?.placeIssued }), [user])
  const [spNo, setSpNo] = useState<string|undefined>(data?.sanitaryPermit?.spNo)
  const [buildingPermitNo, setBuildingPermitNo] = useState<string|undefined>(data?.sanitaryPermit?.buildingPermitNo)
  const [scopeOfWork, setScopeOfWork] = useState<SanitaryScopeOfWork|string|undefined>(!!data?.electricalPermit ? data?.sanitaryPermit?.box1?.scopeOfWork?.name : data?.sanitaryPermit?.box1?.scopeOfWork?.name)
  const [scopeOfWorkSpecify, setScopeOfWorkSpecify] = useState<string|undefined>(!!data?.electricalPermit ? data?.sanitaryPermit?.box1?.scopeOfWork?.specify : data?.sanitaryPermit?.box1?.scopeOfWork?.specify)
  const [useOrCharacterOfOccupancy, setUseOrCharacterOfOccupancy] = useState<string|undefined>(!!data?.electricalPermit ? data?.sanitaryPermit?.box1?.useOrCharacterOfOccupancy : data?.sanitaryPermit?.box1?.useOrCharacterOfOccupancy)
  const [waterSupply, setWaterSupply] = useState<SanitaryWaterSupply|string|undefined>(data?.sanitaryPermit?.box2?.waterSupply?.name)
  const [waterSupplySpecify, setWaterSupplySpecify] = useState<string|undefined>(data?.sanitaryPermit?.box2?.waterSupply?.specify)
  const [systemOfDisposal, setSystemOfDisposal] = useState<SanitaryWaterSupply|string|undefined>(data?.sanitaryPermit?.box2?.systemOfDisposal?.name)
  const [systemOfDisposalSpecify, setSystemOfDisposalSpecify] = useState<string|undefined>(data?.sanitaryPermit?.box2?.systemOfDisposal?.specify)
  const [sanitaryEngineer1, setSanitaryEngineer1] = useState<string|undefined>(data?.sanitaryPermit?.box3?.sanitaryEngineer)
  const [se1Address, setSe1Address] = useState<string|undefined>(data?.sanitaryPermit?.box3?.address)
  const [se1PRCNo, setSe1PRCNo] = useState<string|undefined>(data?.sanitaryPermit?.box3?.prcNo)
  const [se1PTRNo, setSe1PTRNo] = useState<string|undefined>(data?.sanitaryPermit?.box3?.ptrNo)
  const [se1Validity, setSe1Validity] = useState<string|undefined>(data?.sanitaryPermit?.box3?.validity?.toString().substring(0, 10))
  const [se1DateIssued, setSe1DateIssued] = useState<string|undefined>(data?.sanitaryPermit?.box3?.dateIssued?.toString().substring(0, 10))
  const [se1IssuedAt, setSe1IssuedAt] = useState<string|undefined>(data?.sanitaryPermit?.box3?.issuedAt)
  const [se1Tin, setSe1Tin] = useState<string|undefined>(data?.sanitaryPermit?.box3?.tin)
  const [sanitaryEngineer2, setSanitaryEngineer2] = useState<string|undefined>(data?.sanitaryPermit?.box4?.sanitaryEngineer)
  const [se2Address, setSe2Address] = useState<string|undefined>(data?.sanitaryPermit?.box4?.address)
  const [se2PRCNo, setSe2PRCNo] = useState<string|undefined>(data?.sanitaryPermit?.box4?.prcNo)
  const [se2PTRNo, setSe2PTRNo] = useState<string|undefined>(data?.sanitaryPermit?.box4?.ptrNo)
  const [se2Validity, setSe2Validity] = useState<string|undefined>(data?.sanitaryPermit?.box4?.validity?.toString().substring(0, 10))
  const [se2DateIssued, setSe2DateIssued] = useState<string|undefined>(data?.sanitaryPermit?.box4?.dateIssued?.toString().substring(0, 10))
  const [se2IssuedAt, setSe2IssuedAt] = useState<string|undefined>(data?.sanitaryPermit?.box4?.issuedAt)
  const [se2Tin, setSe2Tin] = useState<string|undefined>(data?.sanitaryPermit?.box4?.tin)
  const [useNotMyBuildingOwner, setUseNotMyBuildingOwner] = useState<boolean>(userFullName !== data?.buildingOwner?.buildingOwnerFullName)
  const getOriginalBuildingOwner = useCallback(() => !!data?.buildingOwner ? ({
    ...data.buildingOwner,
    dateIssued: data.buildingOwner?.dateIssued?.toString().substring(0, 10)
  }) : undefined, [data])
  const [customBuildingOwner, setCustomBuildingOwner] = useState<BuildingOwnerProp|undefined>(getOriginalBuildingOwner())

  return (
    <div className="rounded-lg pb-4 mx-auto bg-white/40 p-3">
      <div className="text-center font-bold text-[16pt] leading-none mb-2">SANITARY PERMIT</div>
      <h4 className="italic text-xs my-2">Fill in required (*) fields:</h4>
      <div className="flex justify-between">
        <div>
          <Label>APPLICATION NO.</Label>
          <div className="tracking-wider text-lg">{data?.applicationNo}</div>
        </div>
        <TextInputField
          label="SP NO."
          name="sanitaryPermit.spNo"
          value={spNo}
          maxLength={8}
          onChange={(ev: any) => setSpNo(ev.target.value?.toUpperCase())}
          required
        />
        <TextInputField
          label="BUILDING PERMIT NO."
          name="sanitaryPermit.buildingPermitNo"
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
            { !data?.electricalPermit && (<>
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
                    setCustomBuildingOwner(getOriginalBuildingOwner());
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
            </>)}
          </div>
          <div className="w-full px-4 py-4 mb-4 border-2 shadow border-gray-200 bg-lime-50 rounded-md md:mr-2">
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              USE OR CHARACTER OF OCCUPANCY
            </h2>
            <TextInputField
              label="Use or Character of Occupancy"
              name="sanitaryPermit.box1.useOrCharacterOfOccupancy"
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
              name="sanitaryPermit.box1.scopeOfWork.name"
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
                name="sanitaryPermit.box1.scopeOfWork.specify"
                value={scopeOfWorkSpecify || ''}
                onChange={(event: any) => setScopeOfWorkSpecify(event.target.value?.toUpperCase())}
                required
              />
            )}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              INSTALLATION AND OPERATION OF
            </h2>
            <SelectField
              label="Water Supply"
              value={waterSupply || ''}
              onChange={event => setWaterSupply(event.target.value)}
              name="sanitaryPermit.box2.waterSupply.name"
            >
              <option value=""></option>
              {Object.entries(SanitaryWaterSupply).map(([key, value]) => (
                <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
              ))}
            </SelectField>
            { waterSupply === SanitaryWaterSupply.Others && (
              <TextInputField
                label="Specify"
                name="sanitaryPermit.box2.waterSupply.specify"
                value={waterSupplySpecify || ''}
                onChange={(event: any) => setWaterSupplySpecify(event.target.value?.toUpperCase())}
                required
              />
            )}
            <SelectField
              label="System of Disposal"
              value={systemOfDisposal || ''}
              onChange={event => setSystemOfDisposal(event.target.value)}
              name="sanitaryPermit.box2.systemOfDisposal.name"
            >
              <option value=""></option>
              {Object.entries(SanitarySystemOfDisposal).map(([key, value]) => (
                <option key={key} value={value} className="uppercase">{value.toUpperCase()}</option>
              ))}
            </SelectField>
            { systemOfDisposal === SanitarySystemOfDisposal.Others && (
              <TextInputField
                label="Specify"
                name="sanitaryPermit.box2.systemOfDisposal.specify"
                value={systemOfDisposalSpecify || ''}
                onChange={(event: any) => setSystemOfDisposalSpecify(event.target.value?.toUpperCase())}
                required
              />
            )}
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              DESIGN PROFESSIONAL, PLANS AND SPECIFICATIONS
            </h2>
            <TextInputField
              label="Full Name of Sanitary Engineer"
              name="sanitaryPermit.box3.sanitaryEngineer"
              value={sanitaryEngineer1 || ''}
              onChange={(event: any) => setSanitaryEngineer1(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="sanitaryPermit.box3.address"
              value={se1Address || ''}
              onChange={(event: any) => setSe1Address(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="sanitaryPermit.box3.prcNo"
              value={se1PRCNo || ''}
              onChange={(event: any) => setSe1PRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="sanitaryPermit.box3.ptrNo"
              value={se1PTRNo || ''}
              onChange={(event: any) => setSe1PTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="sanitaryPermit.box3.validity"
              value={se1Validity || ''}
              onChange={(event: any) => setSe1Validity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="sanitaryPermit.box3.dateIssued"
                value={se1DateIssued || ''}
                onChange={(event: any) => setSe1DateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="sanitaryPermit.box3.issuedAt"
                value={se1IssuedAt || ''}
                onChange={(event: any) => setSe1IssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="sanitaryPermit.box3.tin"
              value={se1Tin || ''}
              onChange={(event: any) => setSe1Tin(event.target.value?.toUpperCase())}
            />
            <h2  className="border-b mb-2 font-bold text-center text-green-800">
              SUPERVISOR / IN-CHARGE OF SANITARY WORKS
            </h2>
            <TextInputField
              label="Full Name of Sanitary Engineer"
              name="sanitaryPermit.box4.sanitaryEngineer"
              value={sanitaryEngineer2 || ''}
              onChange={(event: any) => setSanitaryEngineer2(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="Address"
              name="sanitaryPermit.box4.address"
              value={se2Address || ''}
              onChange={(event: any) => setSe2Address(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PRC No."
              name="sanitaryPermit.box4.prcNo"
              value={se2PRCNo || ''}
              onChange={(event: any) => setSe2PRCNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              label="PTR No."
              name="sanitaryPermit.box4.ptrNo"
              value={se2PTRNo || ''}
              onChange={(event: any) => setSe2PTRNo(event.target.value?.toUpperCase())}
            />
            <TextInputField
              type="date"
              label="Validity"
              name="sanitaryPermit.box4.validity"
              value={se2Validity || ''}
              onChange={(event: any) => setSe2Validity(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInputField
                type="date"
                label="Date Issued"
                name="sanitaryPermit.box4.dateIssued"
                value={se2DateIssued || ''}
                onChange={(event: any) => setSe2DateIssued(event.target.value)}
              />
              <TextInputField
                label="Issued At"
                name="sanitaryPermit.box4.issuedAt"
                value={se2IssuedAt || ''}
                onChange={(event: any) => setSe2IssuedAt(event.target.value?.toUpperCase())}
              />
            </div>
            <TextInputField
              label="TIN"
              name="sanitaryPermit.box4.tin"
              value={se2Tin || ''}
              onChange={(event: any) => setSe2Tin(event.target.value?.toUpperCase())}
            />
          </div>
        </div>
      </div>
    </div>
  )
}