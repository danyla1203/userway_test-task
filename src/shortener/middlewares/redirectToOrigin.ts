import { NextFunction, Request, Response } from 'express';
import Shorted from '../../db/models/Shorted';
import { NotFoundError } from '../../utils/errors/NotFound';
import {
  getShortenedRecordFromRedis,
  saveShortendInRedis,
} from '../shortener.dao';

export const redirectToOrigin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  const cache = await getShortenedRecordFromRedis(fullUrl);
  if (cache) return res.redirect(JSON.parse(cache));

  const item = await Shorted.findOne({ where: { shorted: fullUrl } });
  if (item) {
    await saveShortendInRedis(item);
    res.redirect(item.url);
  } else next(new NotFoundError('Shorted url not found'));
};
