angular
  .module('logging', ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

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
    .state('projects', {
      url: "/projects",
      templateUrl: "./js/views/projects/index.html"
    })
    .state('project', {
      url: "/projects/:id",
      templateUrl: "./js/views/projects/show.html",
      controller: function($scope, $stateParams, Project) {
        Project.get({ id: $stateParams.id }, function(res){
          // QUESTION: What does $parent do here
          $scope.$parent.projects.project = res.project;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}