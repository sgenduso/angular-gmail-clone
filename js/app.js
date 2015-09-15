var app = angular.module('angular-gmail-clone', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/inbox.html',
    controller: 'InboxController'
  });

  $locationProvider.html5Mode(true);
});
