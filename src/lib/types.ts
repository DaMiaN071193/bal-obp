import { JWTPayload } from 'jose';
import { z } from 'zod';
import { BuildingPermitType, BuildingScopeOfWork, cooGroup, ElectricalScopeOfWork, ElectricalSupervisorTypeOfProfession, SanitaryScopeOfWork, SanitarySystemOfDisposal, SanitaryWaterSupply, TypeOfPermit, UserRoles } from './models/interfaces';

export const SignupFormSchema = z.object({
  uid: z.string().trim().length(24, 'must be 24 characters').optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  contactNo: z.string().regex(/^\+639[0-9]{9}$/, { message: 'Invalid Contact Number' }).trim(),
  role: z.enum([UserRoles.Admin, UserRoles.User, UserRoles.OBO, UserRoles.BFP, UserRoles.MPDC]),
  position: z.string().trim().optional(),
  firstName: z.string().trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
  addressNo: z.string().trim().optional(),
  addressStreet: z.string().trim(),
  addressBarangay: z.string().trim(),
  addressCityMunicipality: z.string().trim(),
  addressProvince: z.string().trim(),
  addressZipCode: z.string().trim()
})

export const LoginFormSchema = z.object({
  role: z.enum([UserRoles.Admin, UserRoles.User, UserRoles.OBO, UserRoles.BFP, UserRoles.MPDC]),
  email: z.union([
    z.string().trim().email({ message: 'Invalid Email' }),
    z.string().trim().regex(/^\+639[0-9]{9}$/, { message: 'Invalid Phone Number' }),
    z.string().trim().regex(/^09[0-9]{9}$/, { message: 'Invalid Phone Number' }),
    z.string().trim().regex(/^9[0-9]{9}$/, { message: 'Invalid Phone Number' }),
  ]),
  password: z.string()
    .min(1, { message: 'Fill in password' })
    .trim(),
});


export const ChangePasswordFormSchema = z.object({
  role: z.enum([UserRoles.Admin, UserRoles.User, UserRoles.OBO, UserRoles.BFP, UserRoles.MPDC]),
  current_password: z.string()
    .min(1, { message: 'Fill in current password' })
    .trim(),
  new_password: z.string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  confirm_password: z.string()
    .min(1, { message: 'Fill in confirm password' })
    .trim()
});

export const ChangeEmailFormSchema = z.object({
  role: z.enum([UserRoles.Admin, UserRoles.User, UserRoles.OBO, UserRoles.BFP, UserRoles.MPDC]),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
});

export const ChangeContactNoFormSchema = z.object({
  role: z.enum([UserRoles.Admin, UserRoles.User, UserRoles.OBO, UserRoles.BFP, UserRoles.MPDC]),
  contactNo: z.string().trim().regex(/^\+639[0-9]{9}$/, { message: 'Invalid Phone Number' }),
});

export const ChangeProfileFormSchema = z.object({
  role: z.enum([UserRoles.Admin, UserRoles.User, UserRoles.OBO, UserRoles.BFP, UserRoles.MPDC]),
  position: z.string().trim().optional(),
  firstName: z.string().trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
  addressNo: z.string().trim().optional(),
  addressStreet: z.string().trim(),
  addressBarangay: z.string().trim(),
  addressCityMunicipality: z.string().trim(),
  addressProvince: z.string().trim(),
  addressZipCode: z.string().trim(),
  govIdNo: z.string().trim().optional(),
  govIdDateIssued: z.string().date().trim().nullable().nullable().optional(),
  govIdPlaceIssued: z.string().trim().optional(),
  tin: z.string().trim().optional(),
  ctcNo: z.string().trim().optional(),
  ctcDateIssued: z.string().date().trim().nullable().nullable().optional(),
  ctcPlaceIssued: z.string().trim().optional(),
});

export const AssignFormSchema = z.object({
  recommendingApproval: z.string().trim().length(24, 'must be 24 characters'),
  permitIssuedBy: z.string().trim().length(24, 'must be 24 characters'),
})

export const TypeOfPermitApplicationSchema = z.object({
  typeOfPermit: z.enum(Object.values(TypeOfPermit) as any),
})

