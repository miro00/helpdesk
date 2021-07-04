module.exports = (sequelize, Sequelize) => {
  const Subcategory = sequelize.define("subcategory", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(80),
    },
    url: {
      type: Sequelize.STRING(80),
    },
    categoryId: { type: Sequelize.INTEGER },
  });

  return Subcategory;
};
