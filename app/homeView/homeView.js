'use strict';

angular.module('myApp.homeView', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'HomeViewController'
  });
}])

.controller('HomeViewController', ['$scope', '$location', function($scope, $location)  {
    var finding = document.getElementById("finding");

    $scope.found = false;

    $scope.searchResults = [];

    $scope.limit = 3;

    $scope.getLocation = function() {
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
        var render = document.getElementById("map-canvas");
        var service = new google.maps.places.PlacesService(render);
        var request = {
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            types: ["hair_care"],
            rankBy: google.maps.places.RankBy.DISTANCE
        };

        service.nearbySearch(request, $scope.printResults)
    }

    $scope.printResults = function(results){
        var results = $scope.getAllImages(results);
        var results = $scope.getAllPhoneNumbers(results);

        console.log(results);
        console.log("Hi")
        $scope.searchResults = results;
        $scope.found = true;
        $scope.$apply();
    }

    $scope.show3More = function(){
        $scope.limit += 3;
    }

    $scope.getAllImages = function(results){
        for (var i = 0; i < results.length; i++) {
            if(results[i].photos){
                for (var j = 0; j < results[i].photos.length; j++) {
                    results[i].photos[j].url = results[i].photos[j].getUrl({maxHeight:160, maxWidth:160});
                };
            }
        };

        return results;
    }

    $scope.getAllPhoneNumbers = function(results){
        for (var i = 0; i < results.length; i++) {
            if(results[i].formatted_phone_number){
                results[i].phoneNumber = results[i].formatted_phone_number;
            }
            else if(results[i].international_phone_number){
                results[i].phoneNumber = results[i].international_phone_number;
            }
        };

        return results;
    }

    $scope.goToMap = function(latitude, longitude){
        $location.path("/mapView/" + latitude + "/" + longitude);
    }

    $scope.getLocation();
}]);