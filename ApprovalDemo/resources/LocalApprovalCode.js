
decimalsNo = 4; 
separatorChar = ',';
dbDecimalChar = ".";
decimalChar = ".";
nullTitleValue = "-99999999.11";

function executeAjaxRequest(url, verbType, jsonData, successFunction, errorFunction) { 

	var jqxhr = $.ajax({ 
				url : baseApiUrl + url, 
				type : verbType, //POST, GET, PUT or DELETE 
				contentType : "application/json; charset=utf-8", 
				dataType : 'json', 
				data : jsonData, 
				cache : false, 
				beforeSend : function(xhr) { 
						if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
						if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
					}, 
				success : successFunction, 
				error : errorFunction 
			}); 
}

function initialiseAndShowLogon() {
	jQuery.support.cors = true;

    	Globalize.culture("en");
    	$.datepicker.setDefaults( $.datepicker.regional["en"]);
    	
    	jQuery.i18n.properties({
			name:'messages', 
			path: 'resources/global-translations/',
			mode:'map',
			cache: true,
			language: "en",
			callback: function() {
			}
		});

	//baseApiUrl = "https://localhost:8443/mifosng-provider/api/v1/";
	baseApiUrl = "https://ec2-46-137-62-163.eu-west-1.compute.amazonaws.com:8443/mifosng-provider/api/v1/";

	tenantIdentifier = "default";
	
	showLogon("container");
}


function showLogon(logonDivName) {
	var htmlVar = '<div id=theLogonForm><img style="float:left; border: 0;" alt="" src="resources/mifos.jpg"/><div id=appTitle>' + doI18N("app.name") + ' - ' + doI18N("label.tenant.name") + ': ' + tenantIdentifier + '</div>';
	htmlVar += '<form name = "logonform"><table id=logonTable><tr><td>' + doI18N("login.username") + ':</td><td><input type="text" name="username"></td></tr>';
	htmlVar += '<tr><td>' + doI18N("login.password") + ': </td><td><input type="password" name="pwd"></td></tr>';
	htmlVar += '<tr><td><input type="button" value="Logon" name="Submit" ';
	htmlVar += 'onclick= "setBasicAuthKey(' + "'" + logonDivName + "'" + ', document.logonform.username.value, document.logonform.pwd.value )"></td><td></td></tr></table></form>';
	htmlVar += '<div id=formerrors></div></div>';

	$("#" + logonDivName).html(htmlVar);
}


//authenticate user and set global details
function setBasicAuthKey(logonDivName, username, password) 
{ 

	base64 = "";
	currentUser = -1;
	currentUserName = "";
	currentPwd = "";

	var url = "authentication?username=" + username + "&password=" + password;
	var successFunction = function(data, textStatus, jqXHR) { 
					base64 = data.base64EncodedAuthenticationKey; 
					currentUser = data.userId;
					currentUserName = data.username;
					currentPwd = password;

					tableSizeLimit = setTableSizeLimit();
					initialiseDataTableDef();
					showLoansToBeApproved(logonDivName);
					return false;
			};

	var errorFunction = function(jqXHR, textStatus, errorThrown) {
	        			handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
					return true;
				};

	executeAjaxRequest(url, 'POST', "", successFunction, errorFunction);
}


function showLoansToBeApproved(divName)
{
	var showQueue= '<div id="dt_example"><div id=StretchyReportOutput></div></div>';
	$("#" + divName).html(showQueue);

	var successFunction = function(data, textStatus, jqXHR) { 
					createTable(data);
					showTableReport();
			};

	executeAjaxRequest("reports/loansToBeApproved", 'GET', "", successFunction, generalErrorFunction );
}


generalErrorFunction = function(jqXHR, textStatus, errorThrown) {
	alert("Failure");
				};


