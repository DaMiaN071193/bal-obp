'use server'
import twilio from 'twilio';
import { z } from 'zod';
import connectDB from './database';
import User from './models/User';
import { UserRoles } from './models/interfaces';
import { encrypt, updateSession } from './session';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const verifyServiceId = process.env.TWILIO_VERIFY_SERVICE_ID || '';

const PhoneNumber = z.object({
  to: z.string()
    .min(13)
    .max(13)
    .regex(/^\+639[0-9]{9}$/, { message: 'Not a valid contact number' })
    .trim(),
  code: z.string()
    .min(6, { message: 'Code must be at least 6 characters long.' })
    .max(6, { message: 'Code must be at most 6 characters long.' })
    .regex(/^[0-9]{6}$/, { message: 'Not a valid code.' })
    .trim()
    .optional()
})

const EmailAddress = z.object({
  to: z.string().email({ message: 'Not a valid email.' }).trim(),
  code: z.string()
    .min(6, { message: 'Code must be at least 6 characters long.' })
    .max(6, { message: 'Code must be at most 6 characters long.' })
    .regex(/^[0-9]{6}$/, { message: 'Not a valid code.' })
    .trim()
    .optional()
})

export async function sendSMSVerificationCodeForNewUser(toNumber: string) {
  const client = twilio(accountSid, authToken);
  const zTo = PhoneNumber.safeParse({
    to: toNumber
  })
  if (!zTo.success) {
    throw new Error(zTo.error.message)
  }
  const { to } = zTo.data;
  return client.verify.v2.services(verifyServiceId)
    .verifications
    .create({to, channel: 'sms'})
    .then(async (verification) => {
      return verification.status === 'approved' && verification.valid;
    });
}

export async function verifySMSVerificationCodeForNewUser(toNumber: string, codeNumber: string): Promise<boolean> {
  const client = twilio(accountSid, authToken);
  const zTo = PhoneNumber.safeParse({
    to: toNumber,
    code: codeNumber
  })
  if (!zTo.success) {
    throw new Error(zTo.error.message)
  }
  const { to, code } = zTo.data;

  // for testing purpose only if TEST_OTP_CODE is declared in .env file or in ENVIRONMENT VARIABLES
  const testCode = process.env.TEST_OTP_CODE;
  if (testCode && code === testCode) {
    return true;
  }

  return client.verify.v2.services(verifyServiceId)
    .verificationChecks
    .create({to, code})
    .then(async (verification_check) => {
      return verification_check.status === 'approved' && verification_check.valid;
    });
}

