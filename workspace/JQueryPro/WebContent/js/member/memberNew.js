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
	// 우편번호 -구
	
	// 우편번호 -동
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

function makeCitySelect(data){
	var strHtml = "<option>선택하세요</option>";
//	<option value=""></option>
	for(var i = 0; i < data.length; i ++){
		strHtml += '<option value="' + data[i].sido+ '">' + data[i].sido+'</option>';
	}
	
	$('#city').html(strHtml);
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
	var strHtml = '<option>선택하세요</option>';
	for(var i = 0; i < data.length; i ++){
		strHtml += '<option value="' + data[i].dong+ '">' + data[i].dong+'</option>';
	}
	
	$('#dong').html(strHtml);
	$('#dong').prop("disabled", false);
}

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