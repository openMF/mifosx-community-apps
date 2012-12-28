//put default configuration code here.  It will be overridden by any tenant specific customisations included at the end of this script
//A naming standard is used so its clear what things are being customised

	custom = {
//default function to display initial page after logon
				showFirstPage: "",	

// default function to register helpers for jsViews and jsRender functionality 
// fixes bug with display zero! Also included are some utility functions needed during rendering
				helperFunctions: "",

//default datepicker format - use yy-mm-dd for faster manual entry
			//datePickerDateFormat: 'yy-mm-dd',
				datePickerDateFormat: 'dd MM yy',

//default function for displaying registered data table entries (Additional Data)
				showRelatedDataTableInfo: "",
//default variable for identifying excluded datatables and datatables to be render in a non-default way
				datatablePresentation: "",
			};

	custom.showFirstPage = function () {

		showILClientListing();

	}


	custom.helperFunctions = {
			moneyFormatted: function(currencyObj, bigDecimalValue) {
				
				if (undefined == bigDecimalValue || undefined == currencyObj) {
					return "";
				}
				Globalize.culture().numberFormat.currency.symbol = currencyObj.displaySymbol;
				
				var digits = currencyObj.decimalPlaces.toFixed(0);
				return Globalize.format(bigDecimalValue, "c" + digits); 
			},
			monetaryValue: function(currencyObj, bigDecimalValue) {
				
				if (undefined == bigDecimalValue || undefined == currencyObj) {
					return "";
				}
				Globalize.culture().numberFormat.currency.symbol = currencyObj.displaySymbol;
				
				var digits = currencyObj.decimalPlaces.toFixed(0);
				return Globalize.format(bigDecimalValue, "n" + digits); 
			},
			decimal: function(number, digits) {
		      try {
		    	if (undefined == number || number == null) {
		    		return "";
				}
		    	var parsed = parseFloat(number.toFixed(digits));
		    	var parsedStr = "" + parsed;
		    	var nonZeroDigitsAfterDecimal = 0;
		    	if (parsedStr.indexOf('.') > 0) {
		    		nonZeroDigitsAfterDecimal = (parsedStr.length-1) - parsedStr.indexOf('.');
		    	}
		    	return Globalize.format(parsed, "n" + nonZeroDigitsAfterDecimal); 
		      } catch(e) {
		        return number +"(NaN)";
		      }
		    },
			number: function(number) {
		      try {
		    	  return Globalize.format(number, "n0"); 
		      } catch(e) {
		        return number +"(NaN)";
		      }
		    },
		    numberGreaterThanZero: function(number) {
			      try {
			    	var num = number.toFixed(0);
			        return num > 0;
			      } catch(e) {
			        return false;
			      }
			},
			isAdjustableTransaction: function(transactionTypeId) {
				  try {
		    		if (undefined == transactionTypeId || transactionTypeId === null) {
						return false;
					}
			    		
			    	var num = transactionTypeId.toFixed(0);
			        return num == 2 || num == 4;
			      } catch(e) {
			        return false;
			      }
			},
			currentDateFormat: function() {
			      try {
			    	  	
					if (custom.datePickerDateFormat == 'dd MM yy') return "dd MMMM yyyy";

					if (custom.datePickerDateFormat == 'yy-mm-dd') return "yyyy-MM-dd";

					return "??Format??";
			    	  	
			      } catch(e) {
			        return "??";
			      }
			},
			globalDate: function(dateParts) {
			      try {
			    	  if (undefined != dateParts)
			    	  {
			    	  	var year = dateParts[0];
			    	  	var month = parseInt(dateParts[1]) - 1; // month is zero indexed
			    	  	var day = dateParts[2];
			    	  
			    	  	var d = new Date();
			    	  	d.setFullYear(year,month,day);
			    	  	
					if (custom.datePickerDateFormat == 'dd MM yy') return Globalize.format(d,"dd MMMM yyyy");

					if (custom.datePickerDateFormat == 'yy-mm-dd') return Globalize.format(d,"yyyy-MM-dd");

					return "??Format??";
			    	  	
			    	  }
			    	  else return "";
			      } catch(e) {
			        return "??";
			      }
			},
			globalDateAsISOString: function(localDateAsISOString) {
			      try {
			    	  if (undefined != localDateAsISOString)
			    	  {
				    	var dateParts = localDateAsISOString.split("-")
				    	var year = dateParts[0];
				    	var month = dateParts[1] - 1; // month is zero indexed
				    	var day = dateParts[2];
				    	  
				    	var d = new Date();
				    	d.setFullYear(year,month,day);

					if (custom.datePickerDateFormat == 'dd MM yy') return Globalize.format(d,"dd MMMM yyyy");

					if (custom.datePickerDateFormat == 'yy-mm-dd') return Globalize.format(d,"yyyy-MM-dd");

					return "??Format??";

			    	  } else return "";
			      } catch(e) {
			        return "??";
			      }
			},
			globalDateTime: function(dateInMillis) {
			      try {
			    	  if (undefined != dateInMillis)
			    	  {
				    	  var d = new Date(dateInMillis);
				    	  return Globalize.format(d,"F");
			    	  } else return "";
			      } catch(e) {
			        return "??";
			      }
			},
			currentLocale: function() {
			      try {
			    	  return Globalize.culture().name;
			      } catch(e) {
			        return "??";
			      }
			},
			doI18N: function(xlateStr, params) {
			      try {
			    	  return doI18N(xlateStr, params);
			      } catch(e) {
			        return xlateStr;
			      }
			},
			showTask: function(functionalityName) {
			      try {
			    	  return jQuery.MifosXUI.showTask(functionalityName);
			      } catch(e) {
			        return false;
			      }
			},
			hasDataTablePermission: function(permissionName) {
			      try {
			    	  return jQuery.MifosXUI.hasDataTablePermission(permissionName);
			      } catch(e) {
			        return false;
			      }
			},
			showJson: function(commandAsJson) {
			      try {
			    	  return showJson(commandAsJson);
			      } catch(e) {
			        return commandAsJson;
			      }
			},
			getDataTableFieldEntry: function(data, rowNum, fieldName, displayMode) {

				return jQuery.stretchyDataTables.getDataTableFieldEntry(data, rowNum, fieldName, displayMode);
			},
			getDataTableFieldValueEntry: function(data, rowNum, fieldName, displayMode) {

				return jQuery.stretchyDataTables.getDataTableFieldValueEntry(data, rowNum, fieldName, displayMode);
			}
	};


	
	
	
