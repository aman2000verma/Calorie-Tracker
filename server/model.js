const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  date: Date,
  foodLog: [Object],
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
