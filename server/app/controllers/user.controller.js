const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
  const user = new User({
    username: req.body.username,
    avatarURL: req.body.avatarURL,
  });

  user
    .save(user)
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

exports.findAll = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Sorry, an error has occured!",
      });
    });
};
