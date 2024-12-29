import { Model, Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true }, //– The full name of the user.
  email: { type: String, required: true, unique: true }, //– The email address of the user, used for authentication and communication.
  password: { type: String, required: true }, //– The password for the user, securely stored.
  role: { enum: ['admin', 'user'], required: true, default: 'user' }, //– The role of the user, determining their access level. Default is "user".
  isBlocked: { type: Boolean, required: true, default: false }, //– A flag indicating whether the user is blocked or not. Default is false.
});

const x = 20

export const UserModel = model<TUser>('user', userSchema);
