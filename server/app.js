// Set up dotenv
const dotenv = require("dotenv");
dotenv.config();

// Require Express
const express = require("express");

// Start up an instance of the app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Serve the client build directory for production
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/", "build")));
}

// Connect to database

const db = require("./app/models");

db.mongoose
  .connect(process.env.MONGODB_URI || db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
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

module.exports = app;
