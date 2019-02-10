package com.monitor.vo;

import java.util.HashSet;
import java.util.Set;

public class ComplianceStatusForTeam {
	private Set<String> nonCompliantMembers = new HashSet<String>();
	private boolean allCompolaint;
	private String subject;
	private String desc;
	public boolean isAllCompolaint() {
		return allCompolaint;
	}
	public void setAllCompolaint(boolean allCompolaint) {
		this.allCompolaint = allCompolaint;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public Set<String> getNonCompliantMembers() {
		return nonCompliantMembers;
	}
	public void setNonCompliantMembers(Set<String> nonCompliantMembers) {
		this.nonCompliantMembers = nonCompliantMembers;
	}

}
