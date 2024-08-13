'use server'

import Assignation from "@/lib/models/Assignation";
import { UserRoles } from "@/lib/models/interfaces";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(UserRoles.OBO)
    if (!!session?.user) {
      const assignation = await Assignation.findOne().populate('recommendedApproval preparedBy').sort('-1').exec()
      return NextResponse.json({ data: assignation })
    }
  } catch (e) {
    console.log(e)
  }

  return NextResponse.json('Invalid Request', { status: 401, statusText: 'Invalid Request' });
}