(function($) {

	$.stretchyTableData = {};

	$.stretchyTableData.displayAdditionalInfo = function(params) {

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

		tabledataParams = params;
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
	        		currentTab.html(showDataTableDisplay(fkName, data));
		};

	executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction );	

}

function showDataTableDisplay(fkName, data) {

	var cardinalityVar = getTableCardinality(fkName, data.columnHeaders);
	switch (cardinalityVar) {
	case "PRIMARY":
		return showDataTableOneToOne(fkName, data);
	case "FOREIGN":
		return showDataTableOneToMany(fkName, data);
	default:
		return cardinalityVar;
	}
}




function showDataTableOneToMany(fkName, data) {
	alert("one to  many");

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
			if (!(data.columnHeaders[i].columnName == "client_id")) {
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
					var colType = getColumnType(data.columnHeaders[i].columnType);
				 	if (colType == "TEXT")
						colVal = '<textarea rows="3" cols="40" readonly="readonly">'
							+ colVal + '</textarea>';

				 	if (colType == "INTEGER") {
				 		if (data.columnHeaders[i].columnValuesNew.length > 0) {
							alert("are new values: " + data.columnHeaders[i].columnName + "   " + colVal)
							
						}
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

function getColumnType(inColType) {	 

		switch (inColType) {
		case "bigint":
			return "INTEGER";
		case "bit":
			return "BOOLEAN";
		case "date":
			return "DATE";
		//case "datetime":
		//	return "STRING";
		case "decimal":
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
			return "BOOLEAN";
		case "varchar":
			return "STRING";
		default:
			return "Column Type: " + inColType + " - Not Catered For";
		}

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





	function doI18Na(xlateStr, params) {
 //can inject a function to re-use main doI18N if required or just take this one out (bit more risky but done here)
		return xlateStr;
	}

})(jQuery);
