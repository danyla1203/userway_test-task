import { NextFunction, Request, Response } from 'express';
import Shorted from '../../db/models/Shorted';
import { NotFoundError } from '../../utils/errors/NotFound';

export const redirectToOrigin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const item = await Shorted.findOne({ where: { shorted: fullUrl } });
  if (item) res.redirect(item.url);
  else next(new NotFoundError('Shorted url not found'));
};
