import { Schema, model, models, type Document } from 'mongoose'
import 'server-only'
import { hashPassword } from '../hash'
import { UserRoles, VerificationStatus, type UserDocument } from './interfaces'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email Address already in use'],
    required: [true, 'Email Address is required'],
    validate: {
      validator: function(val: any) {
        if (val && val.includes('@') && val.includes('.') && !val.startsWith('@') && !val.endsWith('@') && !val.endsWith('.')) {
          return true
        }
        return false
      },
      message: 'Not a valid Email Address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: UserRoles,
    required: [true, 'Role is required'],
  },
  position: {
    type: String,
    validate: {
      validator(_: any) {
        if ((this as UserDocument).role !== UserRoles.User) {
          return true
        }
        return false
      },
      message: 'Position is only for Office Administrators'
    }
  },
  emailVerified: {
    status: {
      type: String,
      enum: VerificationStatus,
      default: VerificationStatus.pending
    },
    payload: {
      type: String
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    updatedAt: {
      type: Date,
      default: new Date()
    }
  },
  contactNo: {
    type: String,
    required: [true, 'Contact Number is required'],
    minLength: 13,
    maxLength: 13,
    unique: true,
    validate: {
      validator: function(val: any) {
        if (/^\+639\d{9}$/.test(val)) {
          return true
        }
        return false
      },
      message: 'Not a valid Email Address'
    }
  },
  contactVerified: {
    status: {
      type: String,
      enum: VerificationStatus,
      default: VerificationStatus.pending
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    updatedAt: {
      type: Date,
      default: new Date()
    }
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  middleName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  address: {
    no: String,
    street: {
      type: String,
      required: [true, 'Street is required']
    },
    barangay: {
      type: String,
      required: [true, 'Barangay is required']
    },
    cityMunicipality: {
      type: String,
      required: [true, 'City/Municipality is required']
    },
    province: {
      type: String,
      required: [true, 'Province is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip Code is required']
    }
  },
  govId: {
    no: String,
    dateIssued: Date,
    placeIssued: String,
    photo: {
      type: Schema.Types.ObjectId,
      ref: 'GovId'
    }
  },
  tin: String,
  ctc: {
    no: String,
    dateIssued: Date,
    placeIssued: String
  },
  deactivated: {
    type: Boolean,
    default: false
  },
  notification: {
    type: [
      {
        title: String,
        message: String,
        href: String,
        read: {
          type: Boolean,
          default: false
        },
        date: {
          type: Date,
          default: new Date(),
        }
      }
    ],
    default: []
  },
},
{
  timestamps: true
})

UserSchema.index({ email: 1, contactNo: 1 }, { unique: true })

UserSchema.pre('save', function (next: any) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    hashPassword(user.password, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr)
      }
      user.password = hash
      next()
    })
  } else {
    return next()
  }
})

export default models?.User || model<UserDocument & Document>('User', UserSchema)