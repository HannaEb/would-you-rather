const { user } = require("../models");
const db = require("../models");
const User = require("../models/user.model");
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
  // const id = req.params.id;
  const id = req.body.id;
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
  // const qid = req.body.qid;
  const id = req.params.id;
  const authedUser = req.body.data.authedUser;
  const answer = req.body.data.answer;
  let updateBlock = {};

  if (answer === "optionOne") {
    updateBlock = { "optionOne.votes": authedUser };
  } else if (answer === "optionTwo") {
    updateBlock = { "optionTwo.votes": authedUser };
  }

  Question.findByIdAndUpdate(id, {
    $push: updateBlock,
  })
    .then((data) => {
      res.send(data, authedUser, answer);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Sorry, an error has occured. Please try again!",
      });
    });
};
