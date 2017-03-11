var enableExpense = function () {
  $("#emptyTo").click();
  $("#to").attr("disabled", "");
  $("#category").removeAttr("disabled");
};

var enableTransfer = function () {
  $("#emptyCategory").click();
  $("#category").attr("disabled", "");
  $("#to").removeAttr("disabled");
};

$(document).ready(function () {
  var snackbarContainer = document.querySelector('#messageBar');
  $(document).on('submit', '#addTransaction', function (event) {

    $.ajax({
      url: 'addTransaction',
      type: 'post',
      dataType: 'json',
      data: $('form#addTransaction').serialize(),
      success: function (data) {
        var data = { message: 'Successfully added.' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      }
    });

    event.preventDefault();
    $("#to").val("");
    $("#date").val("");
    $("#category").val("");
    $("#total").val("");
    $("#memo").val("");
  });
});