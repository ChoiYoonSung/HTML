/**
 * 
 */

$(document).ready(function() {
	$.ajax({
		url : "/JQueryPro/CodeServlet"
		, type : "post"
		, data : {"groupCode" : "A02"}	// 직업 코드 조회
		, dataType : "json"
		, success : function(data){
			console.log(data)
			makeJobSelect(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("오류");
		}
	})
});

function makeJobSelect(data){
	// 1)
	var strHtml = "";
	
	for (var i = 0; i < data.length; i++) {
		strHtml += '<option value="'
				+ data[i].value + '">'
				+ data[i].name + '</option>'
	}
	
	$('#memJob').html(strHtml);
	// 2)
//	$('#memJob').empty();
//	$('#memJob').append(ele);
	
};

// 중복검사 버튼 클릭 이벤트
function chkId() {
	var memId = $('#memid').val();
	
	if (isEmpty(memId)) {
		alert("ID 값이 입력되지 않았습니다.");
		$("#memid").focus();
		$('#spanMemId').show();
		return;
	};
	
	var regExp = /^[0-9a-z]{3,10}$/;
	if (!regExp.test(memId)) {
		alert("ID값이 유효하지 않습니다.");
		$('#memid').focus();
		$('#spanMemId').show();
		return;
	};
	
	$.ajax({
		url : "/JQueryPro/MemberServlet",
		type : "post",
		data : { "memId" : memId, "flag" : "CHKID" },
		dataType : "json",
		success : function(data) {
			console.log(data);
			$('#memid').focus();
			$('#spanMemId').hide();
		},
		error : function(xhr) {
			console.log(xhr);
			alert("ID 중복 검사 중 오류가 발생했습니다.")
			$('#memid').focus();
			$('#spanMemId').show();
		}
	});
};