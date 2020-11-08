const User = require("../models/User");
require("dotenv/config");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    res.status(201).json(user);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email && password) {
      const user = await User.findOne({ email: email, password: password });
      res.status(200).json(user);
      req.session.user = user;
      res.redirect("/");
    } else {
      res.json({ Error: "Invalid email or password" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
