'use strict';

angular.module('myApp.homeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'HomeViewController'
  });
}])

.controller('HomeViewController', ['$scope', function($scope)  {
    var x = document.getElementById("finding");

    $scope.getLocation = function() {
        console.log("hi");
        if (navigator.geolocation) {
            var id = navigator.geolocation.watchPosition($scope.showPosition, $scope.showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    $scope.showPosition = function(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    }
    $scope.showError = function(positionError){
        x.innerHtml = "Sorry, something went wrong. Please try again later.";
    }


    $scope.initialize = function() {
        console.log("maps");
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    $scope.getLocation();
    $scope.initialize();
}]);