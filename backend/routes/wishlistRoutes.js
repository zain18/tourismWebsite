const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/:id", wishlistController.getWishlist);

router.post("/create", wishlistController.createWishlist);

router.patch("/add/:id", wishlistController.addToWishlist);

router.patch("/remove/:id", wishlistController.removeFromWishlist);

router.get("/get_total/:id", wishlistController.getWishlistTotal);

module.exports = router;
