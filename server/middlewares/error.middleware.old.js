const ApiError = require("../errors/api.error");

module.exports = (err, req, res, next) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .send({ message: err.message, errors: err.errors });
  }

  return res.status(500).send({ message: "Непредвиденная ошибка" });
};
