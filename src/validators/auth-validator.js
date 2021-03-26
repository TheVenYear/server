import { body, cookie } from 'express-validator';
import createValidator from '../middlewares/validator-middleware';
import jwt from 'jsonwebtoken';

const MESSAGE = 'Неверные email или пароль';

export const signInValidator = createValidator([
  body('email')
    .exists()
    .withMessage('Email не может быть пустым')
    .bail()
    .isEmail()
    .withMessage('Некорректный email')
    .custom(async (email) => {
      if (email !== 'admin@gmail.com') {
        return Promise.reject(MESSAGE);
      }
    }),
  body('password')
    .exists()
    .withMessage('Пароль не может быть пустым')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Минимальная длина пароля 8 символов'),
]);

export const tokenValidator = createValidator(
  [
    cookie('token')
      .exists()
      .withMessage('Токен не предоставлен')
      .bail()
      .custom(async (token, { req }) => {
        await jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
          if (error) {
            return Promise.reject('Некорректный токен');
          }
          req.user = user;
        });
      }),
  ],
  401
);
