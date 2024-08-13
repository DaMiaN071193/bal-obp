import { Permits } from "@/lib/types";
import { Metadata } from "next";
import PermitApplicationEditPage from "./component";

export const metadata: Metadata = {
  title: "Edit Permit Application Form",
}

type ParamProp = {
  searchParams: {
    appNo: string;
    permit: string;
    isElectricalPermitOnly: string;
    hasElectricalPermit: string;
  }
}

const perms = [Permits.BuildingPermit, Permits.ElectricalPermit, Permits.SanitaryPermit]

export default function Page({ searchParams: { appNo, permit, isElectricalPermitOnly, hasElectricalPermit } } : ParamProp) {
  return <PermitApplicationEditPage applicationNo={appNo} permit={perms[Number.parseInt(permit)]} isElectricalPermitOnly={isElectricalPermitOnly === 'true'} hasElectricalPermit={hasElectricalPermit === 'true'} />
}