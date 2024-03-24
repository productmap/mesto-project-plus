import { Router } from 'express';
import {
  getUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';
import {
  getUserValidator,
  updateAvatarValidator,
  updateUserValidator,
} from '../middlewares/validator';

const router = Router();

// возвращает всех пользователей из базы
router.get('/', getUsers);

// возвращает информацию о текущем пользователе
router.get('/me', getUser);

// возвращает пользователя по id
router.get('/:userId', getUserValidator, getUserById);

// обновляет профиль пользователя
router.patch('/me', updateUserValidator, updateUser);

//  обновляет аватар пользователя
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

export default router;
