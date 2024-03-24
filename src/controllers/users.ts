import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import { ConflictError, NotFoundError } from '../middlewares/errors';

// создаёт пользователя
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      if (user) {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) throw new ConflictError('Пользователь с таким email уже существует');
      // console.log(err);
      return next(err);
    });
};

export const login = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findUserByCredentials(req.body.email, req.body.password)
  .then((user) => {
    const { _id } = user;
    const token = jwt.sign({ _id }, config.jwt.secret, { expiresIn: '7d' });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 3600000 * 24,
    });

    res.status(200).send({ token });
  })
  .catch(next);

// Возвращаем всех пользователей
export const getUsers = (_req: Request, res: Response, next: NextFunction) => User.find()
  .then((users) => {
    if (!users) {
      throw new NotFoundError('Зарегистрированных пользователей не найдено');
    }
    res.send(users);
  })
  .catch(next);

// Возвращаем текущего пользователя
export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.body.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Данные не найдены');
    }
    res.send(user);
  })
  .catch(next);

// Возвращаем пользователя по id
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    res.send(user);
  })
  .catch(next);

// обновляет профиль
export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.body.user._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  { new: true },
)
  .then((user) => res.send(user))
  .catch(next);

//  обновляет аватар
export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.body.user._id,
  {
    avatar: req.body.avatar,
  },
)
  .then((user) => res.send(user))
  .catch(next);
