//put default configuration code here.  It will be overridden by any tenant specific customisations included at the end of this script
//A naming standard is used so its clear what things are being customised

custom = {
	// default function to display initial page after logon
	showFirstPage : "",

	// default function to register helpers for jsViews and jsRender
	// functionality
	// fixes bug with display zero! Also included are some utility functions
	// needed during rendering
	helperFunctions : "",

	// default datepicker format - use yy-mm-dd for faster manual entry
	// datePickerDateFormat: 'yy-mm-dd',
	datePickerDateFormat : 'dd MM yy',

	// default function for displaying registered data table entries (Additional
	// Data)
	showRelatedDataTableInfo : "",
	// default variable for identifying excluded datatables and datatables to be
	// render in a non-default way
	datatablePresentation : "",

	// fit popups to height & width of current window
	fitPopupWidth : "",
	fitPopupHeight : ""
};

custom.showFirstPage = function() {

	showILClientListing();

}

custom.helperFunctions = {
	moneyFormatted : function(currencyObj, bigDecimalValue) {

		if (undefined == bigDecimalValue || undefined == currencyObj) {
			return "";
		}
		Globalize.culture().numberFormat.currency.symbol = currencyObj.displaySymbol;

		var digits = currencyObj.decimalPlaces.toFixed(0);
		return Globalize.format(bigDecimalValue, "c" + digits);
	},
	monetaryValue : function(currencyObj, bigDecimalValue) {

		if (undefined == bigDecimalValue || undefined == currencyObj) {
			return "";
		}
		Globalize.culture().numberFormat.currency.symbol = currencyObj.displaySymbol;

		var digits = currencyObj.decimalPlaces.toFixed(0);
		return Globalize.format(bigDecimalValue, "n" + digits);
	},
	decimal : function(number, digits) {
		try {
			if (undefined == number || number == null) {
				return "";
			}
			var parsed = parseFloat(number.toFixed(digits));
			var parsedStr = "" + parsed;
			var nonZeroDigitsAfterDecimal = 0;
			if (parsedStr.indexOf('.') > 0) {
				nonZeroDigitsAfterDecimal = (parsedStr.length - 1)
						- parsedStr.indexOf('.');
			}
			return Globalize.format(parsed, "n" + nonZeroDigitsAfterDecimal);
		} catch (e) {
			return number + "(NaN)";
		}
	},
	number : function(number) {
		try {
			return Globalize.format(number, "n0");
		} catch (e) {
			return number + "(NaN)";
		}
	},
	numberGreaterThanZero : function(number) {
		try {
			var num = number.toFixed(0);
			return num > 0;
		} catch (e) {
			return false;
		}
	},
	isAdjustableTransaction : function(transactionTypeId) {
		try {
			if (undefined == transactionTypeId || transactionTypeId === null) {
				return false;
			}

			var num = transactionTypeId.toFixed(0);
			return num == 2 || num == 4;
		} catch (e) {
			return false;
		}
	},
	currentDateFormat : function() {
		try {

			if (custom.datePickerDateFormat == 'dd MM yy')
				return "dd MMMM yyyy";

			if (custom.datePickerDateFormat == 'yy-mm-dd')
				return "yyyy-MM-dd";

			return "??Format??";

		} catch (e) {
			return "??";
		}
	},
	globalDate : function(dateParts) {
		try {
			if (undefined != dateParts) {
				var year = dateParts[0];
				var month = parseInt(dateParts[1]) - 1; // month is zero indexed
				var day = dateParts[2];

				var d = new Date();
				d.setFullYear(year, month, day);

				if (custom.datePickerDateFormat == 'dd MM yy')
					return Globalize.format(d, "dd MMMM yyyy");

				if (custom.datePickerDateFormat == 'yy-mm-dd')
					return Globalize.format(d, "yyyy-MM-dd");

				return "??Format??";

			} else
				return "";
		} catch (e) {
			return "??";
		}
	},
	globalDateAsISOString : function(localDateAsISOString) {
		try {
			if (undefined != localDateAsISOString) {
				var dateParts = localDateAsISOString.split("-")
				var year = dateParts[0];
				var month = dateParts[1] - 1; // month is zero indexed
				var day = dateParts[2];

				var d = new Date();
				d.setFullYear(year, month, day);

				if (custom.datePickerDateFormat == 'dd MM yy')
					return Globalize.format(d, "dd MMMM yyyy");

				if (custom.datePickerDateFormat == 'yy-mm-dd')
					return Globalize.format(d, "yyyy-MM-dd");

				return "??Format??";

			} else
				return "";
		} catch (e) {
			return "??";
		}
	},
	globalDateTime : function(dateInMillis) {
		try {
			if (undefined != dateInMillis) {
				var d = new Date(dateInMillis);
				return Globalize.format(d, "F");
			} else
				return "";
		} catch (e) {
			return "??";
		}
	},
	currentLocale : function() {
		try {
			return Globalize.culture().name;
		} catch (e) {
			return "??";
		}
	},
	doI18N : function(xlateStr, params) {
		try {
			return doI18N(xlateStr, params);
		} catch (e) {
			return xlateStr;
		}
	},
	showTask : function(functionalityName) {
		try {
			return jQuery.MifosXUI.showTask(functionalityName);
		} catch (e) {
			return false;
		}
	},
	hasDataTablePermission : function(permissionName) {
		try {
			return jQuery.MifosXUI.hasDataTablePermission(permissionName);
		} catch (e) {
			return false;
		}
	},
	showJson : function(commandAsJson) {
		try {
			return showJson(commandAsJson);
		} catch (e) {
			return commandAsJson;
		}
	},
	getDataTableFieldEntry : function(data, fieldName, displayMode, updateColumnTagExtra) {

		return jQuery.stretchyDataTables.getDataTableFieldEntry(data, 
				fieldName, displayMode, updateColumnTagExtra);
	},
	getDataTableFieldValueEntry : function(data, fieldName, displayMode, updateColumnTagExtra) {

		return jQuery.stretchyDataTables.getDataTableFieldValueEntry(data,
				fieldName, displayMode, updateColumnTagExtra);
	},
	getDataTableStartForm : function(displayMode, displayButtons, datatableName) {

		return jQuery.stretchyDataTables.getDataTableStartForm(displayMode,
				displayButtons, datatableName);
	},
	getDataTableEndFormIfNecessary : function(displayMode) {

		return jQuery.stretchyDataTables
				.getDataTableEndFormIfNecessary(displayMode);
	}

};

