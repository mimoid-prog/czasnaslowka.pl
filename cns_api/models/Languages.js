const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  languageName: { type: String, required: true },
  language: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Language", schema);
