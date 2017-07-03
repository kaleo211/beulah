angular.module('transaction', [])
  .controller('TransactionCtrl', function TransactionCtrl($scope, $http) {
    var init = function() {
      $http.get('/transactions').then(function (resp) {
        $scope.transactions = resp.data;
      });
    }

    init();
  })
  .controller('TransactionAddCtrl', function TransactionAddCtrl($scope, $http, $mdToast) {
    $scope.transaction = {};
    $scope.transaction.date = new Date();

    $scope.disabled = function(id) {
      return id=='to'&&$scope.transaction.type=='transfer' || id=='catelog'&&$scope.transaction.type=='expense';
    };

    var toast = function(msg) {
      $mdToast.show({
        template: '<md-toast class="md-toast">' + msg + '</md-toast>',
        hideDelay: 6000,
        position: 'top right'
      });
    }

    var isEmpty = function (field) {
      if (!$scope.transaction[field]) {
        toast(field.toUpperCase() + " SHOULD NOT BE EMPTY!");
        return true;
      }
      return false;
    }

    var checkEmtpy = function () {
      if (isEmpty("from")) return true;
      if (isEmpty("date")) return true;
      if ($scope.transaction.type=='expense' && isEmpty('category')) return true;
      if ($scope.transaction.type=='transfer' && isEmpty('to')) return true;
      if (isEmpty("total")) return true;
      return false;
    }

    $scope.submit = function() {
      event.preventDefault();
      if (checkEmtpy()) {
        return;
      }

      $http.post('/transactions', $scope.transaction).then(
        function (resp) {
          $scope.transactions = resp.data;
          toast('SUCCESSFULLY ADDED!');
          location.reload();
        },
        function (resp) {
          toast('FAILED TO SUBMIT!');
        }
      );

      $scope.transaction = {};
    };
  });
