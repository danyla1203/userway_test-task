import { nanoid } from 'nanoid';
import { getFullUrl, shortenUrl } from './shortener.service';
import {
  createShortenedRecord,
  getShortenedRecord,
  getShortenedRecordByOrigin,
} from './shortener.dao';
import Shorted from '../db/models/Shorted';

jest.mock('./shortener.dao');
jest.mock('nanoid');

const mockGetShortenedRecord = jest.mocked(getShortenedRecord);
const mockCreateShortenedRecord = jest.mocked(createShortenedRecord);
const mockGetShortenedRecordByOrigin = jest.mocked(getShortenedRecordByOrigin);
const mockNanoid = jest.mocked(nanoid);

describe('Shortener service', () => {
  describe('getFullUrl', () => {
    it('should throw not found error if no such url', async () => {
      mockGetShortenedRecord.mockResolvedValueOnce(null);
      await expect(getFullUrl('some url')).rejects.toThrow('No such url');
    });
    it('should return item if url exists', async () => {
      const item = {
        url: 'some url',
        shorted: 'some shorted url',
      };
      mockGetShortenedRecord.mockResolvedValueOnce(item as Shorted);
      await expect(getFullUrl('some url')).resolves.toEqual(item);
    });
  });
  describe('shortenUrl', () => {
    it('should return item if url exists', async () => {
      const item = {
        url: 'some url',
        shorted: 'some shorted url',
      };
      mockGetShortenedRecordByOrigin.mockResolvedValueOnce(item as Shorted);
      await expect(shortenUrl('some url')).resolves.toEqual(item);
    });
    it('should create new item if url does not exist', async () => {
      const expected = {
        url: 'some url',
        shorted: 'some shorted url',
      };
      mockGetShortenedRecordByOrigin.mockResolvedValueOnce(null);
      mockCreateShortenedRecord.mockResolvedValueOnce(expected as Shorted);
      mockNanoid.mockReturnValueOnce('ABC123_fsdfgk13');

      await expect(shortenUrl('some url')).resolves.toEqual(expected);
      expect(mockCreateShortenedRecord).toHaveBeenCalledWith(
        'some url',
        'http://localhost:3000/ABC123_fsdfgk13',
      );
    });
  });
});
