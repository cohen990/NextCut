'use strict';

angular.module('myApp.homeView', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'homeView/homeView.html',
    controller: 'HomeViewController'
  });
}])

.controller('HomeViewController', ['$scope', '$location', function($scope, $location)  {
    $scope.GoToResults = function(){
        $scope.$apply(function(){
            $location.path("/results")
        });
    };

    $scope.PostcodeLookup = function(){
        if($scope.postcode){
            $scope.findLatitudeLongitude();
        }
    }

    $scope.postcode = 'n19 4ta';

    $scope.findLatitudeLongitude = function(){
        var geocoder = new google.maps.Geocoder();
        var request = {
            address: $scope.postcode
        }
        geocoder.geocode(request, $scope.StoreLatitudeLongitude)
    }

    $scope.StoreLatitudeLongitude = function(results, status){
        console.log(status);
        if(status === "ZERO_RESULTS"){
            $scope.$apply(function(){
                $scope.postcode = "No Results Found!"
            })
            return;
        }

        localStorage["originLatitude"] = results[0].geometry.location.k;
        localStorage["originLongitude"] = results[0].geometry.location.D;
        $scope.GoToResults();
    }
}]);