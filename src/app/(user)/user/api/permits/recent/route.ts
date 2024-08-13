'use server'

import connectDB from "@/lib/database";
import Application from "@/lib/models/Application";
import { UserRoles } from "@/lib/models/interfaces";
import { getSession } from "@/lib/session";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const session = await getSession(UserRoles.User)
    if (!session?.user) {
      return NextResponse.json('Invalid Session', { status: 401, statusText: 'Invalid Session' })
    }
    const user = session!.user.userId
    const statusOnly = request.nextUrl.searchParams.get('statusOnly')
    const query = Application.findOne({ user })
    if (statusOnly === '1') {
      query.select('applicationNo user status')
    }
    const application = await query.sort({ applicationNo: -1 }).exec()
    if (!application?._id) {
      return NextResponse.json({ data: null })
    }
    return NextResponse.json({ data: application })
  } catch (e) {
    console.log(e)
  }
  return NextResponse.json('Invalid Request', { status: 401, statusText: 'Invalid Request' })
}