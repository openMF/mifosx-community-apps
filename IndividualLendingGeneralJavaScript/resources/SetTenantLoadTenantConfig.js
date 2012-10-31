//put any default code configuration here.  It will be overridden by any tenant specific customisations included at the end of this script


// these helpers are later registered for the jsViews and jsRender functionality to fix bug with display zero! 
// also included are some utility functions
	helperFunctions = {
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
			globalDate: function(dateParts) {
			      try {
			    	  if (undefined != dateParts)
			    	  {
			    	  	var year = dateParts[0];
			    	  	var month = parseInt(dateParts[1]) - 1; // month is zero indexed
			    	  	var day = dateParts[2];
			    	  
			    	  	var d = new Date();
			    	  	d.setFullYear(year,month,day);
			    	  
			    	  	return Globalize.format(d,"dd MMMM yyyy");
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
				    	  return Globalize.format(d,"dd MMMM yyyy");
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
			makeAmountInputFieldxx: function(fieldName, fieldValue, displayMode, fieldType) {
			      try {
					var amountInputFieldHtml = "<input ";
			  		if (displayMode == "view")
					{
						amountInputFieldHtml  += ' class="rightreadonly" readonly="readonly" ';
					}
					else
					{
						if (fieldType == "calc")
						{
							amountInputFieldHtml  += ' class="rightreadonly" readonly="readonly" id="' + fieldName + '" name="' + fieldName + '" title="" ';
						}
						else
						{
							amountInputFieldHtml  += ' class="right" onchange="gkRiskAnalysisCalc();" id="' + fieldName + '" name="' + fieldName + '" title="" ';
						}
			  		}

					var currentVal = $.trim(fieldValue);
					if (!(currentVal > "")) currentVal = 0.00;
					currentVal = parseFloat(currentVal);
					var currentValGlobal = Globalize.format(currentVal, "n2");
					amountInputFieldHtml += ' style="width: 100px;" value="' + currentValGlobal + '" />';
					return amountInputFieldHtml;
			      } catch(e) {
			        return "System Error: makeAmountInputField - fieldName: " + fieldName + "  fieldValue: " + fieldValue + "   displayMode: " + displayMode;
			      }
			},
			showIt: function(functionalityName) {
			      try {
			    	  return jQuery.MifosXUI.showIt(functionalityName);
			      } catch(e) {
			        return false;
			      }
			}

	};





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
	

