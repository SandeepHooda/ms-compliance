package com.compliance.EndPoint;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;

@Path("/compliance")
public interface ComplianceEndpoint {
	
	@GET
	@Path("/teamMember")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAllTeamMembers();
	
	@GET
	@Path("/status/{userEmailID}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getMyComplianceStatus(@PathParam("userEmailID") String userEmailID);
	
	@GET
	@Path("/reportees/{userEmailID}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getMyReportees(@PathParam("userEmailID") String userEmailID);
	
	@POST
	@Path("/reportee")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response addAReportee(Manager manager);
	
	@DELETE
	@Path("/reportee/{managerID}/{reporteeID}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response deleteAReportee(@PathParam("managerID") String managerID ,@PathParam("reporteeID") String reporteeID);
	
	@POST
	@Path("/user")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response registerNewUser(TeamMember member);

}
