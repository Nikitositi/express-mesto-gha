const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "Пользователь по указанному id не найден" });
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    res.status(400).send({
      message: "Переданы некорректные данные при создании пользователя",
    });
  } else {
    User.create({ name, about, avatar })
      .then((user) => {
        res.send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  if (!name || !about) {
    res.status(400).send({
      message: "Переданы некорректные данные при обновлении профиля",
    });
  } else {
    User.findByIdAndUpdate(id, { name, about })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .send({ message: "Пользователь по указанному id не найден" });
        }
        res.send(user);
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  if (!avatar) {
    res.status(400).send({
      message: "Переданы некорректные данные при обновлении профиля",
    });
  } else {
    User.findByIdAndUpdate(id, { avatar })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .send({ message: "Пользователь по указанному id не найден" });
        }
        res.send(user);
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};
