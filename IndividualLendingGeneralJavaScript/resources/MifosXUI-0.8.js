(function($) {

//This does know about Mifos X Permission checking
//%SUPER_USER not being checked yet
taskPermissionsMatrix = {
		CLIENTSEARCH: ["READ_CLIENT"],

		CHECKERINBOX: ["READ_MAKERCHECKER"],

		GROUPSEARCH: ["READ_GROUP"],

		VIEWUSERS: ["READ_USER"],
		ADDUSER: ["CREATE_USER"],
		VIEWROLES: ["READ_ROLE"],
		ADDROLES: ["CREATE_ROLE"],

		VIEWLOANPRODUCTS: ["READ_LOANPRODUCT"],
		ADDLOANPRODUCT: ["CREATE_LOANPRODUCT"],
		VIEWDEPOSITPRODUCTS: ["READ_DEPOSITPRODUCT"],
		ADDDEPOSITPRODUCT: ["CREATE_DEPOSITPRODUCT"],
		VIEWFUNDS: ["READ_FUND"],
		ADDFUND: ["CREATE_FUND"],
		VIEWEMPLOYEES: ["READ_STAFF"],
		ADDEMPLOYEE: ["CREATE_STAFF"],
		VIEWCHARGES: ["READ_CHARGE"],
		ADDCHARGE: ["CREATE_CHARGE"],
		CURRENCYCONFIGURATION: ["UPDATE_CURRENCY"],
		VIEWOFFICES: ["READ_OFFICE"],
		ADDOFFICE: ["CREATE_OFFICE"],
		VIEWOFFICEMONEYTXNS: ["READ_OFFICETRANSACTION"],
		ADDOFFICEMONEYTXN: ["CREATE_OFFICETRANSACTION"],
		BULKLOANREASSIGNMENT: ["BULKREASSIGN_LOAN"],

		VIEWDATATABLES: ["READ_DATATABLE"],
		REGISTERDATATABLE: ["REGISTER_DATATABLE"],
		VIEWCODES: ["READ_CODE"],
		ADDCODE: ["CREATE_CODE"],
		VIEWPERMISSIONS: ["READ_PERMISSION"],
		MANAGEPERMISSIONS: ["UPDATE_PERMISSION"],

		EDITCLIENT: ["UPDATE_CLIENT"],
		DELETECLIENT: ["DELETE_CLIENT"],
		ADDLOAN: ["CREATE_LOAN"],
		ADDCLIENTNOTE: ["CREATE_CLIENTNOTE"],

		VIEWNOTES: ["READ_CLIENTNOTE"],



		ADDDEPOSITACCOUNT: ["CREATE_DEPOSITACCOUNT"]
	};


menuTasksMatrix = {
		CLIENTSMENU: ["CLIENTSEARCH"],
		CHECKERMENU: ["CHECKERINBOX"],
		GROUPSMENU: ["GROUPSEARCH"],
		USERADMINMENU: ["VIEWUSERS", "ADDUSER", "VIEWROLES", "ADDROLE"],
		ORGADMINMENU: ["VIEWLOANPRODUCTS", "ADDLOANPRODUCT", "VIEWDEPOSITPRODUCTS", "ADDDEPOSITPRODUCT", "VIEWFUNDS", "ADDFUND",
				"VIEWEMPLOYEES", "ADDEMPLOYEE", "VIEWCHARGES", "ADDCHARGE", "CURRENCYCONFIGURATION",
				"VIEWOFFICES", "ADDOFFICE", "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN", "BULKLOANREASSIGNMENT"],
		SYSADMINMENU: ["VIEWDATATABLES", "REGISTERDATATABLE", "VIEWCODES", "ADDCODE", "VIEWPERMISSIONS", "MANAGEPERMISSIONS"]
		// api only brings back reports that are permitted so this is not needed REPORTSMENU: ["TBD"]
	};




applicationProfiles = ["ALL", "IL"];

applicationProfileInclusions = {
	};

applicationProfileExclusions = {
		IL: ["GROUPSEARCH", "ADDDEPOSITACCOUNT", "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"]
	};

tenantNameInclusions = {
		"HEAVENSFAMILY": ["VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"]
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
		
		return showTask(taskName.toUpperCase());	
		
	};

	$.MifosXUI.hasDataTablePermission= function(permissionName) {
		if (isInitialised == false)
		{
			alert("You haven't initialised MifosXUI");
			return false;
		}
		
		return hasDataTablePermission(permissionName);	
		
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

	function hasDataTablePermission(permissionName) {

//remove the next line when super user meaning is definite, till then assume they have permission
		if (anySuperUser() == true) return true;

		if (hasAllFunctions() == true) return true;

		for (var i in mUserPermissions)
		{
			if (mUserPermissions[i] == permissionName) return true;
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

//remove the next line when super user meaning is definite, till then assume they have permission
		if (anySuperUser() == true) return true;

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

	function anySuperUser() {

		for (var i in mUserPermissions) 
		{
			if (mUserPermissions[i] == "USER_ADMINISTRATION_SUPER_USER") return true;
			if (mUserPermissions[i] == "ORGANISATION_ADMINISTRATION_SUPER_USER") return true;
			if (mUserPermissions[i] == "PORTFOLIO_MANAGEMENT_SUPER_USER") return true;
			if (mUserPermissions[i] == "REPORTING_SUPER_USER") return true;
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
