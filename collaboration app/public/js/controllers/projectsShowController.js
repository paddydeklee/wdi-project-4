angular
  .module('collaborator')
  .controller('projectsShowController', ProjectsShowController);

ProjectsShowController.$inject = ['Project', '$stateParams'];
function ProjectsShowController(Project, $stateParams){
  var vm = this;

  Project.get($stateParams).$promise.then(function(data){
    console.log(data.project);
    vm.project = data.project;
  });

}
