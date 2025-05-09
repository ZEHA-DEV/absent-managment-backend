import mongoose, { Schema, Document } from 'mongoose';

export interface ISection extends Document {
  classId: mongoose.Types.ObjectId;
  sectionName: string; 
  students: mongoose.Types.ObjectId[];
  date: Date;
}

const sectionSchema = new Schema<ISection>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    sectionName: { 
      type: String, 
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

sectionSchema.index({ classId: 1, sectionName: 1 }, { unique: true });
sectionSchema.index({ classId: 1, students: 1 });

export const Section = mongoose.model<ISection>('Section', sectionSchema);