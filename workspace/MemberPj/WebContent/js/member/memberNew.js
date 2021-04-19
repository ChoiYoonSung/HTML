/**
 * 
 */
$(document).ready(function() {
	var chkResult = false;
	// 우편번호 -시
	initCitySelect();
	
	$("#tbBunjiResult").on("dblclick","tbody tr", function(){
		var zipcode = $(this).children("td:eq(0)").text();
		var addr = $(this).children("td:eq(1)").text();
		
		$('#memZip').val(zipcode);
		$('#memAdd1').val(addr);
		
		$('#zipModal').modal('hide');
	});
	
});

// 주소
function initCitySelect(){
	$.ajax({
		url : "/MemberPj/ZipServlet"
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
		url : "/MemberPj/ZipServlet"
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
		url : "/MemberPj/ZipServlet",
		type : "post",
		data : param,
		dataType : "json",
		success : function(data) {
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
		url : "/MemberPj/ZipServlet"
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
	
	var regExp = /^[a-z]{1}[0-9a-z]{2,9}$/;
	if (!regExp.test(memId)) {
		alert("ID값이 유효하지 않습니다.");
		$('#memId').focus();
		$('#spanMemId').html("ID는 영문 소문자와 숫자 3~10자 입니다.");
		$('#spanMemId').show();
		return;
	};
	
	$.ajax({
		url : "/MemberPj/MemberServlet",
		type : "post",
		data : { "memId" : memId, "flag" : "CHKID" },
		dataType : "json",
		success : function(data) {
			if(data.resultCnt == 1){
				alert("중복된 값이 있습니다.");
			}else{
				$('#spanMemId').html("사용 가능한 ID 입니다.");
				$('#memName').focus();
				chkResult = true;
			}
			console.log(data);
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
		url : "/MemberPj/MemberServlet"
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
	
	
	return true;
}

function chkEmpty() {
	   var val = ['아이디', '이름', '생년월일', '비밀번호', '휴대폰 번호', '이메일', '우편번호', '주소','상세주소']
	   var arr = [$('#memId')
	      , $('#memName')
	      , $('#memBir')
	      , $('#memPass')
	      , $('memHp')
	      , $('memMail')
	      , $('memZip')
	      , $('memAdd1')
	      , $('memAdd2')];
	   if(chkResult == false){
	      alert("아이디 중복검사를 하지 않으셨습니다.");
	      $("#memId").focus();
	      return;
	   }else{
	      for(var i=0; i<val.length; i++){
	         if(isEmpty(arr[i].val())){
	            alert(val[i] + "값이 입력되지 않았습니다.");
	            $(arr[i]).focus();
	         }
	      }
	   }
	   chkName();
	   chkBir();
	   chkPass();
	   chkHp();
	   chkMail();
	   
	}


function changePage(){
	// 2) form submit
	var fm = document.getElementById("fm");
	fm.action = "/MemberPj/html/member/memberList.html";
	// 서블릿을 호출하기도 함
	fm.method = "post";
	fm.submit();
}