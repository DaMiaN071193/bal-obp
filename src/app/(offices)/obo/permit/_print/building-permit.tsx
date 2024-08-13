'use client';
import {
  ApplicationDocument,
  BuildingPermitType,
  BuildingScopeOfWork,
  CharacterOfOccupancyGroupA,
  CharacterOfOccupancyGroupB,
  CharacterOfOccupancyGroupC,
  CharacterOfOccupancyGroupD,
  CharacterOfOccupancyGroupE,
  CharacterOfOccupancyGroupF,
  CharacterOfOccupancyGroupG,
  CharacterOfOccupancyGroupH,
  CharacterOfOccupancyGroupI,
  CharacterOfOccupancyGroupJ1,
  CharacterOfOccupancyGroupJ2,
  cooGroup,
  UserDocument,
} from "@/lib/models/interfaces";
import clsx from "clsx";
import { useCallback, useMemo } from "react";

export default function BuildingPermitPrintDocument({ data }: { data?: ApplicationDocument }) {
  const user = useMemo(() => data?.user as UserDocument, [data])
  const permitType = useMemo(() => data?.buildingPermit?.permitType, [data])
  const scopeOfWork = useMemo(() => data?.buildingPermit?.box1?.scopeOfWork, [data])
  const characterOfOccupancy = useMemo(() => data?.buildingPermit?.box1?.characterOfOccupancy, [data])
  const convertDateToString = useCallback((date?: Date|string|null) => !!date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '', [])
  const proposedDateOfConstruction = useMemo(() => convertDateToString(data?.buildingPermit?.box1?.proposedDateOfConstruction!), [data, convertDateToString])
  const expectedDateOfCompletion = useMemo(() => convertDateToString(data?.buildingPermit?.box1?.expectedDateOfCompletion!), [data, convertDateToString])

  return (
    <div className="printsize-portrait mx-auto">
      <div className="text-center leading-none">Republic of the Philippines</div>
      <div className="text-center leading-none">Department of Public Works and Highways</div>
      <div className="text-center leading-none">City/Municipality of Nasipit</div>
      <div className="text-center leading-none">Province of Agusan del Norte</div>
      <div className="text-center font-bold text-[16pt] leading-none">UNIFIED APPLICATION FORM FOR BUILDING PERMIT</div>
      <div className="text-center font-bold text-[16pt] leading-none">AND FIRE SAFETY EVALUATION CLEARANCE</div>
      <div className="text-center text-[10pt] leading-none">
        <label className="mr-5 space-x-2 square-radio">
          <input type="radio" radioGroup="permitType" value={BuildingPermitType.New} checked={permitType === BuildingPermitType.New} disabled />
          <span>NEW</span>
        </label>
        <label className="mr-5 space-x-2 square-radio">
          <input type="radio" radioGroup="permitType" value={BuildingPermitType.Renewal} checked={permitType === BuildingPermitType.Renewal} disabled  />
          <span>RENEW</span>
        </label>
        <label className="space-x-2 square-radio">
          <input type="radio" radioGroup="permitType" value={BuildingPermitType.Amendatory} checked={permitType === BuildingPermitType.Amendatory} disabled />
          <span>AMENDATORY</span>
        </label>
      </div>
      <div className="flex justify-between leading-none">
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
          <div className="font-bold text-[10pt]">AREA NO.</div>
          <table className="border-collapse square-numbers text-[10pt] font-bold">
            <tbody>
              <tr>
                {data?.buildingPermit?.areaNo?.padStart(10, '0').split('').map((char, index) => (
                  <td key={"areaNo_" + index}>{char}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-[10pt] ml-2 font-arial-narrow leading-none mt-1">BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE APPLICANT)</div>
      <div className="w-full text-[8pt] flex font-arial-narrow leading-none">
        <div>
          <table className="border-collapse">
            <tbody>
              <tr>
                <td className="border border-black">
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
                <td colSpan={2}  className="border border-black">
                  <table className="border-collapse w-full text-nowrap ml-1">
                    <thead>
                      <tr>
                        <th className="text-left w-[60mm]">FOR CONSTRUCTION OWNED</th>
                        <th className="w-[12.7mm]"><div className="border-b border-b-black w-[8mm]">&nbsp;</div></th>
                        <th className="text-left">FORM OF OWNERSHIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>BY AN ENTERPRISE</td>
                        <td></td>
                        <td><span className="px-1 uppercase">{data?.formOfOwnership}</span></td>
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
                        <th className="text-left">CONTACT NO.</th>
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
                <td colSpan={2} className="border border-black pb-1">
                  <div className="ml-1 flex">
                    <div className="font-bold mr-2">LOCATION OF CONSTRUCTION:</div>
                    <div>LOT NO.</div>
                    <div className="max-w-[8mm] text-center px-1 border-b border-b-black">{data?.locationOfConstruction.lotNo}</div>
                    <div className="ml-1">BLK NO.</div>
                    <div className="max-w-[8mm] text-center px-1 border-b border-b-black" >{data?.locationOfConstruction.blkNo}</div>
                    <div className="ml-1">TCT NO.</div>
                    <div className="max-w-[14mm] text-center px-1 border-b border-b-black">{data?.locationOfConstruction.tctNo}</div>
                    <div className="ml-1">CURRENT TAX DEC. NO.</div>
                    <div className="flex-grow">
                      <div className="text-center px-1 border-b border-b-black">{data?.locationOfConstruction.taxDecNo}</div>
                    </div>
                  </div>
                  <div className="ml-1 flex leading-3">
                    <div>STREET</div>
                    <div className="max-w-[24mm] text-center px-1 border-b border-b-black">{data?.locationOfConstruction.street}</div>
                    <div className="ml-1">BARANGAY</div>
                    <div className="uppercase text-center px-1 border-b border-b-black">{data?.locationOfConstruction.barangay}</div>
                    <div className="ml-1">CITY/MUNICIPALITY</div>
                    <div className="flex-grow">
                      <div className="text-center px-1 border-b border-b-black">{data?.locationOfConstruction.cityMunicipality}</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-black pb-1">
                  <div className="ml-1 text-[9pt] font-bold">SCOPE OF WORK</div>
                  <div className="mx-1 grid grid-cols-10 gap-x-1 gap-y-0.5 text-nowrap">
                    {Object.entries(BuildingScopeOfWork).map(([key, value], index) => (
                      <div key={key} className={clsx("flex flex-nowrap w-full relative", (index + 1) % 3 === 0 ? 'col-span-4' : 'col-span-3')}>
                        <label className="square-check uppercase">{value}{key === 'Others' && <span className="capitalize"> (Specify)</span>}
                          <input type="checkbox" radioGroup="scopeOfWork" value={value} checked={scopeOfWork?.name === value} disabled />
                          <span className="checkmark"></span>
                        </label>
                        { value !== BuildingScopeOfWork.NewConstruction && (
                          <span className="w-full border-b border-b-black px-1 text-[8pt]">{scopeOfWork?.name === value ? scopeOfWork?.specify : ''}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-black pb-1">
                  <div className="ml-1 text-[9pt] font-bold">USE OR CHARACTER OF OCCUPANCY</div>
                  <div className="mx-1 grid grid-cols-10 gap-x-1">
                    <div className="flex flex-col justify-start col-span-4">
                      <label className="square-radio mlsm text-[8pt] mb-1 leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupA'} disabled checked={characterOfOccupancy?.name === cooGroup.groupA.name} />
                        <span>GROUP A: RESIDENTIAL (DWELLINGS)</span>
                        <div className="ml-[3mm]">
                          <div className="flex whitespace-nowrap gap-x-1">
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupA" value={CharacterOfOccupancyGroupA.Single} disabled checked={characterOfOccupancy?.name === cooGroup.groupA.name && characterOfOccupancy.group === CharacterOfOccupancyGroupA.Single} />
                              <span className="uppercase">{CharacterOfOccupancyGroupA.Single}</span>
                            </label>
                            <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupA" value={CharacterOfOccupancyGroupA.Duplex} disabled checked={characterOfOccupancy?.name === cooGroup.groupA.name && characterOfOccupancy.group === CharacterOfOccupancyGroupA.Duplex} />
                              <span className="uppercase">{CharacterOfOccupancyGroupA.Duplex}</span>
                            </label>
                            <label className="square-radio whitespace-normal">
                            <input type="radio" radioGroup="characterOfOccupancy.groupA" value={CharacterOfOccupancyGroupA.ResidentialR1R2} disabled checked={characterOfOccupancy?.name === cooGroup.groupA.name && characterOfOccupancy.group === CharacterOfOccupancyGroupA.ResidentialR1R2} />
                              <span className="uppercase">{CharacterOfOccupancyGroupA.ResidentialR1R2}</span>
                            </label>
                          </div>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupA" value={CharacterOfOccupancyGroupA.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupA.name && characterOfOccupancy.group === CharacterOfOccupancyGroupA.Others} />
                            <span className="uppercase">{CharacterOfOccupancyGroupA.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupA.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupA.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] mb-1 leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupB'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name} />
                        <span>GROUP B: RESIDENTIAL</span>
                        <div className="ml-[3mm]">
                          <div className="flex whitespace-nowrap">
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.Hotel} disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.Hotel}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupB.Hotel}</span>
                            </label>
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.Motel} disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.Motel}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupB.Motel}</span>
                            </label>
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.TownHouse} disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.TownHouse}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupB.TownHouse}</span>
                            </label>
                          </div>
                          <div className="flex whitespace-nowrap space-x-3">
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.Dormitory} disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.Dormitory}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupB.Dormitory}</span>
                            </label>
                            <label className="square-radio whitespace-normal">
                              <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.BoardingHouseLodgingHouse} checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.BoardingHouseLodgingHouse}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupB.BoardingHouseLodgingHouse}</span>
                            </label>
                          </div>
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.ResidentialR3R4R5} disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.ResidentialR3R4R5}  />
                            <span className="uppercase">{CharacterOfOccupancyGroupB.ResidentialR3R4R5}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupB" value={CharacterOfOccupancyGroupB.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy.group === CharacterOfOccupancyGroupB.Others}  />
                            <span className="uppercase">{CharacterOfOccupancyGroupB.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupB.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupB.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] mb-1 leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupC'} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name}/>
                        <span>GROUP C: EDUCATIONAL & RECREATIONAL</span>
                        <div className="ml-[3mm]">
                          <div className="flex whitespace-nowrap">
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupC" value={CharacterOfOccupancyGroupC.SchoolBuilding} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy.group === CharacterOfOccupancyGroupC.SchoolBuilding} />
                              <span className="uppercase">{CharacterOfOccupancyGroupC.SchoolBuilding}</span>
                            </label>
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupC" value={CharacterOfOccupancyGroupC.CivicCenter} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy.group === CharacterOfOccupancyGroupC.CivicCenter} />
                              <span className="uppercase">{CharacterOfOccupancyGroupC.CivicCenter}</span>
                            </label>
                          </div>
                          <div className="flex whitespace-nowrap space-x-3">
                            <label className="square-radio whitespace-normal">
                              <input type="radio" radioGroup="characterOfOccupancy.groupC" value={CharacterOfOccupancyGroupC.SchoolAuditoriumGymnasium} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy.group === CharacterOfOccupancyGroupC.SchoolAuditoriumGymnasium} />
                              <span className="uppercase">{CharacterOfOccupancyGroupC.SchoolAuditoriumGymnasium}</span>
                            </label>
                            <label className="square-radio whitespace-normal">
                              <input type="radio" radioGroup="characterOfOccupancy.groupC" value={CharacterOfOccupancyGroupC.ChurchMosqueTempleChapel} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy.group === CharacterOfOccupancyGroupC.ChurchMosqueTempleChapel}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupC.ChurchMosqueTempleChapel}</span>
                            </label>
                          </div>
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupC" value={CharacterOfOccupancyGroupC.ClubHouse} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy.group === CharacterOfOccupancyGroupC.ClubHouse}  />
                            <span className="uppercase">{CharacterOfOccupancyGroupC.ClubHouse}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupC" value={CharacterOfOccupancyGroupC.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy.group === CharacterOfOccupancyGroupC.Others}  />
                            <span className="uppercase">{CharacterOfOccupancyGroupC.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupC.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupC.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupD'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupD.name}/>
                        <span>GROUP D: INSTITUTIONAL</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupD" value={CharacterOfOccupancyGroupD.HospitalOrSimilar}disabled checked={characterOfOccupancy?.name === cooGroup.groupD.name && characterOfOccupancy.group === CharacterOfOccupancyGroupD.HospitalOrSimilar} />
                            <span className="uppercase">{CharacterOfOccupancyGroupD.HospitalOrSimilar}</span>
                          </label>
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupD" value={CharacterOfOccupancyGroupD.HomeForTheAged}disabled checked={characterOfOccupancy?.name === cooGroup.groupD.name && characterOfOccupancy.group === CharacterOfOccupancyGroupD.HomeForTheAged} />
                            <span className="uppercase">{CharacterOfOccupancyGroupD.HomeForTheAged}</span>
                          </label>
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupD" value={CharacterOfOccupancyGroupD.GovernmentOffice}disabled checked={characterOfOccupancy?.name === cooGroup.groupD.name && characterOfOccupancy.group === CharacterOfOccupancyGroupD.GovernmentOffice} />
                            <span className="uppercase">{CharacterOfOccupancyGroupD.GovernmentOffice}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupD" value={CharacterOfOccupancyGroupD.Others}disabled checked={characterOfOccupancy?.name === cooGroup.groupD.name && characterOfOccupancy.group === CharacterOfOccupancyGroupD.Others}  />
                            <span className="uppercase">{CharacterOfOccupancyGroupD.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupD.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupD.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col justify-start col-span-3">
                      <label className="square-radio mlsm text-[8pt] mb-1 leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupE'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name}/>
                        <span>GROUP E: COMMERCIAL</span>
                        <div className="ml-[3mm]">
                          <div className="flex whitespace-nowrap space-x-1">
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupE" value={CharacterOfOccupancyGroupE.Bank} disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy.group === CharacterOfOccupancyGroupE.Bank} />
                              <span className="uppercase">{CharacterOfOccupancyGroupE.Bank}</span>
                            </label>
                            <label className="square-radio flex-grow">
                              <input type="radio" radioGroup="characterOfOccupancy.groupE" value={CharacterOfOccupancyGroupE.Store} disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy.group === CharacterOfOccupancyGroupE.Store} />
                              <span className="uppercase">{CharacterOfOccupancyGroupE.Store}</span>
                            </label>
                            <label className="square-radio whitespace-normal">
                              <input type="radio" radioGroup="characterOfOccupancy.groupE" value={CharacterOfOccupancyGroupE.Shopping} disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy.group === CharacterOfOccupancyGroupE.Shopping}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupE.Shopping}</span>
                            </label>
                          </div>
                          <div className="flex whitespace-nowrap">
                            <label className="square-radio whitespace-normal">
                              <input type="radio" radioGroup="characterOfOccupancy.groupE" value={CharacterOfOccupancyGroupE.Shop} disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy.group === CharacterOfOccupancyGroupE.Shop}  />
                              <span className="uppercase">{CharacterOfOccupancyGroupE.Shop}</span>
                            </label>
                            <label className="square-radio whitespace-normal">
                              <input type="radio" radioGroup="characterOfOccupancy.groupE" value={CharacterOfOccupancyGroupE.DrinkingDiningEstablishment} disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy.group === CharacterOfOccupancyGroupE.DrinkingDiningEstablishment} />
                              <span className="uppercase">{CharacterOfOccupancyGroupE.DrinkingDiningEstablishment}</span>
                            </label>
                          </div>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupE" value={CharacterOfOccupancyGroupE.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy.group === CharacterOfOccupancyGroupE.Others} />
                            <span className="uppercase">{CharacterOfOccupancyGroupE.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupE.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupE.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] mb-1 leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupF'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupF.name}/>
                        <span>GROUP F: LIGHT INDUSTRIAL</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupF" value={CharacterOfOccupancyGroupF.FactoryPlant} disabled checked={characterOfOccupancy?.name === cooGroup.groupF.name && characterOfOccupancy.group === CharacterOfOccupancyGroupF.FactoryPlant} />
                            <span className="uppercase">{CharacterOfOccupancyGroupF.FactoryPlant}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupF" value={CharacterOfOccupancyGroupF.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupF.name && characterOfOccupancy.group === CharacterOfOccupancyGroupF.Others} />
                            <span className="uppercase">{CharacterOfOccupancyGroupF.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupF.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupF.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupG'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupG.name}/>
                        <span>GROUP G: MEDIUM INDUSTRIAL</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupG" value={CharacterOfOccupancyGroupG.StorageWarehouse} disabled checked={characterOfOccupancy?.name === cooGroup.groupG.name && characterOfOccupancy.group === CharacterOfOccupancyGroupG.StorageWarehouse} />
                            <span className="uppercase">{CharacterOfOccupancyGroupG.StorageWarehouse}</span>
                          </label>
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupG" value={CharacterOfOccupancyGroupG.Factory} disabled checked={characterOfOccupancy?.name === cooGroup.groupG.name && characterOfOccupancy.group === CharacterOfOccupancyGroupG.Factory} />
                            <span className="uppercase">{CharacterOfOccupancyGroupG.Factory}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupG" value={CharacterOfOccupancyGroupG.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupG.name && characterOfOccupancy.group === CharacterOfOccupancyGroupG.Others}   />
                            <span className="uppercase">{CharacterOfOccupancyGroupG.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupG.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupG.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col justify-start col-span-3">
                      <label className="square-radio mlsm text-[8pt] leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupH'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupH.name}/>
                        <span>GROUP H: ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupH" value={CharacterOfOccupancyGroupH.TheaterAuditorium} disabled checked={characterOfOccupancy?.name === cooGroup.groupH.name && characterOfOccupancy.group === CharacterOfOccupancyGroupH.TheaterAuditorium} />
                            <span className="uppercase">{CharacterOfOccupancyGroupH.TheaterAuditorium}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupH" value={CharacterOfOccupancyGroupH.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupH.name && characterOfOccupancy.group === CharacterOfOccupancyGroupH.Others} />
                            <span className="uppercase">{CharacterOfOccupancyGroupH.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupH.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupH.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt]leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupI'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupI.name}/>
                        <span>GROUP I: ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupI" value={CharacterOfOccupancyGroupI.ColiseumSportsComplex} disabled checked={characterOfOccupancy?.name === cooGroup.groupI.name && characterOfOccupancy.group === CharacterOfOccupancyGroupI.ColiseumSportsComplex} />
                            <span className="uppercase">{CharacterOfOccupancyGroupI.ColiseumSportsComplex}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupI" value={CharacterOfOccupancyGroupI.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupI.name && characterOfOccupancy.group === CharacterOfOccupancyGroupI.Others}  />
                            <span className="uppercase">{CharacterOfOccupancyGroupI.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupI.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupI.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupJ1'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupJ1.name}/>
                        <span>GROUP J: (J-1) AGRICULTURAL</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupJ1" value={CharacterOfOccupancyGroupJ1.BarnGranary} disabled checked={characterOfOccupancy?.name === cooGroup.groupJ1.name && characterOfOccupancy.group === CharacterOfOccupancyGroupJ1.BarnGranary} />
                            <span className="uppercase">{CharacterOfOccupancyGroupJ1.BarnGranary}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupJ1" value={CharacterOfOccupancyGroupJ1.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupJ1.name && characterOfOccupancy.group === CharacterOfOccupancyGroupJ1.Others} />
                            <span className="uppercase">{CharacterOfOccupancyGroupJ1.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupJ1.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupJ1.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                      <label className="square-radio mlsm text-[8pt] leading-3">
                        <input type="radio" radioGroup="characterOfOccupancy" value={'groupJ2'}  disabled checked={characterOfOccupancy?.name === cooGroup.groupJ2.name}/>
                        <span>GROUP J: (J-2) ACCESSORIES</span>
                        <div className="ml-[3mm]">
                          <label className="square-radio flex-grow">
                            <input type="radio" radioGroup="characterOfOccupancy.groupJ2" value={CharacterOfOccupancyGroupJ2.PrivateCarportGarage} disabled checked={characterOfOccupancy?.name === cooGroup.groupJ2.name && characterOfOccupancy.group === CharacterOfOccupancyGroupJ2.PrivateCarportGarage} />
                            <span className="uppercase">{CharacterOfOccupancyGroupJ2.PrivateCarportGarage}</span>
                          </label>
                          <label className="square-radio">
                            <input type="radio" radioGroup="characterOfOccupancy.groupJ2" value={CharacterOfOccupancyGroupJ2.Others} disabled checked={characterOfOccupancy?.name === cooGroup.groupJ2.name && characterOfOccupancy.group === CharacterOfOccupancyGroupJ2.Others} />
                            <span className="uppercase">{CharacterOfOccupancyGroupJ2.Others}</span>
                            <p className="inline-block uppercase px-1 text-left border-b border-b-black max-w-[35mm] min-w-[20mm]">{characterOfOccupancy?.name === cooGroup.groupJ2.name && characterOfOccupancy?.group === CharacterOfOccupancyGroupJ2.Others ? characterOfOccupancy?.specify : ''}</p>
                          </label>
                        </div>
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-black px-1 leading-none">
                  <div className="grid grid-cols-3 whitespace-nowrap text-[9pt] gap-x-2">
                    <div className="flex flex-row">
                      <div className="flex-shrink">OCCUPANCY CLASSIFIED:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {data?.buildingPermit?.box1?.occupancyClassified}
                      </div>
                    </div>
                    <div className="flex flex-row col-span-2">
                      <div className=" flex-shrink">TOTAL ESTIMATED COST: </div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[25mm] text-center">
                        {data?.buildingPermit?.box1?.totalEstimatedCost?.toLocaleString('en-US', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">NUMBER OF UNITS:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {data?.buildingPermit?.box1?.numberOfUnits}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">BUILDING:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[30mm] text-center">
                        {data?.buildingPermit?.box1?.building}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      COST OF EQUIPMENT INSTALLED:
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">NUMBER OF STOREY:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {data?.buildingPermit?.box1?.numberOfStorey}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">ELECTRICAL:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[30mm] text-center">
                        {data?.buildingPermit?.box1?.electrical}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className=" flex-shrink">&#8369;</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[25mm] text-right">
                        {data?.buildingPermit?.box1?.costOfEquipmentInstalled?.[3]?.toLocaleString('en-US', { currency: 'PHP', minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">TOTAL FLOOR AREA:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {data?.buildingPermit?.box1?.totalFloorArea}
                      </div>
                      <span>SQ. M.</span>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">MECHANICAL:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[30mm] text-center">
                        {data?.buildingPermit?.box1?.mechanical}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className=" flex-shrink">&#8369;</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[25mm] text-right">
                        {data?.buildingPermit?.box1?.costOfEquipmentInstalled?.[3]?.toLocaleString('en-US', { currency: 'PHP', minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">LOT AREA:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {data?.buildingPermit?.box1?.lotArea}
                      </div>
                      <span>SQ. M.</span>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">ELECTRONICS:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[30mm] text-center">
                        {data?.buildingPermit?.box1?.electronics}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className="flex-shrink">&#8369;</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[25mm] text-right">
                        {data?.buildingPermit?.box1?.costOfEquipmentInstalled?.[3]?.toLocaleString('en-US', { currency: 'PHP', minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex flex-row">
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink">PLUMBING:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[30mm] text-center">
                        {data?.buildingPermit?.box1?.plumbing}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className="flex-shrink">&#8369;</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[25mm] text-right">
                        {data?.buildingPermit?.box1?.costOfEquipmentInstalled?.[3]?.toLocaleString('en-US', { currency: 'PHP', minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-2 mt-0.5">
                    <div className="flex flex-row">
                      <div className="flex-shrink whitespace-nowrap">PROPOSED DATE OF CONSTRUCTION:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {proposedDateOfConstruction}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className=" flex-shrink whitespace-nowrap">EXPECTED DATE OF COMPLETION:</div>
                      <div className="flex-shrink border-b border-b-black px-1 min-w-[18mm] text-center">
                        {expectedDateOfCompletion}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-shrink w-[120mm] ml-1 font-arial-narrow text-[8pt]">
          <div>DO NOT FILL-UP<br />(PSA USE ONLY)</div>
          <div className="w-full">
            <table className="border-collapse square-numbers">
              <tbody>
                <tr>
                  <td>&nbsp;&nbsp;</td>
                  <td>&nbsp;&nbsp;</td>
                  <td>&nbsp;&nbsp;</td>
                  <td>&nbsp;&nbsp;</td>
                  <td>&nbsp;&nbsp;</td>
                  <td>&nbsp;&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td className="bg-gray-500">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="bg-gray-500" style={{borderBottom: 'none'}}>&nbsp;</td>
                  <td className="bg-gray-500" style={{borderBottom: 'none'}}>&nbsp;</td>
                  <td style={{borderBottom: 'none'}}>&nbsp;</td>
                  <td style={{borderBottom: 'none'}}>&nbsp;</td>
                  <td style={{borderBottom: 'none'}}>&nbsp;</td>
                  <td style={{borderBottom: 'none'}}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{borderTop: 'none'}}>&nbsp;</td>
                  <td style={{borderTop: 'none'}}>&nbsp;</td>
                  <td style={{borderTop: 'none'}}>&nbsp;</td>
                  <td style={{borderTop: 'none'}}>&nbsp;</td>
                  <td style={{borderTop: 'none'}}>&nbsp;</td>
                  <td style={{borderTop: 'none'}}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="font-arial-narrow leading-none">
        <table className="border-collapse w-full text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 2</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
              <td className="px-2 text-[10pt]">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={4} className="text-[9pt] pl-1 border border-black">FULL-TIME INSPECTOR AND SUPERVISOR OF CONSTRUCTION WORKS REPRESENTING THE OWNER</th>
            </tr>
            <tr>
              <td rowSpan={5} colSpan={2} className="border border-black w-1/2">
                <div className="flex flex-col justify-end items-center">
                  <div className="w-[70mm] border-b border-b-black h-[10mm] flex flex-col justify-end items-center">
                    <span className="w-full text-center uppercase text-[11pt]">{data?.buildingPermit?.box2?.architectCivilEngineer}</span>
                  </div>
                  <div className="text-[9pt]">ARCHITECT OR CIVIL ENGINEER</div>
                  <div className="text-[8pt]">(Signed and Sealed Over Printed Name)</div>
                  <div className="text-[8pt]">
                    <span>Date</span>
                    <div className="inline-block border-b border-b-black w-[44mm]">
                      <span className="text-center w-full">&nbsp;</span>
                    </div>
                  </div>
                </div>
              </td>
              <td colSpan={2} className="border-x border-x-black w-1/2 px-1 text-[9pt]">
                Address
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border-x border-x-black w-1/2 px-1 text-[9pt]">
                {data?.buildingPermit?.box2?.address}
              </td>
            </tr>
            <tr>
              <td className="border border-black w-1/4 px-1 text-[9pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">PRC No.</p>
                  <div className="flex-grow">
                    {data?.buildingPermit?.box2?.prcNo}
                  </div>
                </div>
              </td>
              <td className="border border-black w-1/4 px-1 text-[9pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">Validity</p>
                  <div className="flex-grow">
                    {convertDateToString(data?.buildingPermit?.box2?.validity)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black w-1/4 px-1 text-[9pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">PTR No.</p>
                  <div className="flex-grow">
                    {data?.buildingPermit?.box2?.address}
                  </div>
                </div>
              </td>
              <td className="border border-black w-1/4 px-1 text-[9pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">Date Issued</p>
                  <div className="flex-grow">
                    {convertDateToString(data?.buildingPermit?.box2?.dateIssued)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black w-1/4 px-1 text-[9pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">Issued at</p>
                  <div className="flex-grow">
                    {data?.buildingPermit?.box2?.issuedAt}
                  </div>
                </div>
              </td>
              <td className="border border-black w-1/4 px-1 text-[9pt]">
                <div className="flex">
                  <p className="whitespace-nowrap pr-1">TIN</p>
                  <div className="flex-grow">
                    {data?.buildingPermit?.box2?.tin}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-none">
        <table className="border-collapse w-full text-left">
          <thead>
            <tr>
              <td className="px-2 text-[10pt]">BOX 3</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td className="px-2 text-[10pt]">BOX 4</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="border border-black border-b-0 w-1/2 pt-0 px-1">
                <div className="font-bold text-[9pt] ml-1">APPLICANT:</div>
              </td>
              <td colSpan={3} className="border border-black border-b-0 w-1/2 pt-0 px-1">
                <div className="text-[9pt] whitespace-nowrap">WITH MY CONSENT: <span className="font-bold">LOT OWNER / AUTHORIZED REPRESENTATIVE</span></div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border-x border-x-black w-1/2 px-1 text-[10pt]">
                <div className="flex px-4 h-[4mm]">
                  <div className="w-[50mm] border-b border-b-black uppercase text-center mr-2">
                    <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                      {user?.firstName} {!!user?.middleName ? user?.middleName[0] + '. ' : ''}{user?.lastName}
                    </span>
                  </div>
                  <div>
                    Date:
                  </div>
                  <div className="w-[20mm] border-b border-b-black text-center px-2 text-[10pt] whitespace-nowrap">
                    <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                      {convertDateToString(new Date())}
                    </span>
                  </div>
                </div>
              </td>
              <td colSpan={3} className="border-x border-x-black w-1/2 px-1 text-[10pt]">
                <div className="flex px-4 h-[4mm]">
                  <div className="w-[50mm] border-b border-b-black uppercase text-center mr-2">
                    {data?.representative?.lotOwnerAuthorizedRepresentative}
                  </div>
                  <div>
                    Date:
                  </div>
                  <div className="w-[20mm] border-b border-b-black text-center px-2 text-[10pt] whitespace-nowrap">
                    <span className={clsx(!!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                      {convertDateToString(new Date())}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="py-0 my-0 border-x border-x-black border-b border-b-black w-1/2 px-1 text-[8pt]">
                <div className="flex px-4">
                  <div className="w-[50mm] text-center mr-2">
                    (Signature Over Printed Name)
                  </div>
                  <div className="flex-grow">
                    &nbsp;
                  </div>
                </div>
              </td>
              <td colSpan={3} className="py-0 my-0 border-x border-x-black border-b border-b-black w-1/2 px-1 text-[8pt]">
                <div className="flex px-4">
                  <div className="w-[50mm] text-center mr-2">
                    (Signature Over Printed Name)
                  </div>
                  <div className="flex-grow">
                    &nbsp;
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="py-0 my-0 border-x border-x-black border-b border-b-black w-1/2 px-1 text-[9pt]">
                <div className="flex items-center">
                  <span className="mr-2">Address:</span>
                  <div className="flex-grow whitespace-nowrap">
                    <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                      {!!user?.address.no ? user?.address.no + ' ' : ''}{user?.address.street}, {user?.address.barangay}, {user?.address.cityMunicipality}, {user?.address.province} {user?.address.zipCode}
                    </span>
                  </div>
                </div>
              </td>
              <td colSpan={3} className="py-0 my-0 border-x border-x-black border-b border-b-black w-1/2 px-1 text-[9pt]">
                <div className="flex items-center">
                  <span className="mr-2">Address:</span>
                  <div className="flex-grow whitespace-nowrap py-[1px]">
                    <span className="w-full px-1">{data?.representative?.address}</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="py-0 my-0 border-x border-x-black border-b border-b-black px-1 text-[8pt]">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="mr-1 whitespace-nowrap">{"Gov't Issued ID No:"}</span>
                    <div className="flex-grow whitespace-nowrap">
                      <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                        {user?.govId.no}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1 whitespace-nowrap">{"Date Issued:"}</span>
                    <div className="flex-grow whitespace-nowrap">
                      <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                        {convertDateToString(user?.govId.dateIssued)}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border-x border-x-black border-b border-b-black px-1 text-[8pt]">
                <span className="mr-1">{"Place Issued:"}</span>
                <div className="flex-grow whitespace-nowrap">
                  <span className={clsx(!data?.representative?.lotOwnerAuthorizedRepresentative ? '' : 'hidden')}>
                    {user?.govId.placeIssued}
                  </span>
                </div>
              </td>
              <td colSpan={2} className="py-0 my-0 border-x border-x-black border-b border-b-black px-1 text-[8pt]">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="mr-1 whitespace-normal">{"Gov't Issued ID No:"}</span>
                    <div className="flex-grow whitespace-nowrap py-[1px]">
                      <span className="w-full px-1">{data?.representative?.govId?.no}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1 whitespace-normal">{"Date Issued:"}</span>
                    <div className="flex-grow whitespace-nowrap py-[1px]">
                      <span className="w-full px-1 max-w-fit" >{convertDateToString(data?.representative?.govId?.dateIssued)}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-0 my-0 border-x border-x-black border-b border-b-black px-1 text-[8pt]">
                <span className="mr-1">{"Place Issued:"}</span>
                <div className="flex-grow whitespace-nowrap py-[1px]">
                  <span className="w-full border border-slate-400 print:border-none rounded-sm px-1" >{data?.representative?.govId?.placeIssued}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-none">
        <table className="border-collapse w-full border-b border-b-black">
          <thead>
            <tr>
              <td className="px-2 text-[10pt] w-1/2">
                BOX 5
              </td>
              <td className="px-2 text-[10pt] w-1/2">
                &nbsp;
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="border-t border-t-black border-x border-x-black text-[9pt] px-3 font-[600]">
                <div className="relative w-full">
                  <div>REPUBLIC OF THE PHILIPPINES <span className="ml-32">{")"}</span></div>
                  <div>CITY/MUNICIPALITY OF <div className="inline-block text-center border-b border-b-black w-[45mm] h-[3.5mm]">NASIPIT</div>)</div>
                  <span className="absolute top-[23%] left-[45%] font-normal">S.S</span>
                </div>
                <div className="indent-8 pt-1">
                  <span>BEFORE ME, at the City/Municipality of </span>
                  <div className="inline-block indent-0 text-center border-b border-b-black w-[54mm] h-[4.5mm]">NASIPIT</div>
                  <span>, on </span>
                  <div className="inline-block indent-0 text-center border-b border-b-black w-[30mm] h-[4.5mm]" >&nbsp;</div>
                  <span> personally appeared the following:</span>
                </div>
                <div className="relative w-full h-[26mm] -mt-4 text-[8pt] whitespace-nowrap text-center">
                  <div className="absolute top-[37%] left-14 border-t border-t-black w-[60mm] text-center">
                    <div className="relative w-full">
                      APPLICANT
                      <span className="absolute -top-[150%] text-[10pt] left-0 w-full text-center text-nowrap uppercase tracking-tight">
                        {user?.firstName} {user?.middleName ? user?.middleName[0] + '. ' : ''}{user?.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-[37%] left-[45%] border-t border-t-black w-[25mm] text-center">
                    <div className="relative w-full">
                    {"Gov't Issued ID No."}
                      <span className="absolute -top-[150%] left-0 text-[8pt] w-full text-center text-nowrap uppercase tracking-tight">
                        {user?.govId.no}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-[37%] left-[63%] border-t border-t-black w-[20mm] text-center">
                    <div className="relative w-full">
                      Date Issued
                      <span className="absolute -top-[150%] text-[9pt] left-0 w-full text-center text-nowrap uppercase">
                        {convertDateToString(user?.govId.dateIssued)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-[37%] left-[76%] border-t border-t-black w-[35mm] text-center">
                    <div className="relative w-full">
                      Place Issued
                      <span className="absolute -top-[150%] text-[9pt] left-0 w-full text-center text-nowrap uppercase tracking-tighter">
                        {user?.govId.placeIssued}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-[15%] left-14 border-t border-t-black w-[60mm] text-center">
                    <div className="relative w-full">
                      LICENSED ARCHITECT OR CIVIL ENGINEER
                      <span className="absolute -top-[150%] text-[10pt] left-0 w-full text-center text-nowrap uppercase tracking-tight">
                        {data?.buildingPermit?.box2?.architectCivilEngineer}
                      </span>
                      <span className="font-thin text-[7pt] absolute top-[80%] left-3">(Full-Time Inspector and Supervisor of Construction Works)</span>
                    </div>
                  </div>
                  <div className="absolute bottom-[15%] left-[45%] border-t border-t-black w-[25mm] text-center">
                    <div className="relative w-full">
                      {"Gov't Issued ID No."}
                      <span className="absolute -top-[150%] left-0 text-[8pt] w-full text-center text-nowrap uppercase tracking-tight">
                        {data?.buildingPermit?.box2?.prcNo || data?.buildingPermit?.box2?.tin}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-[15%] left-[63%] border-t border-t-black w-[20mm] text-center">
                    <div className="relative w-full">
                      Date Issued
                      <span className="absolute -top-[150%] text-[9pt] left-0 w-full text-center text-nowrap uppercase tracking-tight">
                        {convertDateToString(data?.buildingPermit?.box2?.dateIssued)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-[15%] left-[76%] border-t border-t-black w-[35mm] text-center">
                    <div className="relative w-full">
                      Place Issued
                      <span className="absolute -top-[150%] text-[9pt] left-0 w-full text-center text-nowrap uppercase tracking-tight">
                        {data?.buildingPermit?.box2?.issuedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="w-full">
                  whose signatures appear hereinabove, known to me the same persons who
                  executed this standard prescribed form and acknowledged to me that the
                  same is their free and voluntary act and deed.
                </p>
              </td>
            </tr>
            <tr>
              <td className="border-l border-l-black text-[9pt]">
                <div className="text-center w-full">
                  WITNESS MY HAND AND SEAL on the date and place above written
                </div>
                <ul className="ml-3 leading-none">
                  <li>
                    <span>Doc. &nbsp;&nbsp;No. </span><div className="inline-block border-b border-b-black w-[15mm] h-[3mm]">&nbsp;</div>
                  </li>
                  <li>
                    <span>Page. No. </span><div className="inline-block border-b border-b-black w-[15mm] h-[3mm]">&nbsp;</div>
                  </li>
                  <li>
                    <span>Book. No. </span><div className="inline-block border-b border-b-black w-[15mm] h-[3mm]">&nbsp;</div>
                  </li>
                  <li>
                    <span>Series of &nbsp;</span><div className="inline-block border-b border-b-black w-[15mm] h-[3mm]">&nbsp;</div>
                  </li>
                </ul>
              </td>
              <td className="border-r border-r-black text-[8pt]">
                <div className="w-full">
                  <div className="mx-auto h-[8mm] w-3/4 border-b border-b-black" />
                  <div className="text-center">
                    NOTARY PUBLIC (Until December <div className="inline-block w-[20mm] border-b border-b-black">&nbsp;</div>)
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-arial-narrow leading-loose">
        <div className="w-[80%] mx-auto">
          <div className="flex justify-between items-start text-[9pt]">
            <div className="flex flex-col justify-start leading-none mt-1">
              <span className="font-bold">Copy 1: Owner</span>
              <span className="text-[8pt]">*May require additional requirements</span>
            </div>
            <div className="font-bold">Copy 2: OBO</div>
            <div className="font-bold">Copy 3: BFP</div>
            <div className="font-bold">Copy 4: Philippine Statistics Authority</div>
          </div>
        </div>
      </div>
    </div>
  )
}