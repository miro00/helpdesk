const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");
const loggerMiddleware = require("../middlewares/logger.middleware");
const errorMiddleware = require("../middlewares/error.middleware");

router.use(loggerMiddleware);

router.get("/", categoriesController.getAll);
router.post("/", categoriesController.create);
router.get("/:id", categoriesController.getById);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.delete);

router.use(errorMiddleware);

module.exports = router;
