'use server'

import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import { UserRoles } from "@/lib/models/interfaces";
import { getSession } from "@/lib/session";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get('role');
  await connectDB();
  try {
    if (role && Object.values(UserRoles).includes(role as any)) {
      const session = await getSession(role as UserRoles);
      if (session === null) {
        return NextResponse.json('Access Denied', { status: 401, statusText: 'Access Denied' })
      }
      const user = await User.findOne({ email: session!.user.email, role }).exec();
      if (!user) {
        return NextResponse.json('Access Denied', { status: 401, statusText: 'Access Denied' })
      }
      return NextResponse.json({ data: user })
    }
  } catch (err: any) {
    return NextResponse.json('Internal Server Error', { status: 500, statusText: err.message })
  }
  return NextResponse.json('Invalid Access', { status: 403, statusText: 'Invalid Access' })
}