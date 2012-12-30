(function($) {

	$.stretchyDataTables = {};

	$.stretchyDataTables.displayAdditionalInfo = function(params) {

		sdt = {
			globaliseFunctions : "",
			indicateMandatory : "* "
		}

		if (params.globaliseFunctions)
			sdt.globaliseFunctions = params.globaliseFunctions;

		if (params.indicateMandatory)
			sdt.indicateMandatory = params.indicateMandatory;

		tabledataParams = params;
		defaultDecimalPlaces = 4;
		nullTitleValue = "-99999999";

		saveLabel = "Save";
		if (params.saveLabel)
			saveLabel = params.saveLabel;

		cancelLabel = "Cancel";
		if (params.cancelLabel)
			cancelLabel = params.cancelLabel;

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
		if (!(params.datatablesDiv)) {
			alert(doI18N("Table Data Initialisation Error - datatablesDiv parameter"));
			return;
		}

		initialiseDataTableDef();

		displayAdditionalInfo(params);
	};

	$.stretchyDataTables.showDataTable = function(tabName, datatableName, id,
			fkName) {
		showDataTable(tabName, datatableName, id, fkName);
	};

	$.stretchyDataTables.popupAddUpdateDialog = function(requestType,
			postOrPutUrl, updateRowIndex) {
		popupAddUpdateDialog(requestType, postOrPutUrl, updateRowIndex);
	};

	$.stretchyDataTables.popupDeleteDialog = function(deleteUrl) {
		popupDeleteDialog(deleteUrl);
	};

	$.stretchyDataTables.getDataTableFieldEntry = function(data, rowNum,
			columnName, displayMode) {
		return getDataTableFieldEntry(data, rowNum, columnName, displayMode);
	}

	$.stretchyDataTables.getDataTableFieldValueEntry = function(data, rowNum,
			columnName, displayMode) {
		return getDataTableFieldValueEntry(data, rowNum, columnName,
				displayMode);
	}

	function displayAdditionalInfo(params) {

		if (params.datatableArray.length > 0) {
			for ( var i in params.datatableArray) {
				if (params.datatableArray[i].itemDiv !== undefined) {// data
					// table
					// is a
					// customisation
					if (params.datatableArray[i].itemFunction !== undefined) {
						// data table is not a jsrender customisation so just
						// execute user-defined function
						// expects 2 params
						var PKValue = params.appTablePKValue;
						var itemDiv = params.datatableArray[i].itemDiv;
						eval(params.datatableArray[i].itemFunction);
					} else {
						refreshOneToOneDataTable(
								params.datatableArray[i].itemDiv,
								params.datatableArray[i].templateName,
								params.datatableArray[i].registeredTableName,
								params.appTablePKValue);
					}
				}
			}

			var defaultAddHtml = "";
			var additionalDataInnerDiv = params.datatablesDiv + "_x";
			for ( var i in params.datatableArray) {
				if (params.datatableArray[i].itemDiv == undefined) {
					defaultAddHtml += '<li><a href="unknown.html" onclick="jQuery.stretchyDataTables.showDataTable('
							+ "'";
					defaultAddHtml += additionalDataInnerDiv + "', '"
							+ params.datatableArray[i].registeredTableName
							+ "', ";
					defaultAddHtml += params.appTablePKValue + ", '"
							+ getFKName(params.appTableName) + "'"
							+ ');return false;"><span>';
					defaultAddHtml += doI18N(params.datatableArray[i].registeredTableName)
							+ '</span></a></li>';
				}
			}

			if (defaultAddHtml > "") {
				var htmlVar = '<div id="' + additionalDataInnerDiv + '"><ul>';
				htmlVar += '<li><a href="unknown.html" onclick="return false;"><span>.</span></a></li>';
				htmlVar += defaultAddHtml + '</ul></div>';
				$("#" + params.datatablesDiv).html(htmlVar);
				$("#" + additionalDataInnerDiv).tabs();
			}
		}
	}

	generalErrorFunction = function(jqXHR, textStatus, errorThrown) {
		// for when an error is got but not on a create/update form -
		alert(jqXHR.responseText);
	};

	function showDataTable(tabName, datatableName, id, fkName) {

		var url = 'datatables/' + datatableName + "/" + id;

		var successFunction = function(data, status, xhr) {
			currentTableDataInfo = {
				data : data,
				currentTab : $("#" + tabName).children(".ui-tabs-panel").not(
						".ui-tabs-hide"),
				url : url,
				tabName : tabName,
				datatableName : datatableName,
				id : id,
				fkName : fkName
			};
			showDataTableDisplay();
		};

		executeAjaxRequest(url, 'GET', "", successFunction,
				generalErrorFunction, "?genericResultSet=true");

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
			currentTableDataInfo.currentTab.html(cardinalityVar);
		}
	}

	function showDataTableOneToOne() {

		var dataLength = currentTableDataInfo.data.data.length;

		if (dataLength == 0) {
			var noDataHtml = doI18N("No.Data.Found") + '<br>';

			if (jQuery.MifosXUI.hasDataTablePermission("CREATE_"
					+ currentTableDataInfo.datatableName) == true)
				noDataHtml += '<button onclick="'
						+ genAddEditPopupClick("POST", currentTableDataInfo.url)
						+ '">' + doI18N("Datatables.Add") + '</button>';

			return noDataHtml;
		}

		var htmlVar = '<table width="100%"><tr>';
		var colsPerRow = 2;
		var colsPerRowCount = 0;
		var labelClassStr = "";
		var valueClassStr = "";
		if (tabledataParams.labelClass > "")
			labelClassStr = ' class="' + tabledataParams.labelClass + '" ';
		if (tabledataParams.valueClass > "")
			valueClassStr = ' class="' + tabledataParams.valueClass + '" ';

		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if (!(currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName)) {
				colsPerRowCount += 1;
				if (colsPerRowCount > colsPerRow) {
					htmlVar += '</tr><tr>';
					colsPerRowCount = 1;
				}

				var colVal = getColumnDisplayValue(
						currentTableDataInfo.data.columnHeaders[i],
						currentTableDataInfo.data.data[0].row[i], "view");

				htmlVar += '<td valign="top"><span '
						+ labelClassStr
						+ '>'
						+ doI18N(currentTableDataInfo.data.columnHeaders[i].columnName)
						+ ':</span></td><td valign="top"><span '
						+ valueClassStr + '>' + colVal + '</span></td>';
			}
		}
		htmlVar += '</tr></table><br>';

		htmlVar += '<table><tr><td>'

		if (jQuery.MifosXUI.hasDataTablePermission("UPDATE_"
				+ currentTableDataInfo.datatableName) == true)
			htmlVar += '<button onclick="'
					+ genAddEditPopupClick("PUT", currentTableDataInfo.url, 0)
					+ '">' + doI18N("Datatables.Edit") + '</button>'

		htmlVar += '</td>';
		htmlVar += '<td>'

		if (jQuery.MifosXUI.hasDataTablePermission("DELETE_"
				+ currentTableDataInfo.datatableName) == true)
			htmlVar += '<button onclick="'
					+ genDeletePopupClick(currentTableDataInfo.url) + '">'
					+ doI18N("Datatables.Delete") + '</button>'

		htmlVar += '</td></tr></table>';

		return htmlVar;
	}

	function getDropdownValue(inColVal, columnValues) {

		for ( var i in columnValues) {
			if (inColVal == columnValues[i].id)
				return doI18N(columnValues[i].value);
		}
		return "Err";
	}

	function getFKName(appTableName) {
		return appTableName.substring(2) + "_id";
	}

	function getTableCardinality() {

		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName) {
				if (currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true)
					return "PRIMARY"
				else
					return "FOREIGN";
			}
		}
		return "Column: " + currentTableDataInfo.fkName + " - NOT FOUND";
	}

	function executeAjaxRequest(url, verbType, jsonData, successFunction,
			errorFunction, queryParams) {

		var execUrl = tabledataParams.baseApiUrl + url;
		if (queryParams)
			execUrl += queryParams;
		// alert(execUrl )
		var jqxhr = $.ajax({
			url : execUrl,
			type : verbType, // POST, GET, PUT or DELETE
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			data : jsonData,
			cache : false,
			beforeSend : function(xhr) {
				if (tabledataParams.tenantIdentifier > "")
					xhr.setRequestHeader("X-Mifos-Platform-TenantId",
							tabledataParams.tenantIdentifier);
				if (tabledataParams.base64 > "")
					xhr.setRequestHeader("Authorization", "Basic "
							+ tabledataParams.base64);
			},
			success : successFunction,
			error : errorFunction
		});
	}

	function initialiseDataTableDef() {
		dataTableDef = {
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
				"sSwfPath" : tabledataParams.resValue
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

	function showDataTableOneToMany() {

		var tableColumns = getTableColumns(currentTableDataInfo.fkName,
				currentTableDataInfo.data);
		var tableData = getTableData(currentTableDataInfo.fkName,
				currentTableDataInfo.data, tableColumns);

		var editDeleteButtons = true;
		var idColIndex = -1
		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if (currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true)
				idColIndex = i;
		}

		tableColumns.unshift({
			"sTitle" : "",
			"sType" : "",
			"sClass" : "",
			"dbColType" : ""
		});
		for ( var i in currentTableDataInfo.data.data) {
			var putUrl = currentTableDataInfo.url + "/"
					+ currentTableDataInfo.data.data[i].row[idColIndex];
			var buttonFunctions = '<table><tr><td style="padding: 0px;">'
			if (jQuery.MifosXUI.hasDataTablePermission("UPDATE_"
					+ currentTableDataInfo.datatableName) == true)
				buttonFunctions += '<button onclick="'
						+ genAddEditPopupClick("PUT", putUrl, i) + '">'
						+ doI18N("Datatables.Edit") + '</button></td>';

			buttonFunctions += '<td style="padding: 0px;">';

			if (jQuery.MifosXUI.hasDataTablePermission("DELETE_"
					+ currentTableDataInfo.datatableName) == true)
				buttonFunctions += '<button onclick="'
						+ genDeletePopupClick(putUrl) + '">'
						+ doI18N("Datatables.Delete") + '</button>';

			buttonFunctions += '</td></tr></table>';
			tableData[i].unshift(buttonFunctions);
		}
		dataTableDef.aaData = tableData;
		dataTableDef.aoColumns = tableColumns;
		dataTableDef.aaSorting = [];

		showTableReport(editDeleteButtons);
	}

	function getTableColumns(fkName, data) {

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

	function getTableData(fkName, data, tableColumns) {

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
						tmpVal = '<span title="' + nullTitleValue + '"></span>'
								+ "";
					else {
						if (tableColumns[j].dbColType == "INTEGER")
							convNum = globalNumber(parseInt(tmpVal));
						else
							convNum = globalDecimal(parseFloat(tmpVal),
									defaultDecimalPlaces);
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

	function showTableReport(editDeleteButtons) {

		var adjustTableColumnIndex = 0;
		// if edit/delete functionality added in column 1
		if (editDeleteButtons == true)
			adjustTableColumnIndex = 1;

		var htmlVar = "";
		if (jQuery.MifosXUI.hasDataTablePermission("CREATE_"
				+ currentTableDataInfo.datatableName) == true)
			htmlVar += '<button onclick="'
					+ genAddEditPopupClick("POST", currentTableDataInfo.url)
					+ '">' + doI18N("Datatables.Add") + '</button>';

		if (jQuery.MifosXUI.hasDataTablePermission("DELETE_"
				+ currentTableDataInfo.datatableName) == true)
			htmlVar += '<button onclick="'
					+ genDeletePopupClick(currentTableDataInfo.url) + '">'
					+ doI18N("Datatables.DeleteAll") + '</button><br>';

		htmlVar += '<table cellpadding="0" cellspacing="1" border="0" class="display" id="RshowTable" width=100%></table>';

		$('#StretchyReportOutput').html(htmlVar);
		oTable = $('#RshowTable').dataTable(dataTableDef);
		oSettings = oTable.fnSettings();

		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if ((currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true)
					|| (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName)) {
				oTable.fnSetColumnVis((parseInt(i) + adjustTableColumnIndex),
						false);
			}
		}

	}

	function convertCRtoBR(str) {
		return str.replace(/(\r\n|[\r\n])/g, "<br />");
	}

	// Update Related Functions

	popupErrorFunction = function(jqXHR, textStatus, errorThrown) {
		handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate",
				"#formerrors");
	};

	function popupAddUpdateDialog(requestType, postOrPutUrl, updateRowIndex) {

		dialogDiv = $("<div id='dialog-form'></div>");
		dialogDiv.append(addUpdateBuildTemplate(requestType, updateRowIndex));
		addUpdateOpenDialog(requestType, postOrPutUrl, updateRowIndex);
		$('.datepickerfield').datepicker({
			constrainInput : true,
			changeMonth : true,
			changeYear : true,
			dateFormat : custom.datePickerDateFormat
		});

		// alert("requestType: " + requestType + " postOrPutUrl: " +
		// postOrPutUrl + " updateRowIndex: " + updateRowIndex);
	}

	function addUpdateBuildTemplate(requestType, updateRowIndex) {

		var htmlVar = '<form id="entityform">    <div id="formerrors"></div>';
		// hidden fields for validating date and number formats.
		htmlVar += '<input type="hidden" id="dateFormat" name="dateFormat" value="'
				+ custom.helperFunctions.currentDateFormat() + '" />';
		htmlVar += '<input type="hidden" id="locale" name="locale" value="'
				+ currentLocale() + '" />';

		htmlVar += '<table width="100%"><tr>';

		var colsPerRow = 2;
		var colsPerRowCount = 0;

		for ( var i in currentTableDataInfo.data.columnHeaders) {
			if (!((currentTableDataInfo.data.columnHeaders[i].isColumnPrimaryKey == true) || (currentTableDataInfo.data.columnHeaders[i].columnName == currentTableDataInfo.fkName))) {
				colsPerRowCount += 1;
				if (colsPerRowCount > colsPerRow) {
					htmlVar += '</tr><tr>';
					colsPerRowCount = 1;
				}
				var colVal = "";
				if (requestType == "PUT")
					colVal = currentTableDataInfo.data.data[updateRowIndex].row[i];
				htmlVar += addUpdateColDisplayHTML(
						currentTableDataInfo.data.columnHeaders[i], colVal);
			}
		}
		htmlVar += '</tr>';
		return htmlVar += '</table></form>';
	}

	function addUpdateColDisplayHTML(columnHeader, colVal) {

		var displayHTML = '<td valign="top"><label>';

		if (columnHeader.isColumnNullable == false)
			displayHTML += sdt.indicateMandatory;

		displayHTML += '<b>' + doI18N(columnHeader.columnName)
				+ ':</b></label></td><td valign="top">';

		displayHTML += getColumnDisplayValue(columnHeader, colVal, "update")

		displayHTML += '</td>';
		return displayHTML;
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
			 * could update with current data rather than refetching it. would
			 * be less multi-user but that might not matter. updatedData =
			 * $('#entityform').serializeObject(); var j; for (i in updatedData) {
			 * j = getColumnIndex(i);
			 * currentTableDataInfo.data.data[updateRowIndex].row[j] =
			 * updatedData[i]; } showDataTableDisplay();
			 */

			var successFunction = function(data, textStatus, jqXHR) {
				dialogDiv.dialog("close");
				showDataTable(currentTableDataInfo.tabName,
						currentTableDataInfo.datatableName,
						currentTableDataInfo.id, currentTableDataInfo.fkName);
			};

			executeAjaxRequest(saveUrl, requestType, form_data,
					successFunction, popupErrorFunction);
		};

		buttonsOpts[cancelButton] = function() {
			$(this).dialog("close");
		};

		var requestDisplay = "Datatables.Add";
		if (requestType == "PUT")
			requestDisplay = "Datatables.Edit";

		dialogDiv
				.dialog(
						{
							title : doI18N(requestDisplay)
									+ ": "
									+ doI18N(currentTableDataInfo.datatableName),
							width : 1000,
							height : 500,
							modal : true,
							buttons : buttonsOpts,
							close : function() {
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
			if (currentTableDataInfo.data.columnHeaders[ci].columnName == colName)
				return ci;

		alert("Column: " + colName + " Not Found");
		return -1;
	}

	function popupDeleteDialog(deleteUrl) {

		var dialogDiv = $("<div id='dialog-form'><div id='formerrors'></div>"
				+ doI18N('text.confirmation.required') + "</div>");

		var confirmButton = doI18N('dialog.button.confirm');
		var cancelButton = doI18N('dialog.button.cancel');

		var buttonsOpts = {};
		buttonsOpts[confirmButton] = function() {
			var successFunction = function(data, textStatus, jqXHR) {
				dialogDiv.dialog("close");
				showDataTable(currentTableDataInfo.tabName,
						currentTableDataInfo.datatableName,
						currentTableDataInfo.id, currentTableDataInfo.fkName);
			}

			executeAjaxRequest(deleteUrl, 'DELETE', "", successFunction,
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

	function genAddEditPopupClick(requestType, postOrPutUrl, updateRowIndex) {
		return "jQuery.stretchyDataTables.popupAddUpdateDialog('" + requestType
				+ "', '" + postOrPutUrl + "', " + updateRowIndex + ");";
	}

	function genDeletePopupClick(deleteUrl) {
		return "jQuery.stretchyDataTables.popupDeleteDialog('" + deleteUrl
				+ "');";
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

	// Error functions
	function removeErrors(placeholderDiv) {
		// remove error class from all input fields
		var $inputs = $('#entityform :input');

		$inputs.each(function() {
			$(this).removeClass("ui-state-error");
		});

		$(placeholderDiv).html("");
	}

	function handleXhrError(jqXHR, textStatus, errorThrown, templateSelector,
			placeholderDiv) {

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

	function invalidColumnTypeMessage(columnName, columnType) {
		alert("System Error - Column Type: " + columnType
				+ " - Not Catered For - Column Name: " + columnName);
	}

	// // helper functions under here

	function globalDecimal(val, decs) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.decimal(val, decs);
		}
		return val;
	}

	function globalNumber(val) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.number(val);
		}
		return val;
	}

	function globalDateAsISOString(isoDate) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.globalDateAsISOString(isoDate);
		}
		return isoDate;
	}

	function currentLocale() {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.currentLocale();
		}
		return isoDate;
	}

	function doI18N(xlateStr, params) {
		if (sdt.globaliseFunctions > "") {
			return sdt.globaliseFunctions.doI18N(xlateStr, params);
		}
		return xlateStr;
	}

	// helper functions where default UI not used
	var refreshOneToOneDataTable = function(itemDiv, templateName,
			datatableName, itemId) {

		var datatableUrl = 'datatables/' + datatableName + '/' + itemId
				+ "?genericResultSet=true";
		var width = 1100;
		var height = 600;

		var datatableNameUnderscore = spaceToUnderscore(datatableName);

		var saveSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			refreshOneToOneDataTable(itemDiv, templateName, datatableName,
					itemId);
		}

		var successFunction = function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.displayMode = "view";
			crudObject.data = data;

			if (data.data.length > 0)
				crudObject.displayButtons = "editDelete"
			else
				crudObject.displayButtons = "add";

			var tableHtml = $(templateName).render(crudObject);
			$("#" + itemDiv).html(tableHtml);

			// initialize all buttons change this after
			$("#edit" + datatableNameUnderscore).button({
				icons : {
					primary : "ui-icon-pencil"
				}
			}).click(
					function(e) {
						editPopupDialog(datatableUrl, datatableUrl, 'PUT',
								doI18N("Edit") + " " + doI18N(datatableName),
								templateName, width, height,
								saveSuccessFunction);
						e.preventDefault();
					});
			$("#delete" + datatableNameUnderscore).button({
				icons : {
					primary : "ui-icon-circle-close"
				}
			}).click(
					function(e) {
						popupConfirmationDialogAndPost(datatableUrl, 'DELETE',
								'dialog.title.confirmation.required', 400, 225,
								0, saveSuccessFunction);
						e.preventDefault();
					});

			$("#add" + datatableNameUnderscore).button({
				icons : {
					primary : "ui-icon-plusthick"
				}
			}).click(
					function(e) {
						var newData = new Object();
						newData.columnHeaders = crudObject.data.columnHeaders;
						newData.data = [];
						fillPopupDialogData(newData, datatableUrl, 'POST',
								doI18N("Create") + " " + doI18N(datatableName),
								templateName, width, height,
								saveSuccessFunction);
						e.preventDefault();
					});
		}

		executeAjaxRequest(datatableUrl, 'GET', "", successFunction,
				formErrorFunction);
	};

	var editPopupDialog = function(getUrl, postUrl, submitType, titleCode,
			templateName, width, height, saveSuccessFunction) {

		var successFunction = function(data, textStatus, jqXHR) {
			fillPopupDialogData(data, postUrl, submitType, titleCode,
					templateName, width, height, saveSuccessFunction);
		};

		executeAjaxRequest(getUrl, "GET", "", successFunction,
				formErrorFunction);
	}

	var fillPopupDialogData = function(data, postUrl, submitType, titleCode,
			templateName, width, height, saveSuccessFunction) {

		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;

		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
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
			width : width,
			height : height,
			modal : true,
			buttons : buttonsOpts,
			close : function() {
				$(this).remove();
			},
			open : function(event, ui) {
				var crudObject = new Object();
				crudObject.displayMode = "update";
				crudObject.data = data;

				var formHtml = $(templateName).render(crudObject);
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
	// end popup code

	var getDataTableFieldEntry = function(data, rowNum, columnName, displayMode) {

		try {
			var html = '<td valign="top" width="40%">'

			if (!(displayMode.toUpperCase() == "VIEW")){
				var columnNameIndex = getColumnNameIndex(data.columnHeaders, columnName);
				if (columnNameIndex >= 0)
				{
					if (data.columnHeaders[columnNameIndex].isColumnNullable == false)
						html += sdt.indicateMandatory;
				}
				else return "Column Name Not Found: " + columnName;
			}
			
			html += '<b>' + doI18N(columnName)	+ ':</b></td>';
			html += '<td valign="top" width="60%">'
					+ getDataTableFieldValueEntry(data, 0, columnName,
							displayMode) + '</td>';
			return html;
		} catch (e) {
			var errorMsg = "System Error: stretchydatatables/getDataTableFieldEntry - columnName: "
					+ columnName + "  rowNum: " + rowNum;
			if (displayMode)
				errorMsg += "  displayMode: " + displayMode;
			errorMsg += " - Error description: " + e.message;
			return errorMsg;
		}
	}

	var getDataTableFieldValueEntry = function(data, rowNum, columnName,
			displayMode) {

		try {
			if (displayMode.toUpperCase() == "VIEW") {
				if (data.data.length == 0)
					return "";
			}

			var columnNameIndex = getColumnNameIndex(data.columnHeaders, columnName);
			if (columnNameIndex >= 0)
			{
				var colVal = "";
				if (data.data.length > 0)
					colVal = data.data[rowNum].row[columnNameIndex];

				var displayVal = getColumnDisplayValue(
						data.columnHeaders[columnNameIndex], colVal, displayMode);
				return displayVal;
			}
			else return "Column Name Not Found: " + columnName;

		} catch (e) {
			var errorMsg = "System Error: stretchydatatables/getDataTableFieldValueEntry - columnName: "
					+ columnName + "  rowNum: " + rowNum;
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
				return globalDecimal(parseFloat(colVal), defaultDecimalPlaces);
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
							defaultDecimalPlaces);
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
			if (columnHeaders[ci].columnName == columnName) return ci;
		}
		return -1;
	}

	var spaceToUnderscore = function(str) {
		return str.replace(/ /g, "_")
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

	//

})(jQuery);
