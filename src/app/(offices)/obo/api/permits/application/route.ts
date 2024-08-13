'use server'

import Application from "@/lib/models/Application";
import { UserRoles } from "@/lib/models/interfaces";
import { getSession } from "@/lib/session";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(UserRoles.OBO)
    if (!!session) {
      const data = await Application.find({ status: { $size: 1 } }).populate('user').sort('-applicationNo').exec()
      return NextResponse.json({ data })
    }
  } catch (e) {}
  return NextResponse.json('Invalid Request', { status: 401, statusText: 'Invalid Request' });
}