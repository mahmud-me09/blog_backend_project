import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';

const createUserIntoDB = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcryptSaltRounds)
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
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  // Remove password from response for security
  user.password = ''; // Clear the password field before returning the user object
  const tokenPayload: JwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(tokenPayload, config.jwtSecret as string, {
    expiresIn: '30d',
  });

  return { token };
};

export const AuthServices = {
  createUserIntoDB,
  loginUserIntoDB,
};
