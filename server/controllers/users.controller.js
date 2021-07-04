const db = require("../models/db");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenController = require("./tokens.controller");

exports.create = async (req, res) => {
  const { username, password } = req.body;
  const candidate = await User.findOne({
    where: {
      username: username,
    },
  });
  if (candidate) {
    res.send({ message: `Пользователь с логином ${username} уже существует` });
  }

  const passwordHash = await bcrypt.hash(password, 4);
  const user = await User.create({
    username: username,
    password: passwordHash,
  });

  const tokens = tokenController.generateToken({
    id: user.id,
    user: user.username,
  });
  tokenController.saveToken(user.id, tokens.refreshToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 3600 * 1000,
    httpOnly: true,
  });
  res.send({
    user: user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.send({ message: "Пользователь с таким логином не найден" });
  }

  const isPassEquals = await bcrypt.compare(password, user.passwordHash);
  if (!isPassEquals) {
    return res.send({ message: "Неверный пароль" });
  }

  const tokens = tokenController.generateToken({
    id: user.id,
    user: user.username,
  });
  tokenController.saveToken(user.id, tokens.refreshToken);
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 3600 * 1000,
    httpOnly: true,
  });
  res.send({
    user: user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  await tokenController.removeToken(refreshToken);
  res.clearCookie("refreshToken");
  return res.send({ message: "Вы успешно вышли" });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokens = await tokenController.refresh(refreshToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 3600 * 1000,
    httpOnly: true,
  });
  res.send({
    user: user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  return res.send(users);
};
