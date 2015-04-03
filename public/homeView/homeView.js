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
        $location.path("/results")
    };
}]);