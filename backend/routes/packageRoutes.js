const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

router.get("/", packageController.getAllPackages);

router.get("/:id", packageController.getPackage);

router.post("/add_package", packageController.addPackage);

router.patch("/update_package/:id", packageController.update_package);

router.delete("/delete_package/:id", packageController.delete_package);

module.exports = router;
