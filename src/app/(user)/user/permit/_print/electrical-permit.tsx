'use client';
import { ApplicationDocument, AssignationDocument, ElectricalScopeOfWork, ElectricalSupervisorTypeOfProfession, FiveSetOfElectricalDocumentsEnum, UserDocument, UserRoles } from "@/lib/models/interfaces";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ElectricalPermitPrintDocument({ data }: { data?: ApplicationDocument }) {
  const user = useMemo(() => data?.user as UserDocument, [data])
  const supervisorType = useMemo(() => data?.electricalPermit?.box3?.supervisorTypeOfProfession, [data])
  const scopeOfWork = useMemo(() => data?.electricalPermit?.box1?.scopeOfWork, [data])
  const convertDateToString = useCallback((date?: Date|string|null) => !!date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '', [])
  const [signatories, setSignatories] = useState<AssignationDocument|undefined>()
  const recommendedApproval = useMemo(() => !!signatories?.recommendingApproval ? ({
    name: (signatories.recommendingApproval as UserDocument)?.firstName.toUpperCase() + ' ' + (!!(signatories.recommendingApproval as UserDocument)?.middleName ? (signatories.recommendingApproval as UserDocument)?.middleName?.[0].toUpperCase() + '. ' : '') + (signatories.recommendingApproval as UserDocument)?.lastName.toUpperCase(),
    position: (signatories.recommendingApproval as UserDocument)?.position?.toUpperCase(),
  }) : undefined, [signatories])
  const permitIssuedBy = useMemo(() => !!signatories?.permitIssuedBy ? ({
    name: (signatories.permitIssuedBy as UserDocument)?.firstName.toUpperCase() + ' ' + (!!(signatories.permitIssuedBy as UserDocument)?.middleName ? (signatories.permitIssuedBy as UserDocument)?.middleName?.[0].toUpperCase() + '. ' : '') + (signatories.recommendingApproval as UserDocument)?.lastName.toUpperCase(),
    position: (signatories.permitIssuedBy as UserDocument)?.position?.toUpperCase(),
  }) : undefined, [signatories])
  const getPermitSignatories = useCallback(() => {
    const url = new URL('/' + UserRoles.OBO + '/api/permits/signatories', window.location.origin)
    fetch(url)
      .then(response => response.json())
      .then(({ data: assignation }) => setSignatories(assignation))
      .catch(console.log)
  }, [])

  useEffect(() => {
    getPermitSignatories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="printsize-portrait mx-auto">
      <div className="text-center leading-none">Republic of the Philippines</div>
      <div className="text-center leading-none">City/Municipality of Nasipit</div>
      <div className="text-center leading-none">Province of Agusan del Norte</div>
      <div className="text-center font-bold text-[16pt] leading-normal mt-2">ELECTRICAL PERMIT</div>
      <div className="flex justify-between leading-tight mt-2">
        <div>
          <div className="font-bold text-[10pt]">APPLICATION NO</div>
          <table className="border-collapse square-numbers text-[10pt] font-bold">
            <tbody>
              <tr>
                {data?.applicationNo.padStart(10, '0').split('').map((char, index) => (
                  <td key={"appNo_" + index}>{char}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="font-bold text-[10pt]">EP NO.</div>
          <table className="border-collapse square-numbers text-[10pt] font-bold">
            <tbody>
              <tr>
                {data?.electricalPermit?.epNo?.padStart(8, '0').split('').map((char, index) => (
                  <td key={"areaNo_" + index}>{char}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="font-bold text-[10pt]">BUILDING PERMIT NO.</div>
          <table className="border-collapse square-numbers text-[10pt] font-bold">
            <tbody>
              <tr>
                {data?.electricalPermit?.buildingPermitNo?.padStart(8, '0').split('').map((char, index) => (
                  <td key={"areaNo_" + index}>{char}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-[10pt] ml-2 font-arial-narrow leading-none mt-4">BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE OWNER/APPLICANT)</div>
      <div className="w-full text-[8pt] font-arial-narrow leading-normal">
        <table className="border-collapse w-full">
          <tbody>
            <tr>
              <td colSpan={2}  className="border border-black">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="w-[25mm] text-left">OWNER / APPLICANT</th>
                      <th>LAST NAME</th>
                      <th>FIRST NAME</th>
                      <th>M.I.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td className="text-center uppercase text-[10pt] py-0 my-0">{user?.lastName}</td>
                      <td className="text-center uppercase text-[10pt] py-0 my-0">{user?.firstName}</td>
                      <td className="text-center uppercase text-[10pt] py-0 my-0">{!!user?.middleName ? user?.middleName![0].toUpperCase() + '.' : ''}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="border border-black w-[30mm]">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="text-left">TIN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left uppercase text-[10pt] py-0 my-0">{user?.tin || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="border border-black">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="text-left w-[60mm]">FOR CONSTRUCTION OWNED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BY AN ENTERPRISE</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="border border-black">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="text-left">FORM OF OWNERSHIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="px-1 uppercase">{data?.formOfOwnership}</span></td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="border border-black">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="text-left">USE OR CHARACTER OF OCCUPANCY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="px-1 uppercase">{data?.electricalPermit?.box1?.useOrCharacterOfOccupancy}</span></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-black">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="text-left">ADDRESS:</th>
                      <th className="text-left">NO.,</th>
                      <th className="text-left">STREET,</th>
                      <th className="text-left">BARANGAY,</th>
                      <th className="text-left">CITY/MUNICIPALITY</th>
                      <th className="text-left">ZIPCODE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>&nbsp;</td>
                      <td className="text-[10pt]">{user?.address?.no || <>&nbsp;</>}</td>
                      <td className="text-[10pt]">{user?.address?.street}</td>
                      <td className="text-[10pt]">{user?.address?.barangay}</td>
                      <td className="text-[10pt]">{user?.address?.cityMunicipality}</td>
                      <td className="text-[10pt]">{user?.address?.zipCode}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="border border-black">
                <table className="border-collapse w-full text-nowrap ml-1">
                  <thead>
                    <tr>
                      <th className="text-left">TELEPHONE NO.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-[10pt] text-left">{user?.contactNo}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border border-black leading-loose py-2">
                <div className="ml-1 flex">
                  <div className="font-bold mr-2">LOCATION OF CONSTRUCTION:</div>
                  <div>LOT NO.</div>
                  <div className="max-w-[8mm] text-center px-1 border-b border-b-black">{data?.locationOfConstruction.lotNo}</div>
                  <div className="ml-1">BLK NO.</div>
                  <div className="max-w-[8mm] text-center px-1 border-b border-b-black" >{data?.locationOfConstruction.blkNo}</div>
                  <div className="ml-1">TCT NO.</div>
                  <div className="max-w-[14mm] text-center px-1 border-b border-b-black">{data?.locationOfConstruction.tctNo}</div>
                  <div className="ml-1">CURRENT TAX DEC. NO.</div>
                  <div className="flex-grow mr-2">
                    <div className="text-center px-1 border-b border-b-black">{data?.locationOfConstruction.taxDecNo}</div>
                  </div>
                </div>
                <div className="ml-1 flex">
                  <div>STREET</div>
                  <div className="max-w-[24mm] text-center px-1 border-b border-b-black">{data?.locationOfConstruction.street}</div>
                  <div className="ml-1">BARANGAY</div>
                  <div className="uppercase text-center px-1 border-b border-b-black">{data?.locationOfConstruction.barangay}</div>
                  <div className="ml-1">CITY/MUNICIPALITY</div>
                  <div className="flex-grow mr-2">
                    <div className="text-center px-1 border-b border-b-black">{data?.locationOfConstruction.cityMunicipality}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border border-black pb-1 leading-none">
                <div className="ml-1 text-[10pt] font-bold mb-2 mt-2">SCOPE OF WORK</div>
                <div className="mx-1 grid grid-cols-10 gap-x-1 gap-y-4 text-nowrap my-4">
                  {Object.entries(ElectricalScopeOfWork).map(([key, value], index) => (
                    <div key={key} className={clsx("flex flex-nowrap w-full relative", (index + 1) % 3 === 0 ? 'col-span-4' : 'col-span-3')}>
                      <label className="square-check uppercase">{value}{key === 'Others' && <span className="capitalize"> (Specify)</span>}
                        <input type="checkbox" radioGroup="scopeOfWork" value={value} checked={scopeOfWork?.name === value} disabled />
                        <span className="checkmark"></span>
                      </label>
                      { value === ElectricalScopeOfWork.Others && (
                        <span className="w-full border-b border-b-black px-1 text-[8pt]">{scopeOfWork?.name === value ? scopeOfWork?.specify : ''}</span>
                      )}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border border-black py-1">
                <div className="text-center font-bold text-[10pt] w-full">SUMMARY OF ELECTRICAL LOAD/CAPACITIES APPLIED FOR</div>
              </td>
            </tr>
            <tr className="text-[10pt]">
              <td className="border border-black px-1 leading-normal w-1/3">
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="font-bold">TOTAL CONNECTED LOAD</div>
                  <div className="flex w-full px-10 pb-2 pt-6 text-[12pt]"><div className="flex-grow border-b border-b-black text-center">{data?.electricalPermit?.box1?.totalConnectedLoad}</div> <div>kVA</div></div>
                </div>
              </td>
              <td className="border border-black px-1 leading-normal w-1/3">
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="font-bold">TOTAL TRANSFORMER CAPACITY</div>
                  <div className="flex w-full px-10 pb-2 pt-6 text-[12pt]"><div className="flex-grow border-b border-b-black text-center">{data?.electricalPermit?.box1?.totalTransformerCapacity}</div> <div>kVA</div></div>
                </div>
              </td>
              <td className="border border-black px-1 leading-normal w-1/3">
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="font-bold">TOTAL GENERATOR/UPS CAPACITY</div>
                  <div className="flex w-full px-10 pb-2 pt-6 text-[12pt]"><div className="flex-grow border-b border-b-black text-center">{data?.electricalPermit?.box1?.totalGeneratorUPSCapacity}</div> <div>kVA</div></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-normal">
        <table className="border-collapse w-full text-left">
          <thead>
            <tr>
              <td colSpan={3} className="px-2 text-[10pt]">BOX 2 (TO BE ACCOMPLISED IN PRINT BY THE DESIGN PROFESSIONAL)</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={4} className="text-[10pt] pl-1 border border-black">DESIGN PROFESSIONAL PLANS AND SPECIFICATIONS</th>
            </tr>
            <tr>
              <td rowSpan={5} colSpan={2} className="border border-black w-1/2">
                <div className="flex flex-col justify-end items-center mt-4">
                  <div className="w-[70mm] border-b border-b-black h-[10mm] flex flex-col justify-end items-center">
                    <span className="w-full text-center uppercase text-[12pt]">{data?.electricalPermit?.box2?.electricalEngineer}</span>
                  </div>
                  <div className="text-[10pt]">PROFESSIONAL ELECTRICAL ENGINEER</div>
                  <div className="text-[8pt]">(Signed and Sealed Over Printed Name)</div>
                  <div className="text-[8pt] mb-1">
                    <span>Date</span>
                    <div className="inline-block border-b border-b-black w-[44mm]">
                      <span className="text-center w-full">&nbsp;</span>
                    </div>
                  </div>
                </div>
              </td>
              <td colSpan={2} className="border-x border-x-black w-1/2 px-1 text-[10pt]">
                Address
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border-x border-x-black w-1/2 px-1 text-[10pt]">
                {data?.electricalPermit?.box2?.address}
              </td>
            </tr>
            <tr>
              <td className="border border-black w-1/4 px-1 text-[10pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">PRC No.</p>
                  <div className="flex-grow">
                    {data?.electricalPermit?.box2?.prcNo}
                  </div>
                </div>
              </td>
              <td className="border border-black w-1/4 px-1 text-[10pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">Validity</p>
                  <div className="flex-grow">
                    {convertDateToString(data?.electricalPermit?.box2?.validity)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black w-1/4 px-1 text-[10pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">PTR No.</p>
                  <div className="flex-grow">
                    {data?.electricalPermit?.box2?.address}
                  </div>
                </div>
              </td>
              <td className="border border-black w-1/4 px-1 text-[10pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">Date Issued</p>
                  <div className="flex-grow">
                    {convertDateToString(data?.electricalPermit?.box2?.dateIssued)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black w-1/4 px-1 text-[10pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">Issued at</p>
                  <div className="flex-grow">
                    {data?.electricalPermit?.box2?.issuedAt}
                  </div>
                </div>
              </td>
              <td className="border border-black w-1/4 px-1 text-[10pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">TIN</p>
                  <div className="flex-grow">
                    {data?.electricalPermit?.box2?.tin}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-tight">
        <table className="border-collapse w-full text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 3</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={6} className="text-[10pt] pl-1 border border-black">SUPERVISOR / IN-CHARGE OF ELECTRICAL WORKS</th>
            </tr>
            <tr>
              { Object.values(ElectricalSupervisorTypeOfProfession).filter((v) => v !== ElectricalSupervisorTypeOfProfession.None).map((v, i) => (
                <td colSpan={2} key={"supervisor_"+i} className={clsx("w-1/3 font-bold text-[9pt]", i === 0 ? "border-l border-l-black" : i === 2 ? "border-r border-r-black" : "")}>
                  <label className="space-x-2 square-radio mt-1">
                    <input type="radio" radioGroup="supervisor" value={ElectricalSupervisorTypeOfProfession.ProfessionalElectricalEngineer} checked={supervisorType === ElectricalSupervisorTypeOfProfession.ProfessionalElectricalEngineer} disabled />
                    <span>{ElectricalSupervisorTypeOfProfession.ProfessionalElectricalEngineer.toUpperCase()}</span>
                  </label>
                </td>
              ))}
            </tr>
            <tr>
              <td colSpan={6} className="border-x border-x-black w-1/2 px-1 text-[10pt] pt-12 pb-6">
                <div className="flex justify-center items-center px-4">
                  <div className="relative min-w-[80mm] border-b border-b-black uppercase text-center mr-2 text-[12pt]">
                    {data?.electricalPermit?.box3?.supervisorFullName || <>&nbsp;</>}
                    <div className="absolute text-center text-[8pt] left-0 -bottom-[15px] w-full">(Signed and Sealed Over Printed Name)</div>
                  </div>
                  <div>
                    Date:
                  </div>
                  <div className="w-[20mm] border-b border-b-black text-center px-2 text-[10pt] whitespace-nowrap">
                    <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                      &nbsp;
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">PRC No.</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.electricalPermit?.box3?.prcNo}
                  </div>
                </div>
              </td>
              <td colSpan={3} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Validity</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {convertDateToString(data?.electricalPermit?.box3?.validity)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">PTR No.</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.electricalPermit?.box3?.ptrNo}
                  </div>
                </div>
              </td>
              <td colSpan={3} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Date Issued</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {convertDateToString(data?.electricalPermit?.box3?.dateIssued)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Issued at</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.electricalPermit?.box3?.issuedAt}
                  </div>
                </div>
              </td>
              <td colSpan={3} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">TIN</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {data?.electricalPermit?.box3?.tin}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="py-0 my-0 border border-black w-1/2 px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Address</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.electricalPermit?.box3?.address}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-tight grid grid-cols-2 gap-x-4 mt-1">
        <table className="border-collapse">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">
                BOX 4
              </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="font-bold border-x border-x-black border-t border-t-black px-2 text-[10pt]">
                BUILDING OWNER
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-x border-x-black px-2 text-[10pt]">
                <div className="flex space-x-1 mt-12 mb-8 justify-center items-center">
                  <div className="relative text-[12pt] text-center flex-grow border-b border-b-black whitespace-nowrap">
                    {data?.buildingOwner?.buildingOwnerFullName || <>&nbsp;</>}
                    <div className="absolute w-full left-0 -bottom-[14px] text-[8pt]">(Signature Over Printed Name)</div>
                  </div>
                  <div className="ml-1">Date:</div>
                  <div className="ml-1 border-b border-b-black text-center min-w-[20mm]">&nbsp;</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border border-black px-2 text-[10pt] py-0.5">
                Address: {data?.buildingOwner?.address}
              </td>
            </tr>
            <tr>
              <td className="border-t border-x border-t-black border-x-black px-1 text-[10pt]">
                C.T.C. No
              </td>
              <td className="border-t border-x border-t-black border-x-black px-1 text-[10pt]">
                Date Issued
              </td>
              <td className="border-t border-x border-t-black border-x-black px-1 text-[10pt]">
                Place Issued
              </td>
            </tr>
            <tr>
              <td className="border-b border-x border-b-black border-x-black px-2 text-[10pt]">
                {data?.buildingOwner?.ctcNo || <>&nbsp;</>}
              </td>
              <td className="border-b border-x border-b-black border-x-black px-2 text-[10pt]">
                {convertDateToString(data?.buildingOwner?.dateIssued) || <>&nbsp;</>}
              </td>
              <td className="border-b border-x border-b-black border-x-black px-2 text-[10pt]">
                {data?.buildingOwner?.placeIssued || <>&nbsp;</>}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="border-collapse">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">
                BOX 5
              </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="font-bold border-x border-x-black border-t border-t-black px-2 text-[10pt]">
                WITH MY CONSENT: LOT OWNER
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-x border-x-black px-2 text-[10pt]">
                <div className="flex space-x-1 mt-12 mb-8 justify-center items-center">
                  <div className="relative text-[12pt] text-center flex-grow border-b border-b-black whitespace-nowrap">
                    {data?.representative?.lotOwnerAuthorizedRepresentative || <>&nbsp;</>}
                    <div className="absolute w-full left-0 -bottom-[14px] text-[8pt]">(Signature Over Printed Name)</div>
                  </div>
                  <div className="ml-1">Date:</div>
                  <div className="ml-1 border-b border-b-black text-center min-w-[20mm]">&nbsp;</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border border-black px-2 text-[10pt] py-0.5">
                Address: {data?.representative?.address}
              </td>
            </tr>
            <tr>
              <td className="border-t border-x border-t-black border-x-black px-1 text-[10pt]">
                C.T.C. No
              </td>
              <td className="border-t border-x border-t-black border-x-black px-1 text-[10pt]">
                Date Issued
              </td>
              <td className="border-t border-x border-t-black border-x-black px-1 text-[10pt]">
                Place Issued
              </td>
            </tr>
            <tr>
              <td className="border-b border-x border-b-black border-x-black px-2 text-[10pt]">
                {data?.representative?.ctc?.no || <>&nbsp;</>}
              </td>
              <td className="border-b border-x border-b-black border-x-black px-2 text-[10pt]">
                {convertDateToString(data?.representative?.ctc?.dateIssued) || <>&nbsp;</>}
              </td>
              <td className="border-b border-x border-b-black border-x-black px-2 text-[10pt]">
                {data?.representative?.ctc?.placeIssued || <>&nbsp;</>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-[10pt] ml-2 font-arial-narrow leading-loose mt-16 hidden print:block">TO BE ACCOMPLISED BY THE PROCESSING & EVALUATION DIVISION</div>
      <div className="font-arial-narrow leading-loose mt-2 hidden print:block">
        <table className="border-collapse w-full text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 6</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-[10pt] pl-1 border border-black w-1/2">RECEIVED BY:</td>
              <td className="text-[10pt] pl-1 border border-black w-1/2">DATE:</td>
            </tr>
            <tr>
              <td colSpan={2} className="font-bold text-center border-x border-x-black">FIVE (5) SETS OF ELECTRICAL DOCUMENTS</td>
            </tr>
            <tr>
              <td className="text-[9pt] text-center border-l border-l-black border-b border-b-black px-4 pb-4 pt-2 w-1/2">
                <div className="grid grid-cols-1 whitespace-nowrap text-left items-start">
                  <label className="square-radio">
                    <input type="radio" radioGroup="fiveSet" />
                    <span className="uppercase">{FiveSetOfElectricalDocumentsEnum.ElectricalPlansAndSpecifications}</span>
                  </label>
                  <label className="square-radio">
                    <input type="radio" radioGroup="fiveSet" />
                    <span className="uppercase">{FiveSetOfElectricalDocumentsEnum.SpecialFixturesAndEquipment}</span>
                  </label>
                  <label className="square-radio">
                    <input type="radio" radioGroup="fiveSet" />
                    <span className="uppercase">{FiveSetOfElectricalDocumentsEnum.ProposedStartingDateOfInstallationConstruction}</span>
                  </label>
                  <div className="ml-4 border-b border-b-black min-w-[25mm] -mt-2">&nbsp;</div>
                </div>
              </td>
              <td className="text-[9pt] text-center border-r border-r-black border-b border-b-black p-4 w-1/2">
                <div className="grid grid-cols-1 whitespace-nowrap text-left items-start">
                  <label className="square-radio">
                    <input type="radio" radioGroup="fiveSet" />
                    <span className="uppercase">{FiveSetOfElectricalDocumentsEnum.ExpectedDateOfCompletionInstallationConstruction}</span>
                  </label>
                  <div className="ml-4 border-b border-b-black min-w-[25mm] -mt-2">&nbsp;</div>
                  <label className="square-radio">
                    <input type="radio" radioGroup="fiveSet" />
                    <span className="uppercase">{FiveSetOfElectricalDocumentsEnum.Others} <div className="inline-block capitalize">(Specify)</div></span>
                  </label>
                  <div className="ml-4 border-b border-b-black min-w-[25mm] -mt-2">&nbsp;</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-normal hidden print:block">
        <table className="border-collapse w-full text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 7</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={8} className="text-[11pt] pl-1 border border-black text-center">PROGRESS FLOW</th>
            </tr>
            <tr>
              <td colSpan={2} className="text-center border-x border-x-black w-1/4">&nbsp;</td>
              <td colSpan={2} className="text-center border border-black w-1/4">IN</td>
              <td colSpan={2} className="text-center border border-black w-1/4">OUT</td>
              <td colSpan={2} className="text-center border border-black w-1/4">PROCESSED BY</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center border-x border-b border-x-black border-b-black w-1/4">&nbsp;</td>
              <td className="text-center border border-black w-1/8">DATE</td>
              <td className="text-center border border-black w-1/8">TIME</td>
              <td className="text-center border border-black w-1/8">DATE</td>
              <td className="text-center border border-black w-1/8">TIME</td>
              <td colSpan={2} className="text-center border-x border-x-black w-1/4">&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={2} className="px-1 text-left border border-black w-1/4">ELECTRICAL</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td colSpan={2} rowSpan={3} className="text-center border-x border-x-black border-b border-black w-1/4">
                <div className="block text-[8pt] pt-0.5 font-arial-narrow border-t border-t-black max-w-[32mm] text-center mx-auto">
                  <div className="font-bold text-[9pt]">ELECTRICAL ENGINEER</div>
                  <div>(Signature Over Printed name)</div>
                  <div>PRC. Reg. No. ___________</div>
                  <div>Validity: _________________</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-left border border-black w-1/4 px-1">OTHERS (Specify)</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-left border border-black w-1/4"></td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
              <td className="text-center border border-black w-1/8">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-[10pt] ml-2 font-arial-narrow leading-none mt-1 hidden print:block">BOX 8</div>
      <div className="text-[12pt] mt-2 border border-black p-2 px-4 hidden print:block font-arial-narrow">
        <div className="text-[12pt] font-bold mb-2">ACTION TAKEN:</div>
        <div className="ml-8 mr-4 mb-2">
          PEMIT IS HEREBY ISSUED SUBJECT TO THE FOLLOWING:
          <ol className="list-decimal w-full font-arial-narrow text-justify">
            <li>That the proposed eletrical works shall be in accordance with the electrical plans field with this Office and in comformity with the provisions of the latest Philippines Electrical Codes, the National Building Code and its IRR.</li>
            <li>That prior to any electrical installation, the Owner/Permittee shall submit a duly accomplished prescribed Notice of Construction to the Office of the Building Official.</li>
            <li>That for installed electrical capacity of 200 amperes and above at 230 volts nominal and above, a speciality electrical contractor duly licensed by the Philippine Contractors. Accreditation Board (PCAB) shall be required.</li>
            <li>That a duly licensed electrical practitioner shall be in-charge of the instlalation, and that upon completion of the electrical works, he shall submit the entry of the logbook duly signed and sealed to the OBO including as-built plans and other documents. He shall also accomplish the Certificate of Completion starting that the electrical works conform to the provisions of the Philippine Electrical Codes, the National Building Code and its IRR.</li>
            <li>That this permit is <span className="font-bold">null and void</span> unless accompanied by the building permit except for projects involving purely electrical works in which case only the building permit number of the existing building/structure shall be required.</li>
            <li>That a Certificate of Final Electrical Inspection (CFEI) shall be secured prior to the actual occupancy of the building.</li>
            <li>That this permit shall be posted at the door or site of work.</li>
          </ol>
        </div>
        <div className="text-right w-full pr-6 my-4">Recommending approval for permit purposes:</div>
        <div className="relative w-full pr-6 my-4 min-h-[8mm]">
          <div className="right-0 top-0 absolute">
            <div className="flex flex-col w-fit">
              <div className="font-bold text-center">{recommendedApproval?.name || 'Engr. Mart Nikki Lou M. Mantilla'}</div>
              <div className="text-[10pt] text-center">{recommendedApproval?.position || 'Registered Electrical Engineer (REE)'}</div>
            </div>
          </div>
        </div>
        <div className="font-bold">PERMIT ISSUED BY:</div>
        <div className="w-full mt-16 mb-4">
          <div className="text-center mx-auto max-w-[80mm]">
            <div className="text-[14pt] whitespace-nowrap font-bold uppercase p-1 border-b border-b-black">{permitIssuedBy?.name || 'ENGR. EPIFANIO P. SOTTO, JR., MME'}</div>
            <div className="font-bold uppercase">{permitIssuedBy?.position || 'BUILDING OFFICIAL'}</div>
            <div className="uppercase text-[7pt]">(Signature Over Printed Name)</div>
            <div>Date: <div className="inline-block min-w-[30mm] border-b border-b-black text-center">&nbsp;</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}