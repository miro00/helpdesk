const db = require("../models/db");
const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

exports.saveToken = async (id, refreshToken) => {
  const tokenData = await db.tokens.findOne({
    where: {
      userId: id,
    },
  });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await tokenData.create({
    userId: id,
    refreshToken: refreshToken,
  });
  return token;
};

exports.removeToken = async (refreshToken) => {
  const tokenData = await db.tokens.destroy({
    where: {
      refreshToken: refreshToken,
    },
  });
  return tokenData;
};

exports.validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

exports.validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

exports.findToken = async (refreshToken) => {
  const tokenData = await db.tokens.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  return tokenData;
};

exports.refresh = async (refreshToken) => {
  if (!refreshToken) {
    return res.status(401);
  }
  const userData = await this.validateAccessToken(refreshToken);
  const tokenFromDB = await this.findToken(refreshToken);
  if (!userData || !tokenFromDB) {
    return res.status(401);
  }
  const tokens = await this.generateToken(...userData);
  await this.saveToken(userData.user, refreshToken);
  return tokens;
};