export const BuildingApplicationSchema = z.object({
  permitType: z.enum(Object.values(BuildingPermitType) as any),
  formOfOwnership: z.string().trim().optional(),
  lotNo: z.string().trim().optional(),
  blkNo: z.string().trim().optional(),
  tctNo: z.string().trim().optional(),
  taxDecNo: z.string().trim().optional(),
  street: z.string().trim(),
  barangay: z.string().trim(),
  cityMunicipality: z.string().trim(),
  scopeOfWork: z.enum(Object.values(BuildingScopeOfWork) as any).optional(),
  scopeOfWorkSpecify: z.string().trim().nullable().optional(),
  characterOfOccupancy: z.enum(Object.entries(cooGroup).map(([k, v]) => v.name) as any).optional(),
  characterOfOccupancyGroup: z.string().trim().nullable().optional(),
  characterOfOccupancySpecify: z.string().trim().nullable().optional(),
  architectCivilEngineer: z.string().trim().optional(),
  arcAddress: z.string().trim().optional(),
  arcPRCNo: z.string().trim().optional(),
  arcPTRNo: z.string().trim().optional(),
  arcValidity: z.string().date().trim().nullable().optional(),
  arcDateIssued: z.string().date().trim().nullable().optional(),
  arcIssuedAt: z.string().trim().optional(),
  arcTin: z.string().trim().optional(),
  loar: z.string().nullable().optional(),
  loarAddress: z.string().trim().nullable().optional(),
  loarGovId: z.string().trim().nullable().optional(),
  loarDateIssued: z.string().date().trim().nullable().optional(),
  loarPlaceIssued: z.string().trim().nullable().optional(),
});

export const BuildingApplicationSchemaOBO = z.object({
  permitType: z.enum(Object.values(BuildingPermitType) as any),
  areaNo: z.string().trim(),
  formOfOwnership: z.string().trim().optional(),
  lotNo: z.string().trim().optional(),
  blkNo: z.string().trim().optional(),
  tctNo: z.string().trim().optional(),
  taxDecNo: z.string().trim().optional(),
  street: z.string().trim(),
  barangay: z.string().trim(),
  cityMunicipality: z.string().trim(),
  scopeOfWork: z.enum(Object.values(BuildingScopeOfWork) as any).optional(),
  scopeOfWorkSpecify: z.string().trim().nullable().optional(),
  characterOfOccupancy: z.enum(Object.entries(cooGroup).map(([k, v]) => v.name) as any).optional(),
  characterOfOccupancyGroup: z.string().trim().nullable().optional(),
  characterOfOccupancySpecify: z.string().trim().nullable().optional(),
  architectCivilEngineer: z.string().trim().optional(),
  arcAddress: z.string().trim().optional(),
  arcPRCNo: z.string().trim().optional(),
  arcPTRNo: z.string().trim().optional(),
  arcValidity: z.string().date().trim().nullable().optional(),
  arcDateIssued: z.string().date().trim().nullable().optional(),
  arcIssuedAt: z.string().trim().optional(),
  arcTin: z.string().trim().optional(),
  loar: z.string().nullable().optional(),
  loarAddress: z.string().trim().nullable().optional(),
  loarGovId: z.string().trim().nullable().optional(),
  loarDateIssued: z.string().date().trim().nullable().optional(),
  loarPlaceIssued: z.string().trim().nullable().optional(),
  occupancyClassified: z.number().optional(),
  numberOfUnits: z.number().optional(),
  numberOfStorey: z.number().optional(),
  totalFloorArea: z.number().optional(),
  lotArea: z.number().optional(),
  building: z.string().trim().optional(),
  electrical: z.string().trim().optional(),
  mechanical: z.string().trim().optional(),
  electronics: z.string().trim().optional(),
  plumbing: z.string().trim().optional(),
  costOfEquipmentInstalled: z.array(z.number()).optional(),
  totalEstimatedCost: z.number().optional(),
  proposedDateOfConstruction: z.string().date().trim().nullable().optional(),
  expectedDateOfCompletion: z.string().date().trim().nullable().optional(),
});

