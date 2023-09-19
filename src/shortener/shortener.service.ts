import { nanoid } from 'nanoid';
import { NotFoundError } from '../utils/errors/NotFound';
import { getShortenedRecord, createShortenedRecord } from './shortener.dao';

export const getFullUrl = async (url: string) => {
  const item = await getShortenedRecord(url);
  if (!item) {
    throw new NotFoundError('No such url');
  }
  return item;
};

export const shortenUrl = async (url: string) => {
  const item = await getShortenedRecord(url);
  if (item) return item;

  const hash = nanoid(15);
  const shorted = `http://localhost:3000/${hash}`;

  return createShortenedRecord(url, shorted);
};
