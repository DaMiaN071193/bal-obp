export interface Documents {
  _id?: string
  createdAt?: Date|string|null
  updatedAt?: Date|string|null
}

export interface FileDocument extends Documents {
  file: Buffer|string
  mimeType: string
  size: number
}

export interface NotificationDocument extends Documents {
  title: string
  message: string
  href: string
  read?: boolean
  date?: Date|string|null
}

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
  OBO = 'obo',
  BFP = 'bfp',
  MPDC = 'mpdc',
}

export enum VerificationStatus {
  pending = 'pending',
  approved = 'approved'
}

export interface GovIdDocument extends FileDocument {}

export interface UserDocument extends Documents {
  email: string
  password: string
  role: UserRoles
  position?: string
  emailVerified: {
    status: VerificationStatus
    payload: string
    createdAt: Date|string
    updatedAt: Date|string
  }
  contactNo: string,
  contactVerified: {
    status: VerificationStatus
    createdAt: Date|string
    updatedAt: Date|string
  }
  firstName: string
  middleName?: string
  lastName: string
  address: {
    no?: string
    street: string
    barangay: string
    cityMunicipality: string
    province: string
    zipCode: string
  }
  govId: {
    no?: string,
    dateIssued?: Date|string|null
    placeIssued?: string
    photo?: string|GovIdDocument|null
  }
  tin?: string
  ctc: {
    no?: string
    dateIssued?: Date|string|null
    placeIssued?: string
  }
  deactivated: boolean
  notification: NotificationDocument[]
}

export interface AssignationDocument extends Documents {
  recommendingApproval: string|UserDocument;
  permitIssuedBy: string|UserDocument;
}

export enum TypeOfPermit {
  BuildingPermit = 'building permit',
  ElectricalPermitOnly = 'electrical permit only'
}

export enum BuildingPermitType {
  New = 'new',
  Renewal = 'renewal',
  Amendatory = 'amendatory'
}

export enum BuildingScopeOfWork {
  NewConstruction = 'new construction',
  Renovation = 'renovation',
  Raising = 'raising',
  Erection = 'erection',
  Conversation = 'conservation',
  AccessoryBuilding = 'accessory building/structure',
  Addition = 'addition',
  Repair = 'repair',
  LegalizationOfExistingBuilding = 'legalization of existing building',
  Alteration = 'alteration',
  Moving = 'moving',
  Others = 'others'
}

export interface BuildingPermitScopeOfWork {
  name: BuildingScopeOfWork
  specify: string
}

