(function($) {
//Put any dev UI work that you want on the master branch but not in production temporarily here
//It won't be shown unless you pass the query parameter 'mode=dev'
//You can then use showMenu or showTask as normal to check if it should be displayed
//Once you are finished development, you can remove from this array and put in taskPermissionsMatrix or menuTasksMatrix 
inDevelopmentTasks = ["GROUPSMENU", "CHECKERMENU", "VIEWDEPOSITPRODUCTS", "ADDDEPOSITPRODUCT", "VIEWSAVINGPRODUCTS", "ADDSAVINGPRODUCT", 
                      "VIEWCONFIGURATION", "MANAGEPERMISSIONS", "CLOSEASRESCHEDULEDLOAN",
                      "ADDDEPOSITACCOUNT", "ADDSAVINGACCOUNT", "POSTINTERESTMENU"];

//This does know about Mifos X Permission checking - each piece of functionality needs to be linked to a Mifos X permission
taskPermissionsMatrix = {
		CLIENTSEARCH: ["READ_CLIENT"],

		GROUPSEARCH: ["READ_GROUP"],

		VIEWUSERS: ["READ_USER"],
		ADDUSER: ["CREATE_USER"],
		VIEWROLES: ["READ_ROLE"],
		ADDROLE: ["CREATE_ROLE"],

		VIEWLOANPRODUCTS: ["READ_LOANPRODUCT"],
		ADDLOANPRODUCT: ["CREATE_LOANPRODUCT"],
		VIEWDEPOSITPRODUCTS: ["READ_DEPOSITPRODUCT"],
		ADDDEPOSITPRODUCT: ["CREATE_DEPOSITPRODUCT"],
		VIEWSAVINGPRODUCTS: ["READ_SAVINGPRODUCT"],
		ADDSAVINGPRODUCT: ["CREATE_SAVINGPRODUCT"],
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
		DELETEOFFICEMONEYTXN: ["DELETE_OFFICETRANSACTION"],
		BULKLOANREASSIGNMENT: ["BULKREASSIGN_LOAN"],

		VIEWDATATABLES: ["READ_DATATABLE"],
		REGISTERDATATABLE: ["REGISTER_DATATABLE"],
		DEREGISTERDATATABLE: ["DEREGISTER_DATATABLE"],
		VIEWCODES: ["READ_CODE"],
		ADDCODE: ["CREATE_CODE"],
		VIEWPERMISSIONS: ["READ_PERMISSION"],
		MANAGEPERMISSIONS: ["UPDATE_PERMISSION"],
		VIEWAUDITS: ["READ_AUDIT"],
		
		VIEWCONFIGURATION: ["READ_CONFIGURATION"],
		UPDATECONFIGURATION: ["UPDATE_CONFIGURATION"],

		ADDCLIENT: ["CREATE_CLIENT"],
		EDITCLIENT: ["UPDATE_CLIENT"],
		DELETECLIENT: ["DELETE_CLIENT"],
		ADDCLIENTIDENTIFIER: ["CREATE_CLIENTIDENTIFIER"],
		ADDLOAN: ["CREATE_LOAN"],
		ADDCLIENTNOTE: ["CREATE_CLIENTNOTE"],

		VIEWNOTES: ["READ_CLIENTNOTE"],
		
		ADDLOANCHARGE: ["CREATE_LOANCHARGE"],
		
		ASSIGNLOANOFFICER: ["UPDATELOANOFFICER_LOAN"],
		
		REJECTLOANAPPLICATION: ["REJECT_LOAN"],
		LOANAPPLICATIONWITHDRAWN: ["WITHDRAW_LOAN"],
		
		MODIFYLOAN: ["UPDATE_LOAN"],
		APPROVELOAN: ["APPROVE_LOAN"],
		DELETELOAN: ["DELETE_LOAN"],
		UNDOLOANAPPROVAL: ["APPROVALUNDO_LOAN"],
		DISBURSELOAN: ["DISBURSE_LOAN"],
		UNDOLOANDISBURSAL: ["DISBURSALUNDO_LOAN"],
		LOANREPAYMENT: ["REPAYMENT_LOAN"],
		WAIVEINTERESTPORTIONOFLOAN: ["WAIVEINTERESTPORTION_LOAN"],
		WRITEOFFLOAN: ["WRITEOFF_LOAN"],
		CLOSEASRESCHEDULEDLOAN: ["CLOSEASRESCHEDULED_LOAN"],
		CLOSELOAN: ["CLOSE_LOAN"],
		ADDLOANGUARANTOR: ["CREATE_GUARANTOR"],
		REMOVELOANGUARANTOR: ["DELETE_GUARANTOR"],
		UPDATELOANGUARANTOR: ["UPDATE_GUARANTOR"],
		
		POSTINTEREST: ["POSTINTEREST"],

		ADDDEPOSITACCOUNT: ["CREATE_DEPOSITACCOUNT"],
		ADDSAVINGACCOUNT: ["CREATE_SAVINGACCOUNT"],
		
		VIEWJOURNALENTRIES: ["READ_JOURNALENTRIES"]
	};


menuTasksMatrix = {
		CLIENTSMENU: ["CLIENTSEARCH"],
		CHECKERMENU: ["CHECKERINBOX"],
		GROUPSMENU: ["GROUPSEARCH"],
		USERADMINMENU: ["VIEWUSERS", "ADDUSER", "VIEWROLES", "ADDROLE"],
		ORGADMINMENU: ["VIEWLOANPRODUCTS", "ADDLOANPRODUCT", "VIEWDEPOSITPRODUCTS", "ADDDEPOSITPRODUCT", "VIEWFUNDS", "ADDFUND",
				"VIEWEMPLOYEES", "ADDEMPLOYEE", "VIEWCHARGES", "ADDCHARGE", "CURRENCYCONFIGURATION",
				"VIEWOFFICES", "ADDOFFICE", "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN", "BULKLOANREASSIGNMENT"],
		SYSADMINMENU: ["VIEWDATATABLES", "REGISTERDATATABLE", "VIEWCODES", "ADDCODE", "VIEWPERMISSIONS", "MANAGEPERMISSIONS", "VIEWCONFIGURATION", "VIEWAUDITS"],
		ACCOUNTINGMENU: ["VIEWJOURNALENTRIES"],
		POSTINTERESTMENU: ["POSTINTEREST"]
		// api only brings back reports that are permitted so this is not needed REPORTSMENU: ["TBD"]
	};

tenantNameInclusions = {
		"HEAVENSFAMILY": ["VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"]
	};

tenantNameExclusions = {
		"DEFAULT": ["VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"],
		
		"CEDA-MICROFINANCE": ["CHECKERMENU", "GROUPSMENU", "POSTINTERESTMENU", "VIEWFUNDS", "ADDFUND", "VIEWDEPOSITPRODUCTS", "ADDDEPOSITPRODUCT", 
		                      "VIEWSAVINGPRODUCTS", "ADDSAVINGPRODUCT", "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN", "ADDDEPOSITACCOUNT", "ADDSAVINGACCOUNT", "VIEWCONFIGURATION"],
		                      
		"CREOCORE": ["CHECKERMENU", "GROUPSMENU", "ACCOUNTINGMENU", "POSTINTERESTMENU", "VIEWDEPOSITPRODUCTS", "ADDDEPOSITPRODUCT", "VIEWSAVINGPRODUCTS", "ADDSAVINGPRODUCT",
		             "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN", "ADDDEPOSITACCOUNT", "ADDSAVINGACCOUNT", "VIEWCHARGES", "ADDCHARGE", "ADDLOANCHARGE", "CLOSEASRESCHEDULEDLOAN", 
		             "ADDLOANGUARANTOR", "REMOVELOANGUARANTOR", "VIEWCONFIGURATION"],
		             
		"HEAVENSFAMILY": ["CHECKERMENU", "GROUPSMENU", "ACCOUNTINGMENU", "POSTINTERESTMENU", 
		                  "VIEWDEPOSITPRODUCTS", "ADDDEPOSITPRODUCT", "VIEWSAVINGPRODUCTS", "ADDSAVINGPRODUCT", 
		                  "ADDDEPOSITACCOUNT", "ADDSAVINGACCOUNT", "VIEWCHARGES", "ADDCHARGE", "ADDLOANCHARGE", 
		                  "CLOSEASRESCHEDULEDLOAN", "ADDLOANGUARANTOR", "REMOVELOANGUARANTOR", "VIEWCONFIGURATION"]
	};


//add all application profiles here
applicationProfiles = ["ALL", "IL"];

applicationProfileExclusions = {
		IL: ["GROUPSMENU", "ADDDEPOSITACCOUNT", "VIEWOFFICEMONEYTXNS", "ADDOFFICEMONEYTXN"]
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

		if (menuName == "CHECKERMENU") return hasCheckerPermissions();
		
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

	function hasCheckerPermissions(taskPermissions) {
		
		if (hasAllFunctions() == true) return true;
	
		var endsWith = function( str, suffix ) {
			var xx =  str.indexOf(suffix, str.length - suffix.length) !== -1;
			return xx;
		};

		for (var i in mUserPermissions) 
		{
			if ((mUserPermissions[i] == "CHECKER_SUPER_USER") || (mUserPermissions[i] == "READ_MAKERCHECKER") || (endsWith(mUserPermissions[i], "_CHECKER") == true)) return true;
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
//			alert(itemName + ": " + tenantNameCheckResult);
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
