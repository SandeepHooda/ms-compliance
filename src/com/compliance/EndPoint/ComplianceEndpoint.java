package com.compliance.EndPoint;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.compliance.vo.db.TeamMember;

@Path("/compliance")
public interface ComplianceEndpoint {
	
	@GET
	@Path("/status")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getMyComplianceStatus();
	
	@POST
	@Path("/user")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response registerNewUser(TeamMember member);

}