export enum CharacterOfOccupancyGroupA {
  Single = 'single',
  Duplex = 'duplex',
  ResidentialR1R2 = 'residential r-1, r-2',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupB {
  Hotel = 'hotel',
  Motel = 'motel',
  TownHouse = 'town house',
  Dormitory = 'dormitory',
  BoardingHouseLodgingHouse = 'boarding house / lodging house',
  ResidentialR3R4R5 = 'residential r-3, r-4, r-5',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupC {
  SchoolBuilding = 'school building',
  SchoolAuditoriumGymnasium = 'school auditorium, gymnasium',
  CivicCenter = 'civic center',
  ChurchMosqueTempleChapel = 'church, mosque, temple, chapel',
  ClubHouse = 'club house',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupD {
  HospitalOrSimilar = 'hospital or similar structure',
  HomeForTheAged = 'home for the aged',
  GovernmentOffice = 'government office',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupE {
  Bank = 'bank',
  Store = 'store',
  Shopping = 'shopping center / mall',
  DrinkingDiningEstablishment = 'drinking / dining establishment',
  Shop = 'shop (i.e. dress shop, tailoring, barbershop, etc.)',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupF {
  FactoryPlant = 'factory/plant (using incombustible non-explosive materials)',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupG {
  StorageWarehouse = 'storage/warehouse (for hazardous/highly flammable materials)',
  Factory = 'factory (for hazardous/highly flammable materials)',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupH {
  TheaterAuditorium = 'theater, auditorium, convention hall, grandstand/bleacher',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupI {
  ColiseumSportsComplex = 'coliseum, sports complex, convention center and similar structure',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupJ1 {
  BarnGranary = 'barn, granary, poultry house, piggery, grain mill, grain silo',
  Others = 'others'
}

export enum CharacterOfOccupancyGroupJ2 {
  PrivateCarportGarage = 'private carport/garage, tower, swimming pool, fence over 1.80m, steel/concrete tank',
  Others = 'others'
}

export type BuildingPermitCharacterOfOccupancy =
  | {
      name: 'residential (dwellings)'
      group: CharacterOfOccupancyGroupA
      specify?: string
    }
  | {
      name: 'residential'
      group: CharacterOfOccupancyGroupB
      specify?: string
    }
  | {
      name: 'educational & recreational'
      group: CharacterOfOccupancyGroupC
      specify?: string
    }
  | {
      name: 'institutional'
      group: CharacterOfOccupancyGroupD
      specify?: string
    }
  | {
      name: 'commercial'
      group: CharacterOfOccupancyGroupE
      specify?: string
    }
  | {
      name: 'light industrial'
      group: CharacterOfOccupancyGroupF
      specify?: string
    }
  | {
      name: 'medium industrial'
      group: CharacterOfOccupancyGroupG
      specify?: string
    }
  | {
      name: 'assembly (occupant load less than 1,000)'
      group: CharacterOfOccupancyGroupH,
      specify?: string
    }
  | {
      name: 'assembly (occupant load 1,000 or more)'
      group: CharacterOfOccupancyGroupI
      specify?: string
    }
  | {
      name: 'agricultural'
      group: CharacterOfOccupancyGroupJ1
      specify?: string
    }
  | {
      name: 'accessories'
      group: CharacterOfOccupancyGroupJ2
      specify?: string
    }

export const cooGroup = {
  'groupA': {
    name: 'residential (dwellings)',
    group: Object.entries(CharacterOfOccupancyGroupA)
  },
  'groupB': {
    name: 'residential',
    group: Object.entries(CharacterOfOccupancyGroupB),
  },
  'groupC': {
    name: 'educational & recreational',
    group: Object.entries(CharacterOfOccupancyGroupC),
  },
  'groupD': {
    name: 'institutional',
    group: Object.entries(CharacterOfOccupancyGroupD),
  },
  'groupE': {
    name: 'commercial',
    group: Object.entries(CharacterOfOccupancyGroupE),
  },
  'groupF': {
    name: 'light industrial',
    group: Object.entries(CharacterOfOccupancyGroupF),
  },
  'groupG': {
    name: 'medium industrial',
    group: Object.entries(CharacterOfOccupancyGroupG),
  },
  'groupH': {
    name: 'assembly (occupant load less than 1,000)',
    group: Object.entries(CharacterOfOccupancyGroupH),
  },
  'groupI': {
    name: 'assembly (occupant load 1,000 or more)',
    group: Object.entries(CharacterOfOccupancyGroupI),
  },
  'groupJ1': {
    name: 'agricultural',
    group: Object.entries(CharacterOfOccupancyGroupJ1),
  },
  'groupJ2': {
    name: 'accessories',
    group: Object.entries(CharacterOfOccupancyGroupJ2),
  }
}

export interface BuildingPermitProcessingAndEvaluationColumns {
  account?: string
  basisOfAssessment?: string
  amountDue?: number
  assessedBy?: string
}

export interface BuildingPermitDocument extends Documents {
  permitType: BuildingPermitType
  areaNo?: string
  box1: {
    scopeOfWork: BuildingPermitScopeOfWork
    characterOfOccupancy?: BuildingPermitCharacterOfOccupancy
    occupancyClassified?: number
    numberOfUnits?: number
    numberOfStorey?: number
    totalFloorArea?: number
    lotArea?: number
    totalEstimatedCost?: number
    building?: string
    electrical?: string
    mechanical?: string
    electronics?: string
    plumbing?: string
    costOfEquipmentInstalled?: number[]
    proposedDateOfConstruction?: Date|string|null
    expectedDateOfCompletion?: Date|string|null
  }
  box2: {
    architectCivilEngineer?: string
    date?: Date|string|null
    address?: string
    prcNo?: string
    ptrNo?: string
    validity?: Date|string|null
    dateIssued?: Date|string|null
    issuedAt?: string
    tin?: string
  }
  box6: {
    zoningAdministrator: {
      locationalZoningOfLand: BuildingPermitProcessingAndEvaluationColumns
    }
    obo: {
      filinGFee: BuildingPermitProcessingAndEvaluationColumns
      lineAndGrace: BuildingPermitProcessingAndEvaluationColumns
      fencing: BuildingPermitProcessingAndEvaluationColumns
      architectural: BuildingPermitProcessingAndEvaluationColumns
      civilStructural: BuildingPermitProcessingAndEvaluationColumns
      electrical: BuildingPermitProcessingAndEvaluationColumns
      mechanical: BuildingPermitProcessingAndEvaluationColumns
      sanitary: BuildingPermitProcessingAndEvaluationColumns
      plumbing: BuildingPermitProcessingAndEvaluationColumns
      electronics: BuildingPermitProcessingAndEvaluationColumns
      interior: BuildingPermitProcessingAndEvaluationColumns
      surcharges: BuildingPermitProcessingAndEvaluationColumns
      penalties: BuildingPermitProcessingAndEvaluationColumns
    }
    bfp: {
      fireCodeConstructionTax: BuildingPermitProcessingAndEvaluationColumns
      hotWorks: BuildingPermitProcessingAndEvaluationColumns
    }
  }
}

export enum ElectricalScopeOfWork {
  NewInstallation = 'new installation',
  AnnualInspection = 'annual inspection',
  Temporary = 'temporary',
  ReconnectionOfServiceEntrance = 'reconnection of service entrance',
  SeparationOfServiceEntrance = 'separation of service entrance',
  UpgradingOfServiceEntrance = 'upgrading of service entrance',
  RelocationOfServiceEntrance ='relocation of service entrance',
  Others = 'others'
}

export interface ElectricalPermitScopeOfWork {
  name: ElectricalScopeOfWork
  specify?: string
}

export enum ElectricalSupervisorTypeOfProfession {
  None = '',
  ProfessionalElectricalEngineer = 'professional electrical engineer',
  RegisteredElectricalEngineer ='registered electrical engineer',
  RegisteredMasterElectrician = 'registered master electrician',
}

export enum FiveSetOfElectricalDocumentsEnum {
  ElectricalPlansAndSpecifications = 'electrical plans and specifications',
  SpecialFixturesAndEquipment = 'special fixtures and equipment',
  ProposedStartingDateOfInstallationConstruction = 'proposed starting date of installation construction',
  ExpectedDateOfCompletionInstallationConstruction = 'expected date of completion installation construction',
  Others = 'others'
}

export interface ElectricalPermitDocument extends Documents {
  epNo?: string
  buildingPermitNo?: string
  box1: {
    scopeOfWork: ElectricalPermitScopeOfWork
    useOrCharacterOfOccupancy?: string
    totalConnectedLoad?: number
    totalTransformerCapacity?: number
    totalGeneratorUPSCapacity?: number
  }
  box2: {
    electricalEngineer?: string
    date?: Date|string|null
    address?: string
    prcNo?: string
    ptrNo?: string
    validity?: Date|string|null
    dateIssued?: Date|string|null
    issuedAt?: string
    tin?: string
  }
  box3: {
    supervisorTypeOfProfession?: ElectricalSupervisorTypeOfProfession
    supervisorFullName?: string
    date?: Date|string|null
    address?: string
    prcNo?: string
    ptrNo?: string
    validity?: Date|string|null
    dateIssued?: Date|string|null
    issuedAt?: string
    tin?: string
  }
  box6: {
    fiveSetsOfElectricalDocuments: {
      name?: FiveSetOfElectricalDocumentsEnum,
      date?: Date|string|null,
      specify?: string,
    }
  }
  box7: {
    progressFlow: {
      electrical: {
        timeIn?: Date|string|null
        timeOut?: Date|string|null
      }
      others?: {
        specify: string
        timeIn?: Date|string|null
        timeOut?: Date|string|null
      }
    }
  }
}

export enum SanitaryScopeOfWork {
  NewConstruction = 'new construction',
  Renovation = 'renovation',
  Raising = 'raising',
  Erection = 'erection',
  Conversion = 'conversion',
  Demolition = 'demolition',
  Addition = 'addition',
  Repair = 'repair',
  AccessoryBuilding = 'accessory building/structure',
  Alteration = 'alteration',
  Moving = 'moving',
  Others = 'others'
}

export interface SanitaryPermitScopeOfWork {
  name: SanitaryScopeOfWork
  specify?: string
}

export enum SanitaryWaterSupply {
  ShallowWell = 'shallow well',
  DeepWellPumpSet = 'deep well & pump set',
  CityMunicipalityWaterSystem = 'city/municipality water system',
  Others = 'others'
}

export interface SanitaryPermitWaterSupply {
  name?: SanitaryWaterSupply,
  specify?: string
}

export enum SanitarySystemOfDisposal {
  WasteWaterTreatmentPlant = 'waste water treatment plant',
  ImhoffTank = 'imhoff tank',
  SanitarySewerConnection = 'sanitary sewer connection',
  SubSurfaceSandFilter = 'sub-surface sand filter',
  SurfaceDrainage = 'surface drainage',
  StreetCanal = 'street canal',
  WaterCourse = 'water course',
  Others = 'others'
}

export enum FiveSetOfSanitaryDocumentsEnum {
  SanitaryPlansAndSpecifications = 'sanitary plans and specifications',
  BillOfMaterials = 'bill of materials',
  CostEstimates = 'cost estimates',
  Others = 'others'
}

export interface SanitaryPermitSystemOfDisposal {
  name: SanitarySystemOfDisposal,
  specify?: string
}

export interface SanitaryPermitDocument extends Documents {
  spNo?: string
  buildingPermitNo?: string
  box1: {
    scopeOfWork: SanitaryPermitScopeOfWork
    useOrCharacterOfOccupancy?: string
  }
  box2: {
    waterSupply: SanitaryPermitWaterSupply
    systemOfDisposal: SanitaryPermitSystemOfDisposal
  }
  box3: {
    sanitaryEngineer?: string
    date?: Date|string|null
    address?: string
    prcNo?: string
    ptrNo?: string
    validity?: Date|string|null
    dateIssued?: Date|string|null
    issuedAt?: string
    tin?: string
  }
  box4: {
    sanitaryEngineer?: string
    date?: Date|string|null
    address?: string
    prcNo?: string
    ptrNo?: string
    validity?: Date|string|null
    dateIssued?: Date|string|null
    issuedAt?: string
    tin?: string
  }
  box7: {
    fiveSetsOfSanitaryDocuments: {
      name?: FiveSetOfSanitaryDocumentsEnum,
      specify?: string,
    }
  }
  box8: {
    progressFlow: {
      sanitary: {
        timeIn?: Date|string|null
        timeOut?: Date|string|null
      }
      others?: {
        specify: string
        timeIn?: Date|string|null
        timeOut?: Date|string|null
      }
    }
  }
}

export enum StatusType {
  Pending = 'pending',
  Approved = 'approved',
  Rejected ='rejected',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface ApplicationStatus extends Documents {
  name: string
  messages: string
  step: number
  statusType: StatusType
  rejectReason?: string
}

export interface ApplicationDocument extends Documents {
  user: string|UserDocument
  applicationNo: string
  typeOfPermit: TypeOfPermit
  formOfOwnership: string
  locationOfConstruction: {
    lotNo?: string
    blkNo?: string
    tctNo?: string
    taxDecNo?: string
    street?: string
    barangay?: string
    cityMunicipality?: string
  }
  buildingOwner: {
    buildingOwnerFullName?: string
    date?: Date|string|null
    address?: string
    ctcNo?: string
    dateIssued?: Date|string|null
    placeIssued?: string
  }
  representative: {
    lotOwnerAuthorizedRepresentative?: string
    date?: Date|string|null
    address?: string
    govId?: {
      no?: string,
      dateIssued?: Date|string|null,
      placeIssued?: string
    }
    ctc?: {
      no?: string
      dateIssued?: Date|string|null
      placeIssued?: string
    }
  }
  buildingPermit?: BuildingPermitDocument
  electricalPermit?: ElectricalPermitDocument
  sanitaryPermit?: SanitaryPermitDocument
  amountOBO?: number
  amountMPDC?: number
  amountBFP?: number
  mayorsPermit: string|FileDocument
  signatories: {
    recommendingApproval?: UserDocument|string
    permitIssuedBy?: UserDocument|string
    date?: Date|string|null
  }
  status: ApplicationStatus[]
}

