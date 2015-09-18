var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']),CollegeDetails ;

myApp.controller('appCtrl', [ '$scope', '$window', function($scope, $window) {
  
  $scope.isCollapsed = true;
  $scope.backHome = function () {

      var url = "http://" + $window.location.host + "/#/home";
      $window.location.href = url;
  }

}]);

myApp.controller('LoginController', ['$scope', '$window', function($scope, $window) {
    $scope.loginInit = function(loginUser) {
        console.log(loginUser.username + '  ' + loginUser.password);

        Parse.User.logIn(loginUser.username, loginUser.password, {
            success: function(user) {
                alert("Do stuff after successful login.");
                //$window.location.href= "#/main";
                var url = "http://" + $window.location.host + "/#/main";
                $window.location.href = url;
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
                if (error.code == 205) {
                    alert("Email Id not registered. PLease enter correct Email id.");
                } else {
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

myApp.controller('AccordionDemoCtrl', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [{
        title: 'Dynamic Group Header - 1',
        content: 'Dynamic Group Body - 1'
    }, {
        title: 'Dynamic Group Header - 2',
        content: 'Dynamic Group Body - 2'
    }];

    var query = new Parse.Query(CollegeDetails);
    query.exists("name");
    query.find({
        success: function(results) {
            //console.log("Successfully retrieved " + results.length + " scores.");
            $scope.collegeGroups = results;
            //console.log($scope.collegeGroups);
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });

    // $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    // $scope.addItem = function() {
    //   var newItemNo = $scope.items.length + 1;
    //   $scope.items.push('Item ' + newItemNo);
    // };

    $scope.status = {
        isFirstOpen: false,
        isFirstDisabled: false
    };

    $scope.collegeDetailFunc = function(CollegeDetailModal) {
        var collegeDetail = CollegeDetails.createCollege(CollegeDetailModal);
        collegeDetail.save(null, {
            success: function(college) {
                // Execute any logic that should take place after the object is saved.
                alert('College Created: ' + college.name);
                CollegeDetailModal = '';
            },
            error: function(collegeDetail, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });

    }
});

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
        .when('/main', {
            templateUrl: 'templates/main.html',
            controller: 'AccordionDemoCtrl'
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

    /* Navigation Item*/
    var navEle = angular.element(document.querySelector('#nav-tab'));
    navEle.on('click', function(evt) {
        angular.element(document.querySelector("li.active")).removeClass("active");
        angular.element(evt.target).parent().addClass("active");
    });


    /*Parse Object Create */

    // Simple syntax to create a new subclass of Parse.Object.
    //var CollegeDetails = Parse.Object.extend("CollegeDetails");

    // A complex subclass of Parse.Object
    CollegeDetails = Parse.Object.extend("CollegeDetails", {
        // // Instance methods
        // hasSuperHumanStrength: function () {
        //   return this.get("strength") > 18;
        // },
        // Instance properties go in an initialize method
        initialize: function(attrs, options) {
            this.collegeType = "Law College";
        }
    }, {
        // Class methods
        createCollege: function(CollegeDetailModal) {
            var college = new CollegeDetails();
            college.set("name", CollegeDetailModal.collegeName);
            college.set("contact", CollegeDetailModal.collegeContact);
            college.set("homepage", CollegeDetailModal.collegeHomepage);
            return college;
        }
    });
});
