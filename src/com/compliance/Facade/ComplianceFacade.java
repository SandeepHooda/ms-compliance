package com.compliance.Facade;

import com.compliance.Service.ComplianceService;
import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;
import com.compliance.vo.response.PlainResponse;

public class ComplianceFacade {
	
	private ComplianceService service;

	
	public TeamMember iComply(TeamMember member) {
		return service.iComply(member);

	}
	public TeamMember getMyComplianceStatus(String userEmailID) {
		
		return service.getMyComplianceStatus(userEmailID);
		
	}
	
	public Manager getMyDetails(String userEmailID) {
		
		return service.getMyDetails(userEmailID);
	}
	
	public PlainResponse registerNewUser(Manager manager) {
		PlainResponse response = new PlainResponse();
		response.setStatus(service.registerNewUser(manager));
		return response;
		
	}
	public Manager addAReportee(Manager manager) {
		return service.addAReportee(manager);
	}
	public Manager deleteAReportee(Manager manager) {
		return service.deleteAReportee(manager);
	}
	
	public Manager applyConstraints(Manager manager) {
		return service.applyConstraints(manager);
	}
	
	
	public ComplianceService getService() {
		return service;
	}

	public void setService(ComplianceService service) {
		this.service = service;
	}

	
}
