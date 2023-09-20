import url from 'url';
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
  const fullUrl = url.format({
    protocol: req.protocol,
    host: `localhost:${process.env.PORT}`,
    pathname: req.params.code,
  });

  const cache = await getShortenedRecordFromRedis(fullUrl);
  if (cache) return res.redirect(JSON.parse(cache).url);
  const item = await Shorted.findOne({ where: { shorted: fullUrl } });
  if (item) {
    await saveShortendInRedis(item);
    return res.redirect(item.url);
  } else next(new NotFoundError('Shorted url not found'));
};
