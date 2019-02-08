package com.compliance.EndPoint;

import javax.ws.rs.core.Response;

import com.compliance.Facade.ComplianceFacade;
import com.compliance.vo.db.TeamMember;


public class ComplianceEndpointImpl implements ComplianceEndpoint {
	private ComplianceFacade facade;
	public ComplianceFacade getFacade() {
		return facade;
	}

	public void setFacade(ComplianceFacade facade) {
		this.facade = facade;
	}
	@Override
	public Response getMyComplianceStatus() {
		
		
		return Response.ok().entity(facade.getMyComplianceStatus()).build();
	}

	@Override
	public Response registerNewUser(TeamMember member) {
		return Response.ok().entity(facade.registerNewUser(member)).build();
	}

	

	
	
}
