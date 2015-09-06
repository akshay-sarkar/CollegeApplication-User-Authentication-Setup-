var myApp = angular.module('myApp',['ngRoute']);

myApp.controller('LoginController', ['$scope', function($scope) {
  $scope.loginInit = function(user) { 
  	console.log( user.email + '  '+user.password);
  };
}]);

myApp.controller('RegisterController', ['$scope', function($scope) {

  $scope.matchPassword = false;
  $scope.registerUser = function(user) { 
  	console.log( user.email + '  '+user.password);


  };
}]);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/contact', {
    templateUrl: 'templates/contact.html',
    // resolve: {
    //   // I will cause a 1 second delay
    //   delay: function($q, $timeout) {
    //     var delay = $q.defer();
    //     $timeout(delay.resolve, 1000);
    //     return delay.promise;
    //   }
    // }
  })
  .when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'LoginController'
  })
  .when('/register', {
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
  }).
  otherwise({
    redirectTo: '/home'
  });

  // configure html5 to get links working on jsfiddle
  //$locationProvider.html5Mode(true);
});

/* Navigation Item*/
$('#nav-tab').on('click', function(evt){
	$( "#nav-tab" ).find( "li.active" ).removeClass("active");
	$(event.target).parent().addClass("active");
});
