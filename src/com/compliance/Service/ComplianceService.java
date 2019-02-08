package com.compliance.Service;

import com.compliance.vo.db.TeamMember;

public interface ComplianceService {

	public boolean getMyComplianceStatus();
	public String registerNewUser(TeamMember member);

}
