(function($) {
/*
Generate permissions tabs via javascript because didn't know how to do it effectively in jsrender 

The UI needs to order the 'actions' (headers) and 'groupings' (tabs)
This could have been done by adding meta data to the back-end but decided to pay for it in the UI instead

This plug-in expects doI18N function to be available
*/
	var specialRolePermissionTab = 'special';
	var reportingRolePermissionTab = 'report';

	var permissionActionOrder = [];
	permissionActionOrder.push('CREATE');
	permissionActionOrder.push('READ');
	permissionActionOrder.push('UPDATE');
	permissionActionOrder.push('DELETE');
	permissionActionOrder.push('ACTIVATE');
	permissionActionOrder.push('CREATEHISTORIC');
	permissionActionOrder.push('UPDATEHISTORIC');
	permissionActionOrder.push('BULKREASSIGN');
	permissionActionOrder.push('APPROVE');
	permissionActionOrder.push('APPROVEINPAST');
	permissionActionOrder.push('APPROVALUNDO');
	permissionActionOrder.push('REJECT');
	permissionActionOrder.push('REJECTINPAST');
	permissionActionOrder.push('WITHDRAW');
	permissionActionOrder.push('WITHDRAWINPAST');
	permissionActionOrder.push('DISBURSE');
	permissionActionOrder.push('DISBURSEINPAST');
	permissionActionOrder.push('DISBURSALUNDO');
	permissionActionOrder.push('REPAYMENT');
	permissionActionOrder.push('REPAYMENTINPAST');
	permissionActionOrder.push('DEPOSIT');
	permissionActionOrder.push('WITHDRAWAL');
	permissionActionOrder.push('INTEREST');
	permissionActionOrder.push('ADJUST');
	permissionActionOrder.push('WAIVE');
	permissionActionOrder.push('WAIVEINTERESTPORTION');
	permissionActionOrder.push('CLOSE');
	permissionActionOrder.push('WRITEOFF');
	permissionActionOrder.push('CLOSEASRESCHEDULED');
	permissionActionOrder.push('RENEW');
	permissionActionOrder.push('PERMISSIONS');
	permissionActionOrder.push('REGISTER');
	permissionActionOrder.push('DEREGISTER');
	permissionActionOrder.push('ASSIGNROLE');
	permissionActionOrder.push('UNASSIGNROLE');
	permissionActionOrder.push('UPDATEROLE');
	permissionActionOrder.push('ASSOCIATECLIENTS');
	permissionActionOrder.push('DISASSOCIATECLIENTS');
	permissionActionOrder.push('ASSIGNSTAFF');
	permissionActionOrder.push('UNASSIGNSTAFF');
	permissionActionOrder.push('SAVECOLLECTIONSHEET');

	var permissionGrouping = [];
	permissionGrouping.push('special');
	permissionGrouping.push('portfolio');
	permissionGrouping.push('portfolio_group');
	permissionGrouping.push('portfolio_center');
	permissionGrouping.push('transaction_loan');
	permissionGrouping.push('transaction_savings');
	permissionGrouping.push('accounting');
	permissionGrouping.push('organisation');
	permissionGrouping.push('configuration');
	permissionGrouping.push('authorisation');
	permissionGrouping.push('report');
	permissionGrouping.push('datatable');
	
	$.MifosXPermissions = {};

	$.MifosXPermissions.addRolePermissionsTabs = function(data, outerDiv) {
		displayPermissionsTabs(data.permissionUsageData, outerDiv, false);
	};

	$.MifosXPermissions.addViewPermissionsTabs = function(data, outerDiv) {
		displayPermissionsTabs(data, outerDiv, true);
	};

	$.MifosXPermissions.maintainMakerCheckerTabs = function(data, outerDiv) {
		displayPermissionsTabs(data, outerDiv, false);
	};




var displayPermissionsTabs = function(permissionUsageData, outerDiv, isReadOnly) {

	var innerDiv = outerDiv.substring(1) + "InnerDiv";
	var currentGrouping = "";
	var currentIndex = 0;
	var tempPermissionUIData = [];
//convert from row input into a data structure that allows easier creation of the crosstab UI
	for (var i in permissionUsageData)
	{
		if (permissionUsageData[i].grouping != currentGrouping)
		{
			currentGrouping = permissionUsageData[i].grouping;
			var newEntry = {
						permissions: [],
						entityNames: [],
						actionNames: [],
						actionNamesOrdered: []
					};
			tempPermissionUIData[currentGrouping] = newEntry;
		}

		tempPermissionUIData[currentGrouping].permissions[permissionUsageData[i].code] = permissionUsageData[i].selected;
		if (currentGrouping == specialRolePermissionTab) 
		{
			tempPermissionUIData[currentGrouping].entityNames[permissionUsageData[i].code] = true;
		}
		else
		{
			tempPermissionUIData[currentGrouping].entityNames[permissionUsageData[i].entityName] = true;
			tempPermissionUIData[currentGrouping].actionNames[permissionUsageData[i].actionName] = true;
		}

	}
//sort by preferred grouping order

	var permissionUIData = [];

	for (var i in permissionGrouping)
	{
		currentGrouping = permissionGrouping[i];
		if (nameFoundInArray(currentGrouping, tempPermissionUIData))
		{
			permissionUIData[currentGrouping] = tempPermissionUIData[currentGrouping];
			tempPermissionUIData.splice(currentGrouping,1);
		}
	}
	for (var i in tempPermissionUIData) permissionUIData[i] = tempPermissionUIData[i];

//create tabbed UI from transformed permission data
	var tabsHtml = "";
	var tabsContentHtml = "";
	var currentActionOrder = "";
	for (var i in permissionUIData)
	{ 
		currentGrouping = i;
		for (var j in permissionActionOrder)
		{
			currentActionOrder = permissionActionOrder[j];
			if (nameFoundInArray(currentActionOrder, permissionUIData[i].actionNames))
			{
				permissionUIData[i].actionNamesOrdered[currentActionOrder] = true;
				permissionUIData[i].actionNames.splice(currentActionOrder,1);
			}
		}
		for (var j in permissionUIData[i].actionNames) permissionUIData[i].actionNamesOrdered[j] = true;

		tabsHtml += '<li><a href="#' + innerDiv + i + '"><span>' + doI18N(currentGrouping) + '</span></a></li>';
		tabsContentHtml += '<div id="' + innerDiv + i + '">' + makeRolePermissionsTabContent(currentGrouping, permissionUIData[currentGrouping], isReadOnly) + '</div>';
	}

	var html = '<div id="' + innerDiv + '"><ul>' + tabsHtml + '</ul>' + tabsContentHtml + '</div>';
	$(outerDiv).html(html);
    	$("#" + innerDiv).tabs();
}

var nameFoundInArray = function(compareName, compareArray) {

	for (var i in compareArray)
	{
		if (i == compareName) return true;
	}
	return false;
}

var makeRolePermissionsTabContent = function(currentGrouping, currentTabData, isReadOnly) {

	var permissionCode = "";
	var checkerPermissionCode = "";
	var contentHtml = "";

	if (currentGrouping == specialRolePermissionTab)
	{
//permissions names are in the entityNames array and no checker permissions

		contentHtml = '<table width="50%">';
		for (var i in currentTabData.entityNames)
		{
			contentHtml += '<tr><td valign="top"><b>' + doI18N(i) + '</b></td>'
			permissionCode = i;
			contentHtml += '<td>';
			contentHtml += fillTaskCell(permissionCode, currentTabData.permissions, isReadOnly);
			contentHtml += '</td>';
		}
		contentHtml += '</table>';
		return contentHtml;
	}
	

	if (currentGrouping.indexOf("transaction_") == 0) //starts with transaction_
	{
//All action names will be for one entity name
		var singleEntityName = "";
		for (var i in currentTabData.entityNames) singleEntityName = i;

		var colsPerRow = 6;

		var displayActionLines = [];
		var displayCheckboxLines = [];
		var tempLine = '';

//loop first for action name headers, second for checkbox value
		for (var lineType = 0; lineType < 2; lineType++)
		{
			var colsPerRowCount = 0;
			tempLine = '<tr>';
			for (var i in currentTabData.actionNamesOrdered)
			{
					colsPerRowCount += 1;
					if (colsPerRowCount > colsPerRow) {
						tempLine += '</tr>';
						if (lineType == 0) displayActionLines.push(tempLine)
						else displayCheckboxLines.push(tempLine);

						tempLine = '<tr>';
						colsPerRowCount = 1;
					}
				if (lineType == 0) tempLine += '<td valign="top"><b>' + doI18N(i) + '</b></td>'
				else
				{
					permissionCode = i + "_" + singleEntityName;
					/* transaction_savings have two entity types ACCOUNTTRANSFER & SAVINGSACCOUNT*/
					if (currentGrouping == "transaction_savings") {
						for (var x in currentTabData.entityNames) {
							tempEntityName = x;
							if (tempEntityName != singleEntityName) {
								var tempPermissionCode = i + "_" + tempEntityName;
								if (currentTabData.permissions.hasOwnProperty(tempPermissionCode)) {
									permissionCode=tempPermissionCode;
								}
							}
						}
					}
					tempLine += '<td valign="top" style="height:60px;">';
					tempLine += fillTaskCell(permissionCode, currentTabData.permissions, isReadOnly);
					tempLine += '</td>';
				}
			}
			tempLine += '</tr>';
			if (lineType == 0) displayActionLines.push(tempLine)
			else displayCheckboxLines.push(tempLine);			
		}

		contentHtml = '<table width="100%">';
		for (var i in displayActionLines)
		{
			contentHtml += displayActionLines[i];
			contentHtml += displayCheckboxLines[i];
		}
		contentHtml += '</table>';
		return contentHtml;
	}

//for all other cases	
	var tableWidth = '100%';
	if (currentGrouping == reportingRolePermissionTab) tableWidth = '50%';
	contentHtml = '<table class=permissionsList width="' + tableWidth + '"><tr><td></td>';
	for (var i in currentTabData.actionNamesOrdered)
	{
		contentHtml += '<td valign="top"><b>' + doI18N(i) + '</b></td>';
	}
	contentHtml += '</tr>';

	for (var i in currentTabData.entityNames)
	{
		contentHtml += '<tr><td><b>' + doI18N(i) + '</b></td>';
		for (var j in currentTabData.actionNamesOrdered)
		{
			permissionCode = j + "_" + i;
			if (currentTabData.permissions.hasOwnProperty(permissionCode))
			{
				contentHtml += '<td>';
				contentHtml += fillTaskCell(permissionCode, currentTabData.permissions, isReadOnly);
				contentHtml += '</td>';
			}
			else contentHtml += '<td></td>';
		}
	}

	contentHtml += '</table>';
	return contentHtml;
	
}

var fillTaskCell = function(permissionCode, permissionCodeArray, isReadOnly) {
	
	var taskCellHtml = "";
	
	var checkerPermissionCode = permissionCode + '_CHECKER';
	if (permissionCodeArray.hasOwnProperty(checkerPermissionCode)) 
	{
		taskCellHtml += '<table class=permissionsListInner><tr><td>' 
			+ htmlCheckBox(permissionCode, permissionCodeArray[permissionCode], isReadOnly)
			+ '</td><td>&nbsp;</td><td>&nbsp;</td><td><table class=permissionsListInner><tr><td><img border="0" src="resources/img/RubberStamp16_iconki.com.png" alt="' 
			+ doI18N("Checker Permission") + '" ></td><td>' 
			+ htmlCheckBox(checkerPermissionCode, permissionCodeArray[checkerPermissionCode], isReadOnly) 
			+ "</td></tr></table></td></tr></table>";
	}
	else taskCellHtml = htmlCheckBox(permissionCode, permissionCodeArray[permissionCode], isReadOnly);


	return taskCellHtml;
}

var htmlCheckBox = function(code, val, isReadOnly) {
	var html = '<input id="' + code + '" name="' + code + '" type="checkbox" value="';
	if (val == true) html += 'true" checked="true"'
	else html += 'false"';
	if (isReadOnly == true) html += ' disabled="disabled" ';
	html += '/>';
	return html;
}

})(jQuery);
