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
			+ "<td>" + (i+1) + "</td>"
			+ "<td>" + data[i].memId + "</td>"
			+ "<td>" + data[i].memName + "</td>" 
			+ "<td>" + data[i].memPass + "</td>" 
			+ "<td>" + data[i].memBir + "</td>"
			+ "<td>" + formatHp(data[i].memHp) + "</td>" 
			+ "<td>" + data[i].memMail + "</td>" 
			+ "</tr>";
	}
	$("#tbResult tbody").html(str);
}

function memberRegi() {
	$("#targetUrl").val("/html/member/memberNew.jsp");
	var fm = document.getElementById("tmpFm");
	fm.method = "post";
	fm.action = "/JQueryPro/MemberServlet";
	fm.submit();
}