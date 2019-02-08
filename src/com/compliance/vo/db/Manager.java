package com.compliance.vo.db;

import java.util.Set;

public class Manager {
	private String _id;//Email address
	private Set<String> reportees;
	private Set<String> coplianceTargetForTeam;
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public Set<String> getReportees() {
		return reportees;
	}
	public void setReportees(Set<String> reportees) {
		this.reportees = reportees;
	}
	public Set<String> getCoplianceTargetForTeam() {
		return coplianceTargetForTeam;
	}
	public void setCoplianceTargetForTeam(Set<String> coplianceTargetForTeam) {
		this.coplianceTargetForTeam = coplianceTargetForTeam;
	}
	

}
