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

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || process.env.URL, {
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

const authRouter = require("./app/routes/auth.routes");
const userRouter = require("./app/routes/user.routes");
const questionRouter = require("./app/routes/question.routes");

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);

module.exports = app;
