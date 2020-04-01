const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  language: { type: String, required: true },
  polishWords: [{ type: String }],
  foreignWords: [{ type: String }],
  icon: { type: String },
  quantityOfWords: { type: String }
});

export default mongoose.model("GuestSet", schema);
