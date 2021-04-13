/**
 * 
 */
// strUrl = "";
// strKey = "";

function getValue(strUrl, strKey){
	var val = "";
	//strUrl 에서 strKey에 해당하는 
	val =  "~";
	return val
}

function isEmpty(val){
	// 빈 값 체크
	// val이 빈값 혹은 null 혹은 undefined
	return true;
}

function chkRegExp(val, type){
	// 정규식 검사
	if(isEmpty())return false;
}

function format(val, type){
	if(type == "hpno"){
		//전화번호(- 혹은 빈값 제거)
		val = val.replaceAll("-","").replaceAll(" ","");
		//전화번호(휴대전화 번호 형식 010-0000-0000)
		val = val.replace(/(\d{3})(\d{3,4})(\d{4})/,"$1-$2-$3")
	}else if(type == "date"){
		//날짜
//		val = val.replace(/(\d{2,4})(\d{1,2})(\d{1,2})/,"$1-$2-$3")
		val = val.replace(/(\d{2,4})(\d{1,2})(\d{1,2})/,"$1/$2/$3")
//		val = val.replace(/(\d{2,4})(\d{1,2})(\d{1,2})/,"$1년$2월$3일")
		
	}
}

function formatHp(val){
	//전화번호(- 혹은 빈값 제거)
	val = val.replaceAll("-","").replaceAll(" ","");
	//전화번호(휴대전화 번호 형식 010-0000-0000)
	val = val.replace(/(\d{3})(\d{3,4})(\d{4})/,"$1-$2-$3")
	
	return val
}

function isEmpty(val){
	if(val == undefined) return true;
	if(val == null) return true;
	if(val == "null") return true;
	
	val = jQuery.trim(val);
	if(val.length == 0) return true;
	
	return false;
}

// 유효성 검사
// 아이디 : 영어 소문자와 숫자로 구성, 3글자 이상 10글자 이하
function regular(val){
	
}