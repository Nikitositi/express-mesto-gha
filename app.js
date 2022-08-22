const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "6301bd629161bb8927011bca",
  };

  next();
});
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
