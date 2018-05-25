$(function () {
	var countCol = 2
$("table").on("click", ".del-row", function() {
  $(this).parents("tr").first().remove();
});

$("table").on("click", ".add-row", function(){
  var row = $(`<tr></tr>`);
  for(var i = 0; i < countCol; i++) {
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

$("table").on("click", ".del-col", function() {
    var colnum = $(this).parent().index();
	//alert(colnum);
	$("table tr").find("th:eq(" + colnum + ")").remove();
	$("table tr").find("td:eq(" + colnum + ")").remove();	
});

$("table").on("click", ".add-col", function(){
	countCol++;
  var colnum = $(this).parent().index();
  $("table tr").find("th:eq(" + colnum + ")").first().after("<th>col" + colnum + "</th>");
  $("table tr").find("td:eq(" + colnum + ")").after(`<td><input type="text" placeholder="Text"></td>`);
  $("table tr").find("th:eq(" + colnum + ")").last().after(`<td>
    <button class="add-row">+</button>
    <button class="del-row">-</button>
  </td>`);
  
});

});



