const db = require("../models");
const Question = db.questions;

exports.create = (req, res) => {
  const question = new Question({
    author: req.body.author,
    optionOne: {
      text: req.body.optionOneText,
    },
    optionTwo: {
      text: req.body.optionTwoText,
    },
  });

  question
    .save(question)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Sorry, an error has occured. Please try again!",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Question.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Question not found!",
      });
    });
};

exports.findAll = (req, res) => {
  Question.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Sorry, an error has occured!",
      });
    });
};

exports.update = (req, res) => {
  // const qid = req.body.qid
  const qid = req.params.id;
  const authedUser = req.body.authedUser;
  const answer = req.body.answer;
  let updateBlock = {};

  if (answer === "optionOne") {
    updateBlock = { "optionOne.votes": authedUser };
  } else if (answer === "optionTwo") {
    updateBlock = { "optionTwo.votes": authedUser };
  }

  Question.findByIdAndUpdate(qid, {
    $push: updateBlock,
  })
    .then(() => {
      res.send({ message: "Question has been answered" });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Sorry, an error has occured. Please try again!",
      });
    });
};
