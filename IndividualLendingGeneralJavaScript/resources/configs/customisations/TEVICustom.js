

//over-ride show first page
custom.showFirstPage = function() {
	
	if (hasRole("Program Director") == true) {
		showProgramDirectorPage("content");
		return;
	}
	if (hasRole("Branch Manager") == true) {
		showBranchManagerPage("content");
		return;
	}
	if (hasRole("Coordinator") == true) {
		showCoordinatorPage("content");
		return;
	}
	if (hasRole("Field Agent") == true) {
		showFieldAgentPage("content");
		return;
	}
	
	
	//If the roles above are not found default to client listing
	showILClientListing("content");
	
}

function hasRole(roleName) {
	for (var i in mUserRoles)
	{
		if (mUserRoles[i].name == roleName) return true;
	}
	return false;
}


function showProgramDirectorPage(divName) {
	var htmlVar = "Program Director Page";
	$("#" + divName).html(htmlVar);
}

function showBranchManagerPage(divName) {
	var htmlVar = "Branch Manager Page";
	$("#" + divName).html(htmlVar);
}

function showCoordinatorPage(divName) {
	var htmlVar = "Coordinator Page";
	$("#" + divName).html(htmlVar);
}

function showFieldAgentPage(divName) {
	var htmlVar = "Field Agent Page";
	$("#" + divName).html(htmlVar);
}

