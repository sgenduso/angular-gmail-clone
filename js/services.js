app.factory('EmailsService', ['$http', function ($http) {
  return {
    getEmails: function () {
      return $http.get('http://localhost:3000/api')
      .then(function (emails) {
        console.log(emails.data);
        return emails.data;
      });
    },
  };
}]);
