const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
  },
});

module.exports = mongoose.model("wishlist", WishlistSchema);
