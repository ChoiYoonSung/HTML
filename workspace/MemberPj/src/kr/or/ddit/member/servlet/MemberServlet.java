package kr.or.ddit.member.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import kr.or.ddit.member.service.MemberService;
import kr.or.ddit.member.vo.MemberVO;

@WebServlet("/MemberServlet")
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 브라우저로 부터 받은 값을 사용하기 위해 request에서 parameter를 get.
		String flag = req.getParameter("flag");
		
		// null이 들어올 수 있는 값일 경우, 비교값.equals(값)
		try {
			if ("L".equals(flag)) { // 목록 조회
				List<MemberVO> list = retrieveMemberList(req);
				
				// 브라우저로 전달할 결과를 request에 attribute로 세팅
				req.setAttribute("list", list);
				
				RequestDispatcher disp = req.getRequestDispatcher("/html/member/memberResultList.jsp");
				disp.forward(req, resp);
			} else if ("C".equals(flag)) { // 등록
				createMember(req);
				
				req.setAttribute("resultCnt", 1);
				RequestDispatcher  disp 
				  = req.getRequestDispatcher("/html/common/checkResult.jsp");
				disp.forward(req, resp);
			} else if ("R".equals(flag)) { // 단건 조회
				
			} else if ("U".equals(flag)) { // 수정
				updateMember(req);
			} else if ("D".equals(flag)) { // 삭제
	
			} else if ("CHKID".equals(flag)){
				MemberVO memberVo = checkMemberId(req);

				int resultCnt = 0;
				if(memberVo != null) {
					resultCnt = 1;
				}
				
				req.setAttribute("resultCnt", resultCnt);
				RequestDispatcher disp = req.getRequestDispatcher("/html/common/checkResult.jsp");
				
				disp.forward(req, resp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void updateMember(HttpServletRequest req) throws Exception{
		MemberVO memberVo = new MemberVO();
		BeanUtils.populate(memberVo, req.getParameterMap());
		
		MemberService service = new MemberService();
		service.updateMember(memberVo);
	}

	private MemberVO checkMemberId(HttpServletRequest req) throws SQLException {
		String memId = req.getParameter("memId");
		
		MemberService service = new MemberService();
		MemberVO memberVo = service.retrieveMember(memId);
		
		return memberVo;
	}

	private void createMember(HttpServletRequest req) throws Exception {
		// 기존 방법
//		String memId = req.getParameter("memId");
//		String memName = req.getParameter("memName");
		
//		MemberVO memberVo = new MemberVO();
//		memberVo.setMemId(memId);
//		memberVo.setMemName(memName);
		
		// bean utils
//		파라미터를 쉽게 VO로 받아옴
		MemberVO memberVo = new MemberVO();
		BeanUtils.populate(memberVo, req.getParameterMap());
		
		MemberService service = new MemberService();
		service.createMember(memberVo);
	}

	// 조회
	public List<MemberVO> retrieveMemberList(HttpServletRequest req) throws SQLException {
		String memId = req.getParameter("memId");
		String memName = req.getParameter("memName");
		// form serialize를 사용해서 파라미터를 전달한 경우, request에 요소의 name으로 parameter가 매핑됨.
		// 예) <input type="text" name="userId"> ==> req.getParameter("userId")

		MemberVO memberVo = new MemberVO();
		memberVo.setMemId(memId);
		memberVo.setMemName(memName);

		// 회원 목록 조회
		MemberService service = new MemberService();
		List<MemberVO> list = service.retrieveMemberList(memberVo);
		return list;
	}
}
