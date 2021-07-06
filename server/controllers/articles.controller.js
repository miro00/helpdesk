const db = require("../models/db");
const Articles = db.articles;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
  try {
    const { title, content, url, subcategoryId } = req.body;

    const checkUrl = await Articles.findOne({
      where: {
        url: url,
      },
    });
    if (checkUrl) {
      return res
        .status(400)
        .send({ message: "Статья с таким URL уже существует" });
    }

    const article = await Articles.create({
      title: title,
      url: url,
      content: content,
      subcategoryId: subcategoryId,
    });
    res.status(200).send(article);
  } catch (e) {
    next(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const articles = await Articles.findAndCountAll();
    if (!articles) res.status(404).send("Статьи не найдены");
    res.status(200).send(articles);
  } catch (e) {
    next(e);
  }
};

exports.getByCategory = async (req, res, next) => {
  try {
    const categoryId = req.query.id;

    const articles = await Articles.findAndCountAll({
      attributes: { exclude: ["deletedAt"] },
      include: [
        {
          model: db.subcategories,
          where: {
            categoryId: categoryId,
          },
        },
      ],
    });
    if (!articles) return res.status(404).send("Статьи не найдены");
    res.status(200).send(articles);
  } catch (e) {
    next(e);
  }
};
