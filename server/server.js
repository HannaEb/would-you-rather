const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:8081" }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
