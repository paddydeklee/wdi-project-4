angular
  .module('collaborator')
  .config(MainRouter);

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('projectsIndex', {
      url: "/projects",
      templateUrl: "./js/views/projects/index.html",
      controller: "projectsIndexController",
      controllerAs: "projectsIndex"
    })
    .state('projectsNew', {
      url: "/projects/new",
      templateUrl: "./js/views/projects/new.html",
      controller: "projectsNewController",
      controllerAs: "projectsNew"
    })
    .state('projectsShow', {
      url: "/projects/:id",
      templateUrl: "./js/views/projects/show.html",
      controller: "projectsShowController",
      controllerAs: "projectsShow"
    })
    .state('rendersShow', {
      url: "/projects/:project_id/files/:id",
      templateUrl: "./js/views/renders/show.html",
      controller: "rendersShowController",
      controllerAs: "rendersShow"
    });

  $urlRouterProvider.otherwise("/");
}
