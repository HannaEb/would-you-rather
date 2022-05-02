const db = require("../models");
const User = db.user;

exports.findAll = (req, res) => {
  User.find({})
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
