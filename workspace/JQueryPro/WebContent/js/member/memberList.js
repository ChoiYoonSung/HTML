/**
 * 
 */
$(document).ready(function() {
	$('#btnSearch').click(function() {

		var userId = $("#userId").val();
		var userName = $("#userName").val();
		var param = {
			memId : userId,
			memName : userName,
			flag : "L"
		};

		$.ajax({
			url : "/JQueryPro/MemberServlet",
			type : "post",
			data : param,
			dataType : "json",
			success : function(data) {
				console.log(data);
				alert("성공");
				makeTable(data);
			},
			error : function(xhr) {
				console.log(xhr);
				alert("오류발생");
			}
		})
	})
})

function makeTable(data) {
	var str = "";

	for (var i = 0; i < data.length; i++) {
		str += "<tr>" 
			+ "<td>" + data[i].id + "</td>";
			+ "<td>" + data[i].name + "</td>" 
			+ "<td>" + data[i].gender + "</td>"
			+ "<td>" + data[i].birth + "</td>" 
			+ "<td>" + data[i].tel+ "</td>" 
			+ "</tr>";
	}

	$("#tbResult tbody").html(str);
}