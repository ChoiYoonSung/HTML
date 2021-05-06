/**
 * 
 */

var chkResult = false;
var reg = "";
$(document).ready(function() {
	
	$("#tbBunjiResult").on("dblclick","tbody tr", function(){
		var zipcode = $(this).children("td:eq(0)").text();
		var addr = $(this).children("td:eq(1)").text();
		
		$('#memZip').val(zipcode);
		$('#memAdd1').val(addr);
		
		$('#zipModal').modal('hide');
	});
	
});

function zipResearch(){
	if($('#zipResearch').val() == ""){
		alert('동을 입력하세요');
		return;
	}
	var param = {'dong' : $('#zipResearch').val()};
	
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
			alert("우편번호 코드 불러오는 중 오류");
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

// 아이디 검사
function chkId() {
	var memId = $('#memId').val();
	
	if (isEmpty(memId)) {
		alert("ID 값이 입력되지 않았습니다.");
		$("#memId").focus();
		$('#spanMemId').show();
		return;
	};
	
	var reg = /^[a-z]{1}[0-9a-z]{2,9}$/;
	if (!reg.test(memId)) {
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

function validate() {
	   var val = ['아이디', '이름', '생년월일', '비밀번호', '휴대폰 번호', '이메일', '우편번호', '주소','상세주소']
	   var arr = [
		    $('#memId')
	      , $('#memName')
	      , $('#memBir')
	      , $('#memPass')
	      , $('memHp')
	      , $('memMail')
	      , $('memZip')
	      , $('memAdd1')
	      , $('memAdd2')
	      ];
	   if(chkResult == false){
	      alert("아이디 중복검사를 하지 않으셨습니다.");
	      $("#memId").focus();
	      return false;
	   }else{
	      for(var i=0; i<val.length; i++){
	         if(isEmpty(arr[i].val())){
	            alert(val[i] + "값이 입력되지 않았습니다.");
	            $(arr[i]).focus();
	         }
	      }
	   }
	   chkName();
	   chkPass();
	   chkBir();
	   chkMail();
	   chkHp();
	   
	   return true;
}

function chkName(){
   var memName = $('#memName').val();
   var reg = /^[가-힣]{2,5}$/;
   if(!reg.test(memName)){
	   alert("이름이 유효하지 않습니다.")
	   $('#memName').focus();
	   $('#spanMemName').show();
	   return false;
   }else{
	   $('#spanMemName').hide();
   }
}

function chkPass(){
	var memPass = $('#memPass').val();
	var reg = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@#$%^&-_/=+]).{8,12}$/;
	if(isEmpty(memPass)){
		$('#memPass').focus();
		return false;
	}else if(!reg.test(memPass)){
		alert("비밀번호가 유효하지 않습니다.");
		$('#memPass').focus();
		$('#spanMemPass').show();
		return false;
	}else if(!memPass.equals($("#memPwdChk").val())){
		alert("비밀번호가 일치하지 않습니다.");
		$('#memPass').focus();
		$('#spanMemPass').show();
		return false;
	}else{
		$('#spanMemPass').hide();
	}
}

function chkBir(){
	var memBir = $('#memBir').val();
	var age = memBir.substr(0,4);
	var regAge = 10;
	var today = new Date().getFullYear();
	var res = today - Number(age);
	if(isEmpty(memBir)){
		alert("생일이 입력되지 않았습니다.");
		$('#memBir').focus();
		$('#spanMemBir').show();
		return false;
	}else if(res < resAge){
		alert("10세 이상부터 회원가입이 가능합니다.");
		$('#memBir').focus();
		$('#spanMemBir').show();
		return false;
	}else{
		$('#spanMemBir').hide();
	}
}

function chkMail(){
	var memMail = $('#memMail').val();
	var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@\w([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
	if(isEmpty(memMail)){
		$('#memMail').focus();
		return false;
	}else if(!reg.test(memMail)){
		alert("이메일이 유효하지 않습니다.");
		$('#memMail').focus();
		$('#spanMemMail').show();
		return false;
	}else{
		$('#spanMemMail').hide();
	}
}

function chkHp(){
	var memHp = $('#memHp').val();
	var reg = /(\d{3})-(\d{3,4})-(\d{4})/;
	if(isEmpty(memHp)){
		$('#memHp').focus();
		return false;
	}else if(!reg.test(memHp)){
		alert("전화번호가 유효하지 않습니다.");
		$('#memHp').focus();
		$('#spanMemHp').show();
		return false;
	}else{
		$('#spanMemHp').hide();
	}
}


// 회원정보 저장
function save(){
	// 회원정보 유효성 검사
	var result = validate();
	if(!result){
		return false;
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

function changePage(){
	var fm = document.getElementById("fm");
	fm.action = "/MemberPj/html/member/memberList.html";
	fm.method = "post";
	fm.submit();
}