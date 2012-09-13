(function($) {

	$.stretchyTableData = {};

	$.stretchyTableData.displayAdditionalInfo = function(params) {

		globaliseFunctions = "";
		if (params.globaliseFunctions) globaliseFunctions = params.globaliseFunctions;
		tabledataParams = params;
		defaultDecimalPlaces = 4;
		nullTitleValue = "-99999999";


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

	$.stretchyTableData.showDataTable= function(tabName, datatableName, id, fkName) {
		showDataTable(tabName, datatableName, id, fkName);   
	};




	function displayAdditionalInfo(params) {

		var url = 'datatables?appTable=' + params.appTableName;

		var successFunction = function(data, status, xhr) {
			if (data.length > 0)
			{
				params.appendTo.tabs( "add", "no url", doI18N(params.appTableLabel));

				//var currentTabIndex = $(params.appendTo).tabs('option', 'selected');
				//var currentTabAnchor = $(params.appendTo).data('tabs').anchors[currentTabIndex];
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
alert("complete after  - for when an error is got but not on a create/update form");
				    	//handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
				};


function showDataTable(tabName, datatableName, id, fkName) {	 

	var url = 'datatables/' + datatableName + "/" + id;

	var successFunction = function(data, status, xhr) {
	        		var currentTab = $("#" + tabName).children(".ui-tabs-panel").not(".ui-tabs-hide");
	        		//currentTab.html(showDataTableDisplay(fkName, data));

	        		showDataTableDisplay(fkName, data, currentTab);

		};

	executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction );	

}

function showDataTableDisplay(fkName, data, currTab) {

	var cardinalityVar = getTableCardinality(fkName, data.columnHeaders);
	switch (cardinalityVar) {
	case "PRIMARY":
		currTab.html(showDataTableOneToOne(fkName, data));
		break;
	case "FOREIGN":
		var oneToManyOuter = '<div id="dt_example"><div id=StretchyReportOutput></div></div>';
		currTab.html(oneToManyOuter);
		showDataTableOneToMany(fkName, data);
		break;
	default:
		currTab.html(cardinalityVar);
	}
}


function showDataTableOneToOne(fkName, data) {

		var dataLength = data.data.length;
		var extraDataViewVar = '<table width="100%"><tr>';

		var colsPerRow = 2;
		var colsPerRowCount = 0;
		var labelClassStr = "";
		var valueClassStr = "";
		if (tabledataParams.labelClass > "")
			labelClassStr = ' class="' + tabledataParams.labelClass + '" ';
		if (tabledataParams.valueClass > "")
			valueClassStr = ' class="' + tabledataParams.valueClass + '" ';

		for ( var i in data.columnHeaders) {
			if (!(data.columnHeaders[i].columnName == fkName)) {
				colsPerRowCount += 1;
				if (colsPerRowCount > colsPerRow) {
					extraDataViewVar += '</tr><tr>';
					colsPerRowCount = 1;
				}
				var colVal = "";
				if (dataLength > 0)
					colVal = data.data[0].row[i];
				if (colVal == null)
					colVal = "";


				if (colVal > "")
				{
					switch (getColumnType(data.columnHeaders[i].columnType)) {
					case "TEXT":
						colVal = '<textarea rows="3" cols="40" readonly="readonly">' + colVal + '</textarea>';
						break;
					case "INTEGER":
				 		if (data.columnHeaders[i].columnValuesNew.length > 0) {
							colVal = getDropdownValue(colVal, data.columnHeaders[i].columnValuesNew);							
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
						+ '>' + doI18N(data.columnHeaders[i].columnName)
						+ ':</span></td><td valign="top"><span '
						+ valueClassStr + '>' + colVal + '</span></td>';
			}
		}
		extraDataViewVar += '</tr></table>';

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

function getTableCardinality(fkName, columnHeaders) {	 

	for ( var i in columnHeaders) {
		if (columnHeaders[i].columnName == fkName) {
			if (columnHeaders[i].isColumnPrimaryKey == true) return "PRIMARY"
			else return "FOREIGN"; 	
		}
	}
	return "Column: " + fkName + " - NOT FOUND";
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


function showDataTableOneToMany(fkName, data) {

	var tableColumns = getTableColumns(fkName, data);
	var tableData = getTableData(fkName, data, tableColumns);
	
	dataTableDef.aaData = tableData;
	dataTableDef.aoColumns= tableColumns;
	dataTableDef.aaSorting = [];	

	showTableReport(fkName, data.columnHeaders);							
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

function showTableReport(fkName, origTableColumns) {
	//isNewTable = true;
	$('#StretchyReportOutput').html( '<table cellpadding="0" cellspacing="1" border="0" class="display" id="RshowTable" width=100%></table>' );
	oTable = $('#RshowTable').dataTable(dataTableDef);	
	oSettings = oTable.fnSettings();

	for (var i in origTableColumns)
	{
	  	if ((origTableColumns[i].isColumnPrimaryKey == true) || (origTableColumns[i].columnName == fkName)) oTable.fnSetColumnVis( i, false );
	}


	//showMsg("1st recs displayed is: " + fnRecordsDisplay());
	//applyFilterRules();
}

function convertCRtoBR(str) {
    return str.replace(/(\r\n|[\r\n])/g, "<br />");
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
