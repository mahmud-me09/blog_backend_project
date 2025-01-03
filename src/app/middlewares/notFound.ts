import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound : RequestHandler = (_req:Request, res:Response, next:NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'API not found !!!',
    error: '',
  });
  next()
};

export default notFound;
