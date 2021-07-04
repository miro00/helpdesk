const db = require("../models/db");
const Subcategory = db.subcategories;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const { name, url, categoryId } = req.body;

  const checkName = await Subcategory.findOne({
    where: {
      name: name,
    },
  });
  if (checkName) {
    return res
      .status(400)
      .send({ message: "Подкатегория с таким названием уже существует" });
  }

  const checkUrl = await Subcategory.findOne({
    where: {
      url: url,
    },
  });
  if (checkUrl) {
    return res
      .status(400)
      .send({ message: "Подкатегория с таким URL уже существует" });
  }

  const subcategory = await Subcategory.create({
    name: name,
    url: url,
    categoryId: categoryId,
  });
  res.status(200).send(subcategory);
};

exports.getAll = async (req, res) => {
  const subcategories = await Subcategory.findAndCountAll({
    include: [
      {
        model: db.articles,
        as: "articles",
      },
    ],
  });
  if (!subcategories) res.status(404).send("Подкатегории не найдены");
  res.status(200).send(subcategories);
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const subcategory = await Subcategory.findByPk(id, {
    include: [
      {
        model: db.articles,
        as: "articles",
      },
    ],
  });
  if (subcategory) {
    res.status(200).send(subcategory);
  } else {
    res.status(404).send({ message: "Подкатегория не найдена" });
  }
};

exports.update = async (req, res) => {
  const { name, url, categoryId } = req.body;
  const id = req.params.id;
  const subcategory = await Subcategory.findByPk(id);
  if (!subcategory) {
    return res.status(404).send({ message: "Подкатегория не найдена" });
  }
  await subcategory.update({
    name: name,
    url: url,
    categoryId: categoryId,
  });
  const updatedSubcategory = await subcategory.save();
  res.status(200).send(updatedSubcategory);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const subcategory = await Subcategory.findByPk(id);
  if (!subcategory) {
    return res.status(404).send({ message: "Подкатегория не найдена" });
  }
  await subcategory.destroy();
  const deletedSubcategory = await subcategory.save();
  res.status(200).send(deletedSubcategory);
};
