import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../../utils/errors/BadRequest';

export const shortenUrlValidation = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const body = req.body;
  if (!body) throw new BadRequestError('No body provided');
  if (!body.url) throw new BadRequestError('No url provided');

  const urlRegExp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  if (!urlRegExp.test(body.url)) throw new BadRequestError('Invalid url');

  next();
};
