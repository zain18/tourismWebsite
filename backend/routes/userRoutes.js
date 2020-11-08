const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
router.patch("/update/:id", authController.update_account);

router.delete("/delete/:id", userController.delete_account);

router.get("/user/:id", userController.get_account);

module.exports = router;
