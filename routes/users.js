const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex(),
    }),
  }),
  getUserById,
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?#?$/,
      ),
    }),
  }),
  updateUserAvatar,
);

module.exports = usersRouter;
