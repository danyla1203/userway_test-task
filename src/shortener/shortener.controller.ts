import { NextFunction, Request, Response } from 'express';
import { getFullUrl, shortenUrl } from './shortener.service';

export function getFullUrlCntrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const url = req.query.url as string;
  return getFullUrl(url)
    .then((item) => res.json(item))
    .catch(next);
}

export function shortenUrlCntrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const url = req.body.url as string;
  return shortenUrl(url)
    .then((item) => res.status(201).json(item))
    .catch(next);
}
