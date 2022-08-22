const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link) {
    res.status(400).send({
      message: "Переданы некорректные данные при создании карточки",
    });
  } else {
    Card.create({ name, link, owner })
      .then((card) => {
        if (!card) {
          res
            .status(404)
            .send({ message: "Карточка с указанным id не найдена" });
        }
        res.send(card);
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка с указанным id не найдена" });
      }
      res.send(card);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  if (!req.params.cardId) {
    res.status(400).send({
      message: "Переданы некорректные данные для постановки лайка",
    });
  } else {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .then((card) => {
        if (!card) {
          res
            .status(404)
            .send({ message: "Передан несуществующий id карточки" });
        }
        res.send(card);
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.dislikeCard = (req, res) => {
  if (!req.params.cardId) {
    res.status(400).send({
      message: "Переданы некорректные данные для снятия лайка",
    });
  } else {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .then((card) => {
        if (!card) {
          res
            .status(404)
            .send({ message: "Передан несуществующий id карточки" });
        }
        res.send(card);
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};
