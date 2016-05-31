angular
  .module('collaborator')
  .service("TokenService", TokenService);

//the tokenservice needs the jwt helper injected so that it can decode tokens
//note window below has $ prefix because it could otherwise get confused with the actual window,
// QUESTION: what is window in this case if not the real window? why is it called window...
// GUESS: not sure ... because the token is temp saved to the window?

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper){

// set self to be this so it can be used in functions below
  var self = this;
  // set up functions and assign to the Token Service controller
  self.setToken = setToken;
  self.getToken = getToken;
  self.removeToken = removeToken;
  self.decodeToken = decodeToken;

  function setToken(token){
    return $window.localStorage.setItem("auth-token", token);
  }

  function getToken(){
    return $window.localStorage.getItem("auth-token");
  }

  function removeToken(){
    return $window.localStorage.removeItem("auth-token");
  }

  function decodeToken(){
    var token = self.getToken();
    if (token) {
      var decodedUser = jwtHelper.decodeToken(token);
      return decodedUser ? decodedUser._doc : null;
    }
  }
}
