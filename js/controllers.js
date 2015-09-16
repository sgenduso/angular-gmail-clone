app.controller('InboxController', ['$scope', 'EmailsService', '$localStorage', '$sessionStorage', function ($scope, EmailsService, $localStorage, $sessionStorage) {
  $scope.storage = $localStorage;
  EmailsService.getEmails()
  .then(function (emails) {
    $scope.emails = emails;
  });

  $scope.selectAll = function () {
    $scope.storage.selectedArray = EmailsService.allSelectedArray($scope.emails);
    $scope.storage.allSelected = true;
    $scope.storage.noneSelected = false;
    $scope.storage.someSelected = false;
    console.log($scope.storage.allSelected, $scope.storage.noneSelected, $scope.storage.someSelected);
    console.log($scope.storage.selectedArray);

  };

  $scope.deselectAll = function () {
    $scope.storage.selectedArray = EmailsService.noneSelectedArray($scope.emails);
    $scope.storage.allSelected = false;
    $scope.storage.noneSelected = true;
    $scope.storage.someSelected = false;
    console.log($scope.storage.allSelected, $scope.storage.noneSelected, $scope.storage.someSelected);
    console.log($scope.storage.selectedArray);
  };

  $scope.selectOne = function (index, storageObj) {
    EmailsService.selectOne(index, storageObj);
  };

  $scope.toggleStarred = function (email) {
    EmailsService.toggleStarred(email)
    .then(function (emails) {
      $scope.emails = emails;
    });
  };

  $scope.markAsRead = function () {
    EmailsService.markAsRead($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails;
    });
  };

  $scope.markUnread = function () {
    EmailsService.markUnread($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails;
    });
  };

}]);
