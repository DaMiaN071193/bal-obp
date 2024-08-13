import 'server-only'
import { Schema, models, model, type Document } from 'mongoose'
import { type FileDocument } from './interfaces'

const FileSchema = new Schema({
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
    required: true
  }
},
{
  timestamps: true
})

export default models?.File || model<FileDocument & Document>('File', FileSchema)