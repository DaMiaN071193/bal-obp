'use client';
import { ApplicationDocument, AssignationDocument, ElectricalScopeOfWork, ElectricalSupervisorTypeOfProfession, FiveSetOfElectricalDocumentsEnum, UserDocument, UserRoles } from "@/lib/models/interfaces";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ElectricalPermitPrintDocument({ data }: { data?: ApplicationDocument }) {
  const user = useMemo(() => data?.user as UserDocument, [data])
  const supervisorType = useMemo(() => data?.electricalPermit?.box3?.supervisorTypeOfProfession, [data])
  const scopeOfWork = useMemo(() => data?.electricalPermit?.box1?.scopeOfWork, [data])
  const convertDateToString = useCallback((date?: Date|string|null) => !!date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '', [])

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
    </div>
  )
}