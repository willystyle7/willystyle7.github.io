$("table").on("click", ".del-row", function () {
  $(this).parents("tr").first().remove();
});
$("table").on("click", ".add-row", function () {
  var row = $(`<tr></tr>`);
  for (var i = 0; i < 2; i++) {
    row.append(`<td><input type="text" placeholder="Text"></td>`);
  }
  row.append(`<td>
    <button class="add-row">+</button>
    <button class="del-row">-</button>
  </td>`);
  if (!$(this).data("reversed")) {
    $(this).parents("tr").first().after(row);
  } else {
    $(this).parents("tr").first().before(row);
  }
});