const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

const db = require("../models");

const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    avatar: req.body.avatar,
    password: req.body.password,
  });

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((error, user) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        roles: user.roles,
        accessToken: token,
      });
    });
};

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
