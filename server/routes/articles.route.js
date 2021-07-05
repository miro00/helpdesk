const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const loggerMiddleware = require("../middlewares/logger.middleware")

router.use(loggerMiddleware)
router.get("/", articlesController.getAll);
router.get("/category", articlesController.getByCategory);
router.post("/", articlesController.create);
// router.get("/:id", articlesController.getById);
// router.put("/:id", articlesController.update);
// router.delete("/:id", articlesController.delete);

module.exports = router;
