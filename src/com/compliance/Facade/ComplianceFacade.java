package com.compliance.Facade;

import com.compliance.Service.ComplianceService;
import com.compliance.vo.db.TeamMember;
import com.compliance.vo.response.PlainResponse;
import com.poc.Response.PocResponse;

public class ComplianceFacade {
	
	private ComplianceService service;

	public PocResponse getMyComplianceStatus() {
		PocResponse response = new PocResponse();
		response.setShowButtonFlag(service.getMyComplianceStatus());
		return response;
	}
	public PlainResponse registerNewUser(TeamMember member) {
		PlainResponse response = new PlainResponse();
		response.setStatus(service.registerNewUser(member));
		return response;
		
	}
	public ComplianceService getService() {
		return service;
	}

	public void setService(ComplianceService service) {
		this.service = service;
	}

	
}
