const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const loggerMiddleware = require("../middlewares/logger.middleware")

router.use(loggerMiddleware)
router.post("/register", usersController.create);

module.exports = router;
