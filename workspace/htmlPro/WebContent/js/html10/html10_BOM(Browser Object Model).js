/**
 * 
 */

var pop;
function proc() {
	pop = window.open("https://www.google.com"); //window 생략 가능
}
function proc2() {
	pop.close();
}
function showMsg() {
	// 				window.setTimeout();
	setTimeout(alertMsg, 1000);
	setTimeout(proc, 3000);
	window.setTimeout(function() {
		alert("타이머 사용");
	}, 5000);
}

function alertMsg() {
	alert("타이머 사용1");
}

function changeBgColor(){
	setInterval(changeColor, 1000);
}

function changeColor() {
	//랜덤으로 색을 만들어 p태그의 배경을 넣어주기
	//1.랜덤 색 뽑기
	//2.p태그에 배경색 주기
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	
	document.getElementById("pInterval").style.backgroundColor="rgb(" + r + ", " + g + ", " + b + ")"
}