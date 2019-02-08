package com.compliance.Facade;

import com.compliance.Service.ComplianceService;
import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;
import com.compliance.vo.response.AllTeamMembers;
import com.compliance.vo.response.ComplianceStatus;
import com.compliance.vo.response.MyReportees;
import com.compliance.vo.response.PlainResponse;

public class ComplianceFacade {
	
	private ComplianceService service;

	
	public AllTeamMembers getAllTeamMembers() {
		AllTeamMembers response = new AllTeamMembers();
		response.setAllTeamMembers(service.getAllTeamMembers());
		return response;
	}
	public ComplianceStatus getMyComplianceStatus(String userEmailID) {
		ComplianceStatus response = new ComplianceStatus();
		response.setMyComplianceItems(service.getMyComplianceStatus(userEmailID));
		return response;
	}
	
	public MyReportees getMyReportees(String userEmailID) {
		MyReportees response = new MyReportees();
		response.setReporteesEmailID(service.getMyReportees(userEmailID));
		return response;
	}
	
	public PlainResponse registerNewUser(TeamMember member) {
		PlainResponse response = new PlainResponse();
		response.setStatus(service.registerNewUser(member));
		return response;
		
	}
	public Manager addAReportee(Manager manager) {
		return service.addAReportee(manager);
	}
	public Manager deleteAReportee(Manager manager) {
		return service.deleteAReportee(manager);
	}
	
	public ComplianceService getService() {
		return service;
	}

	public void setService(ComplianceService service) {
		this.service = service;
	}

	
}
