const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).populate({
    path: "questions",
    select: "id",
  });

  res.status(200).json({
    status: "success",
    users,
  });
});
