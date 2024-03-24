import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

export const updateUserValidator = celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    avatar: Joi.string().required().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
});

export const getUserValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});
