---
title: Authentication with Angular
type: lesson
duration: "2:00"
creator:
    name: Alex Chin
    city: LDN
competencies: Front-end frameworks
---

# Authentication with Angular

### Objectives
*After this lesson, students will be able to:*

- Authenticate a front-end app with Angular
- Pass JWT tokens to an API
- Restrict access to pages using ng-show & ng-hide

### Preparation
*Before this lesson, students should already be able to:*

- Describe the concepts behind token-based authentication
- Used jsonwebtoken in a Node application
- Built an Angular form

## Peruse Our API - Demo (10 mins)

Let's take a look at our starter API. We have a JWT protected Express application with one resource of users.

#### Securing All Endpoints, Save Two

Previously, only certain API endpoints were secured, but we've secured all our endpoints now – except `POST` to `login` and `POST` to `register`.

```javascript
app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));
```

While we're checking it out, take a minute to create a few new user in your database using Insomnia. 

**Note:** You need to make sure that you run your API with:

```bash
$ npm install
$ nodemon
```

### **_CHANGE API TO INCLUDE PASSWORD CONFIRMATION_**


#### Getting An Auth Token

We're using JWTs, of course, and the way you get one is by `POST`ing to either `/login` or `/register`.

Here's a quick diagram to help refresh your memory on how JWTs work:

