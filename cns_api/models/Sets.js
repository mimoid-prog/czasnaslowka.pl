const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  owner: { type: String, required: true },
  language: { type: String, required: true },
  foreignWords: [{ type: String }],
  polishWords: [{ type: String }]
});

module.exports = mongoose.model("Set", schema);
