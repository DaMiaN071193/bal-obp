import { Metadata } from "next";
import TrackPermitApplicationPage from "./component";

export const metadata: Metadata = {
  title: "Track - Permit Application",
}

type ParamProp = {
  appId?: string
}

export default function PermitApplication({ params: { appId } }: { params: ParamProp}) {
  return <TrackPermitApplicationPage applicationNo={appId} />
}