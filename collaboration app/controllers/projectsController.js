var Project = require("../models/project");
var User    = require("../models/user");

function projectsIndex(req, res){
  Project.find({}, function(err, projects) {
    if (err) return res.status(404).json(err);
    console.log(projects);
    res.status(200).json({ projects: projects });
  });
}

function projectsCreate(req, res){
  var project = new Project(req.body.project);

  // Save project
  project.save(function(err){
    if (err) return res.status(500).json(err);
    res.status(201).json({ project: project });
  });
}

function projectsShow(req, res){
  var id = req.params.id;

  Project.findById({ _id: id }, function(err, project) {
    if (err) return res.status(500).json(err);
    if (!project) return res.status(404).json(err);
    res.status(200).json({ project: project });
  });
}

function projectsUpdate(req, res){
  var id = req.params.id;

  Project.findByIdAndUpdate({ _id: id }, req.body.project, function(err, project){
    if (err) return res.status(500).json(err);
    if (!project) return res.status(404).json(err);
    res.status(200).json({ project: project });
  });
}

function projectsDelete(req, res){
  var id = req.params.id;

  Project.remove({ _id: id }, function(err) {
    if (err) return res.status(500).json(err);
    res.status(200).json({});
  });
}

function projectsUploadMultipleFiles(req, res, next){
  if (!req.files) return res.status(500).json({ message: "Something went wrong.1"});

  var filenames = Object.keys(req.files).map(function(key) {
    return req.files[key].location;
  });

  Project
  .findByIdAndUpdate(req.body.project_id, { $pushAll: { files: filenames } }, { new: true }, function(err, project){
    if (err) return res.status(500).json({ message: "Something went wrong.2"});
    return res.status(200).json({ project: project });
  });
}

module.exports = {
  projectsIndex:  projectsIndex,
  projectsCreate: projectsCreate,
  projectsShow:   projectsShow,
  projectsUpdate: projectsUpdate,
  projectsDelete: projectsDelete,
  projectsUploadMultipleFiles: projectsUploadMultipleFiles
};
