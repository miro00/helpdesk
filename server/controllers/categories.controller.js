const db = require("../models/db");
const Category = db.categories;
const Op = db.Sequelize.Op;
const ApiError = require("../errors/api.error");

exports.create = async (req, res, next) => {
  try {
  const { name, url } = req.body;

  const checkName = await Category.findOne({
    where: {
      name: name,
    },
  });
  if (checkName) {
    return res
      .status(400)
      .send({ message: "Категория с таким названием уже существует" });
  }

  const checkUrl = await Category.findOne({
    where: {
      url: url,
    },
  });
  if (checkUrl) {
    return res
      .status(400)
      .send({ message: "Категория с таким URL уже существует" });
  }

  const category = await Category.create({
    name: name,
    url: url,
  });
  res.status(200).send(category);
} catch(e) {
  next(e)
}
};

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAndCountAll({
      include: [
        {
          model: db.subcategories,
          as: "subcategories",
          include: [
            {
              model: db.articles,
              as: "articles",
            },
          ],
        },
      ],
    });
    if (!categories) res.status(404).send("Категории не найдены");
    res.status(200).send(categories);
  } catch(e) {
    next(e)
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id);
  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send({ message: "Категория не найдена" });
  }
};

exports.update = async (req, res) => {
  const { name, url } = req.body;
  const id = req.params.id;
  const category = await Category.findByPk(id);
  if (!category) {
    return res.status(404).send({ message: "Категория не найдена" });
  }
  await category.update({
    name: name,
    url: url,
  });
  const updatedCategory = await category.save();
  res.status(200).send(updatedCategory);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id);
  if (!category) {
    return res.status(404).send({ message: "Категория не найдена" });
  }
  await category.destroy();
  const deletedCategory = await category.save();
  res.status(200).send(deletedCategory);
};
