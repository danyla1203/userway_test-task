import Shorted from '../db/models/Shorted';
import { redis } from '../db/redis';

export const getShortenedRecord = (url: string) => {
  return Shorted.findOne({ where: { shorted: url } });
};
export const getShortenedRecordByOrigin = (url: string) => {
  return Shorted.findOne({ where: { url } });
};
export const createShortenedRecord = (url: string, shorted: string) => {
  return Shorted.create({ url, shorted });
};

export const getShortenedRecordFromRedis = (url: string) => {
  return redis.get(url);
};
export const saveShortendInRedis = (record: Shorted) => {
  const payload = JSON.stringify({
    id: record.id,
    url: record.url,
    shorted: record.shorted,
  });
  return redis.set(record.shorted, payload, 'EX', 60 * 60 * 24 * 10);
};
