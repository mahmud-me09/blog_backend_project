import { z } from 'zod';

const CreateUserValidationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
const loginUserValidationSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export const UserValidationSchema = {
  CreateUserValidationSchema,
  loginUserValidationSchema,
};
