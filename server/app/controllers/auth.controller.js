const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, avatar, password } = req.body;
  const user = await User.create({
    username,
    avatar,
    password,
  });

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      res.status(400).send({ message: "Missing username or password" })
    );
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(
      res.status(401).send({ message: "Incorrect username or password" })
    );
  }

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
    return next(
      res.status(401).send({ message: "Please log in to continue." })
    );
  }

  // Use Node's build-in promisify to return promise from jwt.verify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(res.status(401).send({ message: "User no longer exists." }));
  }

  // Allow access to route
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // User data comes from verifyToken middleware
    if (!roles.includes(req.user.role)) {
      return next(
        res
          .status(403)
          .send({ message: "Not authorized to perform this action." })
      );
    }
    next();
  };
};
