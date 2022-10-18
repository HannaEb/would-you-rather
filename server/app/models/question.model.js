const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  optionOne: {
    votes: { type: Array },
    text: { type: String, required: true },
  },
  optionTwo: {
    votes: { type: Array },
    text: { type: String, required: true },
  },
});

questionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
