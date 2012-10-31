//put any default code configuration here.  It will be overridden by any tenant specific customisations included at the end of this script

//default function for displaying registered data table entries (Additional Data)
showRelatedDataTableInfo = function (tabVar, appTableName, appTablePKValue) {	 
  
		var url = 'datatables?apptable=' + appTableName;

		var successFunction =  function(data, textStatus, jqXHR) {
				
				if (data.length > 0)
				{
					var datatablesDiv = appTableName + "_" + appTablePKValue + "_addData";
					tabVar.tabs( "add", "#" + datatablesDiv , doI18N("Additional.Data"));
					tabVar.tabs('select', 0); //back to main tab

					var additionalInfoParams = {
						baseApiUrl : baseApiUrl,
						base64: base64,
						tenantIdentifier: tenantIdentifier,
						appTableName: appTableName,
						appTablePKValue: appTablePKValue, 
						ignoreDatatableArray: [],
						globaliseFunctions: helperFunctions,
						resValue: "resources/libs/",

						datatablesDiv: datatablesDiv,
						labelClass: "datatableLabel ",
						valueClass:	"",
						saveLabel: doI18N("dialog.button.save"),	
						cancelLabel: doI18N("dialog.button.cancel")				
					};
					jQuery.stretchyDataTables.displayAdditionalInfo(additionalInfoParams);

				}
			  };

		executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction);	
	}











	tenantIdentifier = "default";
	if (QueryParameters["tenantIdentifier"]) tenantIdentifier= QueryParameters["tenantIdentifier"];

	var tenantConfigScript = '<script type="text/javascript" src="resources/tenantconfigs/' + tenantIdentifier + '.js"></script>';
	document.write(tenantConfigScript);
	

