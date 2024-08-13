import { model, models, Schema, type Document } from 'mongoose';
import 'server-only';
import {
  BuildingPermitType,
  BuildingScopeOfWork,
  cooGroup,
  ElectricalScopeOfWork,
  ElectricalSupervisorTypeOfProfession,
  FiveSetOfElectricalDocumentsEnum,
  FiveSetOfSanitaryDocumentsEnum,
  SanitaryScopeOfWork,
  SanitarySystemOfDisposal,
  SanitaryWaterSupply,
  StatusType,
  TypeOfPermit,
  type ApplicationDocument,
} from './interfaces';

const BuildingPermitSchema = new Schema({
  permitType: {
    type: String,
    enum: BuildingPermitType,
    required: [true, 'Permit Type is required']
  },
  areaNo: String,
  box1: {
    scopeOfWork: {
      name: {
        type: String,
        enum: BuildingScopeOfWork,
        required: [true, 'Scope of Work is required']
      },
      specify: String
    },
    characterOfOccupancy: {
      name: {
        type: String,
        enum: Object.values(cooGroup).map(v => v.name),
        required: [true, 'Character of Occupancy name is required'],
      },
      group: {
        type: String,
        enum: Object.values(cooGroup).map(v => v.group.map(x => x[1])).flat(),
        required: [true, 'Character of Occupancy is required'],
      },
      specify: String,
    },
    occupancyClassified: Number,
    numberOfUnits: Number,
    numberOfStorey: Number,
    totalFloorArea: Number,
    lotArea: Number,
    totalEstimatedCost: Number,
    building: String,
    electrical: String,
    mechanical: String,
    electronics: String,
    plumbing: String,
    costOfEquipmentInstalled: [Number],
    proposedDateOfConstruction: Date,
    expectedDateOfCompletion: Date
  },
  box2: {
    architectCivilEngineer: String,
    date: Date,
    address: String,
    prcNo: String,
    ptrNo: String,
    validity: Date,
    dateIssued: Date,
    issuedAt: String,
    tin: String
  },
  box6: {
    zoningAdministrator: {
      locationalZoningOfLand: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      }
    },
    obo: {
      filinGFee: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      lineAndGrace: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      fencing: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      architectural: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      civilStructural: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      electrical: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      mechanical: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      sanitary: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      plumbing: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      electronics: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      interior: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      surcharges: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      penalties: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
    },
    bfp: {
      fireCodeConstructionTax: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
      hotWorks: {
        account: String,
        basisOfAssessment: String,
        amountDue: Number,
        assessedBy: String,
      },
    }
  }
}, {
  timestamps: true
})

const ElectricalPermitSchema = new Schema({
  epNo: String,
  buildingPermitNo: String,
  box1: {
    scopeOfWork: {
      name: {
        type: String,
        enum: ElectricalScopeOfWork,
        required: [true, 'Scope of Work is required']
      },
      specify: String
    },
    useOrCharacterOfOccupancy: String,
    totalConnectedLoad: Number,
    totalTransformerCapacity: Number,
    totalGeneratorUPSCapacity: Number,
  },
  box2: {
    electricalEngineer: String,
    date: Date,
    address: String,
    prcNo: String,
    ptrNo: String,
    validity: Date,
    dateIssued: Date,
    issuedAt: String,
    tin: String
  },
  box3: {
    supervisorTypeOfProfession: {
      type: String,
      enum: ElectricalSupervisorTypeOfProfession,
    },
    supervisorFullName: String,
    date: Date,
    address: String,
    prcNo: String,
    ptrNo: String,
    validity: Date,
    dateIssued: Date,
    issuedAt: String,
    tin: String
  },
  box6: {
    fiveSetsOfElectricalDocuments: {
      name: {
        type: String,
        enum: FiveSetOfElectricalDocumentsEnum,
      },
      date: Date,
      specify: String,
    }
  },
  box7: {
    progressFlow: {
      electrical: {
        timeIn: Date,
        timeOut: Date,
      },
      others: {
        specify: String,
        timeIn: Date,
        timeOut: Date,
      }
    }
  }
}, {
  timestamps: true
})

const SanitaryPermitSchema = new Schema({
  spNo: String,
  buildingPermitNo: String,
  box1: {
    scopeOfWork: {
      name: {
        type: String,
        enum: SanitaryScopeOfWork,
        required: [true, 'Scope of Work is required']
      },
      specify: String
    },
    useOrCharacterOfOccupancy: String,
  },
  box2: {
    waterSupply: {
      name: {
        type: String,
        enum: SanitaryWaterSupply,
      },
      specify: String,
    },
    systemOfDisposal: {
      name: {
        type: String,
        enum: SanitarySystemOfDisposal,
      },
      specify: String
    }
  },
  box3: {
    sanitaryEngineer: String,
    date: Date,
    address: String,
    prcNo: String,
    ptrNo: String,
    validity: Date,
    dateIssued: Date,
    issuedAt: String,
    tin: String
  },
  box4: {
    sanitaryEngineer: String,
    date: Date,
    address: String,
    prcNo: String,
    ptrNo: String,
    validity: Date,
    dateIssued: Date,
    issuedAt: String,
    tin: String
  },
  box7: {
    fiveSetsOfElectricalDocuments: {
      name: {
        type: String,
        enum: FiveSetOfSanitaryDocumentsEnum,
      },
      specify: String,
    }
  },
  box8: {
    progressFlow: {
      sanitary: {
        timeIn: Date,
        timeOut: Date,
      },
      others: {
        specify: String,
        timeIn: Date,
        timeOut: Date,
      }
    }
  }
}, {
  timestamps: true
})

const StatusSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    required: true
  },
  statusType: {
    type: String,
    enum: StatusType,
    required: true
  },
  rejectReason: {
    type: String,
  }
}, {
  timestamps: true
})

const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  applicationNo: {
    type: String,
    required: [true, 'Application Number is required'],
    unique: true
  },
  typeOfPermit: {
    type: String,
    enum: TypeOfPermit,
    required: [true, 'Type of Permit is required']
  },
  formOfOwnership: String,
  locationOfConstruction: {
    lotNo: String,
    blkNo: String,
    tctNo: String,
    taxDecNo: String,
    street: String,
    barangay: String,
    cityMunicipality: String
  },
  buildingOwner: {
    buildingOwnerFullName: String,
    date: Date,
    address: String,
    ctcNo: String,
    dateIssued: Date,
    placeIssued: String
  },
  representative: {
    lotOwnerAuthorizedRepresentative: String,
    date: Date,
    address: String,
    govId: {
      no: String,
      dateIssued: Date,
      placeIssued: String
    },
    ctc: {
      no: String,
      dateIssued: Date,
      placeIssued: String
    }
  },
  buildingPermit: {
    type: BuildingPermitSchema,
    required: false,
  },
  electricalPermit: {
    type: ElectricalPermitSchema,
    required: false,
  },
  sanitaryPermit: {
    type: SanitaryPermitSchema,
    required: false,
  },
  amountOBO: Number,
  amountMPDC: Number,
  amountBFP: Number,
  mayorsPermit: {
    type: Schema.Types.ObjectId,
    ref: 'MayorsPermit',
  },
  signatories: {
    recommendingApproval: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    permitIssuedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: Date
  },
  status: [StatusSchema]
},
{
  timestamps: true
})


ApplicationSchema.index({ applicationNo: 1 }, { unique: true })


export default models?.Application || model<ApplicationDocument & Document>('Application', ApplicationSchema)