var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('LoginController', ['$scope', function($scope) {
    $scope.loginInit = function(loginUser) {
        console.log(loginUser.username + '  ' + loginUser.password);

        Parse.User.logIn(loginUser.username, loginUser.password, {
            success: function(user) {
                alert("Do stuff after successful login.");
            },
            error: function(user, error) {
                alert("The login failed. " + error.message);
            }
        });
    };

    $scope.resetPasswordFunc = function(resetUser) {

        Parse.User.requestPasswordReset(resetUser.resetEmail, {
            success: function() {
                alert("Email Sent to Registered Email Id");
            },
            error: function(error) {
                // Show the error message somewhere
                if(error.code == 205){
                  alert("Email Id not registered. PLease enter correct Email id.");
                }else{
                  alert("Error: " + error.code + " " + error.message);
                }
            }
        });

    }
}]);

myApp.controller('RegisterController', ['$scope', function($scope) {
    $scope.matchPassword = false;
    $scope.registerUserFunc = function(registerUser) {
        console.log(registerUser.email + '  ' + registerUser.password);

        /* Parse Registeration Initiated */

        var user = new Parse.User();
        user.set("username", registerUser.userName);
        user.set("password", registerUser.password);
        user.set("email", registerUser.email);

        user.signUp(null, {
            success: function(user) {
                // Hooray! Let them use the app now.
                alert('User Registered Successfully');
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });

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
        })
        .when('/forgotPassword', {
            templateUrl: 'templates/forgotPassword.html',
            controller: 'LoginController'
        }).
    otherwise({
        redirectTo: '/home'
    });

    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
});

/* Navigation Item*/
var navEle = angular.element(document.querySelector('#nav-tab'));
navEle.on('click', function(evt) {
    angular.element(document.querySelector("li.active")).removeClass("active");
    angular.element(evt.target).parent().addClass("active");
});
