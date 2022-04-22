module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      timestamp: {
        type: Date,
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
    }
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Question = mongoose.model("question", schema);
  return Question;
};
