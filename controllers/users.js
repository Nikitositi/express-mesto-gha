const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(400).send({
          message: "Переданы некорректные данные при поиске пользователя",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      res.status(500).send({ message: "Ошибка на стороне сервера" });
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
      if (err.errors.name.name === "ValidatorError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      runValidators: true,
      new: true,
    }
  )
    .orFail(new Error("NotFound"))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.errors.name.name === "ValidatorError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      if (err.message === "NotFound") {
        return res.status(404).send({
          message: "Пользователь по указанному _id не найден",
        });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.errors.name.name === "ValidatorError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      return res.status(500).send({ message: "Ошибка на стороне сервере" });
    });
};
