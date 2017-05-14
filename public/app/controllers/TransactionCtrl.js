angular.module('transaction', [])
  .controller('TransactionCtrl', function TransactionCtrl($scope, $http) {
    var init = function() {
      $http.get('/transactions').then(function (resp) {
        $scope.transactions = resp.data;
      });
    }

    init();
  })
  .controller('TransactionAddCtrl', function TransactionAddCtrl($scope, $http) {

    var init = function () {

    }

    init();

    $scope.transaction = {};


    $scope.enableExpense = function () {
      console.log("i am here");
      $("#to").attr("disabled", "");
      $("#category").removeAttr("disabled");
      $('select').material_select('update');
    };

    $scope.enableTransfer = function () {
      console.log("i am here3");
      $("#category").attr("disabled", "");
      $("#to").removeAttr("disabled");
      $('select').material_select('update');
    };

    var isEmpty = function (field) {
      if (!$("#" + field).val()) {
        Materialize.toast(field.toUpperCase() + " should not be empty!", 3000, null, null);
        return true;
      }
      return false;
    }

    var checkEmtpy = function () {
      if (isEmpty("from")) return true;
      if (isEmpty("date")) return true;
      if (!$("#category").is("[disabled]") && isEmpty("category")) return true;
      if (!$("#to").is("[disabled]") && isEmpty("to")) return true;
      if (isEmpty("total")) return true;
      return false;
    }

    var cleanForm = function () {
      var fields = ["date", "total", "memo"];
      fields.forEach(function (field) {
        $('#' + field).val('');
        $('#' + field).parent().removeClass('is-dirty')
      });
      $("#emptyTo").click();
      $("#emptyCategory").click();
    }

    $(document).ready(function () {
      $(document).on('submit', '#addTransaction', function (event) {
        event.preventDefault();

        if (checkEmtpy()) {
          return;
        }

        $http.post('/transactions', $scope.transaction).then(
          function (resp) {
            $scope.transactions = resp.data;
            Materialize.toast('Successfully added!', 3000, null, null);
            location.reload();
          },
          function (resp) {
            Materialize.toast('Failed to submit!', 3000, null, null);
          }
        );

        cleanForm();
      });
    });
  });
