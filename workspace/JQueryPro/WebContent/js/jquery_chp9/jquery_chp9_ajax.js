/**
 * 
 */

function fnGet(){
	// submit 호출
	var fm = document.getElementById("fm"); // <form>
	fm.action = "jquery_test.html?userName=test01&userEmail=asdf"; // action 설정 가능
	fm.method = "post";
	fm.submit();
	
}

function fnAjax(){
	$.ajax({
		url : "intro.html"
		, type : "GET"
		, success : function(data){
			$('#result').html(data);
		}
		, error : function(){
			
		}
	});
}

function fnText(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_text.txt"	// 절대 경로
//		, type : ""
//		, data : {}
		, dataType : "text"
		, success : function(data){
//			$('#result').html(data)
			$('#result').text(data)
		}
		, error : function(){
			
		}
	});
}

function fnJsonObj(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_json_obj.txt"
		, dataType : "json"
		, success : function(data){
			console.log(data);
			console.log(data.name);
			// div에 이름 나이
			var str = "";
			str += "이름 : " + data.name + "<br>"
				+ "나이 : " + data.age + "<br>"
				+ "성별 : " + data.age + "<br>"
				+ "직업 : " + data.age;
			
			$('#result').html(str);
		}
	});
}

function fnJsonArr(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_json_arr.txt"
		, dataType : "json"
		, success : function(data){
			console.log(data);
			
			var str = "<ol>";
			for(var i = 0; i < data.length; i++){
				str += "<li>" + data[i] + "</li>";
			}
//			$.each(data,function(idx){
//				str += "<li>" + data[idx] + "</li>";
//			})
			str += "</ol>";
			
			$('#result').html(str);
		}
	});
}

function fnJsonList(){
	$.ajax({
		url : "/JQueryPro/html/sample/data_json_list.txt"
		, dataType : "json"
		, success : function(data){
			console.log(data);
			
			var str = "";
// 					for(var i = 0; i < data.length; i++){
// 						// 1번쨰 회원
// 						// 이름 : -
// 						// 나이 : -
// 						// 성별 : -
// 						// 직업 : -
// 						var obj = data[i];
// 						str += (i+1) + "번 회원<br>"
// 								+ "이름 : " + obj.name + "<br>"
// 								+ "나이 : " + obj.age + "<br>"
// 								+ "성별 : " + obj.gender + "<br>"
// 								+ "직업 : " + obj.job + "<hr>";
// 					}
			
// 					$.each(data,function(i){
// 						var obj = data[i];
// 						str += (i+1) + "번 회원<br>"
// 								+ "이름 : " + obj.name + "<br>"
// 								+ "나이 : " + obj.age + "<br>"
// 								+ "성별 : " + obj.gender + "<br>"
// 								+ "직업 : " + obj.job + "<hr>";
// 					});
			
			str += "<table>"
			 	+ "<th>번호</th><th>이름</th><th>나이</th><th>성별</th><th>직업</th>";
			$.each(data,function(i){
				var obj = data[i];
				str += "<tr><td>" + (i+1) + "번째 회원</td>"
						+"<td>" + obj.name + "</td>"
						+"<td>" + obj.age + "</td>"
						+"<td>" + obj.gender + "</td>"
						+"<td>" + obj.job + "</td>"
						+"</tr>"
			});
			str += "</table>";
			$('#result').html(str);
		}
	});
}

function fnXml(){
	$.ajax({
		url : "cd_catalog.xml"
//		, type : "get"
//		, data : {
			
//		}
		, dataType : "xml"
		, success : function(data){
			makeCdList(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("Error");
		}
	});
}

function makeCdList(param){
	var arr = param.getElementsByTagName("CD");
	var str = "<html><head></head>"
			+ "<body><table>"
			+ "<tr><th>번호</th>"
			+ "<th>TITLE</th>"
			+ "<th>ARTIST</th>" 
			+ "<th>COUNTRY</th>" 
			+ "<th>COMPANY</th>"
			+ "<th>PRICE</th>"
			+ "<th>YEAR</th></tr>";
//	var count = 0;
//	for(var obj of arr){
//		count++;
//		str += "<tr><td>" + count + "</td>";
//		for(var i = 0; i < $(obj).children().length; i++){
//			str += "<td>"
//			+ $(obj).children().eq(i).html()
//			+ "</td>";
//		}
//		str += "</tr>"
//	}
	
	for(var i=0; i<arr.length; i++){
		var obj = arr[i];
		
		var objTitle = obj.getElementsByTagName("TITLE");
		var objArtist = obj.getElementsByTagName("ARTIST");
		var objCountry = obj.getElementsByTagName("COUNTRY");
		var objCompany = obj.getElementsByTagName("COMPANY");
		var objPrice = obj.getElementsByTagName("PRICE");
		var objYear = obj.getElementsByTagName("YEAR");
		
		var title = $(objTitle).html();
		var artist = $(objArtist).html();
		var country = $(objCountry).html();
		var company = $(objCompany).html();
		var price = $(objPrice).html();
		var year = $(objYear).html();
		
		str+= "<tr>"
			+ "<td>" + (i+1) + "</td>"
			+ "<td>" + title + "</td>"
			+ "<td>" + artist + "</td>"
			+ "<td>" + country + "</td>"
			+ "<td>" + company + "</td>"
			+ "<td>" + price + "</td>"
			+ "<td>" + year + "</td>"
			+ "</tr>";
	}
	str += "</table></body></html>"
	$('#result').html(str);
	
	$('td').mouseover(function(){
		$(this).css("backgroundColor","gray");
	})
	
	$('td').mouseout(function(){
		$(this).css("backgroundColor","");
	})
}


function fnXmlArtist(){
	$.ajax({
		url : "cd_catalog.xml"
//		, type : "get"
//		, data : {
			
//		}
		, dataType : "xml"
		, success : function(data){
			
			makeArtistList(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("Error");
		}
	});
}

function makeArtistList(param){
	var arr = param.getElementsByTagName("ARTIST");
	var str = "";
	for(var i = 0; i < arr.length; i++){
		str += arr[i].innerHTML + "<br>"; // 가수 이름
	}
	$('#result').html(str);
}

function fnXmlTitle(){
	$.ajax({
		url : "cd_catalog.xml"
//		, type : "get"
//		, data : {
			
//		}
		, dataType : "xml"
		, success : function(data){
			
			makeTitleList(data);
		}
		, error : function(xhr){
			console.log(xhr);
			alert("Error");
		}
	});
}

function makeTitleList(param){
	var arr = param.getElementsByTagName("TITLE");
	
	var str = "";
	for(var i = 0; i < arr.length; i++){
		str += arr[i].childNodes[0].nodeValue + "<br>"; // 타이틀 이름
	}
	$('#result').html(str);
}