const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const PORT = process.env.PORT | 5000;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use("/api", routes);

app.listen(PORT, async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017/tracker");
    console.log(`App running on port ${PORT}`);
    console.log("DB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
