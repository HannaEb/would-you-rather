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
