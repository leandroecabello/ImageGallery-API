const { Schema, model } = require("mongoose");

const photoSchema = new Schema({
  title: String,
  description: String,
  imagePath: String,
});

module.exports = model("Photo", photoSchema);
