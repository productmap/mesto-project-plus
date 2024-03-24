import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

// возвращает все карточки из базы
router.get('/', getCards);

// создаёт карточку
router.post('/', createCard);

// удаляет карточку по id
router.delete('/:cardId', deleteCard);

// ставит лайк карточке
router.put('/:cardId/likes', likeCard);

// убирает лайк с карточки
router.delete('/:cardId/likes', dislikeCard);

export default router;
