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

custom.showFirstPage = function() {

	showILClientListing();

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
	"M_OFFICE" : {
		renderInfo : [],
		exclude : [ ]
	}
};

//table properties
custom.datatablePresentation2 = {
	"clientstable":	[{
				        "mDataProp": "officeId",
				        "aTargets":  [0]
				    },
				    {
				        "mDataProp": "accountNo",
				        "aTargets": [1],
				        "fnCreatedCell":function(nTd,sData,oData,iRow,iCol)//not supported in datatables 1.8.x
				        {
				        	$(nTd).html('<a id="navigateToClient'+oData.id+'" href="#" onclick="showILClient('+oData.id+');">'+sData+'</a>');
				        }
				    },
				    {
				        "mDataProp": "displayName",
				        "aTargets": [2]
				    },
				    {
				        "mDataProp": "id",
				        "aTargets": [3],
				        "bVisible":false
				    }]

				
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

custom.jqueryDataTableServerSide = {

	paginated:function(tableId)
		{
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
			"sDom": '<"H"lfr<"#custom">>t<"F"ip> ',
			"aLengthMenu" :[200, 150, 100, 50],
			"bAutoWidth": true,
			"sPaginationType": "full_numbers",
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": "clients/",
			"fnServerData": serverData(),
			"fnDrawCallback":function()
							{
								$("#"+tableId+" tr").click(function() {
									if ( $(this).hasClass('row_selected') ) {
										$(this).removeClass('row_selected');
									}
									else {
										$('tr.row_selected').removeClass('row_selected');
										$(this).addClass('row_selected');
									}
								} );								
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
						"sSwfPath": "resources/libs/DataTables-1.9.4/extras/TableTools/media/swf/copy_cvs_xls.swf"
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
					"sSwfPath": "resources/libs/DataTables-1.9.4/extras/TableTools/media/swf/copy_cvs_xls.swf"
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


// establish the tenant and include any tenant specific javascript configuration
// file

tenantIdentifier = "default";
if (QueryParameters["tenantIdentifier"])
	tenantIdentifier = QueryParameters["tenantIdentifier"];

var tenantConfigScript = '<script type="text/javascript" src="resources/tenantconfigs/'
		+ tenantIdentifier + '.js"></script>';
document.write(tenantConfigScript);
