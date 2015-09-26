app.factory('EmailsService', ['$http', '$localStorage', '$sessionStorage', function ($http, $localStorage, $sessionStorage) {
  var getEmails = function () {
    return $http.get('https://lit-falls-5507.herokuapp.com/api')
    .then(function (emails) {
      return emails.data;
    });
  };

  var selectedOrDeselected = function (messages, selected) {
    return messages.map(function (message) {
      return selected;
    });
  };

  var selectOne = function (index, storageObj) {
    storageObj.selectedArray[index] = !storageObj.selectedArray[index];
    checkSelectedStatus(storageObj);
  };

  var checkSelectedStatus = function (storageObj) {
    var trueCount = 0;
    var falseCount = 0;
    var selections = storageObj.selectedArray;
    selections.forEach(function (selected) {
      selected ? trueCount++ : falseCount++;
    });
    storageObj.allSelected = trueCount === selections.length;
    storageObj.noneSelected = falseCount === selections.length;
    storageObj.someSelected = trueCount < selections.length && falseCount < selections.length;
  };

  var toggleStarred = function (email) {
    email.starred = !email.starred;
    return $http.post('https://lit-falls-5507.herokuapp.com/api/starred', email)
    .then(function (emails) {
      return emails.data;
    });
  };

  var readOrUnread = function (selectedEmails, allEmails, markRead) {
    var promises = [];
    selectedEmails.forEach(function (selected, i) {
      if (selected) {
        allEmails[i].read = markRead;
        promises.push($http.post('https://lit-falls-5507.herokuapp.com/api/read', allEmails[i]));
      }
    });
    return Promise.all(promises);
  };

  var unreadCount = function (emails) {
    var count = 0;
    emails.forEach(function (email) {
      if (email.read === false) {
        count++;
      }
    });
    return count;
  };

  var deleteEmails = function (selectedEmails, allEmails) {
    var promises = [];
     selectedEmails.forEach(function (selected, i) {
      if (selected) {
        promises.push($http.post('https://lit-falls-5507.herokuapp.com/api/delete', allEmails[i]));
      }
    });
    return Promise.all(promises);
  };

  var showLabelInput = function (selectedLabel) {
    if (selectedLabel === 'Create New') {
      return true;
    }
  };

  var addOrRemoveLabel = function (label, selectedEmails, allEmails, addLabel) {
    var promises = [];
    selectedEmails.forEach(function (selected, i) {
      if (selected) {
        if (addLabel && label !== 'Create New') {
          if (allEmails[i].filters.indexOf(label) < 0) {
            allEmails[i].filters.push(label);
          }
        } else {
          if (allEmails[i].filters.indexOf(label) > -1) {
            allEmails[i].filters.splice(allEmails[i].filters.indexOf(label), 1);
          }
        }
        promises.push($http.post('https://lit-falls-5507.herokuapp.com/api/filters', allEmails[i]));
      }
    });
    return Promise.all(promises);
  };

  var populateLabels = function (emails) {
    var labels = [];
    emails.forEach(function (email) {
      email.filters.forEach(function (filter) {
        if (labels.indexOf(filter) < 0) {
          labels.push(filter);
        }
      });
    });
    return labels.sort();
  };

  return {
    getEmails: getEmails,
    selectedOrDeselected: selectedOrDeselected,
    selectOne: selectOne,
    checkSelectedStatus: checkSelectedStatus,
    toggleStarred: toggleStarred,
    readOrUnread: readOrUnread,
    unreadCount: unreadCount,
    deleteEmails: deleteEmails,
    showLabelInput: showLabelInput,
    addOrRemoveLabel: addOrRemoveLabel,
    populateLabels: populateLabels
  };
}]);
