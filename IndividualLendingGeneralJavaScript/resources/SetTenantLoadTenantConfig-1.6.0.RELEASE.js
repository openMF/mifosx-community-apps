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
	fitPopupHeight : "",
	
	// various layouts for jquery datatables
	jqueryDataTableLayout : ""
};

custom.showFirstPage = function(userId) {
	showILClientListing("content");
}

Date.daysBetween = function(date1, date2) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
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
	arrayIsNotEmpty : function(obj) {
		if (obj instanceof Array) {
			return obj.length > 0;
		}
		return false;
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
	monthDayDate : function(dateParts) {
		try {
			if (undefined != dateParts) {
				
				var d = new Date();
				
				var month = parseInt(dateParts[0])-1; // zero indexed in javascript
				var day = parseInt(dateParts[1]);
				var year = d.getFullYear();
				
				d.setFullYear(year, month, day);

				if (custom.datePickerDateFormat == 'dd MM yy')
					return Globalize.format(d, "dd MMMM");

				if (custom.datePickerDateFormat == 'yy-mm-dd')
					return Globalize.format(d, "MM-dd");

				return "??Format??";
			} else
				return "";
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
	statusIsNotClosed : function(status) {
    	return status.closed == false;
	},
	isCredit : function(savingsTransactionType) {
    	return savingsTransactionType.deposit == true || savingsTransactionType.interestPosting == true;
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
	"M_LOAN" : {
		renderInfo : [],
		exclude : [ ]
	},
	"M_SAVINGS_ACCOUNT" : {
		renderInfo : [],
		exclude : [ ]
	},
	"M_CLIENT" : {
		renderInfo : [],
		exclude : []
	},
	"M_GROUP" : {
		renderInfo : [],
		exclude : [ ]
	},
	"M_CENTER" : {
		renderInfo : [],
		exclude : [ ]
	},
	"M_OFFICE" : {
		renderInfo : [],
		exclude : [ ]
	}
};


custom.sDom = {
	"clientstable" : '<"H"lfr<"#clientstablecustom">>t<"F"ip>',					
	"centerstable" : '<"H"lfr<"#centerstablecustom">>t<"F"ip>',
	"groupstable" : '<"H"lfr<"#groupstablecustom">>t<"F"ip>',
	"loanstable" : '<"H"lfr<"#clientstablecustom">>t<"F"ip>',
	"savingsaccountstable" : '<"H"lfr<"#loanstablecustom">>t<"F"ip>',	
	"journalentriestable": '<"H"lr>t<"F"ip>',
	"groupsstatstable" : '<"H"lfr<"#groupsstatstablecustom">>t<"F"ip>',
	"schedulerjobstable": '<"H"lr>t<"F"ip>',
}

custom.searchQuery = {
	"clientstable" : function(searchValue){
						return "display_name like '%"+searchValue+"%'";
					},
	"centerstable" :  function(searchValue){
						return "display_name like '%"+searchValue+"%'";
					},
	"groupstable" :  function(searchValue){
						return "display_name like '%"+searchValue+"%'";
					},
	"loanstable" :  function(searchValue){
						return "accountNo like'%"+searchValue+"%'";
					},
   "savingsaccountstable" :  function(searchValue){
 			             return "accountNo like '%"+searchValue+"%'";	
 			         },
	"groupsstatstable" : function(searchValue){
						 return "display_name like '%"+searchValue+"%'";
 			         }

}

//table properties
custom.datatablePresentation2 = {
	"clientstable":	[{
				        "mDataProp": "officeName",
				        "aTargets":  [0]
				    },
				    {
				    	"mDataProp": "status.code",
				    	"aTargets": [1],
				    	/** Display the client status traffic light */
				    	"fnCreatedCell":function(nTd, sData, oData, iRow, iCol)
				    	{
				    		var src="resources/img/" + sData + ".gif";
				    		var title=doI18N(sData);
				    		$(nTd).html('<img src="' + src + '" title="' + title + '"/>&nbsp;' + title);
				    	}
				    },
				    {
				        "mDataProp": "accountNo",
				        "aTargets": [2],
				        "fnCreatedCell":function(nTd,sData,oData,iRow,iCol)//not supported in datatables 1.8.x
				        {
				        	$(nTd).html('<a id="navigateToClient'+oData.id+'" href="#" onclick="showILClient('+oData.id+');">'+sData+'</a>');
				        }
				    },
				    {
				        "mDataProp": "displayName",
				        "aTargets": [3]
				    },
				    {
				        "mDataProp": "id",
				        "aTargets": [4],
				        "bVisible":false
				    }],
	"centerstable":	[{
				        "mDataProp": "officeName",
				        "aTargets":  [0]
				    },
				    {
				        "mDataProp": "status",
				        "aTargets": [1],
						"bSortable": false,
						"mRender": function (data, type, full) {
							return '<img src="resources/img/' + data.code + '.gif"/>&nbsp;' + data.value;
						}
				    },
				    {
				        "mDataProp": "name",
				        "aTargets": [2],
				        "fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
				        {
				        	$(nTd).html('<a id="navigateToGroup'+oData.id+'" href="#" onclick="showCenter('+oData.id+');">'+sData+'</a>');
				        }
				    }],
	"groupstable":	[{
				        "mDataProp": "officeName",
				        "aTargets":  [0]
				    },
				    {
				        "mDataProp": "status",
				        "aTargets": [1],
						"bSortable": false,
						"mRender": function (data, type, full) {
							return '<img src="resources/img/' + data.code + '.gif"/>&nbsp;' + data.value;
						}
				    },
				    {
				        "mDataProp": "name",
				        "aTargets": [2],
				        "fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
				        {
				        	$(nTd).html('<a id="navigateToGroup'+oData.id+'" href="#" onclick="showGroup('+oData.id+');">'+sData+'</a>');
				        }
				    }],
	"journalentriestable":	[{
								"mDataProp": "officeName",
								"aTargets":  [0]
							},
							{
								"mDataProp": "transactionDate",
								"aTargets": [1],
								"fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
								{
									$(nTd).html(custom.helperFunctions.globalDate(sData));
								}
							},
							{
								"mDataProp": "glAccountType.value",
								"aTargets": [2],
								"bSortable": false
							},
							{
								"mDataProp": "glAccountName",
								"aTargets": [3]
							},
							{
								"mDataProp": "glAccountCode",
								"aTargets": [4]
							},
							{
								"mDataProp": "createdByUserName",
								"aTargets": [5]
							},
							{
								"mDataProp": "id",
								"aTargets": [6]
							},
							{
								"mDataProp": "transactionId",
								"aTargets": [7]
							},
							{
								"mDataProp": "amount",
								"aTargets": [8],
								"fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
								{
									if (oData.entryType.value == "DEBIT")										
										$(nTd).html(custom.helperFunctions.decimal(oData.amount, 2));
									else
										$(nTd).html('');
								}
							},
							{
								"mDataProp": "amount",
								"aTargets": [9],
								"fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
								{ 
									if (oData.entryType.value == "CREDIT")										
										$(nTd).html(custom.helperFunctions.decimal(oData.amount, 2));
									else
										$(nTd).html('');
								}
							},
							{
								"mData": "id",
								"aTargets": [10],
								"bSortable": false,
								"mRender" : function ( data, type, full ) {
											var customhtml ='<span style="display: inline-block; width: 70px;"><button class="infobtn" id="glentryinfo'+data+'">View Entry Details</button>';
									
											if(full.manualEntry)
											{
												if(full.reversed == false)
												{
													customhtml += '<button class="refreshbtn" id="glentryreversal'+data+'">Reverse this Journal Entry</button>';
												}
											}
											customhtml +='</span>';
											return customhtml;
										  },
								"fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
								{		
									$(nTd).find('.infobtn').button({
									icons : {
										primary : "ui-icon-info"
									},
									text: false
									}).click(function(e) { {
											var width = 550;
											var height = 450;
											var templateSelector = "#journalEntryInfoFormTemplate";
											popupDialogWithReadOnlyFormViewData(oData,"dialog.title.journalEntry.view", templateSelector, width, height);
										}
										e.preventDefault();
									});
									$(nTd).find('.refreshbtn').button({
										icons : {
											primary : "ui-icon-arrowrefresh-1-s"
										},
										text: false
									}).click(function(e) {
										var url = "journalentries/" + oData.transactionId + "?command=reverse";
										var width = 400;
										var height = 225;
										popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, reverseJournalEntrySuccessFunction);
										e.preventDefault();
									});
								}
							}
							],	
	"loanstable" : [{
				        "mDataProp": "accountNo",
				        "aTargets":  [0],
				         "fnCreatedCell":function(nTd,sData,oData,iRow,iCol)//not supported in datatables 1.8.x
				        {
				        	$(nTd).html('<a id="navigateToLoan'+ oData.id +'" href="#" onclick="showLoanFromSearch('+ oData.clientId + ','+ oData.id + ', &quot;'+ oData.loanProductName + '&quot; ,'+ oData.accountNo +');">'+ oData.accountNo +'</a>');
				        }
				    },
				    {
				        "mDataProp": "status",
				        "aTargets": [1],
						"bSortable": false,
						"mRender": function (data, type, full) {
							return '<img src="resources/img/' + data.code + '.gif"/>&nbsp;' + data.value;
						}
				    },
					{
				        "mDataProp": "loanProductName",
				        "aTargets":  [2]
				    },
					{
				        "mDataProp": "principal",
				        "aTargets":  [3]
				    },
					{
				        "mDataProp": "status.id",
				        "aTargets":  [4],
						"bSortable": false,
						"mRender": function ( data, type, full ) {
										if(data>=300)
											return full.summary.totalOutstanding;
										else return "";
								   }
				    }],
	"savingsaccountstable" : [{
				            "mDataProp": "accountNo",
				            "aTargets":  [0]
				          },
				          {
				            "mDataProp": "status.value",
				            "aTargets": [1],
				            "bSortable": false
				          },
				          {
				            "mDataProp": "savingsProductName",
				            "aTargets":  [2]
				          }],
    "groupsstatstable" : [{
    					"mDataProp": "loanId",
    					"aTargets": [0]
					    },
					    {
    					"mDataProp": "programName",
    					"aTargets": [1]
					    },
					    {
    					"mDataProp": "loanCycleNo",
    					"aTargets": [2]
					    },
					    {
    					"mDataProp": "clientDisplayName",
    					"aTargets": [3]
					    },
					    {
    					"mDataProp": "currency",
    					"aTargets": [4]
					    },
					    {
    					"mDataProp": "loanRepaidAmount",
    					"aTargets": [5]
					    },
					    {
    					"mDataProp": "loanOutstandingAmount",
    					"aTargets": [6]
					    },
					    {
    					"mDataProp": "loanInAdvanceAmount",
    					"aTargets": [7]
					    },
					    {
    					"mDataProp": "loanInArrearsAmount",
    					"aTargets": [8]
					    },
					    {
    					"mDataProp": "inDefault",
    					"aTargets": [9]
					    },
					    {
    					"mDataProp": "portfolioAtRisk",
    					"aTargets": [10]
					    }],
	"schedulerjobstable":	[{
								"mDataProp": "version",
								"aTargets":  [0]
							},
							{
								"mDataProp": "jobRunStartTime",
								"aTargets": [1],
								"fnCreatedCell":function(nTd,sData,oData,iRow,iCol)
								{
									$(nTd).html(custom.helperFunctions.globalDateTime(sData));
								}
							},
							{
								"mDataProp": "status",
								"aTargets": [2]
							},
							{
								"mDataProp": "triggerType",
								"aTargets": [3]
							}
							]
}

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
			var appTableExclude = custom.datatablePresentation[appTableName.toUpperCase()].exclude;
			if (typeof appTableExclude !== "undefined") {
				for ( var i in appTableExclude) {
					datatableExclude(appTableExclude[i]);					
				}
			}
			
			// 4. set up a tab for each additional table
			for ( var i in datatableArray) {
				
				var num_tabs = $("div#" + tabId + " ul li").length + 1;
				var tabId = tabVar.attr("id");

				var tabPillHtml = "<li><a id='" + datatableArray[i].itemDiv + "_" + num_tabs +"' href='#" + datatableArray[i].itemDiv + "'>" + doI18N(datatableArray[i].itemDivLabel) + "</a></li>";
		        $("div#" + tabId + " ul").append(tabPillHtml);
		        
		        var tabDivHtml = "<div id=" + datatableArray[i].itemDiv + "></div>";
		        $("div#" + tabId).append(tabDivHtml);
		        
		        $("div#" + tabId).tabs("refresh");
			}

			displayAdditionalInfo(getFKName(appTableName), appTablePKValue);

			tabVar.tabs("option", "active", 0); // ensure focus is back to main tab
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

custom.jqueryDataTableServerSide = {

	paginated:function(tableId,data) {
		var tempId;
		if (tableId.indexOf("scheduler") > -1) {
			tempId = tableId;
			tableId = "schedulerjobstable";
		};
			return{
			"bSort": true,
			"aaSorting": [], //disable initial sort
			"bInfo": true,
			"bJQueryUI": true,
			"bRetrieve": true,
			"bStateSave": true,
			"bScrollCollapse": true,
			"bPaginate": true,
			"bLengthChange": true,
			"bFilter": true,
			"sDom": custom.sDom[tableId],
			"iDisplayLength" : 200,
			"aLengthMenu" :[200, 150, 100, 50, 10],
			"bAutoWidth": true,
			"sPaginationType": "full_numbers",
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": tableId.indexOf("scheduler") > -1 ? "jobs/"+tempId.replace("schedulerjobstable","")+"/runhistory" : tableId.replace("table",""),
			"fnServerData": serverData(data),
			"fnDrawCallback":function() {
				$("#"+tableId+" tr").click(function() {
					if ( $(this).hasClass('row_selected') ) {
						$(this).removeClass('row_selected');
					}
					else {
						$('tr.row_selected').removeClass('row_selected');
						$(this).addClass('row_selected');
					}
				});
			},
			"aoColumnDefs": custom.datatablePresentation2[tableId],
			"oLanguage": {
						"sEmptyTable": doI18N("rpt.no.entries"),
						"sZeroRecords": doI18N("rpt.no.matching.entries"),
						"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
						"sInfoFiltered": "",
							"oPaginate": {
    									"sFirst"    : doI18N("rpt.first"),
    									"sLast"     : doI18N("rpt.last"),
    									"sNext"     : doI18N("rpt.next"),
    									"sPrevious" : doI18N("rpt.previous")
									},
						"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
						"sSearch": doI18N("rpt.search")
			}
		}
	}
}

custom.jqueryDataTableLayout = {
		
		basic: function() {
			return {
			"bSort": true,
			"aaSorting": [], //disable initial sort
			"bInfo": true,
			"bJQueryUI": true,
			"bRetrieve": false,
			"bScrollCollapse": false,
			"bPaginate": false,
			"bLengthChange": false,
			"bFilter": false,
			"bAutoWidth": false,
			"oLanguage": {
						"sEmptyTable": doI18N("rpt.no.entries"),
						"sZeroRecords": doI18N("rpt.no.matching.entries"),
						"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
						"SInfoFiltered": "(" + doI18N("rpt.filtered.from") + " _max_ " + doI18N("rpt.total.entries") + ")",
							"oPaginate": {
    									"sFirst"    : doI18N("rpt.first"),
    									"sLast"     : doI18N("rpt.last"),
    									"sNext"     : doI18N("rpt.next"),
    									"sPrevious" : doI18N("rpt.previous")
									},
						"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
						"sSearch": doI18N("rpt.search")
				}
			}
		},
		enhanced: function() {
				return  {
				"aaSorting": [], //disable initial sort
				"sDom": 'lfTip<"top"<"clear">>rt',
				"oTableTools": {
						"aButtons": [{	"sExtends": "copy",
									"sButtonText": doI18N("Copy to Clipboard")
											}, 
								{	"sExtends": "xls",
									"sButtonText": doI18N("Save to CSV")
								}
								],
						"sSwfPath": "resources/libs/DataTables-1.9.4/extras/TableTools/media/swf/copy_csv_xls.swf"
					        },
					        
				"sPaginationType": "full_numbers",
				"oLanguage": {
							"sEmptyTable": doI18N("rpt.no.entries"),
							"sZeroRecords": doI18N("rpt.no.matching.entries"),
							"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
							"SInfoFiltered": "(" + doI18N("rpt.filtered.from") + " _max_ " + doI18N("rpt.total.entries") + ")",
		        				"oPaginate": {
		            						"sFirst"    : doI18N("rpt.first"),
		            						"sLast"     : doI18N("rpt.last"),
		            						"sNext"     : doI18N("rpt.next"),
		            						"sPrevious" : doI18N("rpt.previous")
		        						},
							"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
							"sSearch": doI18N("rpt.search")
						},
				"bDeferRender": true,
				"bProcessing": true,
				"aLengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]]
			}
		},
		withExportOption: function() {
			return {
				"bSort": true,
				"aaSorting": [], //disable initial sort
				"bInfo": true,
				"sDom": 'lfTip<"top"<"clear">>rt',
				"oTableTools": {
					"aButtons": [{	"sExtends": "copy",
								"sButtonText": doI18N("Copy to Clipboard")
										}, 
							{	"sExtends": "xls",
								"sButtonText": doI18N("Save to CSV")
							}
							],
					"sSwfPath": "resources/libs/DataTables-1.9.4/extras/TableTools/media/swf/copy_csv_xls.swf"
			     },
				"bJQueryUI": true,
				"bRetrieve": false,
				"bScrollCollapse": false,
				"bPaginate": false,
				"bLengthChange": false,
				"bFilter": false,
				"bAutoWidth": false,
				"oLanguage": {
							"sEmptyTable": doI18N("rpt.no.entries"),
							"sZeroRecords": doI18N("rpt.no.matching.entries"),
							"sInfo": doI18N("rpt.showing") + " _START_ " + doI18N("rpt.to") + " _END_ " + doI18N("rpt.of") + " _TOTAL_ " + doI18N("rpt.records"),
							"SInfoFiltered": "(" + doI18N("rpt.filtered.from") + " _max_ " + doI18N("rpt.total.entries") + ")",
    							"oPaginate": {
        									"sFirst"    : doI18N("rpt.first"),
        									"sLast"     : doI18N("rpt.last"),
        									"sNext"     : doI18N("rpt.next"),
        									"sPrevious" : doI18N("rpt.previous")
    									},
							"sLengthMenu": doI18N("rpt.show") + " _MENU_ " + doI18N("rpt.entries"),
							"sSearch": doI18N("rpt.search")
				}
			}
		}

}


//establish the app profile and include any app specific javascript configuration
//file
applicationProfile = "ALL";
if (QueryParameters["applicationProfile"]) applicationProfile = QueryParameters["applicationProfile"];

var configScript = '<script type="text/javascript" src="resources/configs/app/'
		+ applicationProfile + '.js"></script>';
document.write(configScript);


applicationMode = "PROD";
if (QueryParameters["mode"]) applicationMode = QueryParameters["mode"];
	
// establish the tenant and include any tenant specific javascript configuration
// file
tenantIdentifier = "default";
if (QueryParameters["tenantIdentifier"])
	tenantIdentifier = QueryParameters["tenantIdentifier"];

function setTenantIdentifierForProductionServer()
{
	var l = document.createElement("a");
    l.href = window.location.href;
	if (l.hostname == "demo.openmf.org") {
		tenantIdentifier = "default";
	} else if (l.hostname.toLowerCase().indexOf("openmf.org") >= 0) {
		var input = l.hostname;
		var lines = input.split('.');
		var output = '';
		$.each(lines, function(key, line) {
		   output=line;
		   return false;
		});
		tenantIdentifier = output.replace('https://',"");
	}
}

setTenantIdentifierForProductionServer();

var configScript = '<script type="text/javascript" src="resources/configs/tenant/'
		+ tenantIdentifier + '.js"></script>';
document.write(configScript);

