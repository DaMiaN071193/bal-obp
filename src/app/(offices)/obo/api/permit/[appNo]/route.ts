'use server'

import connectDB from "@/lib/database";
import Application from "@/lib/models/Application";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { appNo: applicationNo }  }: any) {
  await connectDB();
  const getParams = request.nextUrl.searchParams.get('get');
  let data: any;
  switch (getParams) {
    case 'mayors-permit': {
      const d = await Application.findOne({ applicationNo }).populate('mayorsPermit').exec()
      if (!!d) {
        data = d.mayorsPermit
      }
      break;
    }
    default: {
      data = await Application.findOne({ applicationNo }).populate('user').exec()
    }
  }
  return NextResponse.json({ data });
}