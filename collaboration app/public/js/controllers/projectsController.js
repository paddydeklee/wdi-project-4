angular
  .module('collaborator')
  .controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ['$scope', 'Project'];
function ProjectsController($scope, Project){

  var self              = this;
  self.all              = [];
  self.project          = {};
  // self.toggleAddProject = toggleAddProject;
  // self.removeProject    = removeProject;

  // function toggleAddProject(){
  //   $("form#new-project").slideToggle("slow");
  // }

  function getProjects() {
    console.log("gettin da pojex");
    Project.query(function(data){
      self.all = data;
    });
  }

  // function removeProject(project){
  //   $http
  //     .delete('http://localhost:3000/projects/' + project._id)
  //     .then(function(response){
  //       var user = $scope.$parent.users.user;
  //       var index = self.projects.indexOf(project);
  //       user.projects.splice(index, 1);
  //     });
  // }
  getProjects();
}
