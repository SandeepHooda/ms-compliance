package com.compliance.vo.response;

import java.util.Set;

import com.compliance.vo.db.ComplianceItem;

public class ComplianceStatus {
	Set<ComplianceItem> myComplianceItems;

	public Set<ComplianceItem> getMyComplianceItems() {
		return myComplianceItems;
	}

	public void setMyComplianceItems(Set<ComplianceItem> myComplianceItems) {
		this.myComplianceItems = myComplianceItems;
	}

	
	
}
