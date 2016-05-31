angular
  .module('collaborator')
  .controller('projectsIndexController', ProjectsIndexController);

ProjectsIndexController.$inject = ['Project'];
function ProjectsIndexController(Project){

  var vm = this;

  function getProjects() {
    Project.query().$promise.then(function(data){
      vm.all = data.projects;
    });
  }

  getProjects();
}
