package com.compliance.Service;

import java.util.Set;

import com.compliance.vo.db.ComplianceItem;
import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;

public interface ComplianceService {

	
	public Set<String> getAllTeamMembers();
	public Set<ComplianceItem> getMyComplianceStatus(String userEmailID);
	public Set<String> getMyReportees(String userEmailID);
	public String registerNewUser(TeamMember member);
	public Manager addAReportee(Manager manager);
	public Manager deleteAReportee(Manager manager);

}
