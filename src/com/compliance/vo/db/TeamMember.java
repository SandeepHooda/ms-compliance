package com.compliance.vo.db;

import java.util.HashSet;
import java.util.Set;

public class TeamMember {
	private String _id;//Email address
	private Set<String> complianceTarget = new HashSet<String>();

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public Set<String> getComplianceTarget() {
		return complianceTarget;
	}

	public void setComplianceTarget(Set<String> complianceTarget) {
		this.complianceTarget = complianceTarget;
	}

	public String toString() {
		return "id : "+_id+" compliance "+complianceTarget;
	}

}
