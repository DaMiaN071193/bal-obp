'use server';
import { getDecryptedDraftData } from "@/actions/permit";
import connectDB from "@/lib/database";
import Application from "@/lib/models/Application";
import { ApplicationStatus, StatusType, UserRoles } from "@/lib/models/interfaces";
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
    const application = await Application.findOne({ user }).select('applicationNo status').sort({ applicationNo: -1 }).exec()
    if (!application?._id) {
      let data: any = await getDecryptedDraftData()
      if (!data) {
        data = { step: 1 }
      }
      return NextResponse.json(data)
    }
    let data: any;
    const statuses = application.status;
    if (statuses[0].statusType === StatusType.Pending && (!statuses.find((item: ApplicationStatus) => item.statusType === StatusType.Completed) || !!statuses.find((item: ApplicationStatus) => item.statusType === StatusType.Cancelled))) {
      data = { step: 200, applicationNo: application.applicationNo }
    } else {
      data = await getDecryptedDraftData()
      if (!data) {
        data = { step: 200, applicationNo: application.applicationNo }
      }
    }
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
  }
  return NextResponse.json('Invalid Request', { status: 401, statusText: 'Invalid Request' })
}