function createTable(theData) {

	rowsDisplayable = 0;
	var tableColumns = [];
	var columnName = "";
	for (var i in theData.columnHeaders)
	{
		var tmpSType;
		var tmpSClass = "";
		switch(theData.columnHeaders[i].columnType)
		{
			case "VARCHAR":
  				tmpSType = 'string';
  				break;
			case "DECIMAL":
  				tmpSType = 'title-numeric';
				tmpSClass = "rptAlignRight";
				break;
			case "DOUBLE":
  				tmpSType = 'title-numeric';
				tmpSClass = "rptAlignRight";
				break;
			case "BIGINT":
  				tmpSType = 'numeric';
				tmpSClass = "rptAlignRight";
  				break;
			case "SMALLINT":
  				tmpSType = 'numeric';
				tmpSClass = "rptAlignRight";
  				break;
			case "INT":
  				tmpSType = 'numeric';
				tmpSClass = "rptAlignRight";
  				break;
			default:
  				tmpSType = 'string';
		}
		columnName = theData.columnHeaders[i].columnName;
		if (columnName == "Id")
		{
			columnName = "Approval Page Link";
  			tmpSType = 'string';
			tmpSClass = "";
		}
		tableColumns.push({ "sTitle": doI18N(columnName), 
					"sOriginalHeading": columnName,
					"sType": tmpSType,
					"sClass": tmpSClass
					});
	}

	var convNum = "";
	var tmpVal;
	var tableData = [];
	for (var i in theData.data )
	{
		var tmpArr = [];
		for (var j in theData.data[i].row)
		{
			tmpVal = theData.data[i].row[j];
			switch(tableColumns[j].sType)
			{
			case "string":
				if (tmpVal == null) tmpVal = "";
				tmpVal = convertCRtoBR(tmpVal);
  				break;
			case "numeric":
				if (tmpVal == null) tmpVal = ""
				else tmpVal = parseInt(tmpVal);
  				break;
			case "title-numeric":
				if (tmpVal == null) tmpVal = '<span title="' + nullTitleValue  + '"></span>' + "";
				else
				{
					convNum = formatNumber(parseFloat(tmpVal));
					tmpVal = '<span title="' + tmpVal + '"></span>' + convNum;
				}
  				break;
			default:
  				alert("System Error - Type not Found: " + tableColumns[j].sType);
			}
			if (j==0) tmpVal = '<a href="unknown.html" onclick="alert(' + "'Showing Loan Details and Approval Functionality For Loan No.: " + tmpVal + "'" + ');return false;">' + doI18N("Show Loan Details") + '</a>';
			tmpArr.push(tmpVal);
		}
		tableData.push(tmpArr);
	}

	maxRowsForCopyandXLS = Math.round(tableSizeLimit / (tableColumns.length));
	filteredCopyXLSon = true;
	
	dataTableDef.aaData = tableData;
	dataTableDef.aoColumns= tableColumns;
	dataTableDef.aaSorting = [];
	dataTableDef.fnDrawCallback = function() {
							if (isNewTable == false) applyFilterRules()
							else isNewTable = false;
    						};
								
}

function convertCRtoBR(str) {
    return str.replace(/(\r\n|[\r\n])/g, "<br />");
}

function showTableReport() {
	isNewTable = true;
	$('#StretchyReportOutput').html( '<table cellpadding="0" cellspacing="1" border="0" class="display" id="RshowTable" width=100%></table>' );
	oTable = $('#RshowTable').dataTable(dataTableDef);	
	oSettings = oTable.fnSettings();
	applyFilterRules();
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
				"sSwfPath": "resources/libs/DataTables-1.8.2/extras/TableTools/media/swf/copy_cvs_xls.swf"
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
		// "bJQueryUI": true
	}

}


function formatNumber(inNum) {

	var mainNum = inNum + '';
	if (separatorChar != "")
	{
		var dpos = mainNum.indexOf(dbDecimalChar);
		var nStrEnd = '';
		if (dpos != -1) {
			nStrEnd = decimalChar + mainNum.substring(dpos + 1, mainNum.length);
			mainNum = mainNum.substring(0, dpos);
		}
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(mainNum)) {
			mainNum = mainNum.replace(rgx, '$1' + separatorChar + '$2');
		}
		return mainNum + nStrEnd;
	}
	else return mainNum; // no separator format

}


function setTableSizeLimit() {
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ // test for MSIE x.x;
 		var ieversion=new Number(RegExp.$1) // capture x.x portion and store as
											// a number
 		if (ieversion>=9) return 50000
 		else return 3000;
	}
	else return 50000;

}

function applyFilterRules() {

		if (maxRowsForCopyandXLS >= oSettings.fnRecordsDisplay())
		{
			if (filteredCopyXLSon == false) 
			{
				copyXLSon();
				oTable.fnDraw(); 
			}
		}
		else
		{
			if (filteredCopyXLSon == true)
			{
				copyXLSoff();
				oTable.fnDraw(); 
			}
		}

}

highlightMissingXlations = "N";
function doI18N(xlateStr, params) { 
	if (highlightMissingXlations == "Y") return jQuery.i18n.prop(xlateStr, params)
	else
	{
		var xlated = jQuery.i18n.prop(xlateStr, params,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);
		if (xlated.substr(0,1) == "[" && xlated.substr(xlated.length - 1, 1) == "]") return xlated.substr(1, xlated.length - 2)
		else return xlated;
	}
}
