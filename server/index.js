const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");

const env = process.env.NODE_ENV || "development";
const dbConfig = require("./config/db.config")[env];
const errorMiddleware = require("./middlewares/error.middleware");

const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/db");

db.sequelize
  .sync()
  .then(() => {
    console.log(
      `✔ Подключение к серверу БД ${chalk.yellow(
        dbConfig.DIALECT
      )} успешно установлено`
    );
  })
  .catch((e) => {
    console.error(`❌ Ошибка при подключении БД\n${chalk.red(e)}`);
  });

const baseApiUrl = "/api/";
const categoriesRouter = require("./routes/categories.route");
const subcategoriesRouter = require("./routes/subcategories.route");
const articlesRouter = require("./routes/articles.route");
const usersRouter = require("./routes/users.route");

app.use(`${baseApiUrl}categories`, categoriesRouter);
app.use(`${baseApiUrl}subcategories`, subcategoriesRouter);
app.use(`${baseApiUrl}articles`, articlesRouter);
app.use(`${baseApiUrl}users`, usersRouter);

app.use(errorMiddleware);

app
  .listen(port, () => {
    console.log(`✔ Сервер запущен на порту ${chalk.magenta(port)}`);
  })
  .on("error", (e) => {
    console.error(`❌ Ошибка при запуске сервера\n${chalk.red(e)}`);
  });
