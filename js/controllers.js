app.controller('InboxController', ['$scope', 'EmailsService', function ($scope, EmailsService) {
  $scope.allSelected = false;
  EmailsService.getEmails()
  .then(function (emails) {
    $scope.emails = emails;
  });
  $scope.toggleSelection = function () {
    $scope.allSelected = !$scope.allSelected;
  };
}]);
