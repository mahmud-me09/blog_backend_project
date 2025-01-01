import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user created successfully',
    data: { _id: result._id, name: result.name, email: result.email },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'logged in successfully',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
