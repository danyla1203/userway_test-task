/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { RuntimeError } from '../utils/errors/RuntimeError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof RuntimeError) {
    return res.status(err.code).json({ message: err.message, code: err.code });
  }
  return res.status(500).json({ message: 'Internal server error' });
}
