const mongoose = require("mongoose");
// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     username: String,
//     avatarURL: String,
//     password: String,
//     roles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Role",
//       },
//     ],
//     answers: {
//       type: Map,
//       of: String,
//     },
//     questions: {
//       type: Array,
//     },
//   })
// );

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    password: {
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
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);
module.exports = User;