/*
 * defaults to no customised rendering and loan guarantor data table excluded
 * All datatables for each appliation table (e.g. m_client) will be put under a
 * general tab push an entry into the appropriate array to customise this
 * behaviour (like in GKRiskAnalysis.js)
 */
custom.datatablePresentation = {
	"M_CLIENT" : {
		renderInfo : [],
		exclude : []
	},
	"M_LOAN" : {
		renderInfo : [],
		exclude : [ "m_guarantor_external" ]
	}
};

custom.showRelatedDataTableInfo = function(tabVar, appTableName,
		appTablePKValue) {

	var url = 'datatables?apptable=' + appTableName;

	var successFunction = function(data, textStatus, jqXHR) {

		if (data.length > 0) {

			// local function definitions
			var datatableArray = [];

			var datatableExists = function(datatableName) {
				for ( var i in datatableArray) {
					if (datatableArray[i].registeredTableName == datatableName)
						return true;
				}
				return false;
			}

			var datatableExclude = function(datatableName) {
				for ( var i in datatableArray) {
					if (datatableArray[i].registeredTableName == datatableName) {
						datatableArray.splice(i, 1);
						// alert("excluded datatable: " + datatableName)
					}
				}
			}

			var spaceToUnderscore = function(str) {
				return str.replace(/ /g, "_")
			}

			var getFKName = function(appTableName) {
				return appTableName.substring(2) + "_id";
			}

			var getClickFunction = function(itemDiv, registeredTableName,
					appTablePKValue, fkName, type, templateName, onLoadForm) {

				var cf = 'var clickFunction = function() ' + '{ '
						+ 'jQuery.stretchyDataTables.showDataTable("' + itemDiv + '", "'
						+ registeredTableName + '", ' + appTablePKValue + ', "'
						+ fkName + '", "' + type + '"';

				if (templateName)
					cf += ', "' + templateName + '"';
				if (onLoadForm)
					cf += ', "' + onLoadForm + '"';

				cf += ');};'
				return cf;
			}

			var displayAdditionalInfo = function(fkName, appTablePKValue) {

				if (datatableArray.length > 0) {
					for ( var i in datatableArray) {
						var type = datatableArray[i].type.toUpperCase();

						if (type == "DEFAULT" || type == "TEMPLATE") {
							eval(getClickFunction(datatableArray[i].itemDiv,
									datatableArray[i].registeredTableName,
									appTablePKValue, fkName, type,
									datatableArray[i].templateName,
									datatableArray[i].onLoadForm));

							$('a[href=#' + datatableArray[i].itemDiv + ']')
									.click(clickFunction);
							//just use method below if want to prepopulate the tab.  however many data table rendering is initially off
							/*jQuery.stretchyDataTables.showDataTable(datatableArray[i].itemDiv,
									datatableArray[i].registeredTableName,
									appTablePKValue, fkName, type,
									datatableArray[i].templateName,
									datatableArray[i].onLoadForm);*/
						} else {
							if (type == "USER-DEFINED") {

								// data table UI handled completely by
								// user-defined code
								// execute user-defined function
								// expects 2 params: PKValue & itemDiv
								var PKValue = appTablePKValue;
								var itemDiv = datatableArray[i].itemDiv;
								eval(datatableArray[i].itemFunction);
							} else {
								alert("System Error - Invalid renderInfo type: "
										+ type
										+ "   for registered data table: "
										+ datatableArray[i].registeredTableName);
								return;
							}
						}
					}
				}
			}
			// end of local function definitions

			var datatableParams = {
				baseApiUrl : baseApiUrl,
				base64 : base64,
				tenantIdentifier : tenantIdentifier,
				globaliseFunctions : custom.helperFunctions,
				resValue : "resources/libs/",
				indicateMandatory : "* ",
				labelClass : "",
				valueClass : "",
				saveLabel : "dialog.button.save",
				cancelLabel : "dialog.button.cancel",
				confirmLabel : "dialog.button.confirm"
			};
			jQuery.stretchyDataTables.initialise(datatableParams);

			// 1. add any datatables that are defined in
			// custom.datatablePresentation for the current application table
			var appTableRenderInfo = custom.datatablePresentation[appTableName
					.toUpperCase()].renderInfo;
			if (typeof appTableRenderInfo !== "undefined") {
				for ( var i in appTableRenderInfo) {
					datatableArray.push(appTableRenderInfo[i]);
					// alert("added custom rendered datatable: " +
					// appTableRenderInfo[i].registeredTableName)
				}
			}
			// 2. add any other datatables that are not already covered
			for ( var i in data) {
				if (datatableExists(data[i].registeredTableName) == false) {
					var tmpObj = {};
					tmpObj.registeredTableName = data[i].registeredTableName;
					tmpObj.type = "default";
					tmpObj.itemDiv = "tab_"
							+ spaceToUnderscore(data[i].registeredTableName)
							+ "_id_" + appTablePKValue;
					tmpObj.itemDivLabel = data[i].registeredTableName;
					datatableArray.push(tmpObj);
					// alert("added general datatable: " +
					// data[i].registeredTableName)
				}
			}
			// 3. exclude any datatables defined to be excluded
			var appTableExclude = custom.datatablePresentation[appTableName
					.toUpperCase()].exclude;
			if (typeof appTableExclude !== "undefined") {
				for ( var i in appTableExclude)
					datatableExclude(appTableExclude[i]);
			}
			// 4. set up a tab for each additional table
			for ( var i in datatableArray) {
				tabVar.append("<div id=" + datatableArray[i].itemDiv
						+ "></div>");
				tabVar.tabs("add", "#" + datatableArray[i].itemDiv,
						doI18N(datatableArray[i].itemDivLabel));
				// alert(datatableArray[i].itemDivLabel)
			}

			displayAdditionalInfo(getFKName(appTableName), appTablePKValue);

			tabVar.tabs('select', 0); // ensure focus is back to main tab
		}
	};

	executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction);
}

custom.fitPopupWidth = function() {
	return $(window).width() - 20;
}
custom.fitPopupHeight = function() {
	return $(window).height() - 20;
}

// establish the tenant and include any tenant specific javascript configuration
// file

tenantIdentifier = "default";
if (QueryParameters["tenantIdentifier"])
	tenantIdentifier = QueryParameters["tenantIdentifier"];

var tenantConfigScript = '<script type="text/javascript" src="resources/tenantconfigs/'
		+ tenantIdentifier + '.js"></script>';
document.write(tenantConfigScript);
