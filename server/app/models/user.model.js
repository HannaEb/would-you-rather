const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
  },
  questions: {
    type: Array,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
