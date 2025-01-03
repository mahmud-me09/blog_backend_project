import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

export const verifyAdmin = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Access denied. No token provided'
      );
    }
    // verify token
    const decoded = jwt.verify(token, config.jwtSecret as string);
    req.user = decoded as JwtPayload;
    // check if the user has the required role
    if (!(req.user.role === 'admin')) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You do not have permission to perform this action'
      );
    }
    
    next();
  });
};
