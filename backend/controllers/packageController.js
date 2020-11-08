const Package = require("../models/Package");

module.exports.getPackage = async (req, res) => {
  try {
    const foundPackage = await Package.findOne({ _id: req.params.id });
    res.json(foundPackage);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports.addPackage = async (req, res) => {
  const {
    category,
    details,
    filename,
    title,
    price,
    subtitle,
    showcaseImages,
    description,
  } = req.body;

  try {
    const packageAdd = await Package.create({
      category,
      details,
      title,
      subtitle,
      description,
      price,
      filename,
      showcaseImages,
    });
    res.json(packageAdd);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports.update_package = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(updatedPackage);
  } catch (err) {
    res.json(err.message);
  }
};

module.exports.delete_package = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    res.json(deletedPackage);
  } catch (err) {
    res.json(err.message);
  }
};
