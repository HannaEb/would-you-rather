const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Username unavailable"],
      maxlength: [15, "Username must be less than 16 characters"],
    },
    avatar: {
      type: String,
      required: [true, "Please select an avatar"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      select: false,
    },
    answers: {
      type: Array,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
userSchema.virtual("questions", {
  ref: "Question",
  foreignField: "author",
  localField: "_id",
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