![image](https://s3.amazonaws.com/f.cl.ly/items/0P1m1X0L1a01333F2z21/Image%202015-10-25%20at%208.58.28%20PM.png)

In this API, a user can verify their identity by providing their **email** and a **password**.

## Test the API - Codealong (5 mins)

Firstly, we'l test out our API to see how creating a user works. Open up Insomnia and make a new POST request to `http://localhost:3000/api/register` with the following data: 

```
{
  "username": "alexpchin",
  "fullname": "Alex Chin",
  "image": "http://fillmurray.com/300/300", 
  "email": "alex@alex.com",
  "password": "password",
  "passwordConfirmation": "password"
}
```

The object returned from insomnia is a new user object with a jwt included, which can be used on the front-end to authenticate the user. 

## Angular set-up

We're not starting from scratch, we've got some starter-code to give us a headstart.

#### External Resources

Let's first have a look at the script tags that have been required:

- [Angular](https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js)
- [NgMessages](https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-messages.js)
- [Ui.router](http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.js)
- [NgResource](http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js)

The only _new_ library is for decoding JWT's with Angular - I bet you could have guessed that!

- [Angular-JWT](https://cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js)

#### Internal Resources

Next, let's look at the internal Angular files that have been included here (some are empty!)

- `js/app.js`, for setting up our Angular module
- `js/models/user.js`, a User resource class
- `js/controllers/usersController.js`, a User controller

There is an empty directory for services.

#### States

If we open up our `app.js` file, we can see that we have a number of states being defined with ui.router:

```js
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
    });

  $urlRouterProvider.otherwise("/");
```
#### Forms

Our login register (signup) forms' inputs are all linked up with the `ng-model` called `users.user`, which we can see in our `usersController` is being defined as `null`:

```
self.user = null;
```

Both forms also call `ng-submit` actions in the `usersController`:

- `users.login()`, for the login form
- `users.register()`, for the signup form

#### Controller

Our users controller contains a method to get all the users using ngResource, as we have already seen, as well as some empty methods that will be defined later on.

#### Startup the code

Let's now turn this starter code on and see what it does!

You need to make sure you run your front-end code either with `http-server` or with the python command:

```bash
$ python -m SimpleHTTPServer
```

Now go into the browser and make sure there aren't any errors, and we're ready to begin!

## Login and register

To login and register in our app, we need to make POST requests to `http://localhost:3000/api/register` (register) and `http://localhost:3000/api/login` (login) with the correct details in order for the API to return a valid token. 



#### Defining the methods

At the moment, our User resource only has the default, built-in methods:

```javascript
{ 'get':       { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: true},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' }
}
```

So now we need to add these two custom methods to the resource: 

```javascript
{ 'get':       { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: false},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' },
  'register': {
    url: API +'/register',
    method: "POST"
  },
  'login':      {
    url: API + '/login',
    method: "POST"
  }
}
```

Next, we need to use these new methods inside the functions being called by the login and register forms. As we saw earlier, these are the login and register methods in our users controller. Both forms are modelling the `self.user` property in the users controller.

For login, we can define the following method: 

```javascript
function login() {
	User.login(self.user, handleLogin, handleError);
}
```

We can see this login method takes three arguments: 

1. The data the api needs to login
2. A callback for when the login is successful (handleLogin)
3. A callback for when it isn't (handleError). 

Using the same idea, we can write the following for the register method: 

```javascript
function register() {
	User.register(self.user, handleLogin, handleError);
}
```

#### The success callback

Now we need to define the handleLogin function, telling the app what to do when the API returns a success. Firstly, lets check it is correctly linked up by adding the following: 

```javascript
function handleLogin(res) {
	console.log(res);
}
```

Now lets test our site. On refresh, there should be a console log of the following showing the full response from the API.

<img width="1260" alt="screen shot 2016-05-19 at 16 20 11" src="https://cloud.githubusercontent.com/assets/14276331/15400468/8791b408-1de3-11e6-8b26-6a9da4a239c1.png">

Now lets replace that function with one that handles the token being returned from the API. This function now needs to do the following:

- Check if a token is present
- If there is, save it to local storage
- Save the current user using this token.

```javascript
function handleLogin(res) {
	console.log(res);

	var token = res.token ? res.token : null
	if (token) {
		// save the token in local storage
		// save the current user with the token
	}
}
```

We'll fill in that pseudocode in a minute!

## Intercepting HTTP requests - Codealong (15 mins)

All HTTP requests from our site need to be watched and intercepted. For this, we can create an interceptor for authentication, which works like a bouncer at a club, ensuring all people entering are allowed to be there. This is the part that will handle the JWTs in the request/response cycle.

- The **outgoing** requests need to have tokens added to their headers.
- The **incoming** requests need to be checked for tokens so that they can be saved.

We need to make a new service to manage this special job. We're going to call it `authInterceptor.js`.

```bash
$ touch js/services/authInterceptor.js
```

And include that in the HTML too:

```html
<script type="text/javascript" src="js/services/authInterceptor.js"></script>
```

Now we are going to write a factory for the authentication system. Write the following to set up the factory.

```javascript
angular
  .module('logging')
  .factory('authInterceptor', AuthInterceptor)
  
AuthInterceptor.$inject = ["API"];  
function AuthInterceptor(API) {
}
```

This service needs to follow a very specific pattern in order for it to work. We need to return an object with two functions as properties: one called `request` and one called `response`.

```javascript
return {
  request: function(config){
    return config;
  },

  response: function(res){
  	 console.log(res);
  	 return res;
  }
}
```

Next, we need to tell the $http service (the underlying code that handles API requests) to add our new AuthInterceptor to its list of interceptors. This means the code will be run every time $http is used. We do this by adding it to the $httpProvider. 

Change the app.js file to look like this: 

```
angular
  .module('logging', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
```

If we now refresh the page in the browser, we should see a console log of the response from the api. Nifty!

<img width="1210" alt="screen shot 2016-05-19 at 16 22 25" src="https://cloud.githubusercontent.com/assets/14276331/15400428/64d9c6c6-1de3-11e6-811e-26f10a5cd3cf.png">

#### Checking for tokens

In the `response` function, we need to check if there is a token in the response of the API. 

We can do this like this:

```javascript
response: function(res) { 
  console.log(res);
  
  if (res.config.url.indexOf(API) === 0 && res.data.token) {
    console.log("***Interceptor***", res.data.token)
  }
  return res;
}
```

Here we are checking that the url the response is coming from is our own API (the one we have setup as the constant `API` in app.js), and that there is a token in the response. We can check this is working by trying to login using our form - there should be a console log of the token.

## Storing the token - Codealong (15 mins)

Now that we can login, logout, and signup, we want to be able to access the restricted resources. To do this, we need to be passing the token that is stored in `localStorage` in the headers of our API requests to the restricted endpoints.

There are lots of ways to save this token but we're going to use **localStorage**.

Let's create a new service to manage saving and deleting of tokens. We're going to call it `tokenService`.

```bash
$ touch js/services/tokenService.js
```

And include it in our HTML:

```html
<script type="text/javascript" src="js/services/tokenService.js"></script>
```

Inside our new service, we need to add some boilerplate code, it should be familiar by now:

```javascript
angular
  .module('logging')
  .service('TokenService', TokenService)

function TokenService() {
}
```

Now, in order access localStorage, we need to inject a service called [`$window`](https://docs.angularjs.org/api/ng/service/$window). Despite the fact that the `window` global variable is accessible anywhere, `$window` is used as a reference inside angular to ensure it plays nice with the rest of the angular components. It can be thought of as a carbon copy of the usual javascript `window`.

```javascript
TokenService.$inject = ["$window"];
function TokenService($window){
  ...
```

Before we move any further, let's namespace `this` inside this constructor function as `self`, and define the functions we'll need to use inside this service.

```javascript
function TokenService($window){
  var self = this;
  
  self.setToken = setToken;
  self.getToken = getToken;
  self.removeToken = removeToken;
  self.decodeToken = decodeToken;
  
  function setToken(){
  
  }
  
  function getToken(){
  
  }
  
  function removeToken(){
  
  }
  
  function decodeToken(){
  
  }
}
```

The set token function needs to save a token received from the API in local storage, which we can do with the following code:

```javascript
function setToken(token){
  return $window.localStorage.setItem('auth-token', token);
}
```

#### Set Token inside Auth Interceptor

Now we can insert our setToken function into our interceptor, enabling us to save tokens when they are received from the API. Our AuthInterceptor must now look like this:

```javascript
angular
  .module('logging')
  .factory('authInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API', 'TokenService'];
function AuthInterceptor(API, TokenService) {

  return {
    request: function(config){
      return config;
    },
    response: function(res){
      console.log(res);

      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
```

Here we are injecting our newly written token service into the interceptor so we can use it's setToken function if there is a token present.

#### Get Token inside Auth Interceptor

Now the response for the interceptor is sorted, we complete the request. In this case, we need to do the following when we send a request to the API: 

1. Get the token from local storage
2. If there is one, set it as the header for the request.

Inside our token service file, change the getToken function to look like this:

```javascript
function getToken() {
  return $window.localStorage['auth-token'];
}
```

This function is simply getting the token from the window. Next, we need to include this logic in the request of our interceptor by changing the response function to be the following:

```javascript
request: function(config) {
  var token = TokenService.getToken();

  if (config.url.indexOf(API) === 0 && token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
},
```

Here we are setting an `Authorization` header with the request containing `Bearer` and the token: you may remember this syntax from our previous work with APIs. 

We now have the ability to save tokens received from the API, and send them back with requests as headers. Now we just need to tell the app how to use them.

## The Current User

We can use the token from our API to work out who is our current user, and go and get all of the data for that user from the API. For this, we need to create a current user service. Start by creating the file in our services folder:

```bash
$ touch js/services/currentUser.js
```

And include it in our HTML:

```html
<script type="text/javascript" src="js/services/currentUser.js"></script>
```

Inside this file, add the following boilerplate for a service called current user: 

```javascript
angular
  .module('logging')
  .service("CurrentUser", CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){
	var self = this;
	self.getUser = getUser;
	self.clearUser = clearUser;
	self.user = getUser();
	
	function getUser() {
		return self.user ? self.user : TokenService.decodeToken();
	}
	
  	function clearUser() {
  	
  	}
}
```

Here we have included the token service that we wrote to handle our token in local storage. We now have two empty functions which will go and get the current user from local storage and clear the user when necessary. This will allow us to show and request information for the page depending on who is logged in. For example, a homepage with information specific to the logged in user will need to use this. 

We have also called the getUser function, so that when the page is refreshed, the currentUser will still be stored.

#### Decode token

In order to save the current user's information in a variable, we need to decode the JWT that is stored in local storage. We will use a module called `jwtHelper`, which will need to be injected: 

```javascript
TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper){
...
```

To do this, inside our token service change the decodeToken function to do the following:
 
1. Get the token
2. If it is valid, decode it using the `jwtHelper`
3. Return the decoded data

```javascript
function decodeToken() {
  var token = self.getToken();
  if (token) {
    var decodedUser = jwtHelper.decodeToken(token);
    return token ? decodedUser._doc : null;
  }
}
```

#### Checking if the user is logged in

We can now use the current user service to check if a user is logged in in the users controller, so the information on the page can be changed depending on authentication. This means we need to inject the current user service into the controller, and change our "checkLoggedIn" function to use the service. Our users controller will now look like this:

```
angular
  .module('logging')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser'];
function UsersController(User, CurrentUser){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null
    if (token) {
      // save the token in local storage
      // save the current user with the token
    }
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}
```

Now we are correctly checking for a logged in user, we need to alter our views so certain information is showed and hidden. We can do this using `ng-show` and `ng-hide`, starting with our navbar: 

```html
 <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
   <ul class="nav navbar-nav navbar-right">
     <li ng-show="users.checkLoggedIn()">
       <a href="#" ui-sref="users">Users</a>
     </li>
     <li ng-hide="users.checkLoggedIn()">
       <a href="#" ui-sref="login">Login</a>
     </li>
     <li ng-hide="users.checkLoggedIn()">
       <a href="#" ui-sref="register">Register</a>
     </li>
     <li ng-show="users.checkLoggedIn()">
       <a href="#"ui-sref="home" ng-click="users.logout()">Logout</a>
     </li>
   </ul>
 </div>
```

The site now has two states - logged in and logged out, and the nav bar changes depending on this status. All that is left is for the logout button to work!

## Logging out

The logout link on the navbar is already linked up to a logout function using ng-click. All we need to do is define this function in the users controller: 

```javascript
function logout() {
  self.all         = [];
  self.currentUser = null;
  CurrentUser.clearUser();
}
```

As you can see, this function requires the clearUser function from token service, which we will fill in as follows. 

```javascript
function clearUser(){
  TokenService.removeToken();
  self.user = null;
}
```

In that function we are using the removeToken function from our token service, which looks like this:

```javascript
function removeToken() {
  return $window.localStorage.removeItem('auth-token');
}
```
 
Here the chain of functions connected to each other can clearly be seen:

1. The view interacts with the controller
2. The controller interacts with the current user service
3. The current user service relies on the the token service

Now that my friends is nifty. At this point, you should be able to login, logout and register!

## A little more navigation

The final step is to redirect the user around the site depending on whether they are logged in. For this we can use $state, allows us to navigate around the site using the method `$state.go`. 

Firstly, inject `$state` into the users controller so it can be used inside: 

```javascript
UsersController.$inject = ['User', 'CurrentUser', '$state'];
function UsersController(User, CurrentUser, $state){
...
```

Now we need to change our handleLogin function (the successful login callback) to do the following: 

1. Check for a token
2. Get all the users 
3. Redirect to the homepage

```javascript
  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('home');
    }
    self.currentUser = CurrentUser.getUser();
  }
```

## Conclusion (5 mins)
- What does our interceptor do?
- How do we authenticate a request using a token?
- What built-in angular service sends and receives HTTP requests?


