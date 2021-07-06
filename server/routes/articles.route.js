const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const loggerMiddleware = require("../middlewares/logger.middleware");
const errorMiddleware = require("../middlewares/error.middleware");

router.use(loggerMiddleware);
router.get("/", articlesController.getAll);
router.get("/category", articlesController.getByCategory);
router.post("/", articlesController.create);
// router.get("/:id", articlesController.getById);
// router.put("/:id", articlesController.update);
// router.delete("/:id", articlesController.delete);

router.use(errorMiddleware);

module.exports = router;
