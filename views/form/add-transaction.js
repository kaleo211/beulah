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

    $.ajax({
      url: 'addTransaction',
      type: 'post',
      dataType: 'json',
      data: $('form#addTransaction').serialize(),
      success: function (data) {
        Materialize.toast('Successfully added!', 3000, null, null);
        location.reload();
      },
      error: function () {
        Materialize.toast('Failed to submit!', 3000, null, null);
      }
    });

    cleanForm();
  });
});
