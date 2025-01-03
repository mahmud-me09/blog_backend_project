import { TErrorSource, TGenericErrorResponse } from '../interface/error';

export const handleDuplicateEntryError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/dup key: \{ (\w+): "([^"]+)" \}/);
  const field = match && match[1]; 
  const value = match && match[2];
  const statusCode = 400;

  const error: TErrorSource = [
    {
      path: `${field}`,
      message: `{${field}: ${value}} is already exists in the Database`,
    },
  ];

  return {
    statusCode,
    message: 'Duplication Error',
    error,
    success: false,
  };
};
