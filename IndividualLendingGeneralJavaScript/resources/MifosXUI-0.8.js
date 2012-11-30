(function($) {

//This does know about Mifos X Permission checking
//SUPER_USER not being checked yet
taskPermissionsMatrix = {
		CLIENTSEARCH: ["READ_CLIENT"],
		GROUPSEARCH: ["READ_GROUP"],
		VIEWUSERS: ["READ_USER"],
		ADDUSER: ["CREATE_USER"],
		VIEWROLES: ["READ_ROLE"],
		ADDROLE: ["CREATE_ROLE"]
	};


menuTasksMatrix = {
		CLIENTSMENU: ["CLIENTSEARCH"],
		GROUPSMENU: ["GROUPSEARCH"],
		USERADMINMENU: ["VIEWUSERS", "ADDUSER", "VIEWROLES", "ADDROLE"],
		ORGADMINMENU: ["TBD"],
		SYSADMINMENU: ["TBD"],
		REPORTSMENU: ["TBD"]
	};




applicationProfiles = ["ALL", "IL"];

applicationProfileInclusions = {
	};

applicationProfileExclusions = {
		IL: ["GROUPSEARCH", "DEPOSITCREATE", "OFFICETRANSACTIONLIST", "OFFICETRANSACTIONCREATE"]
	};

tenantNameInclusions = {
		"HEAVENSFAMILY": ["OFFICETRANSACTIONLIST", "OFFICETRANSACTIONCREATE"]
	};

tenantNameExclusions = {
	};

isInitialised = false;


	$.MifosXUI = {};

	$.MifosXUI.initialise = function(userPermissions, applicationProfile, tenantName) {

		mUserPermissions = userPermissions;
		mApplicationProfile = applicationProfile.toUpperCase();
		mTenantName = tenantName.toUpperCase();

		if (checkApplicationProfile() == false) return;

		isInitialised = true;

		//for (var i in mUserPermissions) alert("Perm: " + i + " is " + mUserPermissions[i]);
		//alert("app: " + mApplicationProfile);
		//alert("tenant: " + mTenantName );
	};

	$.MifosXUI.showMenu = function(menuName) {
		if (isInitialised == false)
		{
			alert("You haven't initialised MifosXUI");
			return false;
		}
		
		return showMenu(menuName.toUpperCase());	
	};

	$.MifosXUI.showTask = function(taskName) {
		if (isInitialised == false)
		{
			alert("You haven't initialised MifosXUI");
			return false;
		}
		
		// temp - remove when permissions done
		if ("Checker" == taskName) {
			return true;
		} else {
			return showTask(taskName.toUpperCase());	
		}
	};

	function showMenu(menuName) {

		var menuTasks = menuTasksMatrix [menuName];

//If menuName not found assume 'okay to show' (true)
		if (typeof menuTasks == "undefined") return true;

		for (var i in menuTasks) 
		{
			if (userPermissionsCheck(menuTasks[i]) == true) return true;
		}
		return false;
	}


	function showTask(taskName) {

		var tenantNameCheckResult = tenantNameCheck(taskName);
		switch (tenantNameCheckResult) {
		case "EXCLUDE":
			return false;
			break;
		case "INCLUDE":
			break;
		case "NEITHER":
			var applicationProfileCheckResult = applicationProfileCheck(taskName);
			switch (applicationProfileCheckResult) {
			case "EXCLUDE":
				return false;
				break;
			case "INCLUDE":
				break;
			case "NEITHER":
				break;
			default:
				alert("Invalid applicationProfileCheckResult: " + applicationProfileCheckResult);
				return false;
			}
			break;
		default:
			alert("Invalid tenantNameCheck: " + tenantNameCheckResult);
			return false;

		}

		return userPermissionsCheck(taskName);
	}


	function userPermissionsCheck(taskName) {

		if (hasAllFunctions() == true) return true;

		var taskPermissions = taskPermissionsMatrix[taskName];

//If taskName not found assume 'okay to show' (true)
		if (typeof taskPermissions == "undefined") return true;

		if (hasAllFunctionsReadRelevant(taskPermissions) == true) return true;

		return checkSpecificPermission(taskPermissions);
	}

	function hasAllFunctions() {

		for (var i in mUserPermissions) 
		{
			if (mUserPermissions[i] == "ALL_FUNCTIONS") return true;
		}
		return false;
	}

	function hasAllFunctionsReadRelevant(taskPermissions) {
//if any of the permissions is a read permission its okay if user has read only capability

		for (var h in taskPermissions)
		{
			if (taskPermissions[h].substring(0,5) == "READ_")
			{
				for (var i in mUserPermissions) 
				{
					if (mUserPermissions[i] == "ALL_FUNCTIONS_READ") return true;
				}
			}
		}
		return false;
	}

	function checkSpecificPermission(taskPermissions) {

		for (var h in taskPermissions)
		{
				for (var i in mUserPermissions) 
				{
					if (mUserPermissions[i] == taskPermissions[h]) return true;
				}
		}
		return false;
	}





	function applicationProfileCheck(taskName) {
		return includeExcludeNeither(taskName, mApplicationProfile, applicationProfileInclusions, applicationProfileExclusions);
	}

	function tenantNameCheck(taskName) {
		return includeExcludeNeither(taskName, mTenantName, tenantNameInclusions, tenantNameExclusions);
	}

	function includeExcludeNeither(taskName, name, inclusions, exclusions) {
//If name found and the taskName is included - INCLUDE
//If name found and the taskName is excluded - EXCLUDE
//Otherwise (NEITHER)

		for (var i in inclusions) 
		{
			if (i == name)
			{
				for (var j in inclusions[i])
				{
					if (inclusions[i][j] == taskName) return "INCLUDE";
				}
			}
		}

		for (var i in exclusions) 
		{
			if (i == name)
			{
				for (var j in exclusions[i])
				{
					if (exclusions[i][j] == taskName) return "EXCLUDE";
				}
			}
		}

		return "NEITHER";
	}

	function checkApplicationProfile() {

		for (var i in applicationProfiles) 
		{
			if (applicationProfiles[i] == mApplicationProfile) return true;
		}

		alert("Invalid Application Profile: " + mApplicationProfile);
		return false;
	}




})(jQuery);
