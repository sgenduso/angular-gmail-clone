var app = angular.module('angular-gmail-clone', ['ngRoute', 'ngStorage', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {
  //MAYBE CHANGE TO STATES?
  $routeProvider
  .when('/', {
    templateUrl: 'partials/inbox.html',
    controller: 'InboxController'
  });

  $locationProvider.html5Mode(true);
});
