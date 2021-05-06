package kr.or.ddit.common.service;

import java.sql.SQLException;
import java.util.List;

import kr.or.ddit.common.dao.ZipDao;
import kr.or.ddit.common.vo.ZipVO;

public class ZipService {

	private ZipDao dao;
	
	public ZipService() {
		if(dao == null) {
			dao = new ZipDao();
		}
	}
	
	public List<ZipVO> retrieveZipList(ZipVO zipVO) throws SQLException {
		return dao.retrieveZipList(zipVO);
	}
}
