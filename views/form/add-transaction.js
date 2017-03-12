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

var snackbarContainer = document.querySelector('#messageBar');

var isEmpty = function (field) {
  if (!$("#" + field).val()) {
    snackbarContainer.MaterialSnackbar.showSnackbar(
      { message: field.toUpperCase() + " should not be empty!" }
    );
    return true;
  }
  return false;
}

var checkEmtpy = function () {
  if (isEmpty("from")) return;
  if (isEmpty("date")) return;
  if (!$("#category").is("[disabled]") && isEmpty("category")) return;
  if (!$("#to").is("[disabled]") && isEmpty("to")) return;
  if (isEmpty("total")) return;
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
    checkEmtpy();
    event.preventDefault();

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

    cleanForm();
  });
});