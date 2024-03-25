import { NextFunction, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import Card from '../models/card';
import ValidationError from '../middlewares/errors/ValidationError';
import NotFoundError from '../middlewares/errors/NotFoundError';

// Возвращает все карточки
export const getCards = (_req: Request, res: Response, next: NextFunction) => Card.find()
  .then((cards) => res.send(cards))
  .catch(next);

// Создаем карточку
export const createCard = (req: Request, res: Response, next: NextFunction) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.body.user._id,
})
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') throw next(new ValidationError('Некорректные данные'));
    next(err);
  });

// Удаляет карточку по идентификатору
export const deleteCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findOneAndDelete({
  _id: req.params.cardId,
  owner: req.body.user._id,
})
  .then((card) => {
    if (!card) throw next(new ValidationError('операция недоступна'));
    res.status(StatusCode.SuccessCreated).send(card);
  })
  .catch(next);

// Лайкаем карточку
export const likeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) throw next(new NotFoundError('Карточка не найдена'));
    res.send(card);
  })
  .catch(next);

// Дизлайкаем карточку
export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) throw next(new NotFoundError('Карточка не найдена'));
    res.send(card);
  })
  .catch(next);
