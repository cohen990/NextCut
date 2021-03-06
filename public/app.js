'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.homeView',
  'myApp.resultsView',
  'myApp.mapView',
]).
config(function($routeProvider, $mdThemingProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '50', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('teal', {
      'default': '100' // use shade 200 for default, and keep all other shades the same
    });
}).
run(function($rootScope, $location, $window){
    $rootScope.$on('$routeChangeSuccess', function() {
        $window.ga('send', 'pageview', { page: $location.url() })
    })
});