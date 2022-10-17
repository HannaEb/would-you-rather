const db = require("../models");
const User = db.user;
const Role = db.role;

isAdmin = (req, res, next) => {
  User.findById(req.body.authedUserId).exec((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (error, roles) => {
        if (error) {
          res.status(500).send({ message: error });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role." });
        return;
      }
    );
  });
};

const authJwt = {
  isAdmin,
};

module.exports = authJwt;
