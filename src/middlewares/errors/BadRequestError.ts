import { StatusCode } from 'status-code-enum';

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.ClientErrorBadRequest;
  }
}
