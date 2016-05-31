angular
  .module('collaborator')
  .controller('projectsNewController', ProjectsNewController);

ProjectsNewController.$inject = ['Upload', 'API', 'Project', '$state'];
function ProjectsNewController(Upload, API, Project, $state){
  var vm = this;

  vm.file = null;
  vm.files = null;

  vm.create = function(){
    Project.save({ project: vm.project }).$promise.then(function(data){
      vm.uploadMulti(data);
    });
  };

  vm.uploadMulti = function(data) {
    Upload.upload({
      url: API + '/upload/multi',
      // what is the array key for??
      arrayKey: '', // IMPORTANT: without this multer will not accept the files
      data: {
        files: vm.files,
        project_id: data.project._id
      }
    })
    .then(function(res) {
      $state.go("projectsShow", {id: data.project._id});
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  // vm.uploadSingle = function() {
  //   Upload.upload({
  //     url: API + '/upload/single',
  //     data: { file: vm.file }
  //   })
  //   .then(function(res) {
  //     console.log("Success!");
  //     console.log(res);
  //   })
  //   .catch(function(err) {
  //     console.error(err);
  //   });
  // };
}
