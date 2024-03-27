import { Request, Response, NextFunction } from 'express';
import { StatusCode } from 'status-code-enum';

interface IError {
  statusCode: number;
  message: string;
}

const errorHandler = (
  err: IError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = StatusCode.ServerErrorInternal, message } = err;
  res.status(statusCode).send({
    message: statusCode === StatusCode.ServerErrorInternal ? 'На сервере произошла ошибка' : message,
  });

  next();
};

export default errorHandler;
