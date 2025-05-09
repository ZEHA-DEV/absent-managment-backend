import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

const objectIdSchema = z
  .string()
  .nonempty('ID cannot be empty')
  .refine((value) => isValidObjectId(value), { message: 'Invalid MongoDB ObjectId' });

export const createSectionSchema = z.object({
  body: z.object({
    classId: objectIdSchema,
    sectionName: z.string().nonempty('Section name cannot be empty'),
    studentIds: z.array(objectIdSchema).optional(),
  }),
});

export const updateSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
    sectionName: z.string().nonempty('Section name cannot be empty').optional(),
    studentIds: z.array(objectIdSchema).optional(),
  }),
});

export const deleteSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
  }),
});

export const addStudentsToSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
    studentIds: z.array(objectIdSchema).min(1, 'At least one student ID is required'),
  }),
});

export const removeStudentsFromSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
    studentIds: z.array(objectIdSchema).min(1, 'At least one student ID is required'),
  }),
});