package kr.or.ddit.member.dao;

import java.sql.SQLException;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.base.dao.BaseDao;
import kr.or.ddit.member.vo.MemberVO;

public class MemberDao extends BaseDao {
	private SqlMapClient smc;

	public MemberDao() {
		smc = super.getSqlMapClient();
	}

	// Dao 설정
	public void createMember(MemberVO memberVo) throws SQLException {
		smc.insert("member.createMember", memberVo);
	}
//	
//	private void updateMember(MemberVO memberVo) throws SQLException {
//		smc.update("member.updateMember", memberVo);
//	}
	
	public MemberVO retrieveMember(String memId) throws SQLException {
		return (MemberVO)smc.queryForObject("member.retrieveMember",memId);
	}
	
	public List<MemberVO> retrieveMemberList(MemberVO memberVo) throws SQLException {
		return smc.queryForList("member.retrieveMemberList", memberVo);
	}
}
