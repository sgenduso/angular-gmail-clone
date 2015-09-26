app.controller('InboxController', ['$scope', 'EmailsService', '$localStorage', '$sessionStorage', '$modal', '$log', function ($scope, EmailsService, $localStorage, $sessionStorage, $modal, $log) {
  $scope.storage = $localStorage;


  $scope.getEmails = function () {
    EmailsService.getEmails()
    .then(function (emails) {
      $scope.emails = emails.reverse();
      $scope.checkUnread();
      $scope.populateLabels();

  $scope.storage.selectedArray = $scope.storage.selectedArray || $scope.emails.map(function (email) {
      return false;
  });
  $scope.storage.allSelected = $scope.storage.allSelected === undefined ? false : $scope.storage.allSelected;
  $scope.storage.noneSelected = $scope.storage.noneSelected === undefined ? true : $scope.storage.noneSelected;
  $scope.storage.someSelected = $scope.storage.someSelected === undefined ? false : $scope.storage.someSelected;
  $scope.sidebarFilter = '';
    });
  };

  $scope.getEmails();

  $scope.checkUnread = function () {
    $scope.unreadCount = EmailsService.unreadCount($scope.emails);
  };

  $scope.toggleThing = function (thing) {
    thing = !thing;
  };


  $scope.changeFilter = function (filter) {
    $scope.sidebarFilter = filter === 'starred' ? {starred: true} : filter === 'unread' ? {read: false} : '';
  };

  $scope.selectedOrDeselected = function (selected) {
    $scope.storage.selectedArray = EmailsService.selectedOrDeselected($scope.emails, selected);
    $scope.storage.allSelected = selected;
    $scope.storage.noneSelected = !selected;
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

  $scope.readOrUnread = function (markRead) {
   return EmailsService.readOrUnread($scope.storage.selectedArray, $scope.emails, markRead)
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
    if (selectedLabel === 'Create New') {
      return $scope.openLabelModal("sm", $scope.storage.selectedArray, $scope.emails);
    }
    // $scope.addingLabel =  EmailsService.showLabelInput(selectedLabel);
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


//MODAL FOR COMPOSING A NEW MESSAGE
  $scope.openComposeModal = function (size, emails) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './partials/compose-modal.html',
      controller: function ($scope, $modalInstance, $http, EmailsService, items) {
        $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        };
        $scope.ok = function (subject) {
          return $http.post('http://lit-falls-5507.herokuapp.com/api/new' || 'https://lit-falls-5507.herokuapp.com/api/new', {subject: subject})
          .then(function (emails) {
            $modalInstance.close(emails);
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
      $scope.emails = results.data.reverse();
      $scope.getEmails();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


//MODAL FOR ADDING A NEW LABEL TO ONE OR MORE MESSAGES
  $scope.openLabelModal = function (size, selectedEmails, allEmails) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './partials/label-modal.html',
      controller: function ($scope, $modalInstance, $http, selectedEmails, allEmails) {
        $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        };
        $scope.ok = function (label) {
            var promises = [];
            selectedEmails.forEach(function (selected, i) {
              if (selected) {
                if (allEmails[i].filters.indexOf(label) < 0) {
                  allEmails[i].filters.push(label);
                  promises.push($http.post('http://lit-falls-5507.herokuapp.com/api/filters' || 'https://lit-falls-5507.herokuapp.com/api/filters', allEmails[i]));
                }
              }
            });
            return Promise.all(promises)
          .then(function (emails) {
            $modalInstance.close(emails);
          });
        };
      },
      size: size,
      resolve: {
        selectedEmails: function () {
          return selectedEmails;
        },
        allEmails: function () {
          return allEmails;
        }
      }
    });

    modalInstance.result.then(function (results) {
      $scope.emails = results[results.length-1].data.reverse();
      $scope.populateLabels();
      $scope.selectedLabel="Apply Label";
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


}]);