export const ElectricalApplicationSchema = z.object({
  useNotMyBuildingOwner: z.enum(['yes']).nullable().optional(),
  buildingOwnerFullName: z.string().trim(),
  buildingOwnerAddress: z.string().trim(),
  buildingOwnerCtcNo: z.string().trim(),
  buildingOwnerDateIssued: z.string().date().trim(),
  buildingOwnerPlaceIssued: z.string().trim(),
  loar: z.string().nullable().optional(),
  loarAddress: z.string().trim().nullable().optional(),
  loarCTCNo: z.string().trim().nullable().optional(),
  loarDateIssued: z.string().date().trim().nullable().optional(),
  loarPlaceIssued: z.string().trim().nullable().optional(),
  formOfOwnership: z.string().trim().optional(),
  lotNo: z.string().trim().optional(),
  blkNo: z.string().trim().optional(),
  tctNo: z.string().trim().optional(),
  taxDecNo: z.string().trim().optional(),
  street: z.string().trim(),
  barangay: z.string().trim(),
  cityMunicipality: z.string().trim(),
  scopeOfWork: z.enum(Object.values(ElectricalScopeOfWork) as any).optional(),
  scopeOfWorkSpecify: z.string().trim().nullable().optional(),
  useOrCharacterOfOccupancy: z.string().trim().nullable().optional(),
  electricalEngineer: z.string().trim().optional(),
  eeAddress: z.string().trim().optional(),
  eePRCNo: z.string().trim().optional(),
  eePTRNo: z.string().trim().optional(),
  eeValidity: z.string().date().trim().nullable().optional(),
  eeDateIssued: z.string().date().trim().nullable().optional(),
  eeIssuedAt: z.string().trim().optional(),
  eeTin: z.string().trim().optional(),
})

export const ElectricalApplicationSchemaOBO = z.object({
  epNo: z.string().trim(),
  buildingPermitNo: z.string().trim(),
  buildingOwnerFullName: z.string().trim(),
  buildingOwnerAddress: z.string().trim(),
  buildingOwnerCtcNo: z.string().trim(),
  buildingOwnerDateIssued: z.string().date().trim(),
  buildingOwnerPlaceIssued: z.string().trim(),
  useOrCharacterOfOccupancy: z.string().trim().nullable().optional(),
  scopeOfWork: z.enum(Object.values(ElectricalScopeOfWork) as any).optional(),
  scopeOfWorkSpecify: z.string().trim().nullable().optional(),
  totalConnectedLoad: z.number().optional(),
  totalTransformerCapacity: z.number().optional(),
  totalGeneratorUPSCapacity: z.number().optional(),
  electricalEngineer: z.string().trim().optional(),
  eeAddress: z.string().trim().optional(),
  eePRCNo: z.string().trim().optional(),
  eePTRNo: z.string().trim().optional(),
  eeValidity: z.string().date().trim().nullable().optional(),
  eeDateIssued: z.string().date().trim().nullable().optional(),
  eeIssuedAt: z.string().trim().optional(),
  eeTin: z.string().trim().optional(),
  supervisorTypeOfProfession: z.enum(Object.values(ElectricalSupervisorTypeOfProfession) as any).optional(),
  supervisorFullName: z.string().trim().nullable().optional(),
  supervisorAddress: z.string().trim().nullable().optional(),
  supervisorPRCNo: z.string().trim().nullable().optional(),
  supervisorPTRNo: z.string().trim().nullable().optional(),
  supervisorValidity: z.string().date().trim().nullable().optional(),
  supervisorDateIssued: z.string().date().trim().nullable().optional(),
  supervisorIssuedAt: z.string().trim().nullable().optional(),
  supervisorTin: z.string().trim().nullable().optional(),
  formOfOwnership: z.string().trim().optional(),
  lotNo: z.string().trim().optional(),
  blkNo: z.string().trim().optional(),
  tctNo: z.string().trim().optional(),
  taxDecNo: z.string().trim().optional(),
  street: z.string().trim(),
  barangay: z.string().trim(),
  cityMunicipality: z.string().trim(),
  loar: z.string().nullable().optional(),
  loarAddress: z.string().trim().nullable().optional(),
  loarCTCNo: z.string().trim().nullable().optional(),
  loarDateIssued: z.string().date().trim().nullable().optional(),
  loarPlaceIssued: z.string().trim().nullable().optional(),
})

