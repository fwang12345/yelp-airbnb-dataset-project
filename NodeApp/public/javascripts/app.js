var app = angular.module('angularjsNodejsTutorial', []);
app.controller('loginController', function ($scope, $http) {
  $scope.verifyLogin = function () {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    });

    request.success(function (response) {
      // success
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function (err) {
      // failed
      console.log("error: ", err);
    });
  };
});
app.controller('testControl', function ($scope, $http) {
  $scope.cities = ["Las Vegas", "city2", "city3"];
  $scope.test = function (city) {
    $scope.show = false;
    if (city != undefined && city != null) {
      var request1 = $http.get(`/listing/${city}`);
      request1.success(function (response) {
        // success
        $scope.listing = response;
        $scope.show = true;
      });
      request1.error(function (err) {
        // failed
        console.log("error: ", err);
        $scope.show = false;
      });
      var request2 = $http.get(`/business/${city}`);
      request2.success(function (response) {
        // success
        $scope.business = response;
        $scope.show = true;
      });
      request2.error(function (err) {
        // failed
        console.log("error: ", err);
        $scope.show = false;
      });
    }
  };
});
app.controller('recommendControl', function ($scope, $http) {
  $scope.cities = ["Las Vegas", "city2", "city3"];
  $scope.test = function (city) {
    $scope.show = false;
    if (city != undefined && city != null) {
      var request1 = $http.get(`/listing/${city}`);
      request1.success(function (response) {
        // success
        $scope.listing = response;
        $scope.show = true;
      });
      request1.error(function (err) {
        // failed
        console.log("error: ", err);
        $scope.show = false;
      });
      var request2 = $http.get(`/business/${city}`);
      request2.success(function (response) {
        // success
        $scope.business = response;
        $scope.show = true;
      });
      request2.error(function (err) {
        // failed
        console.log("error: ", err);
        $scope.show = false;
      });
    }
  };
});
// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
