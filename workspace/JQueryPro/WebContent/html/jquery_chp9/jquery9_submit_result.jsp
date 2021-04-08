<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="kr">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
	</head>
	<body>
	<%
	String str = "";
	System.out.println("~");
	
	// 한글 깨짐 현상 -> request에 characterEncoding을 세팅해준다.
	request.setCharacterEncoding("UTF-8");
	
	String userName = request.getParameter("userName");
	String userAge = request.getParameter("userAge");
	%>
	
	<p>안녕하세요, <span id="spanUserName"><%=userName %></span>씨</p>
	<br>
	<p>올해로 <span id="spanUserAge"><%=userAge %></span>살 이시군요.</p>
	</body>
</html>