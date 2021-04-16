/**
 * 
 */

var loninId = "";

$(document).ready(function() {
	// 화면 초기화작업 진행
	// 직업코드
	initJobSelect();
	// 기념일
	initMemorialSelect();
	// 광고메일 (default 미수신)
	$('#recvEmailN').prop("checked",true);
	// 취미코드
	initHobbySelect();
	// 우편번호 -시
	initCitySelect();
	
//	$("#tbBunjiResult tbody").on("dbclick",function(){
//		
//	});
//	$("#tbBunjiResult tbody tr").on("dbclick",function(){
//		
//	});
	$("#tbBunjiResult").on("dblclick","tbody tr", function(){
		var zipcode = $(this).children("td:eq(0)").text();
		var addr = $(this).children("td:eq(1)").text();
		
		$('#memZip').val(zipcode);
		$('#memAdd1').val(addr);
		
		$('#zipModal').modal('hide');
	});
});



// 직업
function initJobSelect(){
	$.ajax({
		url : "/JQueryPro/CodeServlet"
		, type : "post"
		, data : {"groupCode" : "A02"}	
		, dataType : "json"
		, success : function(data){
			console.log(data)
			makeJobSelect(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("직업 코드 불러오는 중 오류");
		}
	})
}

function makeJobSelect(data){
	// 1)
	var strHtml = '<option value="">선택하세요</option>';
	
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

function initMemorialSelect(){
	
}

// 취미
function initHobbySelect(){
	$.ajax({
		url : "/JQueryPro/CodeServlet"
		, type : "post"
		, data : {"groupCode" : "A01"}	
		, dataType : "json"
		, success : function(data){
			console.log(data)
			makeHobbySelect(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("취미 코드 불러오는 중 오류");
		}
	})
}

function makeHobbySelect(data){
	var strHtml = "";
//	<label class="checkbox-inline">
//    <input type="checkbox" value="">
//  </label>
	for(var i = 0; i < data.length; i ++){
		strHtml += '<label class="checkbox-inline">'
				+ '<input type="checkbox" value="' + data[i].value+'"> '+ data[i].name
				+ '</label>';
	}
	
	$('#divMemHobby').html(strHtml);
}

// 주소
function initCitySelect(){
	$.ajax({
		url : "/JQueryPro/ZipServlet"
		, type : "post"
//		, data : {"groupCode" : "A01"}	
		, dataType : "json"
		, success : function(data){
			console.log(data)
			makeCitySelect(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("우편번호 코드(시) 불러오는 중 오류");
		}
	})
}

function makeCitySelect(data){
	var strHtml = '<option value="">선택하세요</option>';
//	<option value=""></option>
	for(var i = 0; i < data.length; i ++){
		strHtml += '<option value="' + data[i].sido+ '">' + data[i].sido+'</option>';
	}
	
	$('#city').html(strHtml);
}

function setGu(){
	var param = { 'sido' : $('#city').val()
				, 'flag' : 'GU'
				};
	
	$.ajax({
		url : "/JQueryPro/ZipServlet"
		, type : "post"
		, data : param	
		, dataType : "json"
		, success : function(data){
			console.log(data)
			makeGuSelect(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("우편번호 코드(구/군) 불러오는 중 오류");
		}
	})
}

function makeGuSelect(data){
	var strHtml = '<option value="">선택하세요</option>';
	for(var i = 0; i < data.length; i ++){
		strHtml += '<option value="' + data[i].gugun+ '">' + data[i].gugun+'</option>';
	}
	
	$('#gugun').html(strHtml);
	$('#gugun').prop("disabled", false);
}

// 동
function setDong(){
	var param = { 'sido' : $('#city').val()
			, 'gugun' : $('#gugun').val()
			, 'flag' : 'DONG'
	};
	
	$.ajax({
		url : "/JQueryPro/ZipServlet"
			, type : "post"
				, data : param	
				, dataType : "json"
					, success : function(data){
						console.log(data)
						makeDongSelect(data);
					}
	, error : function(xhr){
		console.log(xhr);
		alert("우편번호 코드(동) 불러오는 중 오류");
	}
	})
}

function makeDongSelect(data){
	var strHtml = '<option">선택하세요</option>';
	for(var i = 0; i < data.length; i ++){
		strHtml += '<option value="' + data[i].dong+ '">' + data[i].dong+'</option>';
	}
	
	$('#dong').html(strHtml);
	$('#dong').prop("disabled", false);
}

// 번지
function setBunji(){
	var param = { 'sido' : $('#city').val()
			, 'gugun' : $('#gugun').val()
			, 'dong' : $('#dong').val()
			, 'flag' : 'BUNJI'
	};
	
	$.ajax({
		url : "/JQueryPro/ZipServlet"
			, type : "post"
			, data : param	
			, dataType : "json"
			, success : function(data){
				console.log(data)
				makeBunjiSelect(data);
			}
			, error : function(xhr){
				console.log(xhr);
				alert("우편번호 코드(번지) 불러오는 중 오류");
			}
	})
}

function makeBunjiSelect(data){
	$('#divBunjiResult').show();
	
	var strHtml = "";
	for(var i = 0; i < data.length; i ++){
		strHtml += "<tr>"
			+ "<td>" + data[i].zipCode + "</td>"
			+ "<td>" + data[i].sido + " " 
			+ data[i].gugun + " " 
			+ data[i].dong + " " 
			+ changeEmptyVal(data[i].bunji) + "</td>"
			+ "</tr>";
	}
	
	$('#tbBunjiResult tbody').html(strHtml);
}

// 중복검사 버튼 클릭 이벤트
function chkId() {
	var memId = $('#memId').val();
	
	if (isEmpty(memId)) {
		alert("ID 값이 입력되지 않았습니다.");
		$("#memId").focus();
		$('#spanMemId').show();
		return;
	};
	
	var regExp = /^[0-9a-z]{3,10}$/;
	if (!regExp.test(memId)) {
		alert("ID값이 유효하지 않습니다.");
		$('#memId').focus();
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
			$('#memId').focus();
			$('#spanMemId').hide();
		},
		error : function(xhr) {
			console.log(xhr);
			alert("ID 중복 검사 중 오류가 발생했습니다.")
			$('#memId').focus();
			$('#spanMemId').show();
		}
	});
};

function openZip(){
//	주소창(모달창) 닫기
//	$('#zipModal').modal();
	$('#zipModal').modal();
}

// 회원정보 저장
function save(){
	// 회원정보 유효성 검사
	var result = validate();
	if(!result){
		return;
	}
	// 저장 전 사용자에게 확인
	if(!confirm("저장하시겠습니까?"))return;
	
	$('#formFlag').val("C");
	// DB 저장 ajax 호출
	$.ajax({
		url : "/JQueryPro/MemberServlet"
		, type : "post"
		, data : $("#fm").serialize()
		, dataType : "json"
		, success : function(data){
			alert("저장되었습니다.");
			
			// 페이지 이동
//			changePage();
		}
		, error : function(xhr){
			console.log(xhr);
			alert("저장 중 문제가 생겼습니다.\n관리자에게 문의하세요.")
		}
		})
	
}

function validate(){
	
	// 걸리면
//	return false;
	
	// 체크 끝나면
	return true;
}

function changePage(){
	// 1) 직접 지정
//	window.location.href="/JQuery/html/member/memberList.html";
	
	// 2) form submit
	var fm = document.getElementById("fm");
	fm.action = "/JQuery/html/member/memberList.html";
	// 서블릿을 호출하기도 함
	fm.method = "post";
	fm.submit();
	
	
}