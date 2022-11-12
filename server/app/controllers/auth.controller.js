const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, avatar, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Missing username or password", 400));
  }

  if (!avatar) {
    return next(new AppError("Please select avatar", 400));
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return next(new AppError("Username unavailable", 400));
  }

  const user = await User.create({
    username,
    avatar,
    password,
  });

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Missing username or password", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  // Remove password from output
  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    user,
    accessToken: token,
  });
});

exports.verifyToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get second half of authorization string
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please log in to continue", 401));
  }

  // Use Node's build-in promisify to return promise from jwt.verify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("User does not exist", 401));
  }

  // Allow access to route
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // User data comes from verifyToken middleware
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Not authorized to perform this action", 403));
    }
    next();
  };
};
