const errors = {
  names: {
    validationError: "ValidationError",
    castError: "CastError",
  },
  messages: {
    validationError: "Переданы некорректные данные",
    castError: "Запрашиваемый ресурс не найден",
    serverError: "Ошибка на стороне сервера",
  },
  status: {
    validationError: 400,
    castError: 404,
    serverError: 500,
  },
};

module.exports = errors;
