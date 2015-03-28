'use strict';

angular.module('myApp.homeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'HomeViewController'
  });
}])

.controller('HomeViewController', ['$scope', function($scope)  {
    var finding = document.getElementById("finding");

    $scope.found = false;

    $scope.searchResults = [];

    $scope.limit = 3;

    $scope.getLocation = function() {
        console.log("hi");
        if (navigator.geolocation) {
            var id = navigator.geolocation.watchPosition($scope.findHairdressers, $scope.showError);
        } else {
            finding.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    $scope.showError = function(positionError){
        finding.innerHtml = "Sorry, something went wrong. Please try again later.";
    }

    $scope.findHairdressers = function(position) {
        console.log("maps");

        var render = document.getElementById("map-canvas");
        var service = new google.maps.places.PlacesService(render);
        var request = {
            keyword: "hairdressers",
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            radius: 5000,

        };

        service.nearbySearch(request, $scope.printResults)
    }

    $scope.printResults = function(results){
        $scope.searchResults = results;
        $scope.found = true;
        $scope.$apply();

        console.log(results);
    }

    $scope.show3More = function(){
        $scope.limit += 3;
    }

    $scope.getLocation();
}]);