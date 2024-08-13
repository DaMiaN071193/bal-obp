'use server'

import { getSignupSession } from "@/lib/session";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const suid = request.nextUrl.searchParams.get('suid');
  const dth = request.nextUrl.searchParams.get('dth');
  if (!suid ||!dth) {
    return NextResponse.json('Invalid request', { status: 400, statusText: 'Bad Request' })
  }
  const data = await getSignupSession(suid, dth);
  return NextResponse.json({ data })
}