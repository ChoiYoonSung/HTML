package kr.or.ddit.common.service;

import java.sql.SQLException;
import java.util.List;

import kr.or.ddit.common.dao.CodeDao;
import kr.or.ddit.common.vo.CodeVO;

public class CodeService {

	private CodeDao dao;
	
	public CodeService() {
		if(dao == null) {
			dao = new CodeDao();
		}
	}
	
	public List<CodeVO> retrieveCodeList(CodeVO codeVo) throws SQLException {
		return dao.retrieveCodeList(codeVo);
	}
	
	
}
