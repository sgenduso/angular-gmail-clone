app.controller('InboxController', ['$scope', 'EmailsService', '$localStorage', '$sessionStorage', function ($scope, EmailsService, $localStorage, $sessionStorage) {
  $scope.storage = $localStorage;
  $scope.allSelected = false;
  EmailsService.getEmails()
  .then(function (emails) {
    $scope.emails = emails;
  });

  $scope.toggleSelection = function () {
    $scope.allSelected = !$scope.allSelected;
  };

  $scope.selectAll = function () {
    $scope.storage.selectedArray = EmailsService.allSelectedArray($scope.emails);
    console.log($scope.storage.selectedArray);
  };

  $scope.deselectAll = function () {
    $scope.storage.selectedArray = EmailsService.noneSelectedArray($scope.emails);
    console.log($scope.storage.selectedArray);
  };

}]);
