import { NextFunction, Request, Response } from 'express';
import UI_ERRORS from '@/constants/uiErrors';

export default class AppError extends Error {
  status: number;
  message: string;
  code: string;

  constructor(status: number, code?: keyof typeof UI_ERRORS, message?: string) {
    super();
    this.status = status;
    this.code = UI_ERRORS[code] || UI_ERRORS['UNEXPECTED_ERROR'];
    this.message = message;
  }
}

export const handleError = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  return res.status(err.status).json({
    status: 'error',
    code: err.code,
    message: err.message,
  });
};
