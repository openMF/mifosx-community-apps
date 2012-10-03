(function($) {

//This does know about Mifos X Permission checking
functionalityPermissionMatrix = {
		xxxclientSearch: ["ALL_FUNCTIONS", "ALL_FUNCTIONS_READ", "CAN_CLIENT_LISTING"]
	};

	$.MifosXUI = {};

	$.MifosXUI.initialise = function(userPermissions, applicationName, tenantName) {

		mUserPermissions = userPermissions;
		mApplicationName = applicationName;
		mTenantName = tenantName;

		//for (var i in mUserPermissions) alert("Perm: " + i + " is " + mUserPermissions[i]);

		//alert("app: " + mApplicationName );

		//alert("tenant: " + mTenantName );
	};

	$.MifosXUI.showIt = function(functionalityName) {
		return showIt(functionalityName);   
	};

	function showIt(functionalityName) {

		if (userPermissionsCheck(functionalityName) == false) return false;

		if (applicationNameCheck(functionalityName) == false) return false;

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

	function applicationNameCheck(functionalityName) {

		return true;
	}

	function tenantNameCheck(functionalityName) {

		return true;
	}




})(jQuery);
