var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  files: []
});

module.exports = mongoose.model('Project', projectSchema);
