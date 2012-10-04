(function($) {

//This does know about Mifos X Permission checking
functionalityPermissionMatrix = {
		CLIENTSEARCH: ["ALL_FUNCTIONS", "ALL_FUNCTIONS_READ", "CAN_CLIENT_LISTING"]
	};


applicationProfiles = ["ALL", "IL"];

applicationProfileExclusions = {
		IL: ["GROUPSEARCH", "DEPOSITCREATE"]
	};

tenantNameInclusions = {
		"HEAVENSFAMILY": ["OFFICETRANSACTIONLIST", "OFFICETRANSACTIONCREATE"]
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
		if (isInitialised == false)
		{
			alert("You haven't initialised MifosXUI");
			return false;
		}

		return showIt(functionalityName.toUpperCase());   
	};

	function showIt(functionalityName) {

		if (userPermissionsCheck(functionalityName) == false) return false;

		if (applicationProfileCheck(functionalityName) == false) return false;

		if (tenantNameCheck(functionalityName) == false) return false;
//alert("good to show");
		return true;
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

		for (var appProfile in applicationProfileExclusions) 
		{
			if (appProfile == mApplicationProfile)
			{
				for (var excludedFunction in applicationProfileExclusions[appProfile])
				{
					if (applicationProfileExclusions[appProfile][excludedFunction] == functionalityName) return false;
				}
				return true;
			}
		}

		return true;
	}

	function tenantNameCheck(functionalityName) {

		return true;
	}

	function checkApplicationProfile() {

		for (var i in applicationProfiles) 
		{
			
			if (applicationProfiles[i] == mApplicationProfile) 
			{
				mApplicationProfileIndex = i;
				return true;
			}
		}

		alert("Invalid Application Profile: " + mApplicationProfile);
		return false;
	}




})(jQuery);
