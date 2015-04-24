'use strict';

angular.module('myApp.resultsView', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'resultsView/resultsView.html'
  });
}])

.controller('ResultsController', ['$scope', '$location', function($scope, $location)  {
    var finding = document.getElementById("finding");

    $scope.found = false;
    $scope.searching = false;
    $scope.postcode;
    $scope.searchResults = [];
    $scope.limit = 10;

    // $scope.getLocation = function() {
    //     if(localStorage["originLatitude"] && localStorage["originLongitude"]){
    //         $scope.findHairdressers();
    //     }
    //     else{
    //         if (navigator.geolocation) {
    //             $scope.searching = true;
    //             navigator.geolocation.getCurrentPosition(
    //                  $scope.storeLatidudeLongitude,
    //                  $scope.showError,
    //                  {
    //                     timeout:30000,
    //                     maximumAge: 60000,
    //                     enableHighAccuracy:true
    //                 });
    //         } else {
    //             finding.innerText = "Geolocation is not supported by this browser.";
    //         }
    //     }
    // }

    // $scope.showError = function(positionError){
    //     $scope.searching = false;
    //     $scope.$apply();
    //     console.log(positionError);
    //     if(positionError.code === 1){
    //         finding.innerText = "You need to allow us to use your position. Please change your device settings or do a postcode search.";
    //     }
    //     if(positionError.code === 3){
    //         finding.innerText = "Sorry, your request has timed out. Please try again later.";
    //     }
    //     else{
    //         finding.innerText = "Sorry, something has gone wrong. Please try again later.";
    //     }
    // }

    // $scope.storeLatidudeLongitude = function(position) {
    //     localStorage["originLatitude"] = position.coords.latitude;
    //     localStorage["originLongitude"] = position.coords.longitude;
    //     $scope.findHairdressers();
    // }

    $scope.findHairdressers = function() {
        $scope.searching = true;
        $scope.postcode = localStorage["csj-postcode"]
        console.log(localStorage["originLatitude"])
        var render = document.getElementById("empty-map-canvas");
        var service = new google.maps.places.PlacesService(render);
        var request = {
            location: {
                lat: parseFloat(localStorage["originLatitude"]),
                lng: parseFloat(localStorage["originLongitude"])
            },
            types: ["hair_care"],
            rankBy: google.maps.places.RankBy.DISTANCE,
            openNow: true
        };

        service.nearbySearch(request, $scope.printResults)
    }

    $scope.printResults = function(results){
        $scope.searching = false;
        var results = $scope.getAllImages(results);
        var results = $scope.getAllPhoneNumbers(results);
        $scope.searchResults = results;
        $scope.found = true;
        $scope.$apply();
    }

    $scope.show3More = function(){
        $scope.limit += 10;
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
        localStorage["destinationLatitude"] = latitude;
        localStorage["destinationLongitude"] = longitude;
        $location.path("/map");
    }

    // $scope.getLocation();
    $scope.findHairdressers();
}]);