import * as httpMocks from 'node-mocks-http';
import {
  getFullUrlCntrl,
  shortenUrlCntrl,
} from '../../shortener/shortener.controller';
import { NotFoundError } from '../../utils/errors/NotFound';
import {
  getShortenedRecord,
  getShortenedRecordByOrigin,
} from '../../shortener/shortener.dao';
import Shorted from '../../db/models/Shorted';

jest.mock('../../shortener/shortener.dao');

const mockGetShortenedRecord = jest.mocked(getShortenedRecord);
const mockGetShortenedRecordByOrigin = jest.mocked(getShortenedRecordByOrigin);

describe('Shortener integration | module', () => {
  describe('get full origin url', () => {
    it('should send error if shorted record not found', async () => {
      const req = httpMocks.createRequest({
        query: { url: 'http://localhost:3000/abc' },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await getFullUrlCntrl(req, res, next);
      expect(next).toHaveBeenCalledWith(new NotFoundError('No such url'));
    });
    it('should send item if shorted record found', async () => {
      const recordStub = {
        url: 'http://google.com',
        shorted: 'http://localhost:3000/abc',
      };
      const req = httpMocks.createRequest({
        query: { url: 'http://localhost:3000/abc' },
      });
      const res = httpMocks.createResponse();
      res.json = jest.fn();
      res.status = jest.fn();
      const next = jest.fn();
      mockGetShortenedRecord.mockResolvedValueOnce(recordStub as Shorted);

      await getFullUrlCntrl(req, res, next);
      expect(res.json).toHaveBeenCalledWith(recordStub);
    });
  });
  describe('shorten url', () => {
    it('should send item if url exists', async () => {
      const recordStub = {
        url: 'http://google.com',
        shorted: 'http://localhost:3000/abc',
      };
      const req = httpMocks.createRequest({
        body: { url: 'http://google.com' },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const next = jest.fn();
      mockGetShortenedRecordByOrigin.mockResolvedValueOnce(
        recordStub as Shorted,
      );

      await shortenUrlCntrl(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(recordStub);
    });
  });
});
