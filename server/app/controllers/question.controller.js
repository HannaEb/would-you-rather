const db = require("../models");
const User = db.user;
const Question = db.question;

exports.create = (req, res) => {
  const userId = req.body.userId;

  const question = new Question({
    author: req.body.author,
    optionOne: {
      text: req.body.optionOneText,
    },
    optionTwo: {
      text: req.body.optionTwoText,
    },
  });

  return User.findByIdAndUpdate(
    userId,
    { $push: { questions: question.id } },
    { new: true, useFindAndModify: false }
  ).then(() => {
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
  const id = req.params.id;
  const authedUser = req.body.data.authedUser;
  const answer = req.body.data.answer;
  let questionUpdateBlock = {};

  if (answer === "optionOne") {
    questionUpdateBlock = { "optionOne.votes": authedUser };
  } else if (answer === "optionTwo") {
    questionUpdateBlock = { "optionTwo.votes": authedUser };
  }

  return User.findByIdAndUpdate(authedUser, {
    $push: { answers: { id: id, answer: answer } },
  }).then(() => {
    Question.findByIdAndUpdate(id, {
      $push: questionUpdateBlock,
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
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Question.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Unable to delete question.",
      });
    });
};
