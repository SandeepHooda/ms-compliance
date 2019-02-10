package com.compliance.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.logging.Logger;

import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import mangodb.MangoDB;

public class ComplianceServiceImpl implements ComplianceService {

	private static final Logger log = Logger.getLogger(ComplianceServiceImpl.class.getName());
 private static SimpleDateFormat mmddyyyy = new SimpleDateFormat("MMddyyyy");
	public static String getMondayOfThisWeek() {
		// get today and clear time of day
		Calendar cal = new GregorianCalendar();
		/*cal.set(Calendar.HOUR_OF_DAY, 0); // ! clear would not reset the hour of day !
		cal.clear(Calendar.MINUTE);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);*/

		// get start of this week in milliseconds
		
		System.out.println(" first day of week is "+cal.getFirstDayOfWeek());
		cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
		return mmddyyyy.format(new Date(cal.getTimeInMillis()));
		
	}
	@Override
	public TeamMember getMyComplianceStatus(String userEmailID) {
		System.out.println("getMyComplianceStatus "+userEmailID+getMondayOfThisWeek());
		//Get Usrer details from DB
		String complianceStatusOfWeek =  MangoDB.getDocumentWithQuery("ms-compliance", "compliance-status", userEmailID+getMondayOfThisWeek()) ;
		System.out.println("result  "+complianceStatusOfWeek);
		Gson  json = new Gson();
		TeamMember member = json.fromJson(complianceStatusOfWeek, new TypeToken<TeamMember>() {}.getType());
		if (null == member) {
			member = new TeamMember();
			member.set_id(userEmailID);
		}
		System.out.println(member.toString());
		return member;
		
		
	}
	
	@Override
	public Manager getMyDetails(String userEmailID) {
		
		//Get Usrer details from DB
		String userInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-managers", userEmailID);
		Gson  json = new Gson();
		Manager manager = json.fromJson(userInDB, new TypeToken<Manager>() {}.getType());
		
		
		return manager;
	}
	
	@Override
	public String registerNewUser(Manager manager) {
		//Manager DB
		String managerInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-managers",  manager.get_id());
		if (managerInDB == null || managerInDB.indexOf(manager.get_id()) <0) {//user not present then create it
			Gson  json = new Gson();
			String data = json.toJson(manager, new TypeToken<Manager>() {}.getType());
			 MangoDB.createNewDocumentInCollection("ms-compliance", "team-managers", data, null);
		}
		
		
		
		return "OK";
	}
	@Override
	public Manager addAReportee(Manager manager) {
		
		Manager myDetails =  getMyDetails( manager.get_id());
		if (null != myDetails && myDetails.getReportees() != null) {
			manager.getReportees().addAll(myDetails.getReportees());
		}
		manager.setHasReportees(true);
		Gson  json = new Gson();
		String data = json.toJson(manager, new TypeToken<Manager>() {}.getType());
		MangoDB.createNewDocumentInCollection("ms-compliance", "team-managers", data, null);
		return manager;
	}
	@Override
	public Manager deleteAReportee(Manager manager) {
		Manager myDetails =  getMyDetails( manager.get_id());
		if (null != myDetails && myDetails.getReportees() != null) {
			myDetails.getReportees().removeAll(manager.getReportees());
			manager.setReportees(myDetails.getReportees());
		}
		if (manager.getReportees() !=null && manager.getReportees().size() > 0) {
			manager.setHasReportees(true);
		}else {
			manager.setHasReportees(false);
		}
		Gson  json = new Gson();
		String data = json.toJson(manager, new TypeToken<Manager>() {}.getType());
		MangoDB.createNewDocumentInCollection("ms-compliance", "team-managers", data, null);
		return manager;
	}

	@Override
	public Manager applyConstraints(Manager manager) {
		Manager myDetails =  getMyDetails( manager.get_id());
		if (null != myDetails && myDetails.getReportees() != null) {
			myDetails.setCoplianceTargetForTeam(manager.getCoplianceTargetForTeam());
		}
		Gson  json = new Gson();
		String data = json.toJson(myDetails, new TypeToken<Manager>() {}.getType());
		MangoDB.createNewDocumentInCollection("ms-compliance", "team-managers", data, null);
		return manager;
	}
	@Override
	public TeamMember iComply(TeamMember member) {
		String userEmailID = member.get_id();
		member.set_id(userEmailID+getMondayOfThisWeek());
		Gson  json = new Gson();
		String data = json.toJson(member, new TypeToken<TeamMember>() {}.getType());
		MangoDB.createNewDocumentInCollection("ms-compliance", "compliance-status", data, null);
		
		return getMyComplianceStatus(userEmailID);
				
	}

}
