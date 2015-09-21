var app = angular.module('angular-gmail-clone', ['ngRoute', 'ngStorage', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {
  //MAYBE CHANGE TO STATES?
  $routeProvider
  .when('/', {
    templateUrl: 'partials/inbox.html',
    controller: 'InboxController'
  });
  // .when('/compose', {
  //   templateUrl: 'partials/compose-modal.html',
  //   controller: 'InboxController'
  // });

  $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});
