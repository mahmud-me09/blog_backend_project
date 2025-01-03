import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import { handleZodError } from '../errors/handleZodError';
import { handleMongooseError } from '../errors/handleMongooseError';
import { handleMongooseCastError } from '../errors/handleMongooseCastError';
import { handleDuplicateEntryError } from '../errors/handleDuplicateEntryError';
import AppError from '../errors/AppError';


export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  // setting default value
  let statusCode = err.statusCode || 500;
  const isProduction = config.nodeEnvironment === 'production';
  let message = err.message || 'Something went wrong!';

  let error: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleMongooseCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateEntryError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: isProduction ? undefined : error, // Avoid exposing sensitive data in production
    stack: isProduction ? undefined : err.stack, // Include stack trace only in development

  });
};
