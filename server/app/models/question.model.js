const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Question must belong to an author"],
  },
  optionOne: {
    votes: { type: Array },
    text: {
      type: String,
      required: [true, "Please enter first question"],
      trim: true,
    },
  },
  optionTwo: {
    votes: { type: Array },
    text: {
      type: String,
      required: [true, "Please enter second question"],
      trim: true,
    },
  },
});

questionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

questionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "id username",
  });
  next();
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
