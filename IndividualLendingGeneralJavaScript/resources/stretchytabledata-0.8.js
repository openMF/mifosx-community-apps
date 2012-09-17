(function($) {

	$.stretchyTableData = {};

	$.stretchyTableData.displayAdditionalInfo = function(params) {

		globaliseFunctions = "";
		if (params.globaliseFunctions) globaliseFunctions = params.globaliseFunctions;
		tabledataParams = params;
		defaultDecimalPlaces = 4;
		nullTitleValue = "-99999999";

		saveLabel = "Save";
		if (params.saveLabel) saveLabel = params.saveLabel;

		cancelLabel = "Cancel";		
		if (params.cancelLabel) cancelLabel = params.cancelLabel;


		if (!(params.baseApiUrl)) {
			alert(doI18N("Table Data Initialisation Error - baseApiUrl parameter"));
			return;
		}
		if (!(params.base64)) {
			alert(doI18N("Table Data Initialisation Error - base64 parameter"));
			return;
		}
		if (!(params.tenantIdentifier)) {
			alert(doI18N("Table Data Initialisation Error - tenantIdentifier parameter"));
			return;
		}
		if (!(params.appTableName)) {
			alert(doI18N("Table Data Initialisation Error - appTableName parameter"));
			return;
		}
		if (!(params.appTableLabel)) {
			alert(doI18N("Table Data Initialisation Error - appTableLabel parameter"));
			return;
		}
		if (!(params.appTablePKValue)) {
			alert(doI18N("Table Data Initialisation Error - appTablePKValue parameter"));
			return;
		}
		if (!(params.appendTo)) {
			alert(doI18N("Table Data Initialisation Error - appendTo parameter"));
			return;
		}
		if (!(params.appendToDiv)) {
			alert(doI18N("Table Data Initialisation Error - appendToDiv parameter"));
			return;
		}

		initialiseDataTableDef();
		
		displayAdditionalInfo(params);
	};

	$.stretchyTableData.showDataTable = function(tabName, datatableName, id, fkName) {
		showDataTable(tabName, datatableName, id, fkName);   
	};

	$.stretchyTableData.popupAddUpdateDialog = function(requestType, postOrPutUrl, updateRowIndex) {
		popupAddUpdateDialog(requestType, postOrPutUrl, updateRowIndex);   
	};

	$.stretchyTableData.popupDeleteDialog = function(deleteUrl) {
		popupDeleteDialog(deleteUrl);   
	};




	function displayAdditionalInfo(params) {

		var url = 'datatables?appTable=' + params.appTableName;

		var successFunction = function(data, status, xhr) {
			if (data.length > 0)
			{
				params.appendTo.tabs( "add", "no url", doI18N(params.appTableLabel));

				var additionalDataIdName = params.appTableName + "AdditionalData";

				var htmlVar = '<div id="' + additionalDataIdName + '"><ul>';
				htmlVar += '<li><a href="unknown.html" onclick="return false;"><span>.</span></a></li>';
				for (var i in data) 
				{
					htmlVar += '<li><a href="unknown.html" onclick="jQuery.stretchyTableData.showDataTable(' + "'" 
					htmlVar += additionalDataIdName + "', '" + data[i].registeredTableName + "'" + ', ' 
					htmlVar += params.appTablePKValue + ", '" + getFKName(data[i].applicationTableName) + "'" + ');return false;"><span>' 
					htmlVar += data[i].registeredTableLabel + '</span></a></li>';
				}
				htmlVar += '</ul></div>';

	        		var currentTab = $("#" + params.appendToDiv).children(".ui-tabs-panel").not(".ui-tabs-hide");
	        		currentTab.html(htmlVar);

    				$("#" + additionalDataIdName ).tabs();

				$(params.appendTo).tabs('select', 0); //back to main tab
			}
		};

		executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction );	

	}


generalErrorFunction = function(jqXHR, textStatus, errorThrown) {
// for when an error is got but not on a create/update form - 
					alert(jqXHR.responseText);
				};


function showDataTable(tabName, datatableName, id, fkName) {	 

	var url = 'datatables/' + datatableName + "/" + id;

	var successFunction = function(data, status, xhr) {
				currentTableDataInfo = {
								fkName: fkName,
								data: data,
								url: url,
								currentTab: $("#" + tabName).children(".ui-tabs-panel").not(".ui-tabs-hide")
								};
	        		showDataTableDisplay();
		};

	executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction );	

}

