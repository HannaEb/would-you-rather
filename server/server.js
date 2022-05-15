const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    init();
  })
  .catch((error) => {
    console.log("Cannot connect to database", error);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app!" });
});

require("./app/routes/question.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const init = () => {
  Role.estimatedDocumentCount((error, count) => {
    if (!error && count === 0) {
      new Role({
        name: "user",
      }).save((error) => {
        if (error) {
          console.log("error", error);
        }
        console.log("Added 'user' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((error) => {
        if (error) {
          console.log("error", error);
        }
        console.log("Added 'admin' to roles collection");
      });
    }
  });
};
