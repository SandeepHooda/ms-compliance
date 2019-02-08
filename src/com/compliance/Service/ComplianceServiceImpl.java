package com.compliance.Service;

import java.util.HashSet;
import java.util.Set;

import com.compliance.vo.db.ComplianceItem;
import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import mangodb.MangoDB;

public class ComplianceServiceImpl implements ComplianceService {

	@Override
	public Set<String> getAllTeamMembers(){
		Set<String> allTeamMembers = null;
		//Get Usrer details from DB
		String allUsersInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-members", null);
		Gson  json = new Gson();
		Set<TeamMember> allMembers = json.fromJson("["+allUsersInDB+"]", new TypeToken<Set<TeamMember>>() {}.getType());
		
		if (null != allMembers && allMembers.size() > 0) {
			allTeamMembers = new HashSet<String>();
			for (TeamMember member: allMembers ) {
				allTeamMembers.add(member.get_id());
			}
			
		}
		return allTeamMembers;
		
	}
	@Override
	public Set<ComplianceItem> getMyComplianceStatus(String userEmailID) {
		Set<ComplianceItem> myComplainceitems = null;
		//Get Usrer details from DB
		String userInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-members", userEmailID);
		Gson  json = new Gson();
		TeamMember member = json.fromJson(userInDB, new TypeToken<TeamMember>() {}.getType());
		
		if (null != member && member.getMyManagers() != null && member.getMyManagers().size() > 0) {//User has manages who are monitoring his complaince status
			
		}
		return myComplainceitems;
	}
	
	@Override
	public Set<String> getMyReportees(String userEmailID) {
		
		//Get Usrer details from DB
		String userInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-managers", userEmailID);
		Gson  json = new Gson();
		Manager manager = json.fromJson(userInDB, new TypeToken<Manager>() {}.getType());
		
		if (null != manager ) {
			return manager.getReportees();
		}
		return null;
	}
	
	@Override
	public String registerNewUser(TeamMember member) {
		String userInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-members",  member.get_id());
		if (userInDB == null || userInDB.indexOf(member.get_id()) <0) {//user not present then create it
			//Check if any manager has added that user then add that to manages list
			Gson  json = new Gson();
			String data = json.toJson(member, new TypeToken<TeamMember>() {}.getType());
			 MangoDB.createNewDocumentInCollection("ms-compliance", "team-members", data, null);
		}
		
		return "OK";
	}
	@Override
	public Manager addAReportee(Manager manager) {
		Set<String> myExistingReportees =  getMyReportees( manager.get_id());
		if (null != myExistingReportees) {
			manager.getReportees().addAll(myExistingReportees);
		}
		Gson  json = new Gson();
		String data = json.toJson(manager, new TypeToken<Manager>() {}.getType());
		MangoDB.createNewDocumentInCollection("ms-compliance", "team-managers", data, null);
		return manager;
	}
	@Override
	public Manager deleteAReportee(Manager manager) {
		Set<String> myExistingReportees =  getMyReportees( manager.get_id());
		if (null != myExistingReportees) {
			myExistingReportees.removeAll(manager.getReportees());
			manager.setReportees(myExistingReportees);
		}
		Gson  json = new Gson();
		String data = json.toJson(manager, new TypeToken<Manager>() {}.getType());
		MangoDB.createNewDocumentInCollection("ms-compliance", "team-managers", data, null);
		return manager;
	}

}