export const SanitaryApplicationSchema = z.object({
  useNotMyBuildingOwner: z.enum(['yes']).nullable().optional(),
  buildingOwnerFullName: z.string().trim(),
  buildingOwnerAddress: z.string().trim(),
  buildingOwnerCtcNo: z.string().trim(),
  buildingOwnerDateIssued: z.string().date().trim(),
  buildingOwnerPlaceIssued: z.string().trim(),
  loar: z.string().nullable().optional(),
  loarAddress: z.string().trim().nullable().optional(),
  loarCTCNo: z.string().trim().nullable().optional(),
  loarDateIssued: z.string().date().trim().nullable().nullable().optional(),
  loarPlaceIssued: z.string().trim().nullable().optional(),
  scopeOfWork: z.enum(Object.values(SanitaryScopeOfWork) as any).optional(),
  scopeOfWorkSpecify: z.string().trim().nullable().optional(),
  useOrCharacterOfOccupancy: z.string().trim().nullable().optional(),
  sanitaryEngineer1: z.string().trim().optional(),
  se1Address: z.string().trim().optional(),
  se1PRCNo: z.string().trim().optional(),
  se1PTRNo: z.string().trim().optional(),
  se1Validity: z.string().date().trim().nullable().optional(),
  se1DateIssued: z.string().date().trim().nullable().optional(),
  se1IssuedAt: z.string().trim().optional(),
  se1Tin: z.string().trim().optional(),
  sanitaryEngineer2: z.string().trim().optional(),
  se2Address: z.string().trim().optional(),
  se2PRCNo: z.string().trim().optional(),
  se2PTRNo: z.string().trim().optional(),
  se2Validity: z.string().date().trim().nullable().optional(),
  se2DateIssued: z.string().date().trim().nullable().optional(),
  se2IssuedAt: z.string().trim().optional(),
  se2Tin: z.string().trim().optional(),
})

export const SanitaryApplicationSchemaOBO = z.object({
  spNo: z.string().trim(),
  buildingPermitNo: z.string().trim(),
  useOrCharacterOfOccupancy: z.string().trim().nullable().optional(),
  scopeOfWork: z.enum(Object.values(SanitaryScopeOfWork) as any).optional(),
  scopeOfWorkSpecify: z.string().trim().nullable().optional(),
  waterSupply: z.enum(Object.values(SanitaryWaterSupply) as any).optional(),
  waterSupplySpecify: z.string().trim().optional(),
  systemOfDisposal: z.enum(Object.values(SanitarySystemOfDisposal) as any).optional(),
  systemOfDisposalSpecify: z.string().trim().optional(),
  sanitaryEngineer1: z.string().trim().optional(),
  se1Address: z.string().trim().optional(),
  se1PRCNo: z.string().trim().optional(),
  se1PTRNo: z.string().trim().optional(),
  se1Validity: z.string().date().trim().nullable().optional(),
  se1DateIssued: z.string().date().trim().nullable().optional(),
  se1IssuedAt: z.string().trim().optional(),
  se1Tin: z.string().trim().optional(),
  sanitaryEngineer2: z.string().trim().optional(),
  se2Address: z.string().trim().optional(),
  se2PRCNo: z.string().trim().optional(),
  se2PTRNo: z.string().trim().optional(),
  se2Validity: z.string().date().trim().nullable().optional(),
  se2DateIssued: z.string().date().trim().nullable().optional(),
  se2IssuedAt: z.string().trim().optional(),
  se2Tin: z.string().trim().optional(),
  buildingOwnerFullName: z.string().trim().optional(),
  buildingOwnerAddress: z.string().trim().optional(),
  buildingOwnerCtcNo: z.string().trim().optional(),
  buildingOwnerDateIssued: z.string().date().trim().optional(),
  buildingOwnerPlaceIssued: z.string().trim().optional(),
  loar: z.string().nullable().optional(),
  loarAddress: z.string().trim().nullable().optional(),
  loarCTCNo: z.string().trim().nullable().optional(),
  loarDateIssued: z.string().date().trim().nullable().nullable().optional(),
  loarPlaceIssued: z.string().trim().nullable().optional(),
})

export type LoginFormState =
| {
    errors?: {
      role?: string[]
      email?: string[]
      password?: string[]
      credentials?: string[]
    }
    message?: string
  }
| undefined

export type ResponseFormState =
| {
    errors?: {
      role?: string[]
    } & { [key: string]: string[] };
    message?: string,
    success?: boolean
  }
| undefined

export interface UserSessionProp {
  userId: string;
  email: string;
  role: UserRoles;
  position?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  contactNo: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  deactivated: boolean;
  createdAt: Date|string;
  updatedAt: Date|string;
}

export interface SessionPayloadProp extends JWTPayload {
  user: UserSessionProp
  expiresAt: Date|string
}

export type SessionPayload = SessionPayloadProp | undefined


export type AuthenticationStatus = 'authenticated' | 'unauthenticated' | 'loading' | 'error'

export enum Permits {
  BuildingPermit = 'Building Permit',
  ElectricalPermit = 'Electrical Permit',
  SanitaryPermit = 'Sanitary Permit',
}