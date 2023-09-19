import { nanoid } from 'nanoid';
import { NotFoundError } from '../utils/errors/NotFound';
import {
  getShortenedRecord,
  createShortenedRecord,
  getShortenedRecordByOrigin,
  saveShortendInRedis,
  getShortenedRecordFromRedis,
} from './shortener.dao';

export const getFullUrl = async (url: string) => {
  const cache = await getShortenedRecordFromRedis(url);
  if (cache) return JSON.parse(cache);

  const item = await getShortenedRecord(url);
  if (!item) {
    throw new NotFoundError('No such url');
  }
  saveShortendInRedis(item);
  return item;
};

export const shortenUrl = async (url: string) => {
  const item = await getShortenedRecordByOrigin(url);
  if (item) return item;

  const hash = nanoid(15);
  const shorted = `http://localhost:3000/${hash}`;

  const record = await createShortenedRecord(url, shorted);
  await saveShortendInRedis(record);
  return record;
};
