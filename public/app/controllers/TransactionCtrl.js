angular.module('transaction', [])
  .controller('TransactionCtrl', function TransactionCtrl($scope, $http) {
    var init = function() {
      $http.get('/transactions').then(function (resp) {
        $scope.transactions = resp.data;
      });
    };
    $scope.$on("updateTransactions",function(){
      init();
    });

    $scope.currentOrder = 'desc';
    $scope.currentField = 'date';
    $scope.search = function(field) {
      if ($scope.currentField==field) {
        $scope.currentOrder = $scope.currentOrder=='desc' ? 'asc' : 'desc';
      }
      $scope.currentField = field;

      var search = {order: {field:field,order:$scope.currentOrder}};
      $http.post('/transactions/search', search).then(
        function (resp) {
          $scope.transactions = resp.data;
        }
      );
    };

    $scope.columns = ['type', 'from', 'to', 'category', 'date', 'memo'];
    init();
  })

  .controller('TransactionAddCtrl', function TransactionAddCtrl($scope, $http, $mdToast, $mdDialog, $rootScope) {
    $http.get('/members').then(function (resp) {
      $scope.members = resp.data;
    });

    $scope.transaction = {
      date: new Date(),
      type: 'expense'
    };

    var toast = function(msg) {
      $mdToast.show({
        template: '<md-toast class="md-toast">' + msg + '</md-toast>',
        hideDelay: 6000,
        position: 'top right'
      });
    };

    var isEmpty = function (field) {
      if (!$scope.transaction[field]) {
        toast(field.toUpperCase() + " SHOULD NOT BE EMPTY!");
        return true;
      }
      return false;
    };

    var validateFields = function () {
      if (isEmpty("from") || isEmpty("total") || isEmpty("date")) return true;
      if ($scope.transaction.type=='expense' && isEmpty('category')) return true;
      if ($scope.transaction.type=='transfer' && isEmpty('to')) return true;
      return false;
    };

    $scope.submit = function() {
      event.preventDefault();
      if (validateFields()) {
        return;
      }

      $http.post('/transactions', $scope.transaction).then(
        function (resp) {
          $scope.transactions = resp.data;
          toast('SUCCESSFULLY ADDED!');
          $mdDialog.cancel();
          $rootScope.$broadcast('updateTransactions');
        },
        function (resp) {
          toast('FAILED TO SUBMIT!');
        }
      );

      $scope.transaction = {};
    };
  });
