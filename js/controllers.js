app.controller('InboxController', ['$scope', 'EmailsService', '$localStorage', '$sessionStorage', function ($scope, EmailsService, $localStorage, $sessionStorage) {
  $scope.storage = $localStorage;


  $scope.getEmails = function () {
    EmailsService.getEmails()
    .then(function (emails) {
      $scope.emails = emails;
      $scope.checkUnread();
      $scope.populateLabels();
    });
  };

  $scope.getEmails();

  $scope.checkUnread = function () {
    $scope.unreadCount = EmailsService.unreadCount($scope.emails);
  };

  $scope.selectAll = function () {
    $scope.storage.selectedArray = EmailsService.allSelectedArray($scope.emails);
    $scope.storage.allSelected = true;
    $scope.storage.noneSelected = false;
    $scope.storage.someSelected = false;

  };

  $scope.deselectAll = function () {
    $scope.storage.selectedArray = EmailsService.noneSelectedArray($scope.emails);
    $scope.storage.allSelected = false;
    $scope.storage.noneSelected = true;
    $scope.storage.someSelected = false;
  };

  $scope.selectOne = function (index, storageObj) {
    EmailsService.selectOne(index, storageObj);
  };

  $scope.toggleStarred = function (email) {
    return EmailsService.toggleStarred(email)
    .then(function (emails) {
      $scope.emails = emails;
    });
  };

  $scope.markAsRead = function () {
   return EmailsService.markAsRead($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data;
      console.log($scope.emails);
      //checkUnread() only works if you click Mark as Read twice??
      $scope.checkUnread();
    });
  };

  $scope.markUnread = function () {
    return EmailsService.markUnread($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data;
      console.log($scope.emails);
      //checkUnread() only works if you click Mark as Read twice??
      $scope.checkUnread();
    });
  };

  $scope.delete = function () {
    return EmailsService.deleteEmails($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data;
      $scope.getEmails();
    });
  };

  $scope.showLabelInput = function (selectedLabel) {
    $scope.addingLabel =  EmailsService.showLabelInput(selectedLabel);
  };

  $scope.addLabel = function (label) {
    return EmailsService.addLabel(label, $scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data;
      $scope.getEmails();
    });
  };

  $scope.populateLabels = function () {
    $scope.labels = EmailsService.populateLabels($scope.emails);
    console.log($scope.labels);
  };


}]);
