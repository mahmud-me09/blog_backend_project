import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';

import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcryptSaltRounds || 10)
  );

  payload.password = hashedPassword;
  const newUser = await UserModel.create(payload);
  return newUser;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // Find user by email
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password'
  );
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid password');
  }

  // Remove password from response for security
  user.password = '';
  return user;
};

export const AuthServices = {
  createUserIntoDB,
  loginUserIntoDB,
};