function showDataTableDisplay() {

	var cardinalityVar = getTableCardinality();
	switch (cardinalityVar) {
	case "PRIMARY":
		currentTableDataInfo.currentTab.html(showDataTableOneToOne());
		break;
	case "FOREIGN":
		var oneToManyOuter = '<div id="dt_example"><div id=StretchyReportOutput></div></div>';
		currentTableDataInfo.currentTab.html(oneToManyOuter);
		showDataTableOneToMany();
		break;
	default:
		currentTableDataInfo.currTab.html(cardinalityVar);
	}
}


function showDataTableOneToOne() {

		var dataLength = currentTableDataInfo.data.data.length;

		if (dataLength == 0)
		{
			var noDataHtml = doI18N("No.Data.Found") + '<br>';
			noDataHtml += '<button onclick="' + genAddEditPopupClick("POST", currentTableDataInfo.url) + '">' + doI18N("Datatables.Add") + '</button>';
			return noDataHtml ;
		}


		var extraDataViewVar = '<table width="100%"><tr>';
		var colsPerRow = 2;
		var colsPerRowCount = 0;
		var labelClassStr = "";
		var valueClassStr = "";
		var colVal;
		if (tabledataParams.labelClass > "")
			labelClassStr = ' class="' + tabledataParams.labelClass + '" ';
		if (tabledataParams.valueClass > "")
			valueClassStr = ' class="' + tabledataParams.valueClass + '" ';

		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if (!(currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName)) {
				colsPerRowCount += 1;
				if (colsPerRowCount > colsPerRow) {
					extraDataViewVar += '</tr><tr>';
					colsPerRowCount = 1;
				}

				colVal = currentTableDataInfo.data.data[0].row[i];
				if (colVal == null)
					colVal = "";


				if (colVal > "")
				{
					switch (getColumnType(currentTableDataInfo.data.columnHeaders[i].columnType)) {
					case "TEXT":
						colVal = '<textarea rows="3" cols="40" readonly="readonly">' + colVal + '</textarea>';
						break;
					case "INTEGER":
				 		if (currentTableDataInfo.data.columnHeaders[i].columnValuesNew.length > 0) {
							colVal = getDropdownValue(colVal, currentTableDataInfo.data.columnHeaders[i].columnValuesNew);							
						}
						else
						{
							colVal = globalNumber(parseInt(colVal));
						}
						break;
					case "DATE":
						colVal = globalDateAsISOString(colVal);
						break;
					case "DECIMAL":
						colVal = globalDecimal(parseFloat(colVal), defaultDecimalPlaces);
						break;
					}
				}

				extraDataViewVar += '<td valign="top"><span ' + labelClassStr
						+ '>' + doI18N(currentTableDataInfo.data.columnHeaders[i].columnName)
						+ ':</span></td><td valign="top"><span '
						+ valueClassStr + '>' + colVal + '</span></td>';
			}
		}
		extraDataViewVar += '</tr></table><br>';
		extraDataViewVar += '<button onclick="' + genAddEditPopupClick("PUT", currentTableDataInfo.url, 0) + '">' + doI18N("Datatables.Edit") + '</button>';
		extraDataViewVar += '<button onclick="' + genDeletePopupClick(currentTableDataInfo.url) + '">' + doI18N("Datatables.Delete") + '</button>';

		return extraDataViewVar;
}




function getDropdownValue(inColVal, columnValues) {	 

	for ( var i in columnValues) {
		if (inColVal == columnValues[i].id) return columnValues[i].value;
	}
	return "Err";
}

function getColumnType(inColType) {	 

		switch (inColType) {
		case "bigint":
			return "INTEGER";
		case "bit":
			return "STRING";
		case "date":
			return "DATE";
		//case "datetime":
		//	return "STRING";
		case "decimal":
			return "DECIMAL";
		case "double":
			return "DECIMAL";
		case "int":
			return "INTEGER";
		case "mediumtext":
			return "TEXT";
		case "smallint":
			return "INTEGER";
		case "text":
			return "TEXT";
		case "tinyint":
			return "INTEGER";
		case "varchar":
			return "STRING";
		default:
			return "Column Type: " + inColType + " - Not Catered For";
		}

}

