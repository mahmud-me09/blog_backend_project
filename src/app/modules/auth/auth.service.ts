import config from '../../config';
import { TUser } from './user.interface';

import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcryptSaltRounds)
  );
  payload.password = hashedPassword;
  const newUser = await UserModel.create(payload);
  return newUser;
};

export const AuthServices = {
  createUserIntoDB,
};