const express = require("express");
const router = express.Router();
const subcategoriesController = require("../controllers/subcategories.controller");

router.get("/", subcategoriesController.getAll);
router.post("/", subcategoriesController.create);
router.get("/:id", subcategoriesController.getById);
router.put("/:id", subcategoriesController.update);
router.delete("/:id", subcategoriesController.delete);

module.exports = router;
