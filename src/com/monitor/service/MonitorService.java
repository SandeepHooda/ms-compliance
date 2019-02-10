package com.monitor.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.communication.email.EmailAddess;
import com.communication.email.EmailVO;
import com.communication.email.MailService;
import com.communication.phone.text.Key;
import com.compliance.Service.ComplianceServiceImpl;
import com.compliance.vo.db.Manager;
import com.compliance.vo.db.TeamMember;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.monitor.vo.ComplianceStatusForTeam;

import mangodb.MangoDB;

public class MonitorService {
	
	public void  deleteAllComplianceStatus(){
		MangoDB.deleteAllDocuments("ms-compliance", "compliance-status",   null);
	}

	private void sendNotification(String subject, String text , List<EmailAddess> receipients) {
		EmailVO emalVO = new EmailVO();
		emalVO.setUserName("personal.reminder.notification@gmail.com");
		emalVO.setPassword(Key.email);
		emalVO.setSubject(subject);
		emalVO.setHtmlContent(text);
		EmailAddess from = new EmailAddess();
		from.setAddress(emalVO.getUserName());
		emalVO.setFromAddress(from);
		
		
		emalVO.setToAddress(receipients);
		MailService.sendSimpleMail(emalVO) ;
			
		
		
	}
	public void sendReminder(boolean reportToManager) {
		Map<String, TeamMember> complianceStatusForEveryOne = getComplianceStatusForEveryOne();
		Set<Manager> allManagers = getAllManagers();
		Set<String> allNonComplaint = new HashSet<String>();
		StringBuffer allManagersIds = new StringBuffer("<br/><br/> In case of any concersn please contact your respective manager listed below. <br/><br/>");
		String weekOfReport = ComplianceServiceImpl.getMondayOfThisWeek();
		for (Manager aManager: allManagers) {
			Set<String> reportees = new HashSet<String>();
			reportees.add(aManager.get_id());
			reportees.addAll(aManager.getReportees());
			ComplianceStatusForTeam statusForMyteam = checkMyTeamCompliance(reportees, complianceStatusForEveryOne,weekOfReport);
			if (reportToManager) {
				//Send email to manager
				System.out.println( " "+statusForMyteam.getDesc());
				List<EmailAddess> receipients = new ArrayList<>();
				EmailAddess to = new EmailAddess();
				to.setAddress(aManager.get_id());
				receipients.add(to);
				sendNotification(statusForMyteam.getSubject(), statusForMyteam.getDesc(), receipients);
			}else {
				allNonComplaint.addAll(statusForMyteam.getNonCompliantMembers());
				allManagersIds.append(aManager.get_id()+"<br/>");
			}
			
		}
		if (!reportToManager) {//Send reminder to all nonCompliants
			System.out.println( " Non compliant members "+allNonComplaint);
			
			List<EmailAddess> receipients = new ArrayList<>();
			for (String email: allNonComplaint) {
				EmailAddess to = new EmailAddess();
				to.setAddress(email);
				receipients.add(to);
			}
			
			sendNotification("Morganstanley Compliance Team", "Please go to the compliance App and verify your compliance status. "+allManagersIds.toString(), receipients);
		}
	}
	private Map<String, TeamMember> getComplianceStatusForEveryOne(){
		Gson  json = new Gson();
		String coplilianceStatusStr = "["+MangoDB.getDocumentWithQuery("ms-compliance", "compliance-status",   null )+"]";
		Set<TeamMember> coplilianceStatus = json.fromJson(coplilianceStatusStr, new TypeToken<Set<TeamMember>>() {}.getType());
		Map<String, TeamMember> complianceStatusForEveryOne = new HashMap<String, TeamMember>();
		if (null != coplilianceStatus && coplilianceStatus.size() > 0) {
			for (TeamMember member: coplilianceStatus) {
				complianceStatusForEveryOne.put(member.get_id(), member);
			}
		}
		return complianceStatusForEveryOne;
	}
	private ComplianceStatusForTeam checkMyTeamCompliance(Set<String> reportees, Map<String, TeamMember> complianceStatusForEveryOne, String weekOfReport) {
		ComplianceStatusForTeam statusForMyTeam = new ComplianceStatusForTeam();
	
		StringBuffer sb = new StringBuffer("<br/> List of non compliant team memmebrs.  ");
		int nonCompliantCount = 0;

		for (String reportee : reportees) {
			TeamMember memberStatus = complianceStatusForEveryOne.get(reportee+weekOfReport);
			if (null == memberStatus || memberStatus.getComplianceTarget() == null || memberStatus.getComplianceTarget().size() <2) {
				sb.append(" <br/>" +reportee );
				nonCompliantCount++;
				statusForMyTeam.getNonCompliantMembers().add(reportee);
				
			}
		}
		if (nonCompliantCount ==0 ) {
			statusForMyTeam.setSubject(" All compliant!  ");
			statusForMyTeam.setDesc("All of the "+reportees.size()+" members in your team are fully compliant");
			statusForMyTeam.setAllCompolaint(true);
		}else {
			statusForMyTeam.setSubject(" Your team is not compliant to MS. ");
			statusForMyTeam.setDesc("Out of "+reportees.size()+" members in your team "+nonCompliantCount+" are non compliant to MS <br/>"+sb.toString());
		}
		return statusForMyTeam;
	}
	private Set<Manager> getAllManagers(){
		String isManagerQuery = "{\"hasReportees\": true}";
		try {
			isManagerQuery =URLEncoder.encode(isManagerQuery, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			
			e.printStackTrace();
		}
		isManagerQuery = "&q="+isManagerQuery;
		String allManagers = "["+MangoDB.getDocumentWithQuery("ms-compliance", "team-managers",   null , null, false, null, isManagerQuery)+"]";
		Gson  json = new Gson();
		return json.fromJson(allManagers, new TypeToken<Set<Manager>>() {}.getType());
		
	}
}
