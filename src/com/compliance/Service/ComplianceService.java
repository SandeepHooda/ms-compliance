package com.compliance.Service;

import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;

public interface ComplianceService {

	

	public TeamMember getMyComplianceStatus(String userEmailID);
	public TeamMember iComply(TeamMember member);
	public Manager getMyDetails(String userEmailID);
	public String registerNewUser(Manager manager);
	public Manager addAReportee(Manager manager);
	public Manager deleteAReportee(Manager manager);
	public Manager applyConstraints(Manager manager);
	

}
