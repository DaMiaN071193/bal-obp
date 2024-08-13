import { Schema, model, models, type Document } from 'mongoose';
import 'server-only';
import { FileDocument } from './interfaces';

const GovIdSchema = new Schema({
  file: {
    type: Buffer,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true,
  }
},
{
  timestamps: true
})

export default models?.GovId || model<FileDocument & Document>('GovId', GovIdSchema)