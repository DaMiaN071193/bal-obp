'use server'

import { contactCheckExist, emailCheckExist } from "@/actions/signup";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  const phone = request.nextUrl.searchParams.get('phone');
  try {
    if (!!email) {
      const emExist = await emailCheckExist(email);
      return NextResponse.json(emExist, { status: 200, statusText: emExist ? 'Email Exists' : 'Not Found' })
    } else if (!!phone) {
      const cExist = await contactCheckExist(phone);
      return NextResponse.json(cExist, { status: 200, statusText: cExist ? 'Phone Number Exists' : 'Not Found' })
    } else if (!!email && !!phone) {
      const emExist = await emailCheckExist(email);
      const cExist = await contactCheckExist(phone);
      const bothExists = emExist && cExist;
      return NextResponse.json(bothExists, { status: 200, statusText: bothExists ? 'Exists' : 'Not Found' })
    }
  } catch (e: any) {
    console.log(e)
    return NextResponse.json('Internal Server Error', { status: 500, statusText: 'Internal Server Error' })
  }
  return NextResponse.json('Invalid request', { status: 400, statusText: 'Bad Request' })
}