import Shorted from '../db/models/Shorted';

export const getShortenedRecord = (url: string) => {
  return Shorted.findOne({ where: { shorted: url } });
};
export const getShortenedRecordByOrigin = (url: string) => {
  return Shorted.findOne({ where: { url } });
};
export const createShortenedRecord = (url: string, shorted: string) => {
  return Shorted.create({ url, shorted });
};
