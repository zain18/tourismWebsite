const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Your First Name"],
    maxlength: 24,
  },
  lastName: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    maxlength: 24,
  },
  email: {
    type: String,
    required: [true, "Please Enter An Email Address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter A Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Please Enter A Password"],
    minlength: [8, "Minimum Password Length Is 8 Characters"],
  },
  role: {
    type: String,
    default: "Basic",
    required: false,
    enum: ["Basic", "Privileged", "Admin"],
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wishlist",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
