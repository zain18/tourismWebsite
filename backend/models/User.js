const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Your First Name"],
    maxlength: [24, "First Name Is Too Long"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    maxlength: [24, "Last Name Is Too Long"],
  },
  email: {
    type: String,
    required: [true, "Please Enter An Email Address"],
    unique: [true, "This Email Address Already Exists"],
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

userSchema.pre("save", function (after){
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return after(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return after(err);
      this.password = hash;
      after();
    });
  });
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("user", userSchema);

module.exports = User;
