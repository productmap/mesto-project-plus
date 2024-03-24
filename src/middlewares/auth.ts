import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UnauthorizedError from './errors/UnauthorizedError';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedError('Необходима авторизация');

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.jwt.secret);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.body.user = payload;

  // req.body.user = {
  //   _id: '5d8b8592978f8bd835ca8133',
  // };

  next();
};

export default auth;
