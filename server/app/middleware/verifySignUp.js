const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Username unavailable." });
      return;
    }
    next();
  });
};

checkRoleExists = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Role ${req.body.roles[i]} does not exist.`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRoleExists,
};

module.exports = verifySignUp;
