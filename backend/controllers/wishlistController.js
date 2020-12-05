const Wishlist = require("../models/Wishlist");
const Package = require("../models/Package");

// Get user's wishlist packages
module.exports.getWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ user_id: id });
    const packages = await Package.find({
      _id: { $in: wishlist.packages },
    });
    res.json(packages);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports.getWishlistTotal = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ user_id: id });
    const packages = await Package.find({
      _id: { $in: wishlist.packages },
    });
    let total = 0;
    packages.forEach((pack) => (total = total + parseInt(pack.price)));
    res.json(total);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Create a wishlist for the user
module.exports.createWishlist = async (req, res) => {
  const { user_id } = req.body;
  const wishlist = Wishlist.create({ user_id });
  try {
    const savedWishlist = await wishlist.save();
    res.json(savedWishlist);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Add a package to user's wishlist
module.exports.addToWishlist = async (req, res) => {
  const { user_id } = req.body;
  const package_id = req.params.id;
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user_id: user_id },
      { $push: { packages: package_id } },
      { returnOriginal: false, upsert: true }
    );
    res.json(updatedWishlist);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Remove a package from user's wishlist
module.exports.removeFromWishlist = async (req, res) => {
  const { user_id } = req.body;
  const package_id = req.params.id;
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user_id: user_id },
      { $pull: { packages: package_id } }
    );
    res.json(updatedWishlist);
  } catch (err) {
    res.json({ error: err.message });
  }
};
