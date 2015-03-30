'use strict';

angular.module('myApp.mapView', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mapView/:latitude/:longitude', {
    templateUrl: 'mapView/mapView.html',
    controller: 'MapViewController'
});
}])

.controller('MapViewController', ['$scope', '$routeParams', function($scope, $routeParams)  {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function intializeMap() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var chicago = new google.maps.LatLng( localStorage["originLatitude"] , localStorage["originLongitude"]);
      var mapOptions = {
        zoom:7,
        center: chicago
      }
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      directionsDisplay.setMap(map);
    }

    function calcRoute() {
      var start = new google.maps.LatLng( localStorage["originLatitude"] , localStorage["originLongitude"]);
      var end = new google.maps.LatLng( localStorage["destinationLatitude"] , localStorage["destinationLongitude"]);
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    }

    $scope.initialize = function(){
        intializeMap();
        calcRoute();
    }
}]);