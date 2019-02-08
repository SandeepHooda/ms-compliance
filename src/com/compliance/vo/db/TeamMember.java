package com.compliance.vo.db;

import java.util.Set;

public class TeamMember {
	private String _id;//Email address
	private Set<String> myManagers;//As soon as one or more people add me to theit list this set will be auto polulated

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public Set<String> getMyManagers() {
		return myManagers;
	}

	public void setMyManagers(Set<String> myManagers) {
		this.myManagers = myManagers;
	}
	

}
