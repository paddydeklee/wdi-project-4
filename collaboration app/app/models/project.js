var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  github: String,
  website: String
});

module.exports = mongoose.model('Project', projectSchema);
