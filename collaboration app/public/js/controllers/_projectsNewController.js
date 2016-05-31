angular
  .module('collaborator')
  .controller('projectsNewController', ProjectsNewController);

ProjectsNewController.$inject = ['Upload', 'API', '$http', 'Project'];
function ProjectsNewController(Upload, API, $http, Project){
  var vm = this;

  vm.file = null;
  vm.files = null;

  vm.create = function(){
    Project.save({ project: vm.project }).$promise.then(function(data){
      console.log(data);
    });
  };

  vm.uploadSingle = function() {
    Upload.upload({
      url: API + '/upload/single',
      data: { file: vm.file }
    })
    .then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  vm.uploadMulti = function() {
    Upload.upload({
      url: API + '/upload/multi',
      // what is the array key for??
      arrayKey: '', // IMPORTANT: without this multer will not accept the files
      data: { files: vm.files }
    })
    .then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  };
}
