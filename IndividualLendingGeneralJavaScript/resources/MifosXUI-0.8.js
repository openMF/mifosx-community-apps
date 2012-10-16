(function($) {

//This does know about Mifos X Permission checking
functionalityPermissionMatrix = {
		CLIENTSEARCH: ["ALL_FUNCTIONS", "ALL_FUNCTIONS_READ", "CAN_CLIENT_LISTING"]
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

	$.MifosXUI.showIt = function(functionalityName) {
		return true;
//		if (isInitialised == false)
//		{
//			alert("You haven't initialised MifosXUI");
//			return false;
//		}
//
//		return showIt(functionalityName.toUpperCase());   
	};

	function showIt(functionalityName) {

		var tenantNameCheckResult = tenantNameCheck(functionalityName);
		switch (tenantNameCheckResult) {
		case "EXCLUDE":
			return false;
			break;
		case "INCLUDE":
			break;
		case "NEITHER":
			var applicationProfileCheckResult = applicationProfileCheck(functionalityName);
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

		return userPermissionsCheck(functionalityName);
	}


	function userPermissionsCheck(functionalityName) {
//If functionalityName not found assume 'okay to show' (true)
//If functionalityName found but the user doesn't have permission 'not okay to show'  (false)

		for (var fName in functionalityPermissionMatrix)
		{
			if (fName == functionalityName)
			{
				for (var perms in functionalityPermissionMatrix[fName])
				{
					for (var userPerms in mUserPermissions) 
					{
						if (functionalityPermissionMatrix[fName][perms] == mUserPermissions[userPerms]) return true;
					}
				}
				return false;
			}
		}

		return true;
	}

	function applicationProfileCheck(functionalityName) {
		return includeExcludeNeither(functionalityName, mApplicationProfile, applicationProfileInclusions, applicationProfileExclusions);
	}

	function tenantNameCheck(functionalityName) {
		return includeExcludeNeither(functionalityName, mTenantName, tenantNameInclusions, tenantNameExclusions);
	}

	function includeExcludeNeither(functionalityName, name, inclusions, exclusions) {
//If name found and the functionalityName is included - INCLUDE
//If name found and the functionalityName is excluded - EXCLUDE
//Otherwise (NEITHER)

		for (var i in inclusions) 
		{
			if (i == name)
			{
				for (var j in inclusions[i])
				{
					if (inclusions[i][j] == functionalityName) return "INCLUDE";
				}
			}
		}

		for (var i in exclusions) 
		{
			if (i == name)
			{
				for (var j in exclusions[i])
				{
					if (exclusions[i][j] == functionalityName) return "EXCLUDE";
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
