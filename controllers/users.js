const User = require("../models/user");
const errors = require("../constants/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) =>
      res
        .status(errors.status.serverError)
        .send({ message: errors.messages.serverError })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(errors.status.castError)
          .send({ message: errors.messages.castError });
      }
      res.send({ data: user });
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
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

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about })
    .then((user) => {
      if (!user) {
        res
          .status(errors.status.castError)
          .send({ message: errors.messages.castError });
      }
      res.send(user);
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

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar })
    .then((user) => {
      if (!user) {
        res
          .status(errors.status.castError)
          .send({ message: errors.messages.castError });
      }
      res.send(user);
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
