import { RuntimeError } from './RuntimeError';

export class BadRequestError extends RuntimeError {
  constructor(message: string) {
    super(400, message);
  }
}
