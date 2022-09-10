const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Требуется авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (e) {
    return next(new AuthError('Требуется авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
