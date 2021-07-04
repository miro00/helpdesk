module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { type: Sequelize.STRING(40) },
    password: { type: Sequelize.STRING(200) },
    roleId: { type: Sequelize.INTEGER },
  });

  return User;
};
