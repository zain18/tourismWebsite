const User = require("../models/User");

module.exports.delete_account = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports.update_account = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(updatedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
};
