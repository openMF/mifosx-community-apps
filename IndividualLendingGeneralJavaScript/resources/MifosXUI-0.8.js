(function($) {


//Put any dev UI work that you want on the master branch but not in production temporarily here
//It won't be shown unless you pass the query parameter 'mode=dev'
//You can then use showMenu or showTask as normal to check if it should be displayed
//Once you are finished development, you can remove from this array and put in taskPermissionsMatrix or menuTasksMatrix 
		inDevelopmentTasks = ["VIEWLOANPRODUCTS_only_an_example", "SYSADMINMENU_only_an_example"];


//This does know about Mifos X Permission checking - each piece of functionality needs to be linked to a Mifos X permission
//Note: SUPER_USER special permissions not being checked yet and always return true
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



tenantNameInclusions = {
		"HEAVENSFAMILY": ["VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"]
	};

tenantNameExclusions = {
		"DEFAULT": ["SYSADMINMENU_only_an_example", "VIEWLOANPRODUCTS_only_an_example"]
	};


//add all application profiles here
applicationProfiles = ["ALL", "IL"];

applicationProfileExclusions = {
		IL: ["GROUPSEARCH", "ADDDEPOSITACCOUNT", "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"]
	};

applicationProfileInclusions = {
	};//probably not needed as only useful to exclude at this point (tenantName inclusions/exclusions processed first)



isInitialised = false;


	$.MifosXUI = {};

	$.MifosXUI.initialise = function(pUserPermissions, pApplicationProfile, pTenantName, pApplicationMode) {

		mUserPermissions = pUserPermissions;
		mApplicationProfile = pApplicationProfile.toUpperCase();
		mApplicationMode = pApplicationMode.toUpperCase();
		mTenantName = pTenantName.toUpperCase();

		if (checkApplicationProfile() == false) return;

		isInitialised = true;
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

		if (excludeBasedOnQueryParams(menuName) == true) return false;

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
		
		if (excludeBasedOnQueryParams(taskName) == true) return false;

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

	function excludeBasedOnQueryParams(itemName) {

		if (isDevTask(itemName) == true)
		{
			if (mApplicationMode == "DEV") return false;
			else return true;
		}

		var tenantNameCheckResult = tenantNameCheck(itemName);
		switch (tenantNameCheckResult) {
		case "EXCLUDE":
			alert(itemName + ": " + tenantNameCheckResult);
			return true;
		case "INCLUDE":
			return false;
		case "CONTINUE":
			var applicationProfileCheckResult = applicationProfileCheck(itemName);
			switch (applicationProfileCheckResult) {
			case "EXCLUDE":
				return true;
			case "INCLUDE":
				return false;
			case "CONTINUE":
				return false;
			default:
				alert("Invalid applicationProfileCheckResult: " + applicationProfileCheckResult);
				return false;
			}
			break;
		default:
			alert("Invalid tenantNameCheck: " + tenantNameCheckResult);
			return false;

		}

	}

	function applicationProfileCheck(taskName) {
		return includeExcludeCONTINUE(taskName, mApplicationProfile, applicationProfileInclusions, applicationProfileExclusions);
	}

	function tenantNameCheck(taskName) {
		return includeExcludeCONTINUE(taskName, mTenantName, tenantNameInclusions, tenantNameExclusions);
	}

	function includeExcludeCONTINUE(taskName, name, inclusions, exclusions) {
//If name found and the taskName is included - INCLUDE
//If name found and the taskName is excluded - EXCLUDE
//Otherwise (CONTINUE)

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

		return "CONTINUE";
	}

	function isDevTask(itemName) {

		for (var i in inDevelopmentTasks) 
		{
			if (inDevelopmentTasks[i] == itemName) return true;
		}
		return false;	
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
