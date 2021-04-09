<%@page import="kr.or.ddit.member.vo.MemberVO"%>
<%@page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	// 서블릿에서 조회결과를 "list"라는 key로 request에 담아줬음
	List<MemberVO> list = (List<MemberVO>)request.getAttribute("list");	// 조회 결과를 "list"로 담아줬음
	
	for(int i = 0; i < list.size(); i++){
		MemberVO vo = list.get(i);
		String memId = vo.getMemId();
		String memName = vo.getMemName();
		
		// json 타입으로 만들어야하는 부분 ==> {name : "", id : ""}
		if(i>0){
			%>,<%
		}
		%>{name : "<%=memName %>", id : "<%=memId %>"}<%
	}
%>

