import { Schema, model, models, type Document } from 'mongoose';
import 'server-only';
import { type AssignationDocument } from './interfaces';

const AssignationSchema = new Schema({
  recommendingApproval: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recommending Approval for permit purpose assignation is required'],
  },
  permitIssuedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Permit Issued By is required'],
  },
},
{
  timestamps: true
})

export default models?.Assignation || model<AssignationDocument & Document>('Assignation', AssignationSchema)