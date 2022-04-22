module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    answers: {
      type: Map,
      of: String,
    },
    questions: {
      type: Array,
    },
  });

  schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const User = mongoose.model("question", schema);
  return User;
};
