const mongoose = require("mongoose");

let StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, default: "other" },
  className: { type: String, required: true },
  address: { type: String },
  email: { type: String },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", StudentSchema);
