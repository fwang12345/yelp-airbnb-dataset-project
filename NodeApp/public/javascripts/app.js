var app = angular.module('angularjsNodejsTutorial', []);
app.controller('loginController', function ($scope, $http) {
  $scope.verifyLogin = function () {
    var request = $http({
      url: '/login',
      method: "GET",
      params: {
        username: $scope.username
      }
    });

    request.success(function (response) {
      if (response.length == 0) {
        console.log("Incorrect username:", $scope.username);
      } else {
        password = response[0].password;
        if (password == $scope.password) {
          console.log("Success");
          window.location.href = "http://localhost:8081/dashboard"
        } else {
          console.log("Incorrect password:", $scope.password);
        }
      }
    });
    request.error(function (err) {
      console.log("error: ", err);
    });
  };
});

app.controller('listingController', function ($scope, $http) {
  $scope.orderBy = ["Name","Price", "Rating"];
  $scope.nums= ["0","1","2","3","4","5","6","7","8","9","10+"];
  $scope.cities = ["Las Vegas", "city2", "city3"];

  $scope.orderByThis = function(order) {
    console.log(order);
  };
});

app.controller('createController', function ($scope, $http) {
  $scope.verifyCreate = function () {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request1 = $http({
      url: '/login',
      method: "GET",
      params: {
        username: $scope.username
      }
    });

    request1.success(function (response) {
      if (response.length != 0) {
        console.log("Username already taken:", $scope.username);
      } else {
        var request2 = $http({
          url: '/create',
          method: "POST",
          data: {
            'username': $scope.username,
            'password': $scope.password
          }
        });

        request2.success(function (response) {
          // success
          console.log(response);
          if (response.result === "success") {
            // After you've written the INSERT query in routes/index.js, uncomment the following line
            window.location.href = "http://localhost:8081/"
          }
        });
        request2.error(function (err) {
          // failed
          console.log("error: ", err);
        });
      };
    });
    request1.error(function (err) {
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
