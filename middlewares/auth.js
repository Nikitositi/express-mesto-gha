const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const AuthError = require("../errors/AuthError");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError("Требуется авторизация"));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new AuthError("Требуется авторизация"));
  }

  req.user = payload;

  next();
};

module.exports = auth;
