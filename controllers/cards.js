const Card = require("../models/card");
const errors = require("../constants/errors");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) =>
      res
        .status(errors.status.serverError)
        .send({ message: errors.messages.serverError })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errors.names.validationError) {
        res
          .status(errors.status.validationError)
          .send({ message: errors.messages.validationError });
      } else {
        res
          .status(errors.status.serverError)
          .send({ message: errors.messages.serverError });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(errors.status.castError)
          .send({ message: errors.messages.castError });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errors.names.validationError) {
        res
          .status(errors.status.validationError)
          .send({ message: errors.messages.validationError });
      } else {
        res
          .status(errors.status.serverError)
          .send({ message: errors.messages.serverError });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(errors.status.castError)
          .send({ message: errors.messages.castError });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errors.names.validationError) {
        res
          .status(errors.status.validationError)
          .send({ message: errors.messages.validationError });
      } else {
        res
          .status(errors.status.serverError)
          .send({ message: errors.messages.serverError });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(errors.status.castError)
          .send({ message: errors.messages.castError });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === errors.names.validationError) {
        res
          .status(errors.status.validationError)
          .send({ message: errors.messages.validationError });
      } else {
        res
          .status(errors.status.serverError)
          .send({ message: errors.messages.serverError });
      }
    });
};
