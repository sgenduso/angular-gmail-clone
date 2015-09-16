app.factory('EmailsService', ['$http', '$localStorage', '$sessionStorage', function ($http, $localStorage, $sessionStorage) {
  var getEmails = function () {
    return $http.get('http://localhost:3000/api')
    .then(function (emails) {
      return emails.data;
    });
  };

  var allSelectedArray = function (messages) {
    return messages.map(function (message) {
      return true;
    });
  };

  var noneSelectedArray = function (messages) {
    return messages.map(function (message) {
      return false;
    });
  };

  var selectOne = function (index, storageObj) {
    storageObj.selectedArray[index] = !storageObj.selectedArray[index];
    checkSelectedStatus(storageObj);
    console.log(storageObj.selectedArray);
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
    // email.starred = !email.starred;
    return $http.post('http://localhost:3000/api/starred', email)
    .then(function (emails) {
      return emails.data;
    });
  };

  return {
    getEmails: getEmails,
    allSelectedArray: allSelectedArray,
    noneSelectedArray: noneSelectedArray,
    selectOne: selectOne,
    checkSelectedStatus: checkSelectedStatus,
    toggleStarred: toggleStarred,
  };
}]);
