import { Request, Response } from 'express';
import { shortenUrlValidation } from './shorterUrl.validation';

const reqGenerator = (body?: { url?: string }) => {
  return {
    req: { body } as Request,
    res: {} as Response,
    next: jest.fn(),
  };
};

describe('shortenUrlValidation | middleware', () => {
  it('should throw an error if no body is provided', () => {
    const { req, res, next } = reqGenerator();
    expect(() => shortenUrlValidation(req, res, next)).toThrow(
      'No body provided',
    );
  });
  it('should throw an error if no url is provided', () => {
    const { req, res, next } = reqGenerator({});
    expect(() => shortenUrlValidation(req, res, next)).toThrow(
      'No url provided',
    );
  });
  it('should throw an error if url is invalid', () => {
    const case1 = reqGenerator({ url: 'Invalid url' });
    expect(() =>
      shortenUrlValidation(case1.req, case1.res, case1.next),
    ).toThrow('Invalid url');

    const case2 = reqGenerator({ url: 'htps://www.google.com' });
    expect(() =>
      shortenUrlValidation(case2.req, case2.res, case2.next),
    ).toThrow('Invalid url');

    const case3 = reqGenerator({ url: 'https://' });
    expect(() =>
      shortenUrlValidation(case3.req, case3.res, case3.next),
    ).toThrow('Invalid url');

    const case4 = reqGenerator({ url: 'https:www.google' });
    expect(() =>
      shortenUrlValidation(case4.req, case4.res, case4.next),
    ).toThrow('Invalid url');

    const case5 = reqGenerator({ url: 'https//www.google.com' });
    expect(() =>
      shortenUrlValidation(case5.req, case5.res, case5.next),
    ).toThrow('Invalid url');
  });
  it('should call next if url is valid', () => {
    const case1 = reqGenerator({ url: 'https://www.google.com' });
    shortenUrlValidation(case1.req, case1.res, case1.next);
    expect(case1.next).toHaveBeenCalled();

    const case2 = reqGenerator({ url: 'https://test.com' });
    shortenUrlValidation(case2.req, case2.res, case2.next);
    expect(case1.next).toHaveBeenCalled();
  });
});
