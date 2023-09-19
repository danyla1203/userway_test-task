import { RuntimeError } from './RuntimeError';

export class NotFoundError extends RuntimeError {
  constructor(message: string) {
    super(404, message);
  }
}
