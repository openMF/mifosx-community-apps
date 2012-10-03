(function($) {

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
alert("good to show");
		return true;
	}


	function userPermissionsCheck(functionalityName) {

		return true;
	}

	function applicationNameCheck(functionalityName) {

		return true;
	}

	function tenantNameCheck(functionalityName) {

		return true;
	}




})(jQuery);
