const db = require("../models");
const User = db.user;
const Role = db.role;

const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    avatar: req.body.avatar,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (error, roles) => {
          if (error) {
            res.status(500).send({ message: error });
            return;
          }
          user.roles = roles.map((role) => role.id);
          user.save((error) => {
            if (error) {
              res.status(500).send({ message: error });
              return;
            }
            res.send(user);
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (error, role) => {
        if (error) {
          res.status(500).send({ message: error });
          return;
        }
        user.roles = [role.id];
        user.save((error) => {
          if (error) {
            res.status(500).send({ message: error });
            return;
          }
          res.send(user);
        });
      });
    }
  });
};

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
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        answers: user.answers,
        questions: user.questions,
        roles: authorities,
        accessToken: token,
      });
    });
};
