import { z } from "zod";

const CreateUserValidationSchema = z.object({
  name: z.string(), 
  email: z.string(), 
  password: z.string(), 
  role: z.enum(['admin', 'user']), 
  isBlocked: z.boolean(),
});
const updateUserValidationSchema = z.object({
  name: z.string().optional(), 
  email: z.string().optional(), 
  password: z.string().optional(), 
  role: z.enum(['admin', 'user']).optional(), 
  isBlocked: z.boolean().optional(),
});

export const UserValidationSchema = {
  CreateUserValidationSchema,
  updateUserValidationSchema
};
