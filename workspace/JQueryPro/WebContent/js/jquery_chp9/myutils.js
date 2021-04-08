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
		//전화번호
		val = val.replaceAll("-","").replaceAll(" ","");
		val = val.replace(/(\d{3})(\d{3,4})(\d{4})/,"$1-$2-$3")
		
		//날짜
		val = val.replace(/(\d{2,4})(\d{1,2})(\d{1,2})/,"$1-$2-$3")
		val = val.replace(/(\d{2,4})(\d{1,2})(\d{1,2})/,"$1/$2/$3")
		val = val.replace(/(\d{2,4})(\d{1,2})(\d{1,2})/,"$1년$2월$3일")
		
	}
}