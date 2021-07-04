module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    refreshToken: {
      type: Sequelize.STRING(200),
    },
  });

  return Token;
};
