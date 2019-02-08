package com.compliance.EndPoint;

import java.util.HashSet;

import javax.ws.rs.core.Response;

import com.compliance.Facade.ComplianceFacade;
import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;
import com.compliance.vo.response.PlainResponse;


public class ComplianceEndpointImpl implements ComplianceEndpoint {
	private ComplianceFacade facade;
	public ComplianceFacade getFacade() {
		return facade;
	}

	public void setFacade(ComplianceFacade facade) {
		this.facade = facade;
	}
	
	@Override
	public Response getAllTeamMembers() {
		try {
			return Response.ok().entity(facade.getAllTeamMembers()).build();
		}catch(Exception e) {
			e.printStackTrace();
			PlainResponse vo = new PlainResponse();
			vo.setStatus("Internal Server Error ");
			return Response.serverError().entity(vo).build();
		}
		
	}
	@Override
	public Response getMyComplianceStatus(String userEmailID) {
		
		try {
			return Response.ok().entity(facade.getMyComplianceStatus(userEmailID)).build();
		}catch(Exception e) {
			e.printStackTrace();
			PlainResponse vo = new PlainResponse();
			vo.setStatus("Internal Server Error ");
			return Response.serverError().entity(vo).build();
		}
	}

	@Override
	public Response getMyReportees(String userEmailID) {
		try {
			return Response.ok().entity(facade.getMyReportees(userEmailID)).build();
		}catch(Exception e) {
			e.printStackTrace();
			PlainResponse vo = new PlainResponse();
			vo.setStatus("Internal Server Error ");
			return Response.serverError().entity(vo).build();
		}
		
	}
	
	@Override
	public Response registerNewUser(TeamMember member) {
		try {
			return Response.ok().entity(facade.registerNewUser(member)).build();
		}catch(Exception e) {
			e.printStackTrace();
			PlainResponse vo = new PlainResponse();
			vo.setStatus("Internal Server Error ");
			return Response.serverError().entity(vo).build();
		}
		
	}

	@Override
	public Response addAReportee(Manager manager) {
		try {
			return Response.ok().entity(facade.addAReportee(manager)).build();
		}catch(Exception e) {
			e.printStackTrace();
			PlainResponse vo = new PlainResponse();
			vo.setStatus("Internal Server Error ");
			return Response.serverError().entity(vo).build();
		}
		
	}
	@Override
	public Response deleteAReportee(String managerID , String reporteeID) {
		try {
			Manager manager = new Manager();
			manager.set_id(managerID);
			manager.setReportees(new HashSet<String>());
			manager.getReportees().add(reporteeID);
			return Response.ok().entity(facade.deleteAReportee(manager)).build();
		}catch(Exception e) {
			e.printStackTrace();
			PlainResponse vo = new PlainResponse();
			vo.setStatus("Internal Server Error ");
			return Response.serverError().entity(vo).build();
		}
		
	}

	

	
	
}