//default to no customised rendering but loan guarantor data table is excluded
	custom.datatablePresentation = {
			"M_CLIENT": {
							renderInfo: [],
							exclude: []
						},
			"M_LOAN": 	{
							renderInfo: [],
							exclude: ["m_guarantor_external"]
						}
		};
	
	custom.showRelatedDataTableInfo = function (tabVar, appTableName, appTablePKValue) {	 

		var url = 'datatables?apptable=' + appTableName;

		var successFunction =  function(data, textStatus, jqXHR) {
				
				if (data.length > 0)
				{
					datatableArray = [];
					var datatableExists = function(datatableName) {
						for (var i in datatableArray)
						{
							if (datatableArray[i].registeredTableName == datatableName) return true;
						}
						return false;
					}
					var datatableExclude = function(datatableName) {
						for (var i in datatableArray)
						{
							if (datatableArray[i].registeredTableName == datatableName)
							{
								datatableArray.splice(i,1);
								//alert("excluded datatable: " + datatableName)
							}
						}
					}
					var defaultDatatableExists = function() {
						for (var i in datatableArray)
						{
							var itemDiv = datatableArray[i].itemDiv
							if (typeof itemDiv == "undefined") return true;
						}
						return false;
					}

					//1. add any datatables that are defined as manually customised
					var appTableRenderInfo = custom.datatablePresentation[appTableName.toUpperCase()].renderInfo;
					if (typeof appTableRenderInfo !== "undefined")
					{
						for (var i in appTableRenderInfo)
						{// add individual tab
							tabVar.append("<div id=" + appTableRenderInfo[i].itemDiv + "></div>");
							tabVar.tabs( "add", "#" + appTableRenderInfo[i].itemDiv , doI18N(appTableRenderInfo[i].itemDivLabel));
							//var tmpObj = {};
							//tmpObj.registeredTableName = appTableRenderInfo[i].registeredTableName;
							//tmpObj.itemDiv = appTableRenderInfo[i].itemDiv;
							//tmpObj.itemDivLabel = appTableRenderInfo[i].itemDivLabel;
							//tmpObj.templateName = appTableRenderInfo[i].templateName;
							datatableArray.push(appTableRenderInfo[i]);
							//alert("added custom rendered datatable: " + appTableRenderInfo[i].registeredTableName)
						}
					}
					//2. add any other datatables that are not already covered
					for (var i in data)
					{
						if (datatableExists(data[i].registeredTableName) == false)
						{
							var tmpObj = {};
							tmpObj.registeredTableName = data[i].registeredTableName;
							datatableArray.push(tmpObj);
							//alert("added general datatable: " + data[i].registeredTableName)
						}
					}
					//3. exclude any datatables defined to be excluded
					var appTableExclude = custom.datatablePresentation[appTableName.toUpperCase()].exclude;
					if (typeof appTableExclude !== "undefined")
					{
						for (var i in appTableExclude) datatableExclude(appTableExclude[i]);
					}
						
					//					

					var datatablesDiv = "N/A";
					if (defaultDatatableExists() == true)
					{//add generic datatables tab
						datatablesDiv = appTableName + "_" + appTablePKValue + "_addData";
						tabVar.tabs( "add", "#" + datatablesDiv , doI18N("Additional.Data"));
					}
					
					tabVar.tabs('select', 0); //back to main tab
					
					var additionalInfoParams = {
						baseApiUrl : baseApiUrl,
						base64: base64,
						tenantIdentifier: tenantIdentifier,
						appTableName: appTableName,
						appTablePKValue: appTablePKValue, 
						datatableArray: datatableArray,
						globaliseFunctions: custom.helperFunctions,
						resValue: "resources/libs/",

						datatablesDiv: datatablesDiv,
						labelClass: "datatableLabel",
						valueClass:	"",
						saveLabel: doI18N("dialog.button.save"),	
						cancelLabel: doI18N("dialog.button.cancel")				
					};
					jQuery.stretchyDataTables.displayAdditionalInfo(additionalInfoParams);
				
				}
			  };

		executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction);	
	}



//establish the tenant and include any tenant specific javascript configuration file

	tenantIdentifier = "default";
	if (QueryParameters["tenantIdentifier"]) tenantIdentifier= QueryParameters["tenantIdentifier"];

	var tenantConfigScript = '<script type="text/javascript" src="resources/tenantconfigs/' + tenantIdentifier + '.js"></script>';
	document.write(tenantConfigScript);
	