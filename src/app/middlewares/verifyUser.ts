import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { BlogModel } from '../modules/blog/blog.model';
import mongoose from 'mongoose';

export const verifyUser = () => {
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
    if(req.params.id){
      const author = await BlogModel.findById(req.params.id).select('author').lean();
      const tokenId = new mongoose.Types.ObjectId(req.user.id);
  
      if (!(author?.author.toString() === tokenId.toString())) {
        throw new AppError(StatusCodes.FORBIDDEN, 'You are not author');
      }
    }
    // check if the user has the required role
    if (!(req.user.role === 'user')) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Only user can perform this action'
      );
    }
     
    next();
  });
};
