//Can be used to set tenant configuration code - not used yet (JPW)
	tenantIdentifier = "default";
	if (QueryParameters["tenantIdentifier"]) tenantIdentifier= QueryParameters["tenantIdentifier"];

	var tenantConfigScript = '<script type="text/javascript" src="resources/tenantconfigs/' + tenantIdentifier + '.js"></script>';
	document.write(tenantConfigScript);
	

