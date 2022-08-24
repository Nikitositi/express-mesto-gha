const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: "Ошибка на стороне сервера" });
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
      if (err.errors.name || err.errors.link) {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error("NotFound"))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена", ...err });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервера", ...err });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена", ...err });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервера", ...err });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена", ...err });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервера", ...err });
    });
};
