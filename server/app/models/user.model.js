const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username."],
    unique: true,
    maxlength: 15,
  },
  avatar: {
    type: String,
    required: [true, "Please select an avatar."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    select: false,
  },
  answers: {
    type: Array,
  },
  questions: {
    type: Array,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Hash password asynchronously with cost of 10 (security level)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare entered password with hashed password
userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
