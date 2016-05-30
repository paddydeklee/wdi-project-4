angular
  .module('logging')
  .factory('Project', Project);

Project.$inject = ['$resource', 'API'];
function Project($resource, API){

  return $resource(
    API+'/project/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register': {
        url: API + '/login',
        method: "POST"
      },
      'login': {
        url: API +'/login',
        method: "POST"
      }
    }
  );
}
