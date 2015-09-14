app.controller('InboxController', ['$scope', 'EmailsService', function ($scope, EmailsService) {
  EmailsService.getEmails()
  .then(function (emails) {
    $scope.emails = emails;
  });
}]);
