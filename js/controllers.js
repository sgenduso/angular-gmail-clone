app.controller('InboxController', ['$scope', 'EmailsService', '$localStorage', '$sessionStorage', '$modal', '$log', function ($scope, EmailsService, $localStorage, $sessionStorage, $modal, $log) {
  $scope.storage = $localStorage;


  $scope.getEmails = function () {
    EmailsService.getEmails()
    .then(function (emails) {
      $scope.emails = emails.reverse();
      $scope.checkUnread();
      $scope.populateLabels();
    });
  };

  $scope.getEmails();

  $scope.checkUnread = function () {
    $scope.unreadCount = EmailsService.unreadCount($scope.emails);
  };

    $scope.toggleThing = function (thing) {
    thing = !thing;
  };

  $scope.fullInbox = '';
  $scope.starredInbox = '';
  $scope.unreadInbox = '';
  $scope.filterStatus = '';

  $scope.toggleFullInbox = function () {
    $scope.fullInbox = '';
    $scope.starredInbox = '';
    $scope.unreadInbox = '';
    $scope.filterStatus = '';
  };

  $scope.toggleStarredInbox = function () {
    $scope.fullInbox = '';
    $scope.starredInbox = {starred: true};
    $scope.unreadInbox = '';
    $scope.filterStatus = 'starred';
  };

  $scope.toggleUnreadInbox = function () {
    $scope.fullInbox = '';
    $scope.starredInbox = '';
    $scope.unreadInbox = {read: false};
    $scope.filterStatus = 'unread';
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
      $scope.emails = emails.reverse();
    });
  };

  $scope.markAsRead = function () {
   return EmailsService.markAsRead($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data.reverse();
      console.log($scope.emails);
      //checkUnread() only works if you click Mark as Read twice??
      $scope.checkUnread();
    });
  };

  $scope.markUnread = function () {
    return EmailsService.markUnread($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data.reverse();
      console.log($scope.emails);
      //checkUnread() only works if you click Mark as Read twice??
      $scope.checkUnread();
    });
  };

  $scope.delete = function () {
    return EmailsService.deleteEmails($scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data.reverse();
      $scope.getEmails();
    });
  };

  $scope.showLabelInput = function (selectedLabel) {
    $scope.addingLabel =  EmailsService.showLabelInput(selectedLabel);
  };

  $scope.addLabel = function (label) {
    return EmailsService.addLabel(label, $scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data.reverse();
      $scope.selectedLabel="Apply Label";
      $scope.getEmails();
    });
  };

  $scope.removeLabel = function (label) {
    return EmailsService.removeLabel(label, $scope.storage.selectedArray, $scope.emails)
    .then(function (emails) {
      $scope.emails = emails[emails.length-1].data.reverse();
      $scope.labelToRemove="Remove Label";
      $scope.getEmails();
    });
  };

  $scope.populateLabels = function () {
    $scope.labels = EmailsService.populateLabels($scope.emails);
  };

  $scope.openModal = function (size, emails) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './partials/compose-modal.html',
      controller: function ($scope, $modalInstance, $http, EmailsService, items) {
        $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        };
        $scope.ok = function (subject) {
          return $http.post('http://localhost:3000/api/new', {subject: subject})
          .then(function (emails) {
            // console.log($scope);
            // $scope.$parent.emails = emails.data;
            // $scope.$parent.getEmails();
            $modalInstance.close(emails);
            console.log(emails);
            return emails;
          });
        };
      },
      size: size,
      resolve: {
        items: function () {
          return emails;
        }
      }
    });

    modalInstance.result.then(function (results) {
      console.log(results);
      console.log($scope);
      // console.log(emails);
      // console.log(items);
      $scope.emails = results.data.reverse();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


}]);
