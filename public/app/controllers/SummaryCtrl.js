angular.module('summary', [])
  .controller('SummaryCtrl', function SummaryCtrl($scope, $http) {
    var init = function() {
      $http.get('/summary').then(function (resp) {
        debts = resp.data;
        if (debts.length == 2 && debts[0].total < 0) {
          var tmp = debts[0];
          debts[0]=debts[1];
          debts[1]=tmp;
        }
        $scope.debts = debts;
      });
    }

    init();
  });
