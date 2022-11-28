const mongoose = require("mongoose");

const { DB_URL = `mongodb://localhost:27017/wouldyourather` } = process.env;

mongoose
  .connect(process.env.MONGODB_URI || DB_URL, {
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
