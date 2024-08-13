'use client';
import {
  ApplicationDocument,
  SanitaryScopeOfWork,
  SanitarySystemOfDisposal,
  SanitaryWaterSupply,
  UserDocument,
} from "@/lib/models/interfaces";
import clsx from "clsx";
import { useCallback, useMemo } from "react";

export default function SanitaryPermitPrintDocument({ data }: { data?: ApplicationDocument }) {
  const user = useMemo(() => data?.user as UserDocument, [data])
  const scopeOfWork = useMemo(() => data?.sanitaryPermit?.box1?.scopeOfWork, [data])
  const waterSupply = useMemo(() => data?.sanitaryPermit?.box2?.waterSupply, [data])
  const systemOfDisposal = useMemo(() => data?.sanitaryPermit?.box2?.systemOfDisposal, [data])
  const convertDateToString = useCallback((date?: Date|string|null) => !!date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '', [])

  return (
    <div className="printsize-portrait mx-auto">
      <div className="text-center leading-none">Republic of the Philippines</div>
      <div className="text-center leading-none">City/Municipality of Nasipit</div>
      <div className="text-center leading-none">Province of Agusan del Norte</div>
      <div className="text-center font-bold text-[16pt] leading-normal mt-2">SANITARY PERMIT</div>
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
          <div className="font-bold text-[10pt]">SP NO.</div>
          <table className="border-collapse square-numbers text-[10pt] font-bold">
            <tbody>
              <tr>
                {data?.sanitaryPermit?.spNo?.padStart(8, '0').split('').map((char, index) => (
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
                {data?.sanitaryPermit?.buildingPermitNo?.padStart(8, '0').split('').map((char, index) => (
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
                      <td><span className="px-1 uppercase">{data?.sanitaryPermit?.box1?.useOrCharacterOfOccupancy}</span></td>
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
                  {Object.entries(SanitaryScopeOfWork).map(([key, value], index) => (
                    <div key={key} className={clsx("flex flex-nowrap w-full relative", (index + 1) % 3 === 0 ? 'col-span-4' : 'col-span-3')}>
                      <label className="square-check uppercase">{value}{key === 'Others' && <span className="capitalize"> (Specify)</span>}
                        <input type="checkbox" radioGroup="scopeOfWork" value={value} checked={scopeOfWork?.name === value} disabled />
                        <span className="checkmark"></span>
                      </label>
                      { ![
                          SanitaryScopeOfWork.NewConstruction,
                          SanitaryScopeOfWork.Erection,
                          SanitaryScopeOfWork.Addition,
                          SanitaryScopeOfWork.Alteration,
                        ].includes(value) && (
                        <span className="w-full border-b border-b-black px-1 text-[8pt] mr-2">{scopeOfWork?.name === value ? scopeOfWork?.specify : ''}</span>
                      )}
                    </div>
                  ))}
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
              <td colSpan={2} className="px-2 text-[10pt] w-2/3">BOX 2 (TO BE ACCOMPLISED IN PRINT BY THE DESIGN PROFESSIONAL)</td>
              <td className="px-2 text-[10pt] w-1/3">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="border-x border-t px-1 border-x-black text-[10pt] font-bold border-t-black w-full">
                INSTALLATION AND OPERATION OF:
              </td>
            </tr>
            <tr>
              <td className="border-l border-l-black w-1/3 px-3 text-[9pt] font-bold">
                WATER SUPPLY:
              </td>
              <td colSpan={2} className="border-r border-r-black w-2/3 px-3 text-[9pt] font-bold">
                SYSTEM OF DISPOSAL:
              </td>
            </tr>
            <tr>
              <td className="border-l border-l-black w-1/3 px-6 py-3 leading-none">
                <div className="grid grid-rows-4 grid-flow-col gap-y-4 items-start">
                  { Object.entries(SanitaryWaterSupply).map(([key, value]) => (<>
                    <label className="square-check uppercase">{value}{key === 'Others' && <span className="capitalize"> (Specify)</span>}
                        <input type="checkbox" radioGroup="waterSupply" value={value} checked={waterSupply?.name === value} disabled />
                      <span className="checkmark"></span>
                      { SanitaryWaterSupply.Others === value && (
                        <div className="ml-1 inline-grid min-w-[23.5mm] whitespace-nowrap max-w-[23.5] border-b border-b-black px-1 text-[8pt] mr-2">{waterSupply?.name === value ? waterSupply?.specify : <>&nbsp;</>}</div>
                      )}
                    </label>
                  </>))}
                </div>
              </td>
              <td colSpan={2} className="border-r border-r-black w-2/3 px-6 py-3 leading-none">
                <div className="grid grid-rows-4 grid-flow-col gap-y-4">
                  { Object.entries(SanitarySystemOfDisposal).map(([key, value]) => (<>
                    <label className="square-check uppercase">{value}{key === 'Others' && <span className="capitalize"> (Specify)</span>}
                      <input type="checkbox" radioGroup="systemOfDisposal" value={value} checked={systemOfDisposal?.name === value} disabled />
                    <span className="checkmark"></span>
                    { SanitarySystemOfDisposal.Others === value && (
                      <div className="ml-1 inline-grid min-w-[23.5mm] whitespace-nowrap max-w-[23.5] border-b border-b-black px-1 text-[8pt] mr-2">{systemOfDisposal?.name === value ? systemOfDisposal?.specify : <>&nbsp;</>}</div>
                    )}
                    </label>
                  </>))}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-x border-b border-x-black border-b-black w-full text-[9pt] p-3">
                <div className="flex">
                  <div>PREPARED BY: </div><div className="border-b border-b-black text-[10pt] px-1 text-left flex-grow">&nbsp;</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-tight grid grid-cols-2 gap-x-4 mt-1">
        <table className="border-collapse text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 3</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} className="text-[10pt] pl-1 border border-black">DESIGN PROFESSIONAL PLANS AND SPECIFICATIONS</th>
            </tr>
            <tr>
              <td colSpan={2} className="border-x border-x-black px-1 text-[10pt] pt-12 pb-8">
                <div className="flex justify-center items-center px-4">
                  <div className="relative min-w-[50mm] border-b border-b-black uppercase text-center mr-2 text-[12pt]">
                    {data?.sanitaryPermit?.box3?.sanitaryEngineer || <>&nbsp;</>}
                    <div className="absolute text-center text-[7pt] left-0 -bottom-[27px] w-full"><span className="font-bold text-[8pt]">SANITARY ENGINEER</span><br />(Signed and Sealed Over Printed Name)</div>
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
              <td colSpan={2} className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Address</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box3?.address}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">PRC No.</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box3?.prcNo}
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Validity</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {convertDateToString(data?.sanitaryPermit?.box3?.validity)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">PTR No.</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box3?.ptrNo}
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Date Issued</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {convertDateToString(data?.sanitaryPermit?.box3?.dateIssued)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Issued at</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box3?.issuedAt}
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">TIN</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {data?.sanitaryPermit?.box3?.tin}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="border-collapse text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 4</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} className="text-[10pt] pl-1 border border-black">SUPERVISOR / IN-CHARGE OF SANITARY WORKS</th>
            </tr>
            <tr>
              <td colSpan={2} className="border-x border-x-black px-1 text-[10pt] pt-12 pb-8">
                <div className="flex justify-center items-center px-4">
                  <div className="relative min-w-[50mm] border-b border-b-black uppercase text-center mr-2 text-[12pt]">
                    {data?.sanitaryPermit?.box4?.sanitaryEngineer || <>&nbsp;</>}
                    <div className="absolute text-center text-[7pt] left-0 -bottom-[27px] w-full"><span className="font-bold text-[8pt]">SANITARY ENGINEER</span><br />(Signed and Sealed Over Printed Name)</div>
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
              <td colSpan={2} className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Address</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box4?.address}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">PRC No.</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box4?.prcNo}
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Validity</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {convertDateToString(data?.sanitaryPermit?.box4?.validity)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">PTR No.</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box4?.ptrNo}
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Date Issued</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {convertDateToString(data?.sanitaryPermit?.box4?.dateIssued)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">Issued at</span>
                  <div className="flex-grow whitespace-nowrap">
                    {data?.sanitaryPermit?.box4?.issuedAt}
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border border-black px-1 text-[10pt]">
                <div className="flex items-center">
                  <span className="mr-2">TIN</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    {data?.sanitaryPermit?.box4?.tin}
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
                BOX 5
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
                <div className="flex space-x-1 mt-16 mb-8 justify-center items-center">
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
                BOX 6
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
                <div className="flex space-x-1 mt-16 mb-8 justify-center items-center">
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