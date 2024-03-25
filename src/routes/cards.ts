import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { deleteCardValidator, dislikeCardValidator, likeCardValidator } from '../middlewares/validator';

const router = Router();

// возвращает все карточки из базы
router.get('/', getCards);

// создаёт карточку
router.post('/', createCard);

// удаляет карточку по id
router.delete('/:cardId', deleteCardValidator, deleteCard);

// ставит лайк карточке
router.put('/:cardId/likes', likeCardValidator, likeCard);

// убирает лайк с карточки
router.delete('/:cardId/likes', dislikeCardValidator, dislikeCard);

export default router;
