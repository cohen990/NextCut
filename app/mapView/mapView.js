'use strict';

angular.module('myApp.mapView', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mapView/:latitude/:longitude', {
    templateUrl: 'mapView/mapView.html',
    controller: 'MapViewController'
});
}])

.controller('MapViewController', ['$scope', '$routeParams', function($scope, $routeParams)  {
    $scope.initializeMap = function() {
        var mapOptions = {
            center: { lat: parseFloat($routeParams.latitude), lng: parseFloat($routeParams.longitude)},
            zoom: 19
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
                                      mapOptions);
    }
}]);