function getFKName(appTableName) {	 
	return appTableName.substring(2) + "_id";
}

function getTableCardinality() {	 

	for ( var i in currentTableDataInfo.data.columnHeaders) {
		if (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName) {
			if (currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true) return "PRIMARY"
			else return "FOREIGN"; 	
		}
	}
	return "Column: " + currentTableDataInfo.fkName + " - NOT FOUND";
}

function executeAjaxRequest(url, verbType, jsonData, successFunction, errorFunction) { 

	var jqxhr = $.ajax({ 
				url : tabledataParams.baseApiUrl + url, 
				type : verbType, //POST, GET, PUT or DELETE 
				contentType : "application/json; charset=utf-8", 
				dataType : 'json', 
				data : jsonData, 
				cache : false, 
				beforeSend : function(xhr) { 
						if (tabledataParams.tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tabledataParams.tenantIdentifier); 
						if (tabledataParams.base64 > "") xhr.setRequestHeader("Authorization", "Basic " + tabledataParams.base64); 
					}, 
				success : successFunction, 
				error : errorFunction 
			}); 
}



function initialiseDataTableDef() {
dataTableDef = {
		// "sDom": 'lfTip<"top"<"clear">>rtlfTip<"bottom"<"clear">>',
		"sDom": 'lfTip<"top"<"clear">>rt',
		"oTableTools": {
				"aButtons": [{	"sExtends": "copy",
							"sButtonText": doI18N("Copy to Clipboard")
									}, 
						{	"sExtends": "xls",
							"sButtonText": doI18N("Save to CSV")
						}
						],
				"sSwfPath": tabledataParams.resValue + "DataTables-1.8.2/extras/TableTools/media/swf/copy_cvs_xls.swf"
			        },
			        
		"aaData": [],
		"aoColumns": [],
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

}


function showDataTableOneToMany() {

	var tableColumns = getTableColumns(currentTableDataInfo.fkName, currentTableDataInfo.data);
	var tableData = getTableData(currentTableDataInfo.fkName, currentTableDataInfo.data, tableColumns);

	var editDeleteButtons = true;
	var idColIndex = -1
	for (var i in currentTableDataInfo.data.columnHeaders)
	{
		if (currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true) idColIndex = i;
	}

	tableColumns.unshift({ "sTitle": "",
					"sType": "",
					"sClass": "",
					"dbColType": ""
					});
	for (var i in currentTableDataInfo.data.data)
	{
		var putUrl = currentTableDataInfo.url + "/" + currentTableDataInfo.data.data[i].row[idColIndex];
		var buttonFunctions = '<button onclick="' + genAddEditPopupClick("PUT", putUrl, i) + '">' + doI18N("Datatables.Edit") + '</button>';
		buttonFunctions += '<button onclick="' + genDeletePopupClick(putUrl) + '">' + doI18N("Datatables.Delete") + '</button>';
		tableData[i].unshift(buttonFunctions);
	}
	dataTableDef.aaData = tableData;
	dataTableDef.aoColumns= tableColumns;
	dataTableDef.aaSorting = [];	

	showTableReport(editDeleteButtons);							
}

function getTableColumns(fkName, data) {

	var tableColumns = [];
	var tmpSType = "";
	var tmpSClass = "";
	for (var i in data.columnHeaders)
	{
		var tmpSClass = "";
		var colType = getColumnType(data.columnHeaders[i].columnType);

		
		switch(colType)
		{
			case "STRING":
  				tmpSType = 'string';
  				break;
			case "DECIMAL":
  				tmpSType = 'title-numeric';
				tmpSClass = "rptAlignRight";
				break;
			case "INTEGER":
  				tmpSType = 'title-numeric';
				tmpSClass = "rptAlignRight";
  				break;
			case "DATE":
  				tmpSType = 'title-string';
  				break;
			default:
  				tmpSType = 'string';
		}
		tableColumns.push({ "sTitle": doI18N(data.columnHeaders[i].columnName), 
					//"sOriginalHeading": data.columnHeaders[i].columnName,
					"sType": tmpSType,
					"sClass": tmpSClass,
					"dbColType": colType
					});
	}
	return tableColumns;
}

function getTableData(fkName, data, tableColumns) {

	var convNum = "";
	var tmpVal;
	var tableData = [];
	for (var i in data.data )
	{
		var tmpArr = [];
		var displayColIndex = 0;
		for (var j in data.data[i].row)
		{
			tmpVal = data.data[i].row[j];
			switch(tableColumns[j].sType)
			{
			case "title-string":
				if (tmpVal == null) tmpVal = '<span title=" "></span>' + "";
				else tmpVal = '<span title="' + tmpVal + '"></span>' + globalDateAsISOString(tmpVal);
			case "string":
				if (tmpVal == null) tmpVal = ""
				else tmpVal = convertCRtoBR(tmpVal);
  				break;
			case "title-numeric":
				if (tmpVal == null) tmpVal = '<span title="' + nullTitleValue  + '"></span>' + "";
				else
				{
					if (tableColumns[j].dbColType == "INTEGER") convNum = globalNumber(parseInt(tmpVal))
					else convNum = globalDecimal(parseFloat(tmpVal), defaultDecimalPlaces);

					tmpVal = '<span title="' + tmpVal + '"></span>' + convNum;
				}
  				break;
			default:
  				alert("System Error - Type not Found: " + tableColumns[j].sType);
			}
			tmpArr.push(tmpVal);
		}
		tableData.push(tmpArr);
	}
	return tableData;
}

function showTableReport(editDeleteButtons) {

	var adjustTableColumnIndex = 0;
	//if edit/delete functionality added in column 1 
	if (editDeleteButtons == true) adjustTableColumnIndex = 1;

	var htmlVar = '<button onclick="' + genAddEditPopupClick("POST", currentTableDataInfo.url) + '">' + doI18N("Datatables.Add") + '</button><br>';
	htmlVar += '<table cellpadding="0" cellspacing="1" border="0" class="display" id="RshowTable" width=100%></table>';

	$('#StretchyReportOutput').html(htmlVar);
	oTable = $('#RshowTable').dataTable(dataTableDef);	
	oSettings = oTable.fnSettings();

	for (var i in currentTableDataInfo.data.columnHeaders)
	{
	  	if ((currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true) || (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName))
		{
			oTable.fnSetColumnVis( (parseInt(i) + adjustTableColumnIndex) , false );
		}
	}

}

function convertCRtoBR(str) {
    return str.replace(/(\r\n|[\r\n])/g, "<br />");
}




//Update Related Functions

popupAddUpdateErrorFunction = function(jqXHR, textStatus, errorThrown) {
		handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
};

function popupAddUpdateDialog(requestType, postOrPutUrl, updateRowIndex) {

	dialogDiv = $("<div id='dialog-form'></div>");
	dialogDiv.append(addUpdateBuildTemplate(requestType, updateRowIndex));
	addUpdateOpenDialog(requestType, postOrPutUrl, updateRowIndex);
	$('.datepickerfield').datepicker({constrainInput: true, changeMonth : true, changeYear : true, dateFormat: 'dd MM yy'});

	//alert("requestType: " + requestType + "    postOrPutUrl: " + postOrPutUrl + "    updateRowIndex: " + updateRowIndex);
}

function addUpdateBuildTemplate(requestType, updateRowIndex) {

	var htmlVar = '<form id="entityform">    <div id="formerrors"></div>';
	htmlVar += '<table width="100%"><tr>';

	var colsPerRow = 2;
	var colsPerRowCount = 0;

	for ( var i in currentTableDataInfo.data.columnHeaders) {
	  	if (!((currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true) || (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName)))
		{
			colsPerRowCount += 1;
			if (colsPerRowCount > colsPerRow) {
				htmlVar += '</tr><tr>';
				colsPerRowCount = 1;
			}
			var colVal = "";
			if (requestType == "PUT")
				colVal = currentTableDataInfo.data.data[updateRowIndex].row[i];
			htmlVar += addUpdateColDisplayHTML(currentTableDataInfo.data.columnHeaders[i], colVal);
		}
	}
	htmlVar += '</tr>';
	return htmlVar += '</table></form>';
}

function addUpdateColDisplayHTML(columnHeader, colVal) {

		var displayHTML = '<td valign="top"><label>' + columnHeader.columnName
				+ ':</label></td><td valign="top">';

		var colNameUnderscore = spaceToUnderscore(columnHeader.columnName);
		var defaultStringLength = 40;

		var displayVal = "";
		if (colVal != null) displayVal = colVal;

		var colType = getColumnType(columnHeader.columnType);
		switch (colType) {
		case "STRING":
			var colLength = columnHeader.columnLength;
			if (colLength > defaultStringLength) colLength = defaultStringLength;
			displayHTML += getTextHTML(colNameUnderscore, displayVal, colLength);
			break;
		case "INTEGER":
			if (displayVal > "") displayVal = globalNumber(parseInt(displayVal));
			displayHTML += getTextHTML(colNameUnderscore, displayVal, 20);
			break;
		case "DATE":
			if (displayVal > "") displayVal = globalDateAsISOString(displayVal);
			displayHTML += getDateHTML(colNameUnderscore, displayVal, 20);
			break;
		case "DECIMAL":
			if (displayVal > "") displayVal = globalDecimal(parseFloat(displayVal), defaultDecimalPlaces);
			displayHTML += getTextHTML(colNameUnderscore, displayVal, 20);
			break;
		case "TEXT":
			displayHTML += '<textarea id="' + colNameUnderscore + '" name="'
					+ colNameUnderscore + '" rows="4" cols="40">' + displayVal 
					+ '</textarea>';
			break;
		default:
			displayHTML += "'" + colType + "'";

		}

		displayHTML += '</td>';
		return displayHTML;
}

function spaceToUnderscore(str) {
	return str.replace(/ /g, "_")
}

function getDateHTML(colName, colVal, textSize) {
	return '<input id="' + colName + '" name="' + colName+ '" size="' + textSize + '" class="datepickerfield" ' + setValueAttr(colVal) + ' type="text"/>';
}

function getTextHTML(colName, colVal, textSize) {
	return '<input id="' + colName + '" name="' + colName+ '" size="' + textSize + '" ' + setValueAttr(colVal) + ' type="text"/>';
}

function setValueAttr(str) {
	if (str > "") return 'value="' + str.replace(/"/g, "&quot;") + '"';
	return "";
}

function addUpdateOpenDialog(requestType, saveUrl, updateRowIndex) {

		var saveButton = saveLabel;
		var cancelButton = cancelLabel;

		var buttonsOpts = {};
		buttonsOpts[saveButton] = function() {
			$('.multiSelectedItems option').each(function(i) {
				$(this).attr("selected", "selected");
			});

			var form_data = JSON.stringify($('#entityform').serializeObject());
/*
			updatedData = $('#entityform').serializeObject();
			var j;
			for (i in updatedData)
			{
				j = getColumnIndex(i);
				currentTableDataInfo.data.data[updateRowIndex].row[j] = updatedData[i];
			}
	        	showDataTableDisplay();
*/

			var successFunction = function(data, textStatus, jqXHR) {
						currentTableDataInfo.data = data;
						dialogDiv.dialog("close");
	        				showDataTableDisplay();
					};

			executeAjaxRequest(saveUrl, requestType, form_data, successFunction, popupAddUpdateErrorFunction);	
		};

		buttonsOpts[cancelButton] = function() {
			$(this).dialog("close");
		};

		dialogDiv.dialog(
					{
							title : "my title", //currentEditPopup.title,
							width : 1000,
							height : 500,
							modal : true,
							buttons : buttonsOpts,
							close : function() {
								// if i dont do this, theres a problem with
								// errors being appended to dialog view second
								// time round
								$(this).remove();
							},
							open : function(event, ui) {
								$('.multiadd')
										.click(
												function() {
													return !$(
															'.multiNotSelectedItems option:selected')
															.remove()
															.appendTo(
																	'#selectedItems');
												});

								$('.multiremove')
										.click(
												function() {
													return !$(
															'.multiSelectedItems option:selected')
															.remove()
															.appendTo(
																	'#notSelectedItems');
												});
							}
					}).dialog('open');
}

function getColumnIndex(colName) {

	for ( var ci in currentTableDataInfo.data.columnHeaders)
			if (currentTableDataInfo.data.columnHeaders[ci].columnName == colName) return ci;

	alert("Column: " + colName + " Not Found");
	return -1;
}

function popupDeleteDialog(deleteUrl) {

	alert("deleteUrl: " + deleteUrl);
}

function genAddEditPopupClick(requestType , postOrPutUrl, updateRowIndex) {
	return "jQuery.stretchyTableData.popupAddUpdateDialog('" + requestType + "', '" + postOrPutUrl + "', " + updateRowIndex + ");";
}

function genDeletePopupClick(deleteUrl) {
	return "jQuery.stretchyTableData.popupDeleteDialog('" + deleteUrl + "');";
}

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

	
//Error functions		
function removeErrors(placeholderDiv) {
		// remove error class from all input fields
		var $inputs = $('#entityform :input');
		
	    $inputs.each(function() {
	        $(this).removeClass("ui-state-error");
	    });
		
	  	$(placeholderDiv).html("");
}

function handleXhrError(jqXHR, textStatus, errorThrown, templateSelector, placeholderDiv) {

alert("here"); 

	  	if (jqXHR.status === 0) {
		    alert('No connection. Verify application is running.');
	  	} else if (jqXHR.status == 401) {
			alert('Unauthorized. [401]');
		} else if (jqXHR.status == 404) {
		    alert('Requested page not found. [404]');
		} else if (jqXHR.status == 405) {
			alert('HTTP verb not supported [405]: ' + errorThrown);
		} else if (jqXHR.status == 500) {
		    alert('Internal Server Error [500].');
		} else if (errorThrown === 'parsererror') {
		    alert('Requested JSON parse failed.');
		} else if (errorThrown === 'timeout') {
		    alert('Time out error.');
		} else if (errorThrown === 'abort') {
		    alert('Ajax request aborted.');
		} else {
			
			removeErrors(placeholderDiv);
			
		  	var jsonErrors = JSON.parse(jqXHR.responseText);
		  	console.log(jsonErrors);
		  	var valErrors = jsonErrors.errors;
		  	console.log(valErrors);
		  	var errorArray = new Array();
		  	var arrayIndex = 0;
		  	$.each(valErrors, function() {
		  	  var fieldId = '#' + this.parameterName;
		  	  $(fieldId).addClass("ui-state-error");
		  	  
		  	  var errorObj = new Object();
		  	  errorObj.field = this.parameterName;
		  	  errorObj.code = this.userMessageGlobalisationCode;
		  	  
		  	  var argArray = new Array();
		  	  var argArrayIndex = 0;
		  	  $.each(this.args, function() {
		  		argArray[argArrayIndex] = this.value;
		  		argArrayIndex++;
		  	  });
		  	  // hardcoded support for six arguments
		  	  errorObj.message = doI18N(this.userMessageGlobalisationCode, argArray[0], argArray[1], argArray[2], argArray[3], argArray[4], argArray[5]);
		  	  errorObj.value = this.value;
		  	  
		  	  errorArray[arrayIndex] = errorObj;
		  	  arrayIndex++
		  	});
		  	alert("and here");
		  	var templateArray = new Array();
		  	var templateErrorObj = new Object();
		  	templateErrorObj.title = doI18N('error.msg.header');
		  	templateErrorObj.errors = errorArray;
		  	
		  	templateArray[0] = templateErrorObj;
		  	
		  	var formErrorsHtml = $(templateSelector).render(templateArray);
		  	
		  	$(placeholderDiv).append(formErrorsHtml);
		}
}




//// helper functions under here

	function globalDecimal(val, decs) {
		if (globaliseFunctions > "") {
			return globaliseFunctions.decimal(val, decs);
		}
		else return val;
	}

	function globalNumber(val) {
		if (globaliseFunctions > "") {
			return globaliseFunctions.number(val);
		}
		else return val;
	}

	function globalDateAsISOString(isoDate) {
		if (globaliseFunctions > "") {
			return globaliseFunctions.globalDateAsISOString(isoDate);
		}
		else return isoDate;
	}

	function doI18N(xlateStr, params) {
		if (globaliseFunctions > "") {
			return globaliseFunctions.doI18N(xlateStr, params);
		}
		else return xlateStr;
	}

})(jQuery);
