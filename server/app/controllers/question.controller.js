const Question = require("../models/question.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const { userId, optionOneText, optionTwoText } = req.body;
  const author = req.user.id;

  const question = await Question.create({
    author,
    optionOne: {
      text: optionOneText,
    },
    optionTwo: {
      text: optionTwoText,
    },
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { questions: question.id } },
    { new: true, useFindAndModify: false }
  );

  res.status(201).json({
    status: "success",
    question,
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  // const id = req.params.id;
  const { id } = req.body;
  const question = await Question.findById(id);

  res.status(200).json({
    status: "success",
    question,
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find({});

  res.status(200).json({
    status: "success",
    questions,
  });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { authedUser, answer } = req.body.data;

  let questionUpdateBlock = {};

  if (answer === "optionOne") {
    questionUpdateBlock = { "optionOne.votes": authedUser };
  } else if (answer === "optionTwo") {
    questionUpdateBlock = { "optionTwo.votes": authedUser };
  }

  const question = await Question.findByIdAndUpdate(id, {
    $push: questionUpdateBlock,
  });

  await User.findByIdAndUpdate(authedUser, {
    $push: { answers: { id, answer } },
  });

  res.status(200).json({
    status: "success",
    question,
    authedUser,
    answer,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Question.findByIdAndRemove(id, {
    useFindAndModify: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
