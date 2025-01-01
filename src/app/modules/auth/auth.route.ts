import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './user.validator';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidationSchema.CreateUserValidationSchema),
  AuthControllers.createUser
);
// router.post(
//   '/login',
//   validateRequest(UserValidationSchema.loginUserValidationSchema),
//   AuthControllers.loginUser
// );

export const AuthRoutes = router;
