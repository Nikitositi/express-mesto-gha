const errors = require("../constants/errors");
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res
        .status(errors.serverError)
        .send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(errors.badRequest).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res
        .status(errors.serverError)
        .send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error("NotFound"))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(errors.badRequest).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(errors.notFound)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      return res
        .status(errors.serverError)
        .send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error("NotFound"))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(errors.badRequest).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(errors.notFound)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      return res
        .status(errors.serverError)
        .send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error("NotFound"))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(errors.badRequest).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(errors.notFound)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      return res
        .status(errors.serverError)
        .send({ message: "Ошибка на стороне сервера" });
    });
};
