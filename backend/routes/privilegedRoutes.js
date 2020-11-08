const express = require("express");
const router = express.Router();
const privilegedController = require("../controllers/adminController");
const { checkIfPrivileged } = require("../middleware/privilegedMiddleware");

router.use(checkIfPrivileged);

router.get("/get_user/:id", privilegedController.getUser);

module.exports = router;
