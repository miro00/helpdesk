const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");

router.get("/", articlesController.getAll);
router.get("/category", articlesController.getByCategory);
router.post("/", articlesController.create);
// router.get("/:id", articlesController.getById);
// router.put("/:id", articlesController.update);
// router.delete("/:id", articlesController.delete);

module.exports = router;
