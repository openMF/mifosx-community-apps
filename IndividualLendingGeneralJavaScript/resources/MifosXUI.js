(function($) {

	$.MifosXUI = {};

	$.MifosXUI.Init = function(userPermissions, applicationName, tenantName) {

		mUserPermissions = userPermissions;
		mApplicationName = applicationName;
		mTenantName = tenantName;
	};

	$.MifosXUI.showIt function(functionalityName) {
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
