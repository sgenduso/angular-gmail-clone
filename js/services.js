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



  return {
    getEmails: getEmails,
    allSelectedArray: allSelectedArray,
    noneSelectedArray: noneSelectedArray
  };
}]);
