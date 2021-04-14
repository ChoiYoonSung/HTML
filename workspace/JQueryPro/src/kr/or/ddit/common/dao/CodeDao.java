package kr.or.ddit.common.dao;

import java.sql.SQLException;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.base.dao.BaseDao;
import kr.or.ddit.common.vo.CodeVO;

public class CodeDao extends BaseDao {
	private SqlMapClient smc;

	public CodeDao() {
		smc = super.getSqlMapClient();
	}

	public List<CodeVO> retrieveCodeList(CodeVO codeVo) throws SQLException {
		return smc.queryForList("code.retrieveCodeList", codeVo);
	}
}
