'use client'

import NotFoundPage from "@/components/errorpages/404";
import { ApplicationDocument } from "@/lib/models/interfaces";
import { useEffect, useState } from "react";
import BuildingPermitPrintDocument from "../_print/building-permit";
import ElectricalPermitPrintDocument from "../_print/electrical-permit";
import SanitaryPermitPrintDocument from "../_print/sanitary-permit";

const permitNames: { [key: string]: string } = {
  '1': 'Building Permit',
  '2': 'Electrical Permit',
  '3': 'Sanitary Permit',
}

export default function PrintComponent({ appNo, permit }: { appNo: string, permit: string }) {
  const [data, setData] = useState<ApplicationDocument|undefined>()
  const [noData, setNoData] = useState<boolean>(false)
  useEffect(() => {
    document.title = permitNames[permit] + " - Application No " + appNo;
    const url = new URL('/obo/api/permit/' + appNo, window.location.origin)
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => !data ? setNoData(true) : setData(data))
      .catch(console.log)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!!data) {
      window.print()
      setData(undefined)
      document.title = "Building Permit"
      window.close()
      return () => {
        // Cleanup
      }
    }
  }, [data])
  return noData || (permitNames[permit] !== 'Building Permit' && permitNames[permit] !== 'Electrical Permit' && permitNames[permit] !== 'Sanitary Permit'
    ? <NotFoundPage />
    : (permitNames[permit] === 'Building Permit'
      ? <BuildingPermitPrintDocument data={data} />
      : permitNames[permit] === 'Electrical Permit'
      ? <ElectricalPermitPrintDocument data={data} />
      : permitNames[permit] === 'Sanitary Permit'
      ? <SanitaryPermitPrintDocument data={data} />
      : null)
  )
}