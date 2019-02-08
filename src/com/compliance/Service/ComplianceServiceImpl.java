package com.compliance.Service;

import com.compliance.vo.db.TeamMember;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import mangodb.MangoDB;

public class ComplianceServiceImpl implements ComplianceService {

	@Override
	public boolean getMyComplianceStatus() {
		return true;
	}
	@Override
	public String registerNewUser(TeamMember member) {
		String userInDB = MangoDB.getDocumentWithQuery("ms-compliance", "team-members",  member.get_id());
		if (userInDB == null || userInDB.indexOf(member.get_id()) <0) {//user not present then create it
			Gson  json = new Gson();
			String data = json.toJson(member, new TypeToken<TeamMember>() {}.getType());
			 MangoDB.createNewDocumentInCollection("ms-compliance", "team-members", data, null);
		}
		
		return "OK";
	}

}
