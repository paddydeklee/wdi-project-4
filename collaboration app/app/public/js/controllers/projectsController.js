angular
  .module('logging')
  .controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ['$scope', '$http', 'Project'];
function ProjectsController($scope, $http, Project){

  var self              = this;
  self.all              = [];
  self.project          = {};
  self.createProject    = createProject;
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

  function createProject(){
    var data = {
      project: self.project
    };
    data.project.user = $('#username').html();

    $http
      .post('http://localhost:3000/projects', data)
      .then(function(response){
        var user = $scope.$parent.users.user;
        user.projects.push(response.data);
        // toggleAddProject();
        // $('form#new-project').trigger("reset");
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
