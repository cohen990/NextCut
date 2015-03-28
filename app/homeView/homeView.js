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
        $scope.findHairdressers(position);
    }
    $scope.showError = function(positionError){
        x.innerHtml = "Sorry, something went wrong. Please try again later.";
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
            radius: 5000
        };

        service.nearbySearch(request, $scope.printResults)
    }

    $scope.printResults = function(results){
        console.log(results);

        var finding = document.getElementById("finding");

        var innerHtml = "<ul>\n";

        for(var i = 0; i < 3; i++){
            innerHtml +=
            "\t<li>\n" +
            results[i].name + " - " + results[i].vicinity +
            "\n</li>\n";
        }

        innerHtml += "</ul>\n"

        finding.innerHTML = innerHtml;
    }

    $scope.getLocation();
}]);