module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: Sequelize.STRING(120) },
      content: { type: Sequelize.TEXT },
      url: { type: Sequelize.STRING(120) },
      subcategoryId: { type: Sequelize.INTEGER },
      authorId: { type: Sequelize.INTEGER },
    },
    {
      paranoid: true,
    }
  );

  return Article;
};
