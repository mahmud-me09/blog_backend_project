import { Error } from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

export const handleMongooseCastError = (
  err: Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const error: TErrorSource = [{
      path: err?.path,
      message: err?.message,
    }]


  return {
    statusCode,
    message: 'Invalid ID',
    error,
    success: false,
  };
};