export async function sendSMSVerificationCode(toNumber: string, role: UserRoles = UserRoles.User) {
  const client = twilio(accountSid, authToken);
  const zTo = PhoneNumber.safeParse({
    to: toNumber
  })
  try {
    if (!zTo.success) {
      throw new Error(zTo.error.message)
    }
    await connectDB();
    const { to } = zTo.data;
    const u = await User.findOne({ contactNo: to, role, 'contactVerified.status': 'pending' });
    if (!u) {
      throw new Error('No Account Found / Account Phone number already verified')
    }
    u.contactVerified.status = 'pending'
    return client.verify.v2.services(verifyServiceId)
      .verifications
      .create({to, channel: 'sms'})
      .then(async (verification) => {
        await u.save()
        return verification.sid
      });
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function verifySMSVerificationCode(toNumber: string, codeNumber: string, role: UserRoles = UserRoles.User): Promise<boolean> {
  const client = twilio(accountSid, authToken);
  const zTo = PhoneNumber.safeParse({
    to: toNumber,
    code: codeNumber
  })
  if (!zTo.success) {
    throw new Error(zTo.error.message)
  }
  await connectDB();
  const { to, code } = zTo.data;
  const u = await User.findOne({ contactNo: to, role });
  if (!u) {
    return false
  }
  if (u.contactVerified.status === 'approved') {
    return true
  }

  // for testing purpose only if TEST_OTP_CODE is declared in .env file or in ENVIRONMENT VARIABLES
  const testCode = process.env.TEST_OTP_CODE;
  if (testCode && code === testCode) {
    u.contactVerified.status = 'approved'
    u.contactVerified.updatedAt = new Date()
    await u.save()
    await updateSession(role);
    return true;
  }

  // return
  return client.verify.v2.services(verifyServiceId)
    .verificationChecks
    .create({to, code})
    .then(async (verification_check) => {
      const isVerified = verification_check.status === 'approved' && verification_check.valid;
      if (isVerified) {
        u.contactVerified.status = 'approved'
        u.contactVerified.updatedAt = verification_check.dateUpdated
        await u.save()
        await updateSession(role);
      }
      return isVerified
    });
}

export async function sendEmailVerificationCode(toEmail: string, role: UserRoles = UserRoles.User) {
  const client = twilio(accountSid, authToken);
  const zTo = EmailAddress.safeParse({
    to: toEmail
  })
  try {
    if (!zTo.success) {
      throw new Error(zTo.error.message)
    }
    await connectDB();
    const { to } = zTo.data;
    const twilio_tw_token = await encrypt({ email: to, role } as any)
    const u = await User.findOne({ email: to, role, 'emailVerified.status': 'pending' });
    if (!u) {
      throw new Error('No Account Found / Account already verified')
    }
    u.emailVerified.status = 'pending'
    const substitutions = {
      twilio_tw_domain_origin: process.env.DOMAIN_ORIGIN || 'localhost:3000',
      twilio_tw_user_role: `${role}/`,
      twilio_tw_token
    }
    return client.verify.v2.services(verifyServiceId)
      .verifications
      .create({
        channelConfiguration: {
          substitutions
        },
        to,
        channel: 'email'
      })
      .then(async (verification) => {
        u.emailVerified.payload = verification.sid
        await u.save()
      })
      .catch((e) => ({ error: e.message }));
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function verifyEmailVerificationCode(toEmail: string, codeNumber: string, role: UserRoles = UserRoles.User): Promise<'approved'|'invalid'|'failed'> {
  const client = twilio(accountSid, authToken);
  const zTo = EmailAddress.safeParse({
    to: toEmail,
    code: codeNumber
  })
  if (!zTo.success) {
    throw new Error(zTo.error.message)
  }
  await connectDB();
  const { to, code } = zTo.data;
  const u = await User.findOne({ email: to, role });
  if (!u) {
    return 'invalid'
  }
  if (u.emailVerified.status === 'approved') {
    return 'approved'
  }

  const sid = u?.emailVerified?.payload

  return client.verify.v2.services(verifyServiceId)
    .verificationChecks
    .create({to, code})
    .then(async (verification_check) => {
      const isVerified = verification_check.sid === sid && verification_check.status === 'approved' && verification_check.valid;
      if (isVerified) {
        u.emailVerified.status = 'approved'
        u.emailVerified.updatedAt = verification_check.dateUpdated
        await u.save()
        await updateSession(role);
      }
      return isVerified ? 'approved' : 'failed'
    });
}

export async function sendSMSMessage(toNumber: string, message: string, role: UserRoles = UserRoles.User) {
  const client = twilio(accountSid, authToken);
  const zTo = PhoneNumber.safeParse({
    to: toNumber
  })
  try {
    if (!zTo.success) {
      throw new Error(zTo.error.message)
    }
    await connectDB();
    const { to } = zTo.data;
    const u = await User.findOne({ contactNo: to, role });
    if (!u) {
      throw new Error('No Account Found / Phone number is not registered')
    }
    let body: any = {
      to: to,
      body: message,
    }
    if (!!process.env.TWILIO_MESSAGING_SERVICE_SID) {
      body.messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
    } else if (!!process.env.TWILIO_PHONE_NUMBER) {
      body.from = process.env.TWILIO_PHONE_NUMBER
    }
    return client.messages
      .create(body)
  } catch (e: any) {
    return { error: e.message }
  }
}