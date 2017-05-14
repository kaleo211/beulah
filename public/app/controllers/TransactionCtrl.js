angular.module('transaction', [])
  .controller('TransactionCtrl', function TransactionCtrl($scope, $http) {
    var init = function() {
      $http.get('/transactions').then(function (resp) {
        $scope.transactions = resp.data;
      });
    }

    init();
  });
