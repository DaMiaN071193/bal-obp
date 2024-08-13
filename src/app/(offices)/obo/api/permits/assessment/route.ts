'use server'

import Application from "@/lib/models/Application";
import { StatusType, UserRoles } from "@/lib/models/interfaces";
import { getSession } from "@/lib/session";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(UserRoles.OBO)
    if (!!session) {
      const data = await Application.find({
        status: { $exists: true, $not: { $size: 0 } },
        $where: 'this.status.length > 4 && this.status[this.status.length - 1].step === 3 && this.status[this.status.length - 1].statusType === "' + StatusType.Pending + '"'
      }).populate('user').sort('-applicationNo').exec()
      return NextResponse.json({ data })
    }
  } catch (e) {}
  return NextResponse.json('Invalid Request', { status: 401, statusText: 'Invalid Request' });
}