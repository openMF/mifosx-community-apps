(function($) {

	$.stretchyDataTables = {};

	$.stretchyDataTables.displayAdditionalInfo = function(params) {

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
		if (!(params.appTablePKValue)) {
			alert(doI18N("Table Data Initialisation Error - appTablePKValue parameter"));
			return;
		}

		sdt = {
			globaliseFunctions : "",
			indicateMandatory : "* ",
			saveLabel : "dialog.button.save",
			cancelLabel : "dialog.button.cancel",
			confirmLabel : "dialog.button.confirm",
			defaultDecimalPlaces : 4,
			nullTitleValue : "-99999999",
			tabledataParams : params,
			dataTableDef : "",
			genericResultSetParameter : "?genericResultSet=true"
		}

		if (params.globaliseFunctions)
			sdt.globaliseFunctions = params.globaliseFunctions;

		if (params.indicateMandatory)
			sdt.indicateMandatory = params.indicateMandatory;

		if (params.saveLabel)
			sdt.saveLabel = params.saveLabel;

		if (params.cancelLabel)
			sdt.cancelLabel = params.cancelLabel;

		if (params.confirmLabel)
			sdt.confirmLabel = params.confirmLabel;

		initialiseDataTableDef();

		displayAdditionalInfo(params);
	};

	$.stretchyDataTables.showDataTable = function(tabName, datatableName, id,
			fkName) {
		showDataTable(tabName, datatableName, id, fkName);
	};

	$.stretchyDataTables.getDataTableFieldEntry = function(data, columnName,
			displayMode) {
		return getDataTableFieldEntry(data, columnName, displayMode);
	}

	$.stretchyDataTables.getDataTableFieldValueEntry = function(data,
			columnName, displayMode) {
		return getDataTableFieldValueEntry(data, columnName, displayMode);
	}

	function displayAdditionalInfo(params) {

		if (params.datatableArray.length > 0) {
			for ( var i in params.datatableArray) {

				switch (params.datatableArray[i].type.toUpperCase()) {
				case "DEFAULT":
					showDataTable(params.datatableArray[i].itemDiv,
							params.datatableArray[i].registeredTableName,
							params.appTablePKValue,
							getFKName(params.appTableName),
							params.datatableArray[i].type.toUpperCase());
					break;
				case "TEMPLATE":
					showDataTable(params.datatableArray[i].itemDiv,
							params.datatableArray[i].registeredTableName,
							params.appTablePKValue,
							getFKName(params.appTableName),
							params.datatableArray[i].type.toUpperCase(),
							params.datatableArray[i].templateName);
					break;
				case "USER-DEFINED":
					// data table UI handled completely by user-defined code
					// execute user-defined function
					// expects 2 params: PKValue & itemDiv
					var PKValue = params.appTablePKValue;
					var itemDiv = params.datatableArray[i].itemDiv;
					eval(params.datatableArray[i].itemFunction);
					break;
				default:
					alert("System Error - Invalid renderInfo type: "
							+ params.datatableArray[i].type
							+ "   for registered data table: "
							+ params.datatableArray[i].registeredTableName);
					return;
				}

			}

		}
	}

	var showDataTable = function(itemDiv, datatableName, id, fkName, type,
			templateName) {

		var url = 'datatables/' + datatableName + "/" + id
				+ sdt.genericResultSetParameter;

		var saveSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			showDataTable(itemDiv, datatableName, id, fkName, type,
					templateName);
		}

		var successFunction = function(data, status, xhr) {
			var currentTableDataInfo = {
				itemDiv : itemDiv,
				datatableName : datatableName,
				id : id,
				fkName : fkName,
				type : type,
				templateName : templateName,
				data : data,
				saveSuccessFunction : saveSuccessFunction,
				url : url
			};

			var cardinalityVar = getTableCardinality(
					currentTableDataInfo.data.columnHeaders,
					currentTableDataInfo.fkName);

			switch (cardinalityVar) {
			case "PRIMARY":
				refreshOneToOneDataTable(currentTableDataInfo);
				break;
			case "FOREIGN":
				showDataTableOneToMany(currentTableDataInfo);
				break;
			default:
				$("#" + currentTableDataInfo.itemDiv).html(cardinalityVar);
			}
		};

		executeAjaxRequest(url, 'GET', "", successFunction,
				generalErrorFunction);
	}

	var showDataTableOneToMany = function(currentTableDataInfo) {

		var html = "";
		var isNew = true;
		if (currentTableDataInfo.data.data.length > 0)
			isNew = false;

		html += getAddAndFullDeleteButtonsHtml(
				currentTableDataInfo.datatableName, isNew);
		html += '<div id="dt_example"><div id=StretchyReportOutput><table cellpadding="0" cellspacing="1" border="0" class="display" id="RshowTable" width="100%" ></table></div></div>';

		$("#" + currentTableDataInfo.itemDiv).html(html);

		// now get data
		var tableColumns = getTableColumns(currentTableDataInfo.fkName,
				currentTableDataInfo.data);
		var tableData = getTableData(currentTableDataInfo.fkName,
				currentTableDataInfo.data, tableColumns);

		// first column for edit/delete buttons
		tableColumns.unshift({
			"sTitle" : "",
			"sType" : "",
			"sClass" : "",
			"dbColType" : ""
		});

		var idColIndex = -1
		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if (currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true)
				idColIndex = i;
		}

		var datatableNameUnderscore = spaceToUnderscore(currentTableDataInfo.datatableName);
		var manyButtons = [];
		for ( var i in currentTableDataInfo.data.data) {
			var manyId = currentTableDataInfo.data.data[i].row[idColIndex];
			var buttonFunctions = '<table><tr><td style="padding: 0px;">'
			if (jQuery.MifosXUI.hasDataTablePermission("UPDATE_"
					+ currentTableDataInfo.datatableName) == true)
				buttonFunctions += '<button id="edit' + datatableNameUnderscore
						+ "_" + manyId + '">' + doI18N("Datatables.Edit")
						+ '</button>';

			buttonFunctions += '</td><td style="padding: 0px;">';

			if (jQuery.MifosXUI.hasDataTablePermission("DELETE_"
					+ currentTableDataInfo.datatableName) == true)
				buttonFunctions += '<button id="delete'
						+ datatableNameUnderscore + "_" + manyId + '">'
						+ doI18N("Datatables.Delete") + '</button>';

			buttonFunctions += '</td></tr></table>';
			tableData[i].unshift(buttonFunctions);

			manyButtons.push(manyId);
		}
		sdt.dataTableDef.aaData = tableData;
		sdt.dataTableDef.aoColumns = tableColumns;
		sdt.dataTableDef.aaSorting = [];

		// adjust for edit/delete buttons in column 1
		adjustTableColumnIndex = 1;

		oTable = $('#RshowTable').dataTable(sdt.dataTableDef);
		oSettings = oTable.fnSettings();

		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if ((currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true)
					|| (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName)) {
				oTable.fnSetColumnVis((parseInt(i) + adjustTableColumnIndex),
						false);
			}
		}

		var params = {
			datatableName : currentTableDataInfo.datatableName,
			datatableUrl : currentTableDataInfo.url,
			templateName : currentTableDataInfo.templateName,
			saveSuccessFunction : currentTableDataInfo.saveSuccessFunction,
			columnHeaders : currentTableDataInfo.data.columnHeaders,
			fkName : currentTableDataInfo.fkName,
			manyButtons : manyButtons
		}

		setManyCRUDButtonBehaviour(params);
	}

	var getTableColumns = function(fkName, data) {

		var tableColumns = [];
		var tmpSType = "";
		var tmpSClass = "";
		for ( var i in data.columnHeaders) {
			tmpSType = 'string';
			tmpSClass = "";
			var colType = data.columnHeaders[i].columnDisplayType;
			switch (colType) {
			case "STRING":
				break;
			case "INTEGER":
				tmpSType = 'title-numeric';
				tmpSClass = "rptAlignRight";
				break;
			case "DATE":
				tmpSType = 'title-string';
				break;
			case "DECIMAL":
				tmpSType = 'title-numeric';
				tmpSClass = "rptAlignRight";
				break;
			case "CODELOOKUP":
				break;
			case "CODEVALUE":
				break;
			case "TEXT":
				break;
			default:
				invalidColumnTypeMessage(data.columnHeaders[i].columnName,
						colType);
				return "";
			}
			tableColumns.push({
				"sTitle" : doI18N(data.columnHeaders[i].columnName),
				"sType" : tmpSType,
				"sClass" : tmpSClass,
				"dbColType" : colType
			});
		}
		return tableColumns;
	}

	var getTableData = function(fkName, data, tableColumns) {

		var convertCRtoBR = function(str) {
			return str.replace(/(\r\n|[\r\n])/g, "<br />");
		}

		var convNum = "";
		var tmpVal;
		var tableData = [];
		for ( var i in data.data) {
			var tmpArr = [];
			var displayColIndex = 0;
			for ( var j in data.data[i].row) {
				tmpVal = data.data[i].row[j];
				switch (tableColumns[j].sType) {
				case "title-string":
					if (tmpVal == null)
						tmpVal = '<span title=" "></span>' + "";
					else
						tmpVal = '<span title="' + tmpVal + '"></span>'
								+ globalDateAsISOString(tmpVal);
				case "string":
					if (tmpVal == null)
						tmpVal = ""
					else {
						if (tableColumns[j].dbColType == "CODELOOKUP")
							tmpVal = getDropdownValue(tmpVal,
									data.columnHeaders[j].columnValues)
						tmpVal = convertCRtoBR(tmpVal);
					}
					break;
				case "title-numeric":
					if (tmpVal == null)
						tmpVal = '<span title="' + sdt.nullTitleValue
								+ '"></span>' + "";
					else {
						if (tableColumns[j].dbColType == "INTEGER")
							convNum = globalNumber(parseInt(tmpVal));
						else
							convNum = globalDecimal(parseFloat(tmpVal),
									sdt.defaultDecimalPlaces);
						tmpVal = '<span title="' + tmpVal + '"></span>'
								+ convNum;
					}
					break;
				default:
					alert("System Error - Type not Found: "
							+ tableColumns[j].sType);
				}
				tmpArr.push(tmpVal);
			}
			tableData.push(tmpArr);
		}
		return tableData;
	}

	var refreshOneToOneDataTable = function(currentTableDataInfo) {

		var isNew = true;
		if (currentTableDataInfo.data.data.length > 0)
			isNew = false;

		var tableHtml = getCRUDButtonsHtml(currentTableDataInfo.datatableName,
				isNew);

		if (currentTableDataInfo.type == "TEMPLATE") {
			var crudObject = new Object();
			crudObject.displayMode = "view";
			crudObject.data = currentTableDataInfo.data;
			tableHtml += $("#" + currentTableDataInfo.templateName).render(
					crudObject);
		} else
			tableHtml += getDefaultTemplateHtml(currentTableDataInfo.data,
					currentTableDataInfo.fkName, "view");

		$("#" + currentTableDataInfo.itemDiv).html(tableHtml);

		var params = {
			datatableName : currentTableDataInfo.datatableName,
			datatableUrl : currentTableDataInfo.url,
			templateName : currentTableDataInfo.templateName,
			saveSuccessFunction : currentTableDataInfo.saveSuccessFunction,
			columnHeaders : currentTableDataInfo.data.columnHeaders,
			fkName : currentTableDataInfo.fkName
		}
		setCRUDButtonBehaviour(params);
	};

	var editPopupDialog = function(getUrl, postUrl, submitType, titleCode,
			templateName, saveSuccessFunction, fkName) {

		var successFunction = function(data, textStatus, jqXHR) {
			fillPopupDialogData(data, postUrl, submitType, titleCode,
					templateName, saveSuccessFunction, fkName);
		};

		executeAjaxRequest(getUrl, "GET", "", successFunction,
				formErrorFunction);
	}

	var fillPopupDialogData = function(data, postUrl, submitType, titleCode,
			templateName, saveSuccessFunction, fkName) {

		var getFormHtml = function(html) {
			var formHtml = '<form id="entityform"><div id="formerrors"></div>';
			formHtml += '<input type="hidden" id="dateFormat" name="dateFormat" value="'
					+ currentDateFormat() + '" />';
			formHtml += '<input type="hidden" id="locale" name="locale" value="'
					+ currentLocale() + '" />';
			formHtml += html;
			formHtml += "</form>";
			return formHtml;
		}

		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;

		var saveButton = doI18N(sdt.saveLabel);
		var cancelButton = doI18N(sdt.cancelLabel);
		var buttonsOpts = {};
		buttonsOpts[saveButton] = function() {
			var serializedArray = {};
			serializedArray = $('#entityform').serializeObject(
					serializationOptions);
			var newFormData = JSON.stringify(serializedArray);
			executeAjaxRequest(postUrl, submitType, newFormData,
					saveSuccessFunction, formErrorFunction);
		};

		buttonsOpts[cancelButton] = function() {
			$(this).dialog("close");
		};

		var dialogDiv = $("<div id='dialog-form'></div>");
		dialogDiv.dialog({
			title : doI18N(titleCode),
			width : $(window).width() - 20,
			height : $(window).height() - 20,
			modal : true,
			buttons : buttonsOpts,
			close : function() {
				$(this).remove();
			},
			open : function(event, ui) {

				var html;
				if (templateName) {
					var crudObject = new Object();
					crudObject.displayMode = "update";
					crudObject.data = data;
					html = $("#" + templateName).render(crudObject);
				} else
					html = getDefaultTemplateHtml(data, fkName, "update");

				formHtml = getFormHtml(html);

				$("#dialog-form").html(formHtml);
				$('.datepickerfield').datepicker({
					constrainInput : true,
					changeMonth : true,
					changeYear : true,
					dateFormat : custom.datePickerDateFormat
				});
			}
		}).dialog('open');
	}

	var deletePopupDialog = function(deleteUrl, successFunction) {

		var dialogDiv = $("<div id='dialog-form'><div id='formerrors'></div>"
				+ doI18N('text.confirmation.required') + "</div>");

		var confirmButton = doI18N(sdt.confirmLabel);
		var cancelButton = doI18N(sdt.cancelLabel);

		var buttonsOpts = {};
		buttonsOpts[confirmButton] = function() {
			var deleteSuccessFunction;
			if (successFunction)
				deleteSuccessFunction = successFunction
				/*
				 * else { deleteSuccessFunction = function(data, textStatus,
				 * jqXHR) { dialogDiv.dialog("close");
				 * showDataTable(currentTableDataInfo.itemDiv,
				 * currentTableDataInfo.datatableName, currentTableDataInfo.id,
				 * currentTableDataInfo.fkName); } }
				 */

			executeAjaxRequest(deleteUrl, 'DELETE', "", deleteSuccessFunction,
					popupErrorFunction);
		};

		buttonsOpts[cancelButton] = function() {
			$(this).dialog("close");
		};

		dialogDiv.dialog({
			title : doI18N('dialog.title.delete.confirmation.required'),
			width : 300,
			height : 150,
			modal : true,
			buttons : buttonsOpts,
			close : function() {
				$(this).remove();
			},
			open : function(event, ui) {
			}
		}).dialog('open');
	}
	// end popup code

	var getDataTableFieldEntry = function(data, columnName, displayMode) {

		try {
			var html = '<td valign="top" width="40%">'

			if (!(displayMode.toUpperCase() == "VIEW")) {
				var columnNameIndex = getColumnNameIndex(data.columnHeaders,
						columnName);
				if (columnNameIndex >= 0) {
					if (data.columnHeaders[columnNameIndex].isColumnNullable == false)
						html += sdt.indicateMandatory;
				} else
					return "Column Name Not Found: " + columnName;
			}

			html += '<b>' + doI18N(columnName) + ':</b></td>';
			html += '<td valign="top" width="60%">'
					+ getDataTableFieldValueEntry(data, columnName, displayMode)
					+ '</td>';
			return html;
		} catch (e) {
			var errorMsg = "System Error: stretchydatatables/getDataTableFieldEntry - columnName: "
					+ columnName;
			if (displayMode)
				errorMsg += "  displayMode: " + displayMode;
			errorMsg += " - Error description: " + e.message;
			return errorMsg;
		}
	}

	var getDataTableFieldValueEntry = function(data, columnName, displayMode) {

		try {
			if (displayMode.toUpperCase() == "VIEW") {
				if (data.data.length == 0)
					return "";
			}

			var columnNameIndex = getColumnNameIndex(data.columnHeaders,
					columnName);
			if (columnNameIndex >= 0) {
				var colVal = "";
				if (data.data.length > 0)
					colVal = data.data[0].row[columnNameIndex];

				var displayVal = getColumnDisplayValue(
						data.columnHeaders[columnNameIndex], colVal,
						displayMode);
				return displayVal;
			} else
				return "Column Name Not Found: " + columnName;

		} catch (e) {
			var errorMsg = "System Error: stretchydatatables/getDataTableFieldValueEntry - columnName: "
					+ columnName;
			if (displayMode)
				errorMsg += "  displayMode: " + displayMode;
			errorMsg += " - Error description: " + e.message;
			return errorMsg;
		}
	}

	// functions that generate the html to display or edit column values
	var getColumnDisplayValue = function(columnHeader, colVal, displayMode) {

		if (displayMode.toUpperCase() == "VIEW") {
			if (colVal == null)
				return "";
			if (colVal == "")
				return "";

			switch (columnHeader.columnDisplayType) {
			case "STRING":
				return colVal;
			case "CODEVALUE":
				return colVal;
			case "INTEGER":
				return globalNumber(parseInt(colVal));
			case "DATE":
				return globalDateAsISOString(colVal);
			case "DECIMAL":
				return globalDecimal(parseFloat(colVal),
						sdt.defaultDecimalPlaces);
			case "CODELOOKUP":
				return getDropdownValue(colVal, columnHeader.columnValues);
			case "TEXT":
				return '<textarea rows="3" cols="40" readonly="readonly">'
						+ colVal + '</textarea>';
			default:
				invalidColumnTypeMessage(columnHeader.columnName,
						columnHeader.columnDisplayType);
				return "";
			}
		} else {// updatable field
			var colNameUnderscore = spaceToUnderscore(columnHeader.columnName);

			var displayVal = "";
			if (colVal != null)
				displayVal = colVal;

			var defaultStringLength = 40;
			var colLength = columnHeader.columnLength;
			if (colLength > defaultStringLength)
				colLength = defaultStringLength;

			switch (columnHeader.columnDisplayType) {
			case "STRING":
				return getTextHTML(colNameUnderscore, displayVal, colLength);
			case "INTEGER":
				if (displayVal > "")
					displayVal = globalNumber(parseInt(displayVal));
				return getTextHTML(colNameUnderscore, displayVal, 20);
			case "DATE":
				if (displayVal > "")
					displayVal = globalDateAsISOString(displayVal);
				return getDateHTML(colNameUnderscore, displayVal, 20);
			case "DECIMAL":
				if (displayVal > "")
					displayVal = globalDecimal(parseFloat(displayVal),
							sdt.defaultDecimalPlaces);
				return getTextHTML(colNameUnderscore, displayVal, 20);
			case "CODELOOKUP":
				return getSelectHTML(colNameUnderscore,
						columnHeader.columnValues, colVal);
			case "CODEVALUE":
				return getSelectHTMLValue(colNameUnderscore,
						columnHeader.columnValues, colVal);
			case "TEXT":
				return '<textarea id="' + colNameUnderscore + '" name="'
						+ colNameUnderscore + '" rows="4" cols="40">'
						+ displayVal + '</textarea>';
			default:
				invalidColumnTypeMessage(columnHeader.columnName,
						columnHeader.columnDisplayType);
				return "";
			}
		}
	}

	var getColumnNameIndex = function(columnHeaders, columnName) {
		for ( var ci in columnHeaders) {
			if (columnHeaders[ci].columnName == columnName)
				return ci;
		}
		return -1;
	}

	var spaceToUnderscore = function(str) {
		return str.replace(/ /g, "_")
	}

	var getDropdownValue = function(inColVal, columnValues) {

		for ( var i in columnValues) {
			if (inColVal == columnValues[i].id)
				return doI18N(columnValues[i].value);
		}
		return "Err";
	}

	var getSelectHTML = function(colName, columnValues, colVal) {

		var selectedVal = "";
		var selectHtml = '<select id="' + colName + '" name="' + colName + '">';

		if ((colVal == null) || (colVal == ""))
			selectedVal = ' selected="selected" '
		else
			selectedVal = "";
		selectHtml += '<option value=""' + selectedVal + '></option>';

		for ( var i in columnValues) {
			if (colVal == columnValues[i].id)
				selectedVal = ' selected="selected" '
			else
				selectedVal = "";
			selectHtml += '<option value="' + columnValues[i].id + '"'
					+ selectedVal + '>' + doI18N(columnValues[i].value)
					+ '</option>';
		}

		selectHtml += '</select>';
		// alert(selectHtml);
		return selectHtml;
	}

	var getSelectHTMLValue = function(colName, columnValues, colVal) {

		var selectedVal = "";
		var selectHtml = '<select id="' + colName + '" name="' + colName + '">';

		if ((colVal == null) || (colVal == ""))
			selectedVal = ' selected="selected" '
		else
			selectedVal = "";
		selectHtml += '<option value=""' + selectedVal + '></option>';

		for ( var i in columnValues) {
			if (colVal == columnValues[i].value)
				selectedVal = ' selected="selected" '
			else
				selectedVal = "";
			selectHtml += '<option value="' + columnValues[i].value + '"'
					+ selectedVal + '>' + doI18N(columnValues[i].value)
					+ '</option>';
		}

		selectHtml += '</select>';
		// alert(selectHtml);
		return selectHtml;
	}

	var getDateHTML = function(colName, colVal, textSize) {
		return '<input id="' + colName + '" name="' + colName + '" size="'
				+ textSize + '" class="datepickerfield" '
				+ setValueAttr(colVal) + ' type="text"/>';
	}

	var getTextHTML = function(colName, colVal, textSize) {
		return '<input id="' + colName + '" name="' + colName + '" size="'
				+ textSize + '" ' + setValueAttr(colVal) + ' type="text"/>';
	}

	var setValueAttr = function(str) {
		if (str > "")
			return 'value="' + str.replace(/"/g, "&quot;") + '"';
		return "";
	}

	var getCRUDButtonsHtml = function(datatableName, isAdd) {

		var html = '<table width="100%">';
		html += '	<tr>';
		html += '		<td align="right" >';

		var datatableNameUnderscore = spaceToUnderscore(datatableName);

		if (isAdd == false) {

			html += '<span id="modifycellToolbar" class="ui-widget-header ui-corner-all">'

			if (jQuery.MifosXUI.hasDataTablePermission("UPDATE_"
					+ datatableName) == true)
				html += '<button id="edit' + datatableNameUnderscore + '">'
						+ doI18N("Datatables.Edit") + '</button>';

			if (jQuery.MifosXUI.hasDataTablePermission("DELETE_"
					+ datatableName) == true)
				html += '<button id="delete' + datatableNameUnderscore + '">'
						+ doI18N("Datatables.Delete") + '</button>';

			html += '</span>';
		} else {
			html += '<span id="toolbar" class="ui-widget-header ui-corner-all">';

			if (jQuery.MifosXUI.hasDataTablePermission("CREATE_"
					+ datatableName) == true)
				html += '<button id="add' + datatableNameUnderscore + '">'
						+ doI18N("Datatables.Add") + '</button>';

			html += '</span>';
		}

		html += '		</td>';
		html += '	</tr>';
		html += '</table>';
		return html;
	}

	var getDefaultTemplateHtml = function(data, fkName, displayMode) {

		var htmlVar = '<table width="100%"><tr>';
		var colsPerRow = 2;
		var colsPerRowCount = 0;
		var labelClassStr = "";
		var valueClassStr = "";
		if (sdt.tabledataParams.labelClass > "")
			labelClassStr = ' class="' + sdt.tabledataParams.labelClass + '" ';
		if (sdt.tabledataParams.valueClass > "")
			valueClassStr = ' class="' + sdt.tabledataParams.valueClass + '" ';

		for ( var i in data.columnHeaders) {
			if (!((data.columnHeaders[i].columnName == fkName) || (data.columnHeaders[i].isColumnPrimaryKey == true))) {
				colsPerRowCount += 1;
				if (colsPerRowCount > colsPerRow) {
					htmlVar += '</tr><tr>';
					colsPerRowCount = 1;
				}

				var colVal = "";
				if (data.data.length > 0)
					colVal = data.data[0].row[i];

				colVal = getColumnDisplayValue(data.columnHeaders[i], colVal,
						displayMode);

				htmlVar += '<td valign="top"><span ' + labelClassStr + '>'

				if (!(displayMode.toUpperCase() == "VIEW")) {
					if (data.columnHeaders[i].isColumnNullable == false)
						htmlVar += sdt.indicateMandatory;
				}

				htmlVar += "<b>" + doI18N(data.columnHeaders[i].columnName)
						+ ':</b></span></td><td valign="top"><span '
						+ valueClassStr + '>' + colVal + '</span></td>';
			}
		}
		htmlVar += '</tr></table>';

		return htmlVar;

	}

	var getFKName = function(appTableName) {
		return appTableName.substring(2) + "_id";
	}

	var getTableCardinality = function(columnHeaders, fkName) {

		for ( var i in columnHeaders) {
			if (columnHeaders[i].columnName == fkName) {
				if (columnHeaders[i].isColumnPrimaryKey == true)
					return "PRIMARY"
				else
					return "FOREIGN";
			}
		}
		return "Column: " + fkName + " - NOT FOUND";
	}

	var getAddAndFullDeleteButtonsHtml = function(datatableName, isNew) {

		var datatableNameUnderscore = spaceToUnderscore(datatableName);

		var html = '<table width="100%">';
		html += '	<tr>';
		html += '		<td align="right" >';
		html += '<span id="toolbar" class="ui-widget-header ui-corner-all">';

		if (jQuery.MifosXUI.hasDataTablePermission("CREATE_" + datatableName) == true)
			html += '<button id="add' + datatableNameUnderscore + '">'
					+ doI18N("Datatables.Add") + '</button>';

		if (isNew == false) {
			if (jQuery.MifosXUI.hasDataTablePermission("DELETE_"
					+ datatableName) == true)
				html += '<button id="delete' + datatableNameUnderscore + '">'
						+ doI18N("Datatables.DeleteAll") + '</button>';
		}

		html += '</span>';
		html += '		</td>';
		html += '	</tr>';
		html += '</table>';
		return html;
	}

	//
	var setCRUDButtonBehaviour = function(params) {
		var datatableNameUnderscore = spaceToUnderscore(params.datatableName);

		$("#edit" + datatableNameUnderscore).button({
			icons : {
				primary : "ui-icon-pencil"
			}
		}).click(
				function(e) {
					editPopupDialog(params.datatableUrl, params.datatableUrl,
							'PUT', doI18N("Edit") + " "
									+ doI18N(params.datatableName),
							params.templateName, params.saveSuccessFunction,
							params.fkName);
					e.preventDefault();
				});
		$("#delete" + datatableNameUnderscore).button({
			icons : {
				primary : "ui-icon-trash"
			}
		}).click(function(e) {
			deletePopupDialog(params.datatableUrl, params.saveSuccessFunction);
			e.preventDefault();
		});

		$("#add" + datatableNameUnderscore).button({
			icons : {
				primary : "ui-icon-plusthick"
			}
		}).click(
				function(e) {
					var newData = new Object();
					newData.columnHeaders = params.columnHeaders;
					newData.data = [];
					fillPopupDialogData(newData, params.datatableUrl, 'POST',
							doI18N("Create") + " "
									+ doI18N(params.datatableName),
							params.templateName, params.saveSuccessFunction,
							params.fkName);
					e.preventDefault();
				});
	}

	var setManyCRUDButtonBehaviour = function(params) {

		var datatableNameUnderscore = spaceToUnderscore(params.datatableName);

		$("#delete" + datatableNameUnderscore).button({
			icons : {
				primary : "ui-icon-trash"
			}
		}).click(function(e) {
			deletePopupDialog(params.datatableUrl, params.saveSuccessFunction);
			e.preventDefault();
		});

		$("#add" + datatableNameUnderscore).button({
			icons : {
				primary : "ui-icon-plusthick"
			}
		}).click(
				function(e) {
					var newData = new Object();
					newData.columnHeaders = params.columnHeaders;
					newData.data = [];
					fillPopupDialogData(newData, params.datatableUrl, 'POST',
							doI18N("Create") + " "
									+ doI18N(params.datatableName),
							params.templateName, params.saveSuccessFunction,
							params.fkName);
					e.preventDefault();
				});

		for ( var i in params.manyButtons) {

			var fullDatatableNameUnderscore = datatableNameUnderscore + "_"
					+ params.manyButtons[i];
			var paramPos = params.datatableUrl
					.indexOf(sdt.genericResultSetParameter);
			var fullUrl = params.datatableUrl.substring(0, paramPos) + "/"
					+ params.manyButtons[i] + sdt.genericResultSetParameter;

			$("#delete" + fullDatatableNameUnderscore).button({
				icons : {
					primary : "ui-icon-trash"
				}
			}).click(function(e) {
				deletePopupDialog(fullUrl, params.saveSuccessFunction);
				e.preventDefault();
			});

			$("#edit" + fullDatatableNameUnderscore).button({
				icons : {
					primary : "ui-icon-pencil"
				}
			}).click(
					function(e) {
						editPopupDialog(fullUrl, fullUrl, 'PUT', doI18N("Edit")
								+ " " + doI18N(params.datatableName),
								params.templateName,
								params.saveSuccessFunction, params.fkName);
						e.preventDefault();
					});
		}

	}

	//
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

	//
	var initialiseDataTableDef = function() {
		sdt.dataTableDef = {
			// "sDom": 'lfTip<"top"<"clear">>rtlfTip<"bottom"<"clear">>',
			"sDom" : 'lfTip<"top"<"clear">>rt',
			"oTableTools" : {
				"aButtons" : [ {
					"sExtends" : "copy",
					"sButtonText" : doI18N("Copy to Clipboard")
				}, {
					"sExtends" : "xls",
					"sButtonText" : doI18N("Save to CSV")
				} ],
				"sSwfPath" : sdt.tabledataParams.resValue
						+ "DataTables-1.8.2/extras/TableTools/media/swf/copy_cvs_xls.swf"
			},

			"aaData" : [],
			"aoColumns" : [],
			"sPaginationType" : "full_numbers",
			"oLanguage" : {
				"sEmptyTable" : doI18N("rpt.no.entries"),
				"sZeroRecords" : doI18N("rpt.no.matching.entries"),
				"sInfo" : doI18N("rpt.showing") + " _START_ "
						+ doI18N("rpt.to") + " _END_ " + doI18N("rpt.of")
						+ " _TOTAL_ " + doI18N("rpt.records"),
				"SInfoFiltered" : "(" + doI18N("rpt.filtered.from") + " _max_ "
						+ doI18N("rpt.total.entries") + ")",
				"oPaginate" : {
					"sFirst" : doI18N("rpt.first"),
					"sLast" : doI18N("rpt.last"),
					"sNext" : doI18N("rpt.next"),
					"sPrevious" : doI18N("rpt.previous")
				},
				"sLengthMenu" : doI18N("rpt.show") + " _MENU_ "
						+ doI18N("rpt.entries"),
				"sSearch" : doI18N("rpt.search")
			},
			"bDeferRender" : true,
			"bProcessing" : true,
			"aLengthMenu" : [ [ 5, 10, 25, 50, 100, -1 ],
					[ 5, 10, 25, 50, 100, "All" ] ]
		}

	}

	// helper functions under here
	var globalDecimal = function(val, decs) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.decimal(val, decs);
		}
		return val;
	}

	var globalNumber = function(val) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.number(val);
		}
		return val;
	}

	var globalDateAsISOString = function(isoDate) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.globalDateAsISOString(isoDate);
		}
		return isoDate;
	}

	var currentLocale = function() {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.currentLocale();
		}
		return isoDate;
	}

	var currentDateFormat = function() {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.currentDateFormat();
		}
		return isoDate;
	}

	var doI18N = function(xlateStr, params) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.doI18N(xlateStr, params);
		}
		return xlateStr;
	}

	//
	var executeAjaxRequest = function(url, verbType, jsonData, successFunction,
			errorFunction) {

		var execUrl = sdt.tabledataParams.baseApiUrl + url;
		var jqxhr = $.ajax({
			url : execUrl,
			type : verbType, // POST, GET, PUT or DELETE
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			data : jsonData,
			cache : false,
			beforeSend : function(xhr) {
				if (sdt.tabledataParams.tenantIdentifier > "")
					xhr.setRequestHeader("X-Mifos-Platform-TenantId",
							sdt.tabledataParams.tenantIdentifier);
				if (sdt.tabledataParams.base64 > "")
					xhr.setRequestHeader("Authorization", "Basic "
							+ sdt.tabledataParams.base64);
			},
			success : successFunction,
			error : errorFunction
		});
	}

	// Error functions
	var invalidColumnTypeMessage = function(columnName, columnType) {
		alert("System Error - Column Type: " + columnType
				+ " - Not Catered For - Column Name: " + columnName);
	}

	var popupErrorFunction = function(jqXHR, textStatus, errorThrown) {
		handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate",
				"#formerrors");
	};

	var removeErrors = function(placeholderDiv) {
		// remove error class from all input fields
		var $inputs = $('#entityform :input');

		$inputs.each(function() {
			$(this).removeClass("ui-state-error");
		});

		$(placeholderDiv).html("");
	}

	var generalErrorFunction = function(jqXHR, textStatus, errorThrown) {
		// for when an error is got but not on a create/update form -
		alert("System Error - Data tables: " + jqXHR.responseText);
	};

	var handleXhrError = function(jqXHR, textStatus, errorThrown,
			templateSelector, placeholderDiv) {

		// alert("textStatus: " + textStatus + " errorThrown: " + errorThrown);

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
				errorObj.message = doI18N(this.userMessageGlobalisationCode,
						argArray[0], argArray[1], argArray[2], argArray[3],
						argArray[4], argArray[5]);
				errorObj.value = this.value;

				errorArray[arrayIndex] = errorObj;
				arrayIndex++
			});
			var templateArray = new Array();
			var templateErrorObj = new Object();
			templateErrorObj.title = doI18N('error.msg.header');
			templateErrorObj.errors = errorArray;

			templateArray[0] = templateErrorObj;

			var formErrorsHtml = $(templateSelector).render(templateArray);

			$(placeholderDiv).append(formErrorsHtml);
		}
	}

})(jQuery);
