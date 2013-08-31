crudData = {
		loanproduct: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 550
			},
		savingproduct: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 550
			},
		depositproduct: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 850,
				dialogHeight: 550
			},	
		office: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 400
			},
		fund: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},
		code: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},			
	     configuration: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
		 },	
		employee: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 325
			},
		charge: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 450
			},
		user: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 1000,
				dialogHeight: 550
			},
		role: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 1000,
				dialogHeight: 550
			},
		orgCurrency: {
				editTemplateNeeded: false,
				refreshListNeeded: false,
				dialogWidth: 900,
				dialogHeight: 400
			},
		permission: {
				editTemplateNeeded: false,
				refreshListNeeded: false,
				dialogWidth: 1200,
				dialogHeight: 500
			},
		officetransaction: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 900,
				dialogHeight: 400
			},
		bulkLoanReassignment: {
				editTemplateNeeded: true,
				refreshListNeeded: false,
				dialogWidth: 600,
				dialogHeight: 500	
		},
		datatable: {
				editTemplateNeeded: false,
				refreshListNeeded: true,
				dialogWidth: 600,
				dialogHeight: 275
			},
		datatableCreate: {
				editTemplateNeeded: false,
				refreshListNeeded: false,
                dialogWidth: 1200
			},
		datatableUpdate: {
				editTemplateNeeded: false,
				refreshListNeeded: false,
                dialogWidth: 1200
			},
		report: {
			editTemplateNeeded: true,
			refreshListNeeded: true
			},
		accountingrule: {
				editTemplateNeeded: true,
				refreshListNeeded: true,
				dialogWidth: 1200,
				dialogHeight: 565
			}

		};

saveSuccessFunctionReloadClient =  function(data, textStatus, jqXHR) {
	$("#dialog-form").dialog("close");
	if (data.clientId) {
		showILClient(data.clientId);
	} else{
		if (isCenterSaving) {
			showCenter(data.groupId);
		} else{
			showGroup(data.groupId);
		}
	}
};

saveSuccessFunctionReloadClientListing =  function(data, textStatus, jqXHR) {
	$("#dialog-form").dialog("close");
	showILClientListing("content");
};

formErrorFunction = function(jqXHR, textStatus, errorThrown) {
	handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
};


generalErrorFunction = function(jqXHR, textStatus, errorThrown) {
	alert("complete after  - for when an error is got but not on a create/update form");
   	//handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
};


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

function executeAjaxRequestForImageDownload(url, verbType,successFunction, errorFunction) { 

	var jqxhr = $.ajax({ 
				url : baseApiUrl + url, 
				type: verbType, //POST, GET, PUT or DELETE 
				data: null,
				beforeSend : function(xhr) { 
						if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
						if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
					}, 
				success : successFunction, 
				error : errorFunction 
			}); 
}

function executeAjaxOctetStreamDownloadRequest(url) { 
	 $.fileDownload(baseApiUrl + url +"?tenantIdentifier="+tenantIdentifier, {
        //preparingMessageHtml: "Please wait while your document is downloaded...",
        //failMessageHtml: "There was a problem downloading the document, please try again.",
        httpMethod: "GET"
    });
}

function executeMultipartUploadAjaxRequest(url, verbType, formData, successFunction, errorFunction) { 
	var jqxhr = $.ajax({ 
				url : baseApiUrl + url, 
				type : verbType, //POST, GET, PUT or DELETE 
				contentType : false, 
				processData: false,
				data : formData, 
				cache : false, 
				beforeSend : function(xhr) { 
						if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
						if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
					}, 
				success : successFunction, 
				error : errorFunction 
			}); 
}

// load html functions
function showMainContainer(containerDivName, username) {

	var htmlVar = '<div id="logowrapper">';
	htmlVar += '	<span style="float: right">';
	htmlVar += '		<img style="float:right; border: 0;" alt="" src="resources/img/mifos-icon.png"/>';
	htmlVar += '	</span>';
	htmlVar += '</div>';
	htmlVar += '<div id="navwrapper">';
	htmlVar += '<ul id="nav" class="floatleft">';

	if (jQuery.MifosXUI.showMenu("DashboardMenu")) {
		htmlVar += '  <li><a href="unknown.html" onclick="custom.showFirstPage();return false;">'+doI18N("link.topnav.dashboard")+'</a></li>';		
	}

	if (jQuery.MifosXUI.showMenu("ClientsMenu") && jQuery.MifosXUI.showMenu("GroupsMenu")) {
		htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="showGroupListing();return false;">' + doI18N("link.topnav.groups") + '</a>';
		htmlVar += '		<ul>';
		htmlVar += '	<li><a href="unknown.html" onclick="showILClientListing(' + "'content'" + ');return false;">' + doI18N("link.topnav.clients") + '</a></li>';
		htmlVar += '		</ul>';
		htmlVar += '	</li>';
	} else if (jQuery.MifosXUI.showMenu("ClientsMenu")) {
		htmlVar += '	<li><a href="unknown.html" onclick="showILClientListing(' + "'content'" + ');return false;">' + doI18N("link.topnav.clients") + '</a></li>';
	} else if (jQuery.MifosXUI.showMenu("GroupsMenu")) {
		htmlVar += '	<li><a href="unknown.html" onclick="showGroupListing();return false;">' + doI18N("link.topnav.groups") + '</a></li>';
	}
	
	if (jQuery.MifosXUI.showMenu("CentersMenu")) {
		htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("link.topnav.groupings") + '</a>';
		htmlVar += '		<ul>';
		
		if (jQuery.MifosXUI.showMenu("CollectionSheetMenu")) {
			htmlVar += '  <li><a href="unknown.html" onclick="showCollectionSheet();return false;">' + doI18N("link.topnav.collection.sheet") + '</a></li>';
		}
		
		if (jQuery.MifosXUI.showMenu("CentersMenu")) {
			htmlVar += '	<li><a href="unknown.html" onclick="showNewCenterListing();return false;">' + doI18N("link.topnav.centers") + '</a></li>';
			htmlVar += '	<li><a href="unknown.html" onclick="showGroupListing();return false;">' + doI18N("link.topnav.groups") + '</a></li>';
			htmlVar += '	<li><a href="unknown.html" onclick="showCommunalBankListing();return false;">' + doI18N("link.topnav.communalbanks") + '</a></li>';
		}

		htmlVar += '		</ul>';
		htmlVar += '	</li>';
	}

	if (jQuery.MifosXUI.showMenu("SavingsMenu")) {
  	 	htmlVar += '  <li><a href="unknown.html" onclick="showSavingsAccountsListing();return false;">' + doI18N("link.topnav.savings") + '</a></li>';    
  	}
	
	if (jQuery.MifosXUI.showMenu("LoansMenu")) {
		htmlVar += '  <li><a href="unknown.html" onclick="showLoansListing();return false;">' + doI18N("link.topnav.loans") + '</a></li>';
	}
	
	if (jQuery.MifosXUI.showMenu("CheckerMenu")) {
		htmlVar += '	<li><a href="unknown.html" onclick="auditSearch(' + "'makerchecker'" + ');return false;">' + doI18N("link.topnav.makercheckerinbox") + '</a></li>';
	}
	
	if (jQuery.MifosXUI.showMenu("UserAdminMenu") == true || jQuery.MifosXUI.showMenu("OrgAdminMenu") == true || jQuery.MifosXUI.showMenu("SysAdminMenu") == true) {
		htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("link.topnav.administration") + '</a>';
		htmlVar += '		<ul>';
		
		if (jQuery.MifosXUI.showMenu("UserAdminMenu") == true)
			htmlVar += '	<li><a href="unknown.hgtml" onclick="setUserAdminContent(' + "'" + 'content' + "'" +');return false;">' + doI18N("link.topnav.users") + '</a></li>';
		
		if (jQuery.MifosXUI.showMenu("OrgAdminMenu") == true)
			htmlVar += '	<li><a href="unknown.html" onclick="setOrgAdminContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.organisation") + '</a></li>';
		
		if (jQuery.MifosXUI.showMenu("SysAdminMenu") == true)
			htmlVar += '	<li><a href="unknown.html" onclick="setSysAdminContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.system") + '</a></li>';
		
		htmlVar += '		</ul>';
		htmlVar += '	</li>';
	}
	
	if (jQuery.MifosXUI.showMenu("AccountingMenu")) {
		htmlVar += '  <li><a href="unknown.html" onclick="setAccountingContent(' + "'" + 'content' + "'" + ');return false;">' + doI18N("link.topnav.accounting") + '</a></li>';
	}
		
	if (jQuery.MifosXUI.showMenu("ReportsMenu") == true)
	{
		htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("link.reports") + '</a>';
		htmlVar += '		<ul>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting();return false;">' + doI18N("link.reports.all") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Client' + "'" + ');return false;">' + doI18N("link.reports.client") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Loan' + "'" + ');return false;">' + doI18N("link.reports.loan") + '</a></li>';
		htmlVar += '			<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Fund' + "'" + ');return false;">' + doI18N("link.reports.fund") + '</a></li>';
		
		if (jQuery.MifosXUI.showMenu("AccountingMenu") == true)
			htmlVar += '      		<li><a href="unknown.html" onclick="showILReporting(' + "'" + 'Accounting' + "'" + ');return false;">' + doI18N("link.reports.accounting") + '</a></li>';
		
		htmlVar += '		</ul>';
		htmlVar += '	</li>';
	}
	
	htmlVar += '	<li><a href="unknown.html" onclick="return false;">' + doI18N("label.tenant.name") + ': ' + tenantIdentifier + '</a></li>';
    
	htmlVar += '</ul>';
	htmlVar += '<ul id="nav" class="floatright">';
	
	htmlVar += '    <li id="search_element" class="sb_wrapper">';

    htmlVar += '           <input id="sb_input" name="sb_input" class="sb_input" type="text" placeholder="Search" />';
    htmlVar += '           <button type="submit" class="globalsearchbtn ui-icon-search" id="globalsearchbtn" name="globalsearchbtn" title="Global Search">Search</button>';
    htmlVar += '           <ul class="sb_dropdown" >';
    htmlVar += '                <li class="sb_filter">Filter your search</li>';
    htmlVar += '                <li><input type="checkbox" name="gsresource" value="CLIENTS"/><label for="clients">Clients</label></li>';
    htmlVar += '                <li><input type="checkbox" name="gsresource" value="LOANS"/><label for="loans">Loans</label></li>';
    htmlVar += '                <li><input type="checkbox" name="gsresource" value="CLIENTIDENTIFIERS"/><label for="clientIdentifiers">Client Identifiers</label></li>';
   	if (jQuery.MifosXUI.showMenu("GroupsMenu")) {
    	htmlVar += '                <li><input type="checkbox" name="gsresource" value="GROUPS"/><label for="groups">Centers And Groups</label></li>';    	
    }
    htmlVar += '           </ul>';

    htmlVar += '    </li>';
	
	htmlVar += '	<li class="dmenu"><a href="unknown.html" onclick="return false;">' + doI18N("link.topnav.culture") + '</a>';
	htmlVar += '		<ul>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'en' + "'" + ');return false;">English</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'fr' + "'" + ');return false;">French</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'es' + "'" + ');return false;">Spanish</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'es-PE' + "'" + ');return false;">Spanish (Peru)</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'pt' + "'" + ');return false;">Portuguese</a></li>';
	htmlVar += '			<li><a href="unknown.html" onclick="setCultureReshowFirstPage(' + "'" + 'zh' + "'" + ');return false;">Chinese</a></li>';
	htmlVar += '		</ul>';
	htmlVar += '	</li>';
	htmlVar += '	<li><a href="unknown.html" onclick="showAccountSettings();return false;" class="dmenu"><div id=displayUN>' + currentUserName + '</div></a>';
	htmlVar += '		<ul>';
	htmlVar += '			<li><a href="unknown.html" onclick="showAccountSettings();return false;">' + doI18N("link.topnav.account.settings") + '</a></li>';
	htmlVar += '		</ul>';
	htmlVar += '	</li>';
	htmlVar += '	<li><a href="unknown.html" onclick="signOut(' + "'" + containerDivName + "'" + ');return false;">' + doI18N("link.signout") + '</a></li>';
	htmlVar += '</ul>';
	htmlVar += '<br class="clear">';
	htmlVar += '</div><div style="float:none; clear:both;">';
	htmlVar += '	<div id="spacer" style="line-height: 15px;">&nbsp;</div>';
	htmlVar += '	<div id="content"></div>';
	htmlVar += '</div>';

	$("#" + containerDivName).html(htmlVar);

	$(function() {
        var $ui         = $('#search_element');

        $ui.find('.sb_input').bind('focus click',function(){
            $ui.find('.sb_dropdown')
               .show();
        });

        $ui.bind('mouseleave',function(){
            $ui.find('.sb_dropdown')
               .hide();
        });

    });

    $('#globalsearchbtn').button({
        icons : {
            primary : "ui-icon-search"
        },
        text: false
        }).click(function(e) {
            globalsearch();
            e.preventDefault();
        });

    $('#sb_input').enterKey(function(){
        globalsearch();
    });
}

var globalSearchSuccessFunction = function(data, textStatus, jqXHR) {
    var gsObject = new Object();
    gsObject.crudRows = data;
    var tableHtml = $("#globalSearchListTemplate").render(gsObject);
    $("#content").html(tableHtml);
    var gsTable=displayListTable("globalSearchtable");
    $('input:checkbox[name=gsresource]:checked').removeAttr('checked');
}

function globalsearch(){
    //Get search query string

    var query = $('#sb_input').val();
    var resources = $('input:checkbox[name=gsresource]:checked').map(function () {
                      return this.value;
                    }).get().join(",");
    if(query.length > 0){
        var getUrl = "search?query=" + encodeURIComponent(query);
        if(resources.length > 0) getUrl = getUrl + "&resource=" + encodeURIComponent(resources);                    

        executeAjaxRequest(getUrl, 'GET', "", globalSearchSuccessFunction, formErrorFunction);
    }
}

function showLogon(logonDivName) {
	var htmlVar = '<div id="theLogonForm"><form name = "logonform" id="logonform"><h5><img style="float:left; border: 0;" alt="" src="resources/mifos.jpg"/>' + doI18N("app.name") + ' <br><br> ' + doI18N("label.tenant.name") + ': ' + tenantIdentifier + '</h5>';
	htmlVar += '<fieldset id="inputs"><input type="text" id="username" name="username" placeholder="' + doI18N("label.username") + '" autofocus required>';
	htmlVar += '<input type="password"  id="password" name="pwd" placeholder="' + doI18N("label.password") + '" onKeyPress="return checkSubmit(event, ' + "'" + logonDivName + "'" + ', document.logonform.username.value, document.logonform.pwd.value )" required> </fieldset>';
	htmlVar += '<fieldset id="actions"><input type="button" value="Logon" id="submit" name="Submit" ';
	htmlVar += 'onclick= "setBasicAuthKey(' + "'" + logonDivName + "'" + ', document.logonform.username.value, document.logonform.pwd.value )"></fieldset></form>';
	htmlVar += '<div id=formerrors></div></div>';

	$("#" + logonDivName).html(htmlVar);
}

function setClientListingContent(divName) {
	var htmlVar = "";
	
	if (jQuery.MifosXUI.showTask("ADDCLIENT") == true) 
		htmlVar = '<button id="addclient" style="clear: both;">' + doI18N("link.add.new.client") + '</button>';
	
	htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.search") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setCenterListingContent(divName) {
	var htmlVar = '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.center.manage") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setNewCenterListingContent(divName) {
	var htmlVar = "";
	if (jQuery.MifosXUI.showTask("ADDCENTER")) {
		htmlVar = '<button id="addCenter" style="clear: both;">' + doI18N("link.add.new.center") + '</button>';
	}
		
	htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.center.manage") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setGroupListingContent(divName) {
	var htmlVar = "";
	
	if (jQuery.MifosXUI.showTask("ADDGROUP")) {
		htmlVar = '<button id="addstandardgroup" style="clear: both;">' + doI18N("link.add.new.group") + '</button>';
	}
		
	htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.group.manage") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setLoanListingContent(divName) {
	var htmlVar = "";
	
	htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.search") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setSavingsAccountListingContent(divName) {
  var htmlVar = "";
  
  htmlVar += '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.search") + '</a></li></ul><div id="searchtab"></div></div>';

  $("#" + divName).html(htmlVar);
}

function setCommunalBankListingContent(divName){
	var htmlVar = '<div id="tabs"><ul><li><a href="#searchtab" title="searchtab">' + doI18N("tab.communalbank.manage") + '</a></li></ul><div id="searchtab"></div></div>';

	$("#" + divName).html(htmlVar);
}

function setClientContent(divName) {
	var htmlVar = '<div  id="clienttoolbar"></div>'
	htmlVar += '<div id="clientdatatabs">	<ul><li><a href="#clienttab"'; 
	htmlVar += ' title="clienttab" class="topleveltab"><span id="clienttabname">' + doI18N("client.general.tab.name") + '</span></a></li>';
	htmlVar += '<li><a href="#clientidentifiertab" title="clientidentifiertab" class="topleveltab"><span id="clientidentifiertabname">' + doI18N("client.identifier.tab.name")  + '</span></a></li>';
	htmlVar += '<li><a href="#clientdocumenttab" title="clientdocumenttab" class="topleveltab"><span id="clientdocumenttabname">' + doI18N("client.document.tab.name")  + '</span></a></li>';
	htmlVar += '</ul><div id="clienttab"></div><div id="clientidentifiertab"></div><div id="clientdocumenttab"></div></div></div>';
	$("#" + divName).html(htmlVar);
}

function setGroupContent(divName) {
	var htmlVar = '<div id="groupdetails"></div><div id="groupdatatabs">	<ul><li><a href="#grouptab"'; 
	htmlVar += 	' title="grouptab" class="topleveltab"><span id="grouptabname">' + doI18N("app.loading") + '</span></a></li>'
	htmlVar += 	' <li><a href="#groupclientstab"'; 
	htmlVar += 	' title="groupclientstab" class="topleveltab"><span id="groupclientstabname">' + doI18N("app.loading") + '</span></a></li>'
	htmlVar += 	' <li><a href="#groupsummarytab"'; 
	htmlVar += 	' title="groupsummarytab" class="topleveltab"><span id="groupsummarytabname">' + doI18N("app.loading") + '</span></a></li>'
	htmlVar += 	' <li><a href="#grouprolestab"'; 
	htmlVar += 	' title="grouprolestab" class="topleveltab"><span id="grouprolestabname">' + doI18N("app.loading") + '</span></a></li>'
	htmlVar += 	' </ul><div id="grouptab"></div><div id="groupclientstab"></div><div id="groupsummarytab"></div><div id="grouprolestab"></div></div></div>';
	
	$("#" + divName).html(htmlVar);
}

function setCenterContent(divName) {
	var htmlVar = '<div id="centerDetails"></div><div id="centerdatatabs">	<ul><li><a href="#centertab"'; 
	htmlVar += 	' title="centertab" class="topleveltab"><span id="centertabname">' + doI18N("app.loading") + '</span></a></li>'
	htmlVar +=	' <li><a href="#centertabgroups"'; 
	htmlVar += 	' title="centertabgroups" class="topleveltab"><span id="centertabgroupsname">' + doI18N("app.loading") + '</span></a></li>';
	htmlVar +=	' <li><a href="#centertabsummary"'; 
	htmlVar += 	' title="centertabsummary" class="topleveltab"><span id="centertabsummaryname">' + doI18N("app.loading") + '</span></a></li>';
	htmlVar += 	'</ul><div id="centertab"></div><div id="centertabgroups"></div><div id="centertabsummary"></div></div></div>';
	$("#" + divName).html(htmlVar);
}


function setAddLoanContent(divName) {

	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'
	$("#" + divName).html(htmlVar);
}

function setAddBulkLoanContent(divName) {
	var htmlVar = '<div id="jlgloans" style="padding: 50px;"></div>';
	$("#" + divName).html(htmlVar);
}

function setAddDepositContent(divName) {

	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'
	$("#" + divName).html(htmlVar);
	}

function setAddSavingContent(divName) {

	var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>'
	$("#" + divName).html(htmlVar);
}


function setOrgAdminContent(divName) {

	var addOfficeUrl = "maintainTable('office', 'offices', 'POST');return false;";
	var addFundUrl = "maintainTable('fund', 'funds', 'POST');return false;";
	var addEmployeeUrl = "maintainTable('employee', 'staff', 'POST');return false;";
	var addChargeUrl = "maintainTable('charge', 'charges', 'POST');return false;";
	var orgCurrencyUrl = "maintainTable('orgCurrency', 'currencies', 'PUT');return false;";
	var officeMoneyTransfer = "maintainTable('officetransaction', 'officetransactions', 'POST');return false;";
	var bulkLoanReassignmentUrl = "maintainTable('bulkLoanReassignment', 'loans/loanreassignment', 'POST');return false;";
	var addAccountingRuleUrl =  "maintainTable('accountingrule', 'accountingrules', 'POST');return false;"; 
	var addHolidayUrl = "addHoliday();return false;";

	var htmlOptions = "";
	if (jQuery.MifosXUI.showTask("ViewLoanProducts"))
		htmlOptions += ' | <a href="unknown.html" onclick="listLoanProducts();return false;" id="viewloanproducts">' + doI18N("administration.link.view.loan.products") + '</a>';

	if (jQuery.MifosXUI.showTask("AddLoanProduct")) {
		htmlOptions += ' | <a href="#" id="addloanproduct">' + doI18N("administration.link.add.loan.product") + '</a>';
	}

	if (jQuery.MifosXUI.showTask("ViewSavingProducts")) {
		htmlOptions += ' | <a href="#" onclick="listSavingsProducts();return false;" id="viewsavingproducts">' + doI18N("administration.link.view.saving.products") + '</a>';
	}
		
	if (jQuery.MifosXUI.showTask("AddSavingProduct")) {
		htmlOptions += ' | <a href="#" id="addsavingsproduct">' + doI18N("administration.link.add.saving.product") + '</a>';
	}
		
	if (jQuery.MifosXUI.showTask("ViewFunds") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'fund'" + ');return false;" id="viewfunds">' + doI18N("administration.link.view.funds") + '</a>';

	if (jQuery.MifosXUI.showTask("AddFund") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addFundUrl + '" id="addfund">' + doI18N("administration.link.add.fund") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewEmployees") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'employee'" + ');return false;" id="viewemployees">' + doI18N("administration.link.view.employees") + '</a>';

	if (jQuery.MifosXUI.showTask("AddEmployee") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addEmployeeUrl + '" id="addemployee">' + doI18N("administration.link.add.employee") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewCharges") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'charge'" + ');return false;" id="viewcharges">' + doI18N("administration.link.view.charges") + '</a>';

	if (jQuery.MifosXUI.showTask("AddCharge") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addChargeUrl + '" id="addcharge">' + doI18N("administration.link.add.charge") + '</a>';

	if (htmlOptions > "")
	{
		htmlOptions += '<br><br>';
		htmlOptions = htmlOptions.substring(3)
	}

	var htmlOptions2 = "";
	if (jQuery.MifosXUI.showTask("CurrencyConfiguration") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + orgCurrencyUrl + '" id="editconfiguration">' + doI18N("administration.link.currency.configuration") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewOffices") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="refreshTableView(' + "'office'" + ');return false;" id="viewoffices">' + doI18N("administration.link.view.offices") + '</a>';

	if (jQuery.MifosXUI.showTask("AddOffice") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + addOfficeUrl + '" id="addoffice">' + doI18N("administration.link.add.office") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewOfficeMoneyTxns") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="refreshTableView(' + "'officetransaction'" + ');return false;" id="viewofficetransactions">' + doI18N("administration.link.view.office.money.transfers") + '</a>';

	if (jQuery.MifosXUI.showTask("AddOfficeMoneyTxn") == true)
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + officeMoneyTransfer + '" id="internalTransfer">' + doI18N("administration.link.office.money.transfer") + '</a>';

	if (jQuery.MifosXUI.showTask("BulkLoanReassignment") == true) {
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + bulkLoanReassignmentUrl + '" id="bulkLoanReassignment">' + doI18N("administration.link.bulk.loan.reassignment") + '</a>';	
	}
	
	if (jQuery.MifosXUI.showMenu("AccountingMenu")) {
		htmlOptions2 += ' | <a href="unknown.html" onclick="refreshTableView(' + "'accountingrule'" + ');return false;" id="viewaccountingrule">' + doI18N("administration.link.view.accountingrule") + '</a>';
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + addAccountingRuleUrl + '" id="addaccountingrule">' + doI18N("administration.link.add.accountingrule") + '</a>';
	}
	
	if (jQuery.MifosXUI.showTask("ViewHoliday") == true) {
		htmlOptions2 += ' | <a href="unknown.html" onclick="listHolidays();return false;" id="viewHoliday">' + doI18N("administration.link.view.Holiday") + '</a>';
	}

	if (jQuery.MifosXUI.showTask("AddHoliday") == true) {
		htmlOptions2 += ' | <a href="unknown.html" onclick="' + addHolidayUrl + '" id="addHoliday">' + doI18N("administration.link.add.Holiday") + '</a>';
	}

	if (jQuery.MifosXUI.showTask("ViewLoanProducts"))
		htmlOptions2 += ' | <a href="unknown.html" onclick="listProductMix();return false;" id="viewproductmix">' + doI18N("administration.link.view.product.mix") + '</a>';
		
	if (jQuery.MifosXUI.showTask("AddLoanProduct")) {
		htmlOptions2 += ' | <a href="#" id="addproductmix">' + doI18N("administration.link.add.product.mix") + '</a>';
	}

	if (htmlOptions2 > "")
	{
		htmlOptions2 = htmlOptions2.substring(3)
	}

	$("#" + divName).html(simpleOptionsHtml(htmlOptions + htmlOptions2));
	
	$('#addloanproduct').click(function(e) {
		launchLoanProductDialog(null);
    	e.preventDefault();
	});
	
	$('#addsavingsproduct').click(function(e) {
		launchSavingsProductDialog(null);
    	e.preventDefault();
	});

	$('#addproductmix').click(function(e) {
		launchProductMixDialog(null);
    	e.preventDefault();
	});
}


function setUserAdminContent(divName) {

	var addUserUrl = "maintainTable('user', 'users', 'POST');return false;";
	var addRoleUrl = "maintainTable('role', 'roles', 'POST');return false;";

	var htmlOptions = "";
	if (jQuery.MifosXUI.showTask("ViewUsers") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'user'" + ');return false;" id="listusers">' + doI18N("administration.link.view.users") + '</a>';

	if (jQuery.MifosXUI.showTask("AddUser") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addUserUrl + '" id="adduser">' + doI18N("administration.link.add.user") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewRoles") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'role'" + ');return false;" id="listroles">' + doI18N("administration.link.view.roles") + '</a>';

	if (jQuery.MifosXUI.showTask("AddRole") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addRoleUrl + '" id="addrole">' + doI18N("administration.link.add.role") + '</a>';
	
	if (htmlOptions > "") htmlOptions = htmlOptions.substring(3);

	$("#" + divName).html(simpleOptionsHtml(htmlOptions));
}

function setSysAdminContent(divName) {

	var addCodeUrl = "maintainTable('code', 'codes', 'POST');return false;";
	var maintainMakerCheckerUrl = "maintainTable('permission', 'permissions?makerCheckerable=true', 'PUT');return false;";
	var createDatatableUrl = "maintainTable('datatableCreate', 'datatables', 'POST'); return false;";
	var registerDatatableUrl = "maintainTable('datatable', 'datatables', 'POST'); return false;";
	var addReportUrl = "launchReportDialog(null);return false;";
	var batchJobUrl = "showBatchJobDetails();return false;"

	var htmlOptions = "";
	if (jQuery.MifosXUI.showTask("VIEWDATATABLES") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'datatable'" + ');return false;" id="listdatatables">' + doI18N("administration.link.view.datatables") + '</a>';

	if (jQuery.MifosXUI.showTask("CREATEDATATABLE") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + createDatatableUrl + '" id="createdatatable">' + doI18N("administration.link.create.datatable") + '</a>';

	if (jQuery.MifosXUI.showTask("REGISTERDATATABLE") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + registerDatatableUrl + '" id="registerdatatable">' + doI18N("administration.link.register.datatable") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewCodes") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'code'" + ');return false;" id="viewcodes">' + doI18N("administration.link.view.code") + '</a>';

	if (jQuery.MifosXUI.showTask("AddCode") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addCodeUrl + '" id="addcode">' + doI18N("administration.link.add.code") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewPermissions") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'permission'" + ');return false;" id="listpermissions">' + doI18N("administration.link.view.permissions") + '</a>';

	if (jQuery.MifosXUI.showTask("ManagePermissions") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + maintainMakerCheckerUrl + '" id="maintainMC">' + doI18N("administration.link.maintain.makerCheckerable") + '</a>';
	
	if (jQuery.MifosXUI.showTask("ViewConfiguration") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'configuration'" + ');return false;" id="viewconfiguration">' + doI18N("administration.link.view.configuration") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewAudits") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="auditSearch(' + "'audit'" + ');return false;" id="viewaudits">' + doI18N("administration.link.view.audits") + '</a>';

	if (jQuery.MifosXUI.showTask("ViewReports") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="refreshTableView(' + "'report'" + ');return false;" id="viewreports">' + doI18N("administration.link.view.reports") + '</a>';

	if (jQuery.MifosXUI.showTask("AddReport") == true)
		htmlOptions += ' | <a href="unknown.html" onclick="' + addReportUrl + '" id="addreport">' + doI18N("administration.link.add.report") + '</a>';

		htmlOptions += ' | <a href="unknown.html" onclick="' + batchJobUrl + '" id="batchjob">' + doI18N("administration.link.batchjobs") + '</a>';
	
	if (htmlOptions > "") htmlOptions = htmlOptions.substring(3);

	$("#" + divName).html(simpleOptionsHtml(htmlOptions));
}

function setAccountingContent(divName) {
	//get a list of all offices (as this is required by most accounting subtabs)
	var officesObject;
	var getOfficesSuccessFunction = function(data, textStatus, jqXHR) {
		officesObject = data;
		$("#" + divName).html($("#accountingHomeTemplate").render());
		$("#accountingtabs").tabs({
			beforeActivate : function(event, tab) {
				fetchAccountingTabContent(tab.newTab.index());
			}
		});
		var fetchAccountingTabContent = function(index) {
			if (index == 0) {
				handlePredefinedPostingEntriesTabSelection(officesObject);
			}//journal entries tab selected
			if (index == 1) {
				handleJournalEntriesTabSelection(officesObject);
			}//accounting closures tab selecetd
			else if (index == 2) {
				handleGLClosuresTabSelection(officesObject);
			}
			//coa tab selected
			else if (index == 3) {
				handleCOATabSelection();
			}
		}
		//determine which tab is initially selected and load data for the same
		var selected = $("#accountingtabs").tabs('option', 'active');
		fetchAccountingTabContent(selected);
	}
	executeAjaxRequest('offices', 'GET', "", getOfficesSuccessFunction, formErrorFunction);
}

function reverseJournalEntrySuccessFunction(data, textStatus, jqXHR) {
	$("#dialog-form").dialog("close");
	$("#searchjournalentries").click();
}

function handlePredefinedPostingEntriesTabSelection(officesObject) {
	var getAccountingRulesSuccessFunction = function (data, textStatus, jqXHR) {
		var baseObject = new Object();
		baseObject.offices = officesObject; 
		baseObject.accountingRuleOptions = data;
		predefinedAccountingEntriesTabHtml = $("#predefinedAccountingRuleJournalEntriesTemplate").render(baseObject);
		$("#predefinedpostings-tab").html(predefinedAccountingEntriesTabHtml);

		/** Onclick function for adding a new Journal Entry */
		$("#addpredefinedjournalentries").button({
			icons : {
				primary : "ui-icon-circle-plus"
			}
		}).click(function(e) {
			var getUrl = "";
			var putUrl = "journalentries";
			var templateSelector = "#predefinedPostingEntryFormTemplate";
			var width = 800;
			var height = 500;

			var saveSuccessFunction = function(data, textStatus, jqXHR) {
				$("#dialog-form").dialog("close");
				searchForJournalEntriesByTransactionId(data.transactionId);
			}
			popupDialogWithFormViewData(baseObject, putUrl, 'POST', "dialog.title.journalEntry.add", templateSelector, width, height, saveSuccessFunction);
			$("#officeId").combobox();
			$("#accountingRule").combobox({
				selected : function (event,ui) {
					var accountingruleObject = new Object();
					for( i=0; i<baseObject.accountingRuleOptions.length; i++ ) {
						var tempObject = baseObject.accountingRuleOptions[i];
						if( tempObject.id == ui.item.value) {
							accountingruleObject.debitAccounts = tempObject.debitAccounts;
							accountingruleObject.creditAccounts = tempObject.creditAccounts;
							accountingruleObject.allowMultipleDebitEntries = tempObject.allowMultipleDebitEntries;
							accountingruleObject.allowMultipleCreditEntries = tempObject.allowMultipleCreditEntries;
						}
					}
					var debitOrCreditAccountsTabHtml = $("#creditAndDebitAccountsFormTemplate").render(accountingruleObject);
					$("#creditanddebitsdiv").html(debitOrCreditAccountsTabHtml);

					var creditAccountsLength = accountingruleObject.creditAccounts.length;
					var debitAccountsLength = accountingruleObject.debitAccounts.length;

					if (creditAccountsLength > 0) {
						$("#creditLabel").show();
						$("#creditaccounts").show();
					} else {
						$("#creditLabel").hide();
						$("#creditaccounts").hide();
					}

					if (debitAccountsLength > 0) {
						$("#debitLabel").show();
						$("#debitaccounts").show();
					} else {
						$("#debitLabel").hide();
						$("#debitaccounts").hide();
					}

					//initialize default comboboxes in popup
					$("#debitAccountId01").combobox();
					$("#creditAccountId01").combobox();

					//init button for adding new debits
					var debitSize = $('#debitaccounts p').size() + 1;
					$("#addDebitButton").button({
					icons : {
						primary : "ui-icon-plusthick"
					},
					text: false
					}).click(function(e) {
						debitSize = debitSize + 1;
						accountingruleObject.accountId = "debitAccountId0" + debitSize;
						accountingruleObject.amountId = "debitAmount0" + debitSize;
						accountingruleObject.deleteButtonId = "removeDebitButton0" + debitSize;
						accountingruleObject.activity = "Remove this Debit Entry";
						var debitTemplateHtml = $("#singleDebitEntryTemplate").render(accountingruleObject);
						$("#debitaccounts").append(debitTemplateHtml);
						//onclick funtion for newly added delete button
						$("#" + accountingruleObject.deleteButtonId).button().click(function(e) {
							if( debitSize > 1 ) {
		                        $(this).parents('p').remove();
		                        debitSize --;
		               		}
		                	e.preventDefault();
						});
						//make newly added select a combobox
						$("#" + accountingruleObject.accountId).combobox();
						e.preventDefault();
					});

					//init button for adding new credits
					var creditSize = $('#creditaccounts p').size() + 1;
					$("#addCreditButton").button({
					icons : {
						primary : "ui-icon-plusthick"
					},
					text: false
					}).click(function(e) {
						creditSize = creditSize + 1;
						accountingruleObject.accountId = "creditAccountId0" + creditSize;
						accountingruleObject.amountId = "creditAmount0" + creditSize;
						accountingruleObject.deleteButtonId = "removeCreditButton0" + creditSize;
						accountingruleObject.activity = "Remove this credit Entry";
						var creditTemplateHtml = $("#singleCreditEntryTemplate").render(accountingruleObject);
						$("#creditaccounts").append(creditTemplateHtml);
						//onclick funtion for newly added delete button
						$("#" + accountingruleObject.deleteButtonId).button().click(function(e) {
							if( creditSize > 1 ) {
		                        $(this).parents('p').remove();
		                        creditSize --;
		               		}
		                	e.preventDefault();
						});
						//make newly added select a combobox
						$("#" + accountingruleObject.accountId).combobox();
						e.preventDefault();
					});
				}
			});
			e.preventDefault();
		});

		$("#searchJournalEntriesByTransactionId").button({
			icons : {
				primary : "ui-icon-search"
			}
		}).click(function(e) {
			var trxnId = $("#transactionId").val();
			if (trxnId=="" || trxnId==undefined) {
				alert("  Please Enter TransactionId  ");
			} else{
				searchForJournalEntriesByTransactionId($("#transactionId").val());
			}
			e.preventDefault();
		});
		//fetch journalentries whenever new predifined journalentry is created using corresponding transactionId or by entering transactionId.
		var searchForJournalEntriesByTransactionId=function(dataTransactionId){
			var getJournalEntriesByTransactionIdSuccessFunction = function(data, textStatus, jqXHR) {
				var baseObject = new Object();
				baseObject.crudRows = data.pageItems;
				var journalEntriesTablesHtml = $("#basicJournalEntriesTableTemplate").render(baseObject);
				$("#journalEntriesSearchResultsDiv").html(journalEntriesTablesHtml);
				var oTable=displayListTable("basicjournalentriestable");

				var reversingJournalEntrySuccessFunction = function(data, textStatus, jqXHR) {
					$("#dialog-form").dialog("close");
					searchForJournalEntriesByTransactionId(data.transactionId);
				}

				// initialize info and reversal buttons
				$.each(baseObject.crudRows, function(i, val) {
					$("#jlentryinfo" + val.id).button({
						icons : {
							primary : "ui-icon-info"
						},
						text: false
					}).click(function(e) { {
							var width = 550;
							var height = 450;
							var templateSelector = "#journalEntryInfoFormTemplate";
							popupDialogWithReadOnlyFormViewData(val,"dialog.title.journalEntry.view", templateSelector, width, height);
						}
						e.preventDefault();
					});
					// button for reversal may (would not exist for portfolio generate entries)
					if($("#jlentryreversal" + val.id).length){
						$("#jlentryreversal" + val.id).button({
							icons : {
								primary : "ui-icon-arrowrefresh-1-s"
							},
							text: false
						}).click(function(e) {
							var url = "journalentries/" + val.transactionId + "?command=reverse";
							var width = 400;
							var height = 225;

							popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, reversingJournalEntrySuccessFunction);
							e.preventDefault();
						});
					}
				});
			}
			var transactionId = dataTransactionId;
			if (transactionId != "") {
				executeAjaxRequest('journalentries?transactionId='+transactionId, 'GET', "", getJournalEntriesByTransactionIdSuccessFunction, formErrorFunction);
			} else{
				executeAjaxRequest('journalentries', 'GET', "", getJournalEntriesByTransactionIdSuccessFunction, formErrorFunction);
			};	
		}
		
	}
	executeAjaxRequest('accountingrules?associations=all', 'GET', "", getAccountingRulesSuccessFunction, formErrorFunction);
}	

function handleJournalEntriesTabSelection(officesObject) {
	// get list of all offices and accounts and initialize the screen
	var getAccountsSuccessFunction = function(data, textStatus, jqXHR) {
		var baseObject = new Object();
		baseObject.offices = officesObject;
		baseObject.accounts = data;
		journalEntriesTabHtml = $("#journalEntriesTemplate").render(baseObject);
		$("#journalentry-tab").html(journalEntriesTabHtml);

		/** Account Id drop into a combo-box*/
		$("#accountId").combobox();

		/***yyyy-mm-dd format for date picker feilds***/
		$('.datepickerfieldforaccounting').datepicker({constrainInput: true, maxDate: 0, dateFormat: custom.datePickerDateFormat});

		/** Onclick function for adding a new Journal Entry */
		$("#addjournalentry").button({
			icons : {
				primary : "ui-icon-circle-plus"
			}
		}).click(function(e) {
			var getUrl = "";
			var putUrl = "journalentries";
			var templateSelector = "#journalEntryFormTemplate";
			var width = 800;
			var height = 500;

			var saveSuccessFunction = function(data, textStatus, jqXHR) {
				$("#dialog-form").dialog("close");
				searchForJournalEntries();
			}
			popupDialogWithFormViewData(baseObject, putUrl, 'POST', "dialog.title.journalEntry.add", templateSelector, width, height, saveSuccessFunction);
			//initialize default comboboxes in popup
			$("#debitAccountId1").combobox();
			$("#creditAccountId1").combobox();

			//init button for adding new debits
			var debitSize = $('#debits p').size() + 1;
			$("#addDebit").button({
			icons : {
				primary : "ui-icon-plusthick"
			},
			text: false
			}).click(function(e) {
				debitSize = debitSize + 1;
				baseObject.accountId = "debitAccountId" + debitSize;
				baseObject.amountId = "debitAmount" + debitSize;
				baseObject.deleteButtonId = "removeDebitButton" + debitSize;
				baseObject.activity = "Remove this Debit Entry";
				var debitTemplateHtml = $("#singleDebitOrCreditEntryTemplate").render(baseObject);
				$("#debits").append(debitTemplateHtml);
				//onclick funtion for newly added delete button
				
				// remove icon {icons : {primary : "ui-icon-cancel"},text:false} due to 
				$("#" + baseObject.deleteButtonId).button().click(function(e) {
					if( debitSize > 1 ) {
                        $(this).parents('p').remove();
                        debitSize --;
               		}
                	e.preventDefault();
				});
				//make newly added select a combobox
				$("#" + baseObject.accountId).combobox();
				e.preventDefault();
			});

			//init button for adding new credits
			var creditSize = $('#credits p').size() + 1;
			$("#addCredit").button({
			icons : {
				primary : "ui-icon-plusthick"
			},
			text: false
			}).click(function(e) {
				creditSize = creditSize + 1;
				baseObject.accountId = "creditAccountId" + creditSize;
				baseObject.amountId = "creditAmount" + creditSize;
				baseObject.deleteButtonId = "removeCreditButton" + creditSize;
				baseObject.activity = "Remove this credit Entry";
				var creditTemplateHtml = $("#singleDebitOrCreditEntryTemplate").render(baseObject);
				$("#credits").append(creditTemplateHtml);
				//onclick funtion for newly added delete button
				// remove icon {icons : {primary : "ui-icon-cancel"},text:false} due to 
				$("#" + baseObject.deleteButtonId).button().click(function(e) {
					if( creditSize > 1 ) {
                        $(this).parents('p').remove();
                        creditSize --;
               		}
                	e.preventDefault();
				});
				//make newly added select a combobox
				$("#" + baseObject.accountId).combobox();
				e.preventDefault();
			});
			e.preventDefault();
		});

		/** On-click function for searching for Journal Entries*/
		$("#searchjournalentries").button({
			icons : {
				primary : "ui-icon-search"
			}
		}).click(function(e) {
			searchForJournalEntries();
			e.preventDefault();
		});
	}
	executeAjaxRequest('glaccounts?manualEntriesAllowed=true&usage=1&disabled=false', 'GET', "", getAccountsSuccessFunction, formErrorFunction);

	var searchForJournalEntries = function() {
		var fromdate = $("#fromDate").val();
		var todate = $("#toDate").val();
		var onlyManualEntries = $('#onlyManualEntries').is(':checked');

		var data = {}
			if ($("#journalEntryOfficeId").val() != "") {
				data.officeId = $("#journalEntryOfficeId").val();
			}
			if ($("#accountId").val() != "") {
				data.glAccountId = $("#accountId").val();
			}
			if (onlyManualEntries) {
				data.manualEntriesOnly = true;
			}
			if (fromdate != undefined && fromdate != "") {
				data.fromDate = fromdate;
			}
			if (todate != undefined && todate != "") {
				data.toDate = todate;
			}	
			data.dateFormat= custom.helperFunctions.currentDateFormat();
            data.locale= custom.helperFunctions.currentLocale();	
		
		var journalEntriesTablesHtml = $("#journalEntriesTableTemplate").render();
		$("#journalentriessearchresults").html(journalEntriesTablesHtml);
		var oTable = $("#journalentriestable").dataTable(custom.jqueryDataTableServerSide.paginated("journalentriestable",data));
		initTableConf("journalentriestable",oTable);
	}
}

function handleGLClosuresTabSelection(officesObject) {
	var baseObject = new Object();
	baseObject.crudRows = officesObject;
	var accountingClosuresTabHtml = $("#glAccountClosuresTemplate").render(baseObject);
	$("#accountingclosure-tab").html(accountingClosuresTabHtml);

	/** Onclick function for adding a new Account Closure*/
	$("#addglclosure").button({
		icons : {
			primary : "ui-icon-circle-plus"
		}
	}).click(function(e) {
		var getUrl = "";
		var putUrl = "glclosures";
		var templateSelector = "#glAccountClosuresFormTemplate";
		var width = 600;
		var height = 400;

		// update currently selected div if onclick function succeeds
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
		}
		popupDialogWithFormViewData(baseObject, putUrl, 'POST', "dialog.title.glAccountClosure.add.account", templateSelector, width, height, saveSuccessFunction);
		e.preventDefault();
	});

	/** Onclick function for searching for GL Accounts */
	$("#searchglclosure").button({
		icons : {
			primary : "ui-icon-search"
		}
	}).click(function(e) {
		searchForClosures();
		e.preventDefault();
	});

	/** *function called on successfully fetching GL Closure details** */
	var glClosuresFetchSuccessFunction = function(data) {
		var glClosuresObject = new Object();
		glClosuresObject.crudRows = data;
		var accountingClosuresTablesHtml = $("#glAccountClosuresTableTemplate").render(glClosuresObject);
		$("#glaccountclosuressearchresults").html(accountingClosuresTablesHtml);
		oTable = displayListTable("closurestable");

		var editGLClosureSuccessFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			searchForClosures();
		}
		// initialize info/edit and delete buttons
		$.each(glClosuresObject.crudRows, function(i, val) {
			$("#glclosureinfo" + val.id).button({
				icons : {
					primary : "ui-icon-info"
				},
				text: false
			}).click(function(e) { {
					var width = 550;
					var height = 350;
					var templateSelector = "#glAccountClosuresInfoTemplate";
					popupDialogWithReadOnlyFormViewData(val,"dialog.title.glAccountClosure.view", templateSelector, width, height);
				}
				e.preventDefault();
			});
			$("#glclosureedit" + val.id).button({
				icons : {
					primary : "ui-icon-pencil"
				},
				text: false
			}).click(function(e) {
				var getUrl = 'glclosures/' + val.id;
				var putUrl = 'glclosures/' + val.id;
				var templateSelector = "#glAccountClosuresEditFormTemplate";
				var width = 600;
				var height = 450;

				popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.glAccountClosure.edit", templateSelector, width, height, editGLClosureSuccessFunction);
				e.preventDefault();
			});
			// button for delete
			$("#glclosuredelete" + val.id).button({
				icons : {
					primary : "ui-icon-trash"
				},
				text: false
			}).click(function(e) {
				var url = "glclosures/" + val.id;
				var width = 400;
				var height = 225;

				popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editGLClosureSuccessFunction);
				e.preventDefault();
			});
		});

	};

	var searchForClosures = function() {
		var officeId = $("#accountClosuresOfficeId").val();
		if (officeId != "") {
			executeAjaxRequest('glclosures?officeId=' + officeId, 'GET', "", glClosuresFetchSuccessFunction, formErrorFunction);
		} else {
			executeAjaxRequest('glclosures', 'GET', "", glClosuresFetchSuccessFunction, formErrorFunction);
		}
	}
}


function handleCOATabSelection(){
	//render coa tab
	var coaTabHtml = $("#chartOfAccountsTemplate").render();
	$("#coa-tab").html(coaTabHtml);

	var divToUpdate;
	var oTable;

	/** *function called on successfully fetching GL Account details** */
	var glAccountsFetchSuccessFunction =  function(data) {
		var glAccountsObject = new Object();
	    glAccountsObject.crudRows = data;
	    //function called on successfully updating a GL Account
	    var editGLAccountSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	handleCOATabSelection();
		}

	    // render the data in appropriate div
		var tableHtml = $("#accountsTableTemplate").render(glAccountsObject);
		$(divToUpdate).html(tableHtml);
		oTable=displayListTable("accountstable");

	    // initialize info/edit and delete buttons
	    $.each(glAccountsObject.crudRows, function(i, val) {
			      $("#glaccountinfo" + val.id).button({icons: {
	                primary: "ui-icon-info"},
					text: false
	                }).click(function(e){
                    {
                    var width = 600;
					var height = 350;
					var templateSelector = "#glAccountsInfoFormTemplate";
					popupDialogWithReadOnlyFormViewData(val,"dialog.title.glAccount.view", templateSelector, width, height);
                    }
				    e.preventDefault();
			      });
				  $("#glaccountedit" + val.id).button({icons: {
		            primary: "ui-icon-pencil"},
					text: false
		            }).click(function(e) {
					var getUrl = 'glaccounts/'+val.id+ '?template=true';
					var putUrl = 'glaccounts/'+val.id;
					var templateSelector = "#glAccountsFormTemplate";
					var width = 600; 
					var height = 450;

					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.glAccount.edit", templateSelector, width, height,  editGLAccountSuccessFunction);
					e.preventDefault();
				  });
				  // button for delete
				  $("#glaccountdelete" + val.id).button({icons: {
		            primary: "ui-icon-trash"},
					text: false
		            }).click(function(e){
					var url = "glaccounts/"+ val.id;
					var width = 400; 
					var height = 225;

					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editGLAccountSuccessFunction);
					e.preventDefault();
			      });
			      if($("#glaccountenable" + val.id).length){
				      $("#glaccountenable" + val.id).button({icons: {
			          primary: "ui-icon-unlocked"},
					  text: false
			          }).click(function(e){
					  var url = "glaccounts/"+ val.id;
					  var width = 400; 
					  var height = 225;
					  
					  var searializedArray= {};
					  searializedArray["disabled"]= false;
					  var jsonString =JSON.stringify(searializedArray);
					  
		
					  popupConfirmationDialogAndPost(url, 'PUT', 'dialog.title.confirmation.required', width, height, 0, editGLAccountSuccessFunction,jsonString);
					  e.preventDefault();
				      });
			      }
			      if($("#glaccountdisable" + val.id).length){
				      $("#glaccountdisable" + val.id).button({icons: {
			          primary: "ui-icon-locked"},
					  text: false
			          }).click(function(e){
					  var url = "glaccounts/"+ val.id;
					  var width = 400; 
					  var height = 225;
					  
					  var searializedArray= {};
					  searializedArray["disabled"]= true;
					  var jsonString =JSON.stringify(searializedArray);
		
					  popupConfirmationDialogAndPost(url, 'PUT', 'dialog.title.confirmation.required', width, height, 0, editGLAccountSuccessFunction,jsonString);
					  e.preventDefault();
				      });
			      }
			      
	    });

	};
	var glAccountsFetchSuccess = function (data) {
		var assetObject = new Object();
		assetObject.id = -1;
		assetObject.name = "ASSET";

		var liabilitiesObject = new Object();
		liabilitiesObject.id = -2;
		liabilitiesObject.name = "LIABILITY";

		var equitiyObject = new Object();
		equitiyObject.id = -3;
		equitiyObject.name = "EQUITY";

		var incomeObject = new Object();
		incomeObject.id = -4;
		incomeObject.name = "INCOME";

		var expenseObject = new Object();
		expenseObject.id = -5;
		expenseObject.name = "EXPENSE";
		var finalJson = [];
		finalJson.push(assetObject);
		finalJson.push(liabilitiesObject);
		finalJson.push(equitiyObject);
		finalJson.push(incomeObject);
		finalJson.push(expenseObject);
		
		for(i=0;i<data.length;i++){
			var currentObj = data[i];
			if (currentObj.type.value == "ASSET") {
				if (currentObj.parentId == null) {
					currentObj.parentId = -1;
				}
				if(currentObj.tagId != null) delete currentObj.tagId.id;
				delete currentObj.type.id;
				delete currentObj.usage.id;
				finalJson.push(currentObj);
			} else if (currentObj.type.value == "LIABILITY") {
				if (currentObj.parentId == null) {
					currentObj.parentId = -2;
				}
				if(currentObj.tagId != null) delete currentObj.tagId.id;
				delete currentObj.type.id;
				delete currentObj.usage.id;
				finalJson.push(currentObj);
			} else if (currentObj.type.value == "EQUITY") {
				if (currentObj.parentId == null) {
					currentObj.parentId = -3;
				}
				if(currentObj.tagId != null) delete currentObj.tagId.id;
				delete currentObj.type.id;
				delete currentObj.usage.id;
				finalJson.push(currentObj);
			} else if (currentObj.type.value == "INCOME") {
				if (currentObj.parentId == null) {
					currentObj.parentId = -4;
				}
				if(currentObj.tagId != null) delete currentObj.tagId.id;
				delete currentObj.type.id;
				delete currentObj.usage.id;
				finalJson.push(currentObj);
			} else if (currentObj.type.value == "EXPENSE") {
				if (currentObj.parentId == null) {
					currentObj.parentId = -5;
				}
				if(currentObj.tagId != null) delete currentObj.tagId.id;
				delete currentObj.type.id;
				delete currentObj.usage.id;
				finalJson.push(currentObj);
			}

		}
		var data = finalJson;
		// prepare the data
		var source =
		{
			datatype: "json",
			datafields: [
				{ name: 'id' },
				{ name: 'name' },
				{ name: 'parentId' }
			],
			id: 'id',
			localdata: data
		};
		// create data adapter.
		var dataAdapter = new $.jqx.dataAdapter(source);
		// perform Data Binding.
		dataAdapter.dataBind();
		var records = dataAdapter.getRecordsHierarchy('id', 'parentId', 'items', [{ name: 'name', map: 'label'}]);
		$('#coatabs-tree').jqxTree({ source: records, width: '100%' });
	}

	var finalObjectSentForTreeView;
	/** Onclick function for adding a new GL Account */
	$("#addglaccount").button({icons: {
	    primary: "ui-icon-circle-plus"}
	    }).click(function(e){
	    var selected = 0;
    	if ($("input[name='radio']:checked").val() == 'listView') {
			selected = $("#coatabs-main").tabs('option', 'active');
		} else if ($("input[name='radio']:checked").val() == 'treeView') {
			var selectedAccountHead = $("#coatabs-tree").jqxTree('selectedItem');
			if (selectedAccountHead != null) {
				for(i=0;i<finalObjectSentForTreeView.length;i++) {
					var currentObj = finalObjectSentForTreeView[i];
					if(selectedAccountHead.id == currentObj.id)	{
						if (currentObj.parentType == "ASSET") {
							selected = 1;
						} else if (currentObj.parentType == "LIABILITY") {
							selected = 2;
						} else if (currentObj.parentType == "EQUITY") {
							selected = 3;
						} else if (currentObj.parentType == "INCOME") {
							selected = 4;
						} else if (currentObj.parentType == "EXPENSE") {
							selected = 5;
						}
					}
				} 
			}else {
				selected = 0;
			}
		}
	  	var getUrl = 'glaccounts/template?type='+selected;
		var putUrl = "glaccounts";
		var templateSelector = "#glAccountsFormTemplate";
		var width = 600; 
		var height = 400;

		// update currently selected div if onclick function succeeds
		var saveSuccessFunction = function(data, textStatus, jqXHR) {
		  	$("#dialog-form").dialog("close");
		  	if ($("input[name='radio']:checked").val() == 'listView') {
				$(divToUpdate).html('');
		  		fetchGLAccount(selected);
			} else if ($("input[name='radio']:checked").val() == 'treeView') {
				executeAjaxRequest('glaccounts', 'GET', "", glAccountsFetchSuccess, formErrorFunction);
			}
		}

		popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.glAccountsFormTemplate.add.account", templateSelector, width, height,  saveSuccessFunction);
	    e.preventDefault();
	});
$( "#glaccountsview").buttonset();
	/**
	 * Make a call to fetch details of appropriate GL Accounts on click of
	 * sub-tab of GL Accounts (All, ASSET, LIABILITY, EQUITY, INCOME, EXPENSES)
	 */
	$("#coatabs-main").tabs({
			beforeActivate: function(event, tab) {
				/**
				 * clear previous div contents on selection change to avoid
				 * datatable refresh issue*
				 */
				$(divToUpdate).html('');
				fetchGLAccount(tab.newTab.index());
		 }
	});

	$("input[name='radio']").change(function() {
		if ($("input[name='radio']:checked").val() == 'listView') {
			$("#coatabs-tree").hide();
			$("#coatabs-main").show();
		} else if ($("input[name='radio']:checked").val() == 'treeView') {
			$("#coatabs-main").hide();
			$("#coatabs-tree").show();
			var glAccountsFetchSuccess = function (data) {
				var assetObject = new Object();
				assetObject.id = -1;
				assetObject.name = "ASSET";
				assetObject.parentType = "ASSET";

				var liabilitiesObject = new Object();
				liabilitiesObject.id = -2;
				liabilitiesObject.name = "LIABILITY";
				liabilitiesObject.parentType = "LIABILITY";

				var equitiyObject = new Object();
				equitiyObject.id = -3;
				equitiyObject.name = "EQUITY";
				equitiyObject.parentType = "EQUITY";

				var incomeObject = new Object();
				incomeObject.id = -4;
				incomeObject.name = "INCOME";
				incomeObject.parentType = "INCOME";

				var expenseObject = new Object();
				expenseObject.id = -5;
				expenseObject.name = "EXPENSE";
				expenseObject.parentType = "EXPENSE";
				var finalJson = [];
				finalJson.push(assetObject);
				finalJson.push(liabilitiesObject);
				finalJson.push(equitiyObject);
				finalJson.push(incomeObject);
				finalJson.push(expenseObject);
				
				for(i=0;i<data.length;i++){
					var currentObj = data[i];
					if (currentObj.type.value == "ASSET") {
						if (currentObj.parentId == null) {
							currentObj.parentId = -1;
						}
						currentObj.parentType = "ASSET";
						if(currentObj.tagId != null) delete currentObj.tagId.id;
						delete currentObj.type.id;
						delete currentObj.usage.id;
						finalJson.push(currentObj);
					} else if (currentObj.type.value == "LIABILITY") {
						if (currentObj.parentId == null) {
							currentObj.parentId = -2;
						}
						currentObj.parentType = "LIABILITY";
						if(currentObj.tagId != null) delete currentObj.tagId.id;
						delete currentObj.type.id;
						delete currentObj.usage.id;
						finalJson.push(currentObj);
					} else if (currentObj.type.value == "EQUITY") {
						if (currentObj.parentId == null) {
							currentObj.parentId = -3;
						}
						currentObj.parentType = "EQUITY";
						if(currentObj.tagId != null) delete currentObj.tagId.id;
						delete currentObj.type.id;
						delete currentObj.usage.id;
						finalJson.push(currentObj);
					} else if (currentObj.type.value == "INCOME") {
						if (currentObj.parentId == null) {
							currentObj.parentId = -4;
						}
						currentObj.parentType = "INCOME";
						if(currentObj.tagId != null) delete currentObj.tagId.id;
						delete currentObj.type.id;
						delete currentObj.usage.id;
						finalJson.push(currentObj);
					} else if (currentObj.type.value == "EXPENSE") {
						if (currentObj.parentId == null) {
							currentObj.parentId = -5;
						}
						currentObj.parentType = "EXPENSE";
						if(currentObj.tagId != null) delete currentObj.tagId.id;
						delete currentObj.type.id;
						delete currentObj.usage.id;
						finalJson.push(currentObj);
					}

				}
				var data = finalJson;
				finalObjectSentForTreeView = finalJson;
                // prepare the data
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'id' },
                        { name: 'name' },
                        { name: 'parentId' }
                    ],
                    id: 'id',
                    localdata: data
                };
                // create data adapter.
                var dataAdapter = new $.jqx.dataAdapter(source);
                // perform Data Binding.
                dataAdapter.dataBind();
                var records = dataAdapter.getRecordsHierarchy('id', 'parentId', 'items', [{ name: 'name', map: 'label'}]);
                $('#coatabs-tree').jqxTree({ source: records, width: '100%' });
			}
			executeAjaxRequest('glaccounts', 'GET', "", glAccountsFetchSuccess, formErrorFunction);
		};
	});

	var fetchGLAccount = function (index){
		if (index == 0)
		{
			divToUpdate="#coatabs-all";
			executeAjaxRequest('glaccounts', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// assets tab selected
		if (index == 1)
		{
			divToUpdate="#coatabs-asset";
			executeAjaxRequest('glaccounts?type=1', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// liabilities tab selected
		if (index == 2)
		{
			divToUpdate="#coatabs-liabilities";
			executeAjaxRequest('glaccounts?type=2', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// equity tab selected
		if (index == 3)
		{
			divToUpdate="#coatabs-equity";
			executeAjaxRequest('glaccounts?type=3', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// income tab selected
		if (index == 4)
		{
			divToUpdate="#coatabs-income";
			executeAjaxRequest('glaccounts?type=4', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
		// expenses tab selected
		if (index == 5)
		{
			divToUpdate="#coatabs-expenses";
			executeAjaxRequest('glaccounts?type=5', 'GET', "", glAccountsFetchSuccessFunction, formErrorFunction);
		}
	}



	//determine which tab is initially selected and reload data for the same
	var selected = $("#coatabs-main").tabs('option', 'active');
	fetchGLAccount(selected);
}

//Handle Code Value Create and Update

function editCodeValueFunction(linkId, tableName){

    var entityId = linkId.replace("editcodevalue", "");
    var getUrl = tableName + "s/" + entityId + "/codevalues";
    var submitType = "GET";
    var dialogTitle = 'dialog.title.add.edit.code.value';
    var templateSelector = "#codeValueFormTemplate";
    var dialogWidth = 700;
    var dialogHeight = 500;

    var clearErrorsClass = function(){
        //clear previous error messages
        
        $(':input','#entityform').removeClass("ui-state-error");
        $('table td .ui-state-error').removeClass("ui-state-error");
    }

    var refreshCodeValues = function(data){
        //Load Code Values separately
        var codeValueFormDiv = $('#codeValue-table');
        var formHtml = $('#codeValueTableTemplate').render(data);
        codeValueFormDiv.html(formHtml);

        $(".codeValueName").editable(function(value, settings){
                $('#formerrors').html("");
                clearErrorsClass();                               
                value = value.trim();
                var ele = this;
                var searializedArray= {};
                var codeValueId = $(ele).prop("id").replace('name', "");
                searializedArray['name']= value;

                var jsonString =JSON.stringify(searializedArray);
                var codeValuesPostUrl = getUrl + '/' + codeValueId;
                var codeValueSubmitType = "PUT";
                var original = this.revert;
                var errorFormFunction = function(jqXHR, textStatus, errorThrown){
                    $('#formerrors').html("");
                    //Revert original value if error in response
                    $(ele).text(original);
                    formErrorFunction(jqXHR, textStatus, errorThrown);
                    clearErrorsClass();
                    $(ele).addClass("ui-state-error");
                }

                var updateSuccess = function(data, textStatus, jqXHR){
                    $('#formerrors').html("");
                    clearErrorsClass();
                    $(ele).text(value);
                }

                executeAjaxRequest(codeValuesPostUrl, codeValueSubmitType, jsonString, updateSuccess, errorFormFunction);
                return("");
            },
            {
                type: 'text',
                cancel: 'Cancel',
                submit: 'Update',
                placeholder: '',
                width: 150,
		height: 25
        });

        $(".codeValuePosition").editable(function(value, settings){
                //clear previous error messages
                $('#formerrors').html("");
                clearErrorsClass();
                value = value.trim();
                var ele = this;
                var searializedArray= {};
                var codeValueId = $(this).prop("id").replace('position', "");
                searializedArray['position']= value;

                var jsonString =JSON.stringify(searializedArray);
                var codeValuesPostUrl = getUrl + '/' + codeValueId;
                var codeValueSubmitType = "PUT";
                var original = this.revert;

                var errorFormFunction = function(jqXHR, textStatus, errorThrown){
                    //clear previous error messages
                    $('#formerrors').html("");
                    //Revert original value if error in response
                    $(ele).text(original);
                    
                    formErrorFunction(jqXHR, textStatus, errorThrown);
                    
                    clearErrorsClass();
                    $(ele).addClass("ui-state-error");
                }

                var updateSuccess = function(data, textStatus, jqXHR){
                    $('#formerrors').html("");
                    clearErrorsClass();
                    $(ele).text(value);
                }

                executeAjaxRequest(codeValuesPostUrl, codeValueSubmitType, jsonString, updateSuccess, errorFormFunction);

                return("");
            },
            {
                type: 'text',
                cancel: 'Cancel',
                submit: 'Update',
                placeholder: '',
                width: 100,
		height: 25
        });
        
        $('.deleteCodeValue').button().click(function(e){
            $('#formerrors').html("");
            clearErrorsClass();
            var codeValueId = $(this).prop("id").replace('deleteCodeValue', "");
            var codeValuesPostUrl = getUrl + '/' + codeValueId;
            var codeValueSubmitType = "DELETE";

            var errorFormFunction = function(jqXHR, textStatus, errorThrown){
                //clear previous error messages
                $('#formerrors').html("");
                var dialogErrordiv = $( '<div id="dialog-confirm" title="Errors"> </div>');
				 dialogErrordiv.dialog({
						resizable: true,
						height:200,
						width:400,
						modal: true,
						buttons: {
							Cancel: function() {
								$( this ).dialog( "close" );
							}
						},
						close: function() {
						},
						open: function (event, ui) {
							var errorHtml = $("#codeValueErrorDialogFormTemplate").render();
							dialogErrordiv.html(errorHtml);
						}
					}).dialog('open');
            }

            var updateSuccess = function(data, textStatus, jqXHR){
                $('#formerrors').html("");
                var getsuccessFunction = function(data, textStatus, jqXHR){
                    var codeValues = new Object();
                    codeValues.crudRows = data;
                    refreshCodeValues(codeValues);
                }
                executeAjaxRequest(getUrl, "GET", "", getsuccessFunction, formErrorFunction);
            }

            executeAjaxRequest(codeValuesPostUrl, codeValueSubmitType, null, updateSuccess, errorFormFunction);
            e.preventDefault();
        });


    }

    var successFunction = function(data, textStatus, jqXHR) {

        var codeValues = new Object();
        codeValues.crudRows = data;
        codeValues.codeId = entityId;
        popupDialogWithReadOnlyFormViewData(codeValues, dialogTitle, templateSelector, dialogWidth, dialogHeight, "dialog.button.close");
        refreshCodeValues(codeValues);
        $("#addCodeValue"+entityId).button().click(function(e){
            clearErrorsClass();
            //clear previous error messages
            $('#formerrors').html("");
            var newFormData = JSON.stringify($('#entityform').serializeObject());

            var addsuccessFunction =  function(data, textStatus, jqXHR) {
                $(':input','#entityform').val('');
                var codeValuesuccessFunction = function(data, textStatus, jqXHR){
                    var codeValues = new Object();
                    codeValues.crudRows = data;
                    refreshCodeValues(codeValues);
                }
                executeAjaxRequest('codes/' + entityId + '/codevalues', "GET", "", codeValuesuccessFunction, formErrorFunction);

            };

            executeAjaxRequest('codes/' + entityId + '/codevalues', "POST", newFormData, addsuccessFunction, formErrorFunction);

           e.preventDefault();
        });

    }

    executeAjaxRequest(getUrl, "GET", "", successFunction, formErrorFunction);

}


function setReportingContent(divName) {

	var htmlVar = '<table id=toptable>';
 	htmlVar += '<tr>';
 	htmlVar += '  <td valign="top"><div id=myListOfReports></div></td>';
 	htmlVar += '  <td width="100px"></td>';
 	htmlVar += '  <td valign="bottom">';
 	htmlVar += '		<select id=decimalsChoice onChange="selectNewDecimals(options[selectedIndex].value)" >';
 	htmlVar += '		<option value="" selected="selected">' + doI18N("reporting.decimals") + '</option>';
 	htmlVar += '		<option value="4">4</option>';
 	htmlVar += '		<option value="3">3</option>';
 	htmlVar += '		<option value="2">2</option>';
 	htmlVar += '		<option value="1">1</option>';
 	htmlVar += '		<option value="0">0</option>';
 	htmlVar += '		<option value="-1">-1</option>';
 	htmlVar += '		<option value="-2">-2</option>';
 	htmlVar += '		<option value="-3">-3</option>';
 	htmlVar += '		</select>';
 	htmlVar += '   </td>';
 	htmlVar += '  <td valign="bottom">';
 	htmlVar += '		<select id=decimalsThousandsSep onChange="selectNewThousandsSep(options[selectedIndex].value)" >';
 	htmlVar += '		<option value="" selected="selected">' + doI18N("reporting.format") + '</option>';
 	htmlVar += '		<option value=",.">1,234,567.89</option>';
 	htmlVar += '		<option value=".,">1.234.567,89</option>';
 	htmlVar += '		<option value=" ,">1 234 567,89</option>';
 	htmlVar += '		<option value=" .">1 234 567.89</option>';
 	htmlVar += '		<option value=".' + "'" + '">1.234.567' + "'" + '89</option>';
 	htmlVar += '		<option value="' + "'" + ',">1'+ "'" + '234' + "'" + '567,89</option>';
 	htmlVar += '		<option value="INDIAN">Indian 12,34,567.89</option>';
 	htmlVar += '		<option value="NONE">None 1234567.89</option>';
 	htmlVar += '		</select>';
 	htmlVar += '   </td>';
 	htmlVar += '  <td valign="top"><div id=myRunReportButton></div></td>';
 	htmlVar += '  <td valign="top"><div id=myClearReportButton></div></td>';
 	htmlVar += '  <td valign="bottom"><div id=reportOutputOptionsDiv></div></td>';
 	htmlVar += '</tr>';
 	htmlVar += '</table>';
 	htmlVar += '<div id=myInputParameters></div>';
 	htmlVar += '<div id=myOutput></div>'; 

	$("#" + divName).html(htmlVar);
}

function setAccountSettingsContent(divName) {

	var htmlVar = '<div id="tabs">';
	htmlVar += '	<ul>';
	htmlVar += '		<li><a href="#settingstab" title="settings">' + doI18N("tab.settings") + '</a></li>';
	htmlVar += '	</ul>';
	htmlVar += '	<div id="settings"></div>';
	htmlVar += '</div>';

	$("#" + divName).html(htmlVar);
}

$.urlConstructor = function(sSource,oSettings){
	if(typeof oSettings.aaSorting[0] ==='undefined')
	{
		return baseApiUrl + sSource;
	}else
		return baseApiUrl + sSource +"?orderBy="+oSettings.aoColumns[(oSettings.aaSorting[0][0])].mDataProp+"&sortOrder="+oSettings.aaSorting[0][1];

}

$.prepareDataToSend = function(oSettings, data){
	
	var jsonData = {
			offset:oSettings._iDisplayStart,
			limit:oSettings._iDisplayLength,
	};

	if(oSettings.oPreviousSearch.sSearch !="")
	{
		var searchValue = oSettings.oPreviousSearch.sSearch;
		jsonData.sqlSearch = custom.searchQuery[oSettings.sInstance](searchValue);
	}
	//not appropriate here 
	if($("#officeId").val()!= undefined)
	{
		jsonData.underHierarchy =  encodeURIComponent($("#officeId").val())
	}
	$.extend(jsonData,data);
	return jsonData;
}

var serverData = function(data)
{
	 return function (sSource, aoData, fnCallback, oSettings) {
		 oSettings.jqXHR = $.ajax({ 
							url : $.urlConstructor(sSource,oSettings),
							type : "GET", //POST, GET, PUT or DELETE 
							contentType : "application/json; charset=utf-8", 
							dataType : 'json', 
							data : $.prepareDataToSend(oSettings,data), 
							cache : false, 
							beforeSend : function(xhr) { 
									if (tenantIdentifier > "") xhr.setRequestHeader("X-Mifos-Platform-TenantId", tenantIdentifier); 
									if (base64 > "") xhr.setRequestHeader("Authorization", "Basic " + base64); 
								}, 
							success : function (json) {
				            	var data = {
				            		iTotalRecords : 200, //no need of this
				            		iTotalDisplayRecords : json.totalFilteredRecords,
				            		//sEcho:3, //this should be matched
				            		aaData:json.pageItems
				            	};				                         
				                fnCallback(data);
				            }
						}); 
    }
}

var initTableConf = function (tableId,oTable)
{
	//Unbind search functoin on keypress
	$("#"+tableId+"_filter input").unbind();
	//Bind search function on enter key
	$("#"+tableId+"_filter input").bind('keyup', function(e) {
   			if(e.keyCode == 13) {
    			oTable.fnFilter(this.value);   
			}
		}); 
}

function showILClientListing(divName) {

	if (jQuery.MifosXUI.showTask("clientSearch") == false)
	{
		alert(doI18N("client.search.not.allowed"));
		return;
	}

	setClientListingContent(divName);

	//HOME list clients functionality
	$("#tabs").tabs({
	    beforeActivate: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    create: function(event, ui) {

			var initClientSearch =  function() {  	
			//render page markup
			var tableHtml = $("#clientSearchTabTemplate").render();
			$("#searchtab").html(tableHtml);

			var clientsTableHtml = $("#clientsTableTemplate").render();
			$("#clientTableDiv").html(clientsTableHtml);

			var oTable = $("#clientstable").dataTable(custom.jqueryDataTableServerSide.paginated("clientstable"));
			initTableConf("clientstable",oTable);

			//fetch all Offices 
			var officeSearchSuccessFunction =  function(data) {
				var officeSearchObject = new Object();
			    officeSearchObject.crudRows = data;
				var tableHtml = $("#officesDropdownTemplate").render(officeSearchObject);
				$("#clientstablecustom").html(tableHtml);

				// add client filter behaviour
				$("#officeId").change(function(){
					oTable.fnDraw();
				})
		  	};
		  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);			
	    };
	  	  //initialize the client search tab
		 initClientSearch();
	 }
	});

	var addClientSuccessFunction = function(data, textStatus, jqXHR) {
		  $('#dialog-form').dialog("close");
		  
		  if (data.resourceId) {
			  showILClient(data.resourceId);
		  } else {
			  showILClientListing("content");
		  }
	}
	
	$("#addclient").button().click(function(e) {
		var getUrl = 'clients/template';
		var postUrl = 'clients';
		var templateSelector = "#clientFormTemplate";
		var width = 600; 
		var height = 350;
		
		popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.add.client', templateSelector, width, height, addClientSuccessFunction);
		
	    e.preventDefault();
	});
} // end showILClientListing

//HOME list centers functionality
function showCenterListing(){

	if (jQuery.MifosXUI.showTask("groupSearch") == false)
	{
		alert(doI18N("group.search.not.allowed"));
		return;
	}

	setCenterListingContent("content");

	$("#tabs").tabs({
	    beforeActivate: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    create: function(event, ui) {
			var initSearch =  function() {
				//render page markup
				var tableHtml = $("#centerManageTabTemplate").render();
				$("#searchtab").html(tableHtml);
				
				//fetch all Offices 
				var officeSearchSuccessFunction =  function(data) {
					var officeSearchObject = new Object();
				    officeSearchObject.crudRows = data;
					var tableHtml = $("#allOfficesListTemplate").render(officeSearchObject);
					$("#officesInScopeDiv").html(tableHtml);
			  	};
			  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);
				
				//render group drop down data
				var centerSearchSuccessFunction =  function(data) {
					var centerSearchObject = new Object();
				    centerSearchObject.crudRows = data;
					var tableHtml = $("#allCentersListTemplate").render(centerSearchObject);
					$("#centersInScopeDiv").html(tableHtml);
			  	};
				executeAjaxRequest('centers/?underHierarchy=.', 'GET', "", centerSearchSuccessFunction, formErrorFunction);
	  			
	    		//search group functionality
				var searchSuccessFunction =  function(data) {
					var groupSearchObject = new Object();
				    groupSearchObject.crudRows = data;
					var tableHtml = $("#groupsTableTemplate").render(groupSearchObject);
					$("#groupTableDiv").html(tableHtml);
				    var oTable=displayListTable("groupstable");
			  	};
				
				//initialize search button				
				$("#searchGroupBtn").button({
					icons: {
		                primary: "ui-icon-search"
		            }
		         }).click(function(e){
		         	//get selected office
		         	var officeHierarchy = $("#officeId").val();
		         	//get search parameter
					var searchValue = $("#groupSearchInput").val();
					searchValue = searchValue.replace("'", "''");
					//office hierarchy dropdown does not appear for branch users
					var sqlSearchValue = "name like '%" + searchValue + "%'"; 
					if(officeHierarchy){
						executeAjaxRequest("groups?sqlSearch=" + encodeURIComponent(sqlSearchValue)+ "&underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", searchSuccessFunction, formErrorFunction);
					}else{
						executeAjaxRequest("groups?sqlSearch=" + encodeURIComponent(sqlSearchValue), 'GET', "", searchSuccessFunction, formErrorFunction);
					}
					e.preventDefault();
			   	});
	    	};

	    	initSearch();
	    }
	});
}

//HOME list groups functionality
function applyGroupSearchFilter(officeHierarchy) {
	//re-render group drop down data
	var searchSuccessFunction =  function(data) {
		var searchObject = new Object();
		searchObject.crudRows = data;
		var tableHtml = $("#allGroupsDropdownTemplate").render(searchObject);
		$("#groupsInScopeDiv").html(tableHtml);
	};
	var sqlSearchValue = "o.hierarchy like '"+ officeHierarchy +"%'";
	executeAjaxRequest("groups?underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", searchSuccessFunction, formErrorFunction);
}


//generic UI/dialog components 
function gernericDialog(dialogDiv, dialogTitleCode, width, height, onOpenFunc, onSaveFunc) {
	var saveButton = doI18N('dialog.button.save');
	var cancelButton = doI18N('dialog.button.cancel');
	
	var buttonsOpts = {};
	buttonsOpts[saveButton] = onSaveFunc;
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	
	dialogDiv.dialog({
  		title: doI18N(dialogTitleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: onOpenFunc
  	}).dialog('open');
}

// standard group form (group + clients, no parents)
function loadGroupForm(container, officeId, templateIdentifier) {
	
	var renderOnSuccessFunction = function(data, textStatus, jqXHR) {
		var formHtml = $(templateIdentifier).render(data);
		container.html(formHtml);
		
		$("#dialog-form #officeId").change(function() {
			var selectedValue = $(this).find(":selected").val();
			loadGroupForm(container, selectedValue, templateIdentifier);
		});

		$('.multiadd').click(function() {  
			return !$('.multiNotSelectedItems option:selected').remove().appendTo('#clientMembers');  
		});
		
		$('.multiremove').click(function() {  
			return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');  
		});
		
		$('.datepickerfield').datepicker({constrainInput: true, dateFormat: custom.datePickerDateFormat});
		
		$("#entityform textarea").first().focus();
		$('#entityform input').first().focus();

		$("#activeCheckbox").change(function() {
			var selected = this.checked;
			if (selected) {
				$("#activationDate").removeAttr("disabled");
			} else {
				$("#activationDate").val("");
				$("#activationDate").attr("disabled", "disabled");
			}
		});

		$('input:checkbox[id=activeCheckbox]').trigger('change');
	};
	
	executeAjaxRequest('groups/template?officeId=' + officeId, 'GET', "", renderOnSuccessFunction, formErrorFunction);
}

function saveGroup(divContainer, groupId) {
	var serializationOptions = {};
	serializationOptions["checkboxesAsBools"] = true;
	
	var serializedArray = {};
	serializedArray = $('#entityform').serializeObject(serializationOptions);
	
	var newFormData = JSON.stringify(serializedArray);
	
	var successFunction =  function(data, textStatus, jqXHR) {
		divContainer.dialog("close");

		if (groupId === undefined || groupId == null) {
			groupId = data.resourceId;
		}
		showGroup(groupId);
	};
	
	if (groupId) {
		executeAjaxRequest('groups/' + groupId, "PUT", newFormData, successFunction, formErrorFunction);
	} else {
		executeAjaxRequest('groups', "POST", newFormData, successFunction, formErrorFunction);	
	}
}

var launchStandardGroupDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	
	var dialogDiv = $("<div id='dialog-form'></div>");

	var groupId = data.id;
	
	var templateIdentifier = "#standardGroupFormTemplate";
	if (groupId) {
		templateIdentifier = "#standardGroupEditFormTemplate";
	}
	
	var openGroupDialogFunc = function (event, ui) {
		var formHtml = $(templateIdentifier).render(data);
		$("#dialog-form").html(formHtml);
		
		$("#dialog-form #officeId").change(function() {
			var selectedValue = $(this).find(":selected").val();
			loadGroupForm(dialogDiv, selectedValue, templateIdentifier);
		});
		
		$('.multiadd').click(function() {  
			return !$('.multiNotSelectedItems option:selected').remove().appendTo('#clientMembers');  
		});
		
		$('.multiremove').click(function() {  
			return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');  
		});
		
		$('.datepickerfield').datepicker({constrainInput: true, dateFormat: custom.datePickerDateFormat});
		
		$("#entityform textarea").first().focus();
		$('#entityform input').first().focus();

		$("#activeCheckbox").change(function() {
			var selected = this.checked;
			if (selected) {
				$("#activationDate").removeAttr("disabled");
			} else {
				$("#activationDate").val("");
				$("#activationDate").attr("disabled", "disabled");
			}
		});

		$('input:checkbox[id=activeCheckbox]').trigger('change');
	}
	
	var saveNewGroupFunc = function() {
		saveGroup(dialogDiv, groupId);
	};
	
	var dialog = null;
	if (groupId) {
		dialog = gernericDialog(dialogDiv, 'dialog.title.edit.group', 900, 450, openGroupDialogFunc, saveNewGroupFunc);	
	} else {
		dialog = gernericDialog(dialogDiv, 'dialog.title.add.group', 900, 450, openGroupDialogFunc, saveNewGroupFunc);
	}
};

var launchCenterGroupDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	
	var dialogDiv = $("<div id='dialog-form'></div>");

	var groupId = data.id;
	
	var templateIdentifier = "#centerGroupFormTemplate";
	if (groupId) {
		templateIdentifier = "#centerGroupEditFormTemplate";
	}
	
	var openGroupDialogFunc = function (event, ui) {
		var formHtml = $(templateIdentifier).render(data);
		$("#dialog-form").html(formHtml);
		
		$("#dialog-form #officeId").change(function() {
			var selectedValue = $(this).find(":selected").val();
			loadGroupForm(dialogDiv, selectedValue, templateIdentifier);
		});
		
		$('.multiadd').click(function() {  
			return !$('.multiNotSelectedItems option:selected').remove().appendTo('#clientMembers');  
		});
		
		$('.multiremove').click(function() {  
			return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');  
		});
		
		$('.datepickerfield').datepicker({constrainInput: true, dateFormat: custom.datePickerDateFormat});
		
		$("#entityform textarea").first().focus();
		$('#entityform input').first().focus();

		$("#activeCheckbox").change(function() {
			var selected = this.checked;
			if (selected) {
				$("#activationDate").removeAttr("disabled");
			} else {
				$("#activationDate").attr("disabled", "disabled");
			}
		});

		$('input:checkbox[id=activeCheckbox]').trigger('change');
	}
	
	var saveNewGroupFunc = function() {
		saveGroup(dialogDiv, groupId);
	};

	var dialog = null;
	if (groupId) {
		dialog = gernericDialog(dialogDiv, 'dialog.title.edit.group', 900, 500, openGroupDialogFunc, saveNewGroupFunc);	
	} else {
		dialog = gernericDialog(dialogDiv, 'dialog.title.add.group', 900, 500, openGroupDialogFunc, saveNewGroupFunc);
	}
};

function launchGroupDialog(groupId) {
	
	if (groupId) {
		executeAjaxRequest('groups/' + groupId + '?template=true&associations=clientMembers', 'GET', "", launchStandardGroupDialogOnSuccessFunction, formErrorFunction);
	} else {
		executeAjaxRequest('groups/template', 'GET', "", launchStandardGroupDialogOnSuccessFunction, formErrorFunction);		
	}
}

function saveAssociateClientsToGroup(divContainer, groupId) {
	var serializationOptions = {};
	
	$('#notSelectedClients option').each(function(i) {
		$(this).prop("selected", "selected");
	});
	$('#clientMembers option').each(function(i) {
		$(this).prop("selected", "selected");
	});
	
	var serializedArray = {};
	serializedArray = $('#entityform').serializeObject(serializationOptions);
	
	var newFormData = JSON.stringify(serializedArray);
	
	var successFunction =  function(data, textStatus, jqXHR) {
		divContainer.dialog("close");
		showGroup(groupId);
	};
	executeAjaxRequest('groups/' + groupId + '?command=associateClients', "POST", newFormData, successFunction, formErrorFunction);
}

var launchAssociateClientsToGroupDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	
	var dialogDiv = $("<div id='dialog-form'></div>");

	var groupId = data.id;
	
	var templateIdentifier = "#associateClientsToGroupFormTemplate";
	
	var openAssociateClientsToGroupDialogFunc = function (event, ui) {
		var formHtml = $(templateIdentifier).render(data);
		$("#dialog-form").html(formHtml);
		
		$('.multiadd').click(function() {  
			return !$('.multiNotSelectedItems option:selected').remove().appendTo('#clientMembers');  
		});
		
		$('.multiremove').click(function() {  
			return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');  
		});
		
		$("#entityform textarea").first().focus();
		$('#entityform input').first().focus();
	}
	
	var saveAssociateClientsToGroupFunc = function() {
		saveAssociateClientsToGroup(dialogDiv, groupId);
	};

	var dialog = gernericDialog(dialogDiv, 'dialog.title.associate.clients', 900, 500, openAssociateClientsToGroupDialogFunc, saveAssociateClientsToGroupFunc);	
}

function associateClientsToGroup(groupId){
	executeAjaxRequest('groups/' + groupId + '?template=true&associations=clientMembers', 'GET', "", launchAssociateClientsToGroupDialogOnSuccessFunction, formErrorFunction);	
}

function launchCenterGroupDialog(groupId) {
	
	if (groupId) {
		executeAjaxRequest('groups/' + groupId + '?template=true&associations=clientMembers', 'GET', "", launchCenterGroupDialogOnSuccessFunction, formErrorFunction);
	} else {
		executeAjaxRequest('groups/template', 'GET', "", launchCenterGroupDialogOnSuccessFunction, formErrorFunction);		
	}
}

function showNewCenterListing(){

	//Add centerSearch to MifosXUI
	if (jQuery.MifosXUI.showTask("CenterSearch") == false)
	{
		alert(doI18N("center.search.not.allowed"));
		return;
	}

	setNewCenterListingContent("content");

	//HOME list clients functionality
	$("#tabs").tabs({
	    beforeActivate: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    create: function(event, ui) {

	    var initCenterSearch =  function() {
			//render page markup
			var tableHtml = $("#centerSearchTabTemplate").render();
			$("#searchtab").html(tableHtml);
			
			var centerTableHtml = $("#centerTableTemplate").render();
			$("#centerTableDiv").html(centerTableHtml);
			
			var oTable = $("#centerstable").dataTable(custom.jqueryDataTableServerSide.paginated("centerstable"));
			initTableConf("centerstable",oTable);
			
			//fetch all Offices 
			var officeSearchSuccessFunction =  function(data) {
				var officeSearchObject = new Object();
			    officeSearchObject.crudRows = data;
				var tableHtml = $("#officesDropdownTemplate").render(officeSearchObject);
				$("#centerstablecustom").html(tableHtml);

				// add center filter behaviour
				$("#officeId").change(function(){
					oTable.fnDraw();
				})
		  	};
		  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);
	    };
	    
	    initCenterSearch();
	 }
	});

	$("#addCenter").button().click(function(e) {
		addCenter();
	    e.preventDefault();
	});
}

function showGroupListing(){

	if (jQuery.MifosXUI.showTask("groupSearch") == false)
	{
		alert(doI18N("group.search.not.allowed"));
		return;
	}

	setGroupListingContent("content");

	//HOME list clients functionality
	$("#tabs").tabs({
	    beforeActivate: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    create: function(event, ui) {

	    var initGroupSearch =  function() {
			//render page markup
			var tableHtml = $("#groupSearchTabTemplate").render();
			$("#searchtab").html(tableHtml);
			
			var groupTableHtml = $("#groupTableTemplate").render();
			$("#groupTableDiv").html(groupTableHtml);

			var oTable = $("#groupstable").dataTable(custom.jqueryDataTableServerSide.paginated("groupstable"));
			initTableConf("groupstable",oTable);
			
			//fetch all Offices 
			var officeSearchSuccessFunction =  function(data) {
				var officeSearchObject = new Object();
			    officeSearchObject.crudRows = data;
				var tableHtml = $("#officesDropdownTemplate").render(officeSearchObject);
				$("#groupstablecustom").html(tableHtml);

				// add client filter behaviour
				$("#officeId").change(function(){
					oTable.fnDraw();
				})
		  	};
		  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);					
	    };
	    
	    initGroupSearch();
	 }
	});

	$("#addstandardgroup").button().click(function(e) {
		launchGroupDialog();
	    e.preventDefault();
	});
}


function showLoansListing() {

	if (jQuery.MifosXUI.showTask("loanSearch") == false)
	{
		alert(doI18N("loan.search.not.allowed"));
		return;
	}

	setLoanListingContent("content");

	//HOME list loans functionality
	$("#tabs").tabs({
	    beforeActivate: function(event, ui) {
	    },
	    load: function(event, ui) {
	    },
	    create: function(event, ui) {

			var initLoanSearch =  function() {  	
			//render page markup
			var tableHtml = $("#loanSearchTabTemplate").render();
			$("#searchtab").html(tableHtml);

			var loansTableHtml = $("#loansTableTemplate").render();
			$("#loanTableDiv").html(loansTableHtml);

			var oTable = $("#loanstable").dataTable(custom.jqueryDataTableServerSide.paginated("loanstable"));
			initTableConf("loanstable",oTable);
	
	    };
	  	  //initialize the client search tab
		 initLoanSearch();
	 }
	});
} // end showLoansListing

function showSavingsAccountsListing() {

  if (jQuery.MifosXUI.showTask("savingsAccountsSearch") == false)
  {
    alert(doI18N("savingsaccount.search.not.allowed"));
    return;
  }

  setSavingsAccountListingContent("content");

  //HOME list loans functionality
  $("#tabs").tabs({
      beforeActivate: function(event, ui) {
      },
      load: function(event, ui) {
      },
      create: function(event, ui) {

      var initSavingsAccountSearch =  function() {    
      //render page markup
      var tableHtml = $("#savingsAccountSearchTabTemplate").render();
      $("#searchtab").html(tableHtml);

      var savingsAccountsTableHtml = $("#savingsAccountsTableTemplate").render();
      $("#savingsAccountTableDiv").html(savingsAccountsTableHtml);

      var oTable = $("#savingsaccountstable").dataTable(custom.jqueryDataTableServerSide.paginated("savingsaccountstable"));
      initTableConf("savingsaccountstable",oTable);
  
      };
        //initialize the client search tab
     initSavingsAccountSearch();
   }
  });
} // end showSavingsAccountsListing

//HOME list communal banks functionality
function showCommunalBankListing(){

	if (jQuery.MifosXUI.showTask("groupSearch") == false)
	{
		alert(doI18N("group.search.not.allowed"));
		return;
	}

	setCommunalBankListingContent("content");
	
	$("#tabs").tabs();
}

//Add new group under a center dialog
function addCenterGroup(officeId, centerId) {
	
		var addGroupSuccessFunction = function(data, textStatus, jqXHR) {
			$('#dialog-form').dialog("close");
			showGroup(data.resourceId);
		}
		
		if(centerId === undefined) {
			
			if (officeId === undefined) {
				getUrl = 'groups/template?center=true';
			} else {
				getUrl = 'groups/template?officeId=' + officeId + '&center=true';
			}
		}
		else {
			var getUrl = 'groups/template?centerId='+centerId;
		}

		var postUrl = 'groups';
		var templateSelector = "#centerGroupBlankFormTemplate";
		var width = 900; 
		var height = 500;
		var title = 'dialog.title.add.group';
		
		popupDialogWithFormView(getUrl, postUrl, 'POST', title , templateSelector, width, height, addGroupSuccessFunction);
}

//Add new center
function addCenter() {
	
		var addCenterSuccessFunction = function(data, textStatus, jqXHR) {
			$('#dialog-form').dialog("close");
			showCenter(data.resourceId);
		}

		var getUrl = 'centers/template';
		var postUrl = 'centers';
		var templateSelector = "#centerFormTemplate";
		var width = 900; 
		var height = 500;
		var title = 'dialog.title.create.center';
		
		popupDialogWithFormView(getUrl, postUrl, 'POST', title , templateSelector, width, height, addCenterSuccessFunction);
}

// Add New Client 
function addClient(officeId, parentGroupId){

		var addClientSuccessFunction = function(data, textStatus, jqXHR) {
		  $('#dialog-form').dialog("close");
		  showGroup(parentGroupId);
		}

		var getUrl = 'clients/template?officeId=' + officeId;
		var postUrl = 'clients';
		var templateSelector = "#clientFormTemplate";
		var width = 600; 
		var height = 350;
		
		var extraParam = '{"officeId":"'+ officeId + '" , "groupId":"'+ parentGroupId +'"}';
		popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.add.client', templateSelector, width, height, addClientSuccessFunction , extraParam);
}


//set scope for center search
function applyCenterSearchFilter(officeHierarchy) {
	//re-render group drop down data
	$('#officeId').val(officeHierarchy);
	var centerSearchSuccessFunction =  function(data) {
		var centerSearchObject = new Object();
	    centerSearchObject.crudRows = data;
		var tableHtml = $("#allCentersListTemplate").render(centerSearchObject);
		$("#centersInScopeDiv").html(tableHtml);

		$('#centerId').change(function() {
			showCenter($(this).val());
		});

	};
	var sqlSearchValue = "o.hierarchy like '"+ officeHierarchy +"%'";
	executeAjaxRequest("centers?underHierarchy=" + encodeURIComponent(officeHierarchy), 'GET', "", centerSearchSuccessFunction, formErrorFunction);
}

//loanId, product, loanAccountNo is passed to open loan account in client details
//On click of loan from global search, first show client then load loan account

function showLoanFromSearch(clientId, loanId, product, loanAccountNo){
    
    showILClient(clientId);
        
    if(!(typeof loanId === "undefined" && typeof product === "undefined" && typeof loanAccountNo === "undefined" )){
        showILLoan(loanId, product, loanAccountNo);
        var newLoanTabId='loan'+loanId+'tab';
        var index = $('#clientdatatabs a[href="#'+ newLoanTabId +'"]').parent().index(); 
        $('#clientdatatabs').tabs("option", "active", index);
    }
    
    
}

function showILClient(clientId) {
	isCenterSaving = false;
	var clientUrl = 'clients/' + clientId

	setClientContent("content");
	
	$newtabs = $("#clientdatatabs").tabs({
	    	beforeActivate: function(event, tab) 
	    	{
				if (tab.newTab.index() == 0)
				{
					if (clientDirty == true)
					{
						refreshLoanSummaryInfo(clientUrl);
						refreshNoteWidget(clientUrl, 'clienttabrightpane');
						refreshClientSummary(clientId);

						clientDirty = false;
					}
				}
				else if (tab.newTab.index() == 1)
				{
					refreshClientIdentifiers(clientUrl);
				}
				else if (tab.newTab.index() == 2){
					refreshClientDocuments(clientUrl);
				}
	    	},
//		"add": function( event, ui ) {
//				$newtabs.tabs('select', '#' + ui.panel.id);
//		}
	});
	
	var errorFunction = function(jqXHR, textStatus, errorThrown, index, anchor) {
		handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
	};
	        
	//initialize client image related buttons
	var imageFetchSuccessFunction = function(data, textStatus, jqXHR) {
		$("#customerImage").prop("src",data);
	};

	var successFunction = function(data, status, xhr) {
					//do we fetch image data?
					if(data.imagePresent == true){
						executeAjaxRequestForImageDownload('clients/' + clientId + '/images', 'GET', imageFetchSuccessFunction, errorFunction);	
					}
	        		currentClientId = clientId;
	        		clientDirty = false; //intended to refresh client if some data on its display has changed e.g. loan status or notes
	        		var currentTabIndex = $newtabs.tabs('option', 'active');
	            	var currentTabAnchor = $newtabs.data('ui-tabs').anchors[currentTabIndex];
	            	
	            	//populate main content
	            	if(data.status.value != 'Closed') {
		            	var crudObject = new Object();
		            	var tableHtml = $("#clientToolbarTemplate").render(data);
		            	$("#clienttoolbar").html(tableHtml);
		            }
	            	
	        		var tableHtml = $("#clientDataTabTemplate").render(data);
					$("#clienttab").html(tableHtml);
					
					// retrieve accounts summary info
					refreshLoanSummaryInfo(clientUrl);

					//retrieve client summary
					refreshClientSummary(clientId);
					
					// bind click listeners to buttons.
					$('.activateclient').button({icons: {primary: "ui-icon-circle-check"}}).click(function(e) {
						var linkId = this.id;
						var getUrl = 'clients/' + clientId + '?command=activate&template=true';
						var postUrl = 'clients/' + clientId + '?command=activate';
						var templateSelector = "#activationTemplate";
						var width = 400; 
						var height = 225;

						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	showILClient(clientId);
						}
						
						popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.activation', templateSelector, width, height, saveSuccessFunction);
					    e.preventDefault();
					});
					$('button.activateclient span').text(doI18N('button.activate'));
					
					$('.deleteclientbtn').button({icons: {
               			 primary: "ui-icon-trash"}
                	}).click(function(e) {
						var url = 'clients/' + clientId;
						var width = 400; 
						var height = 225;
												
						popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
						e.preventDefault();
					});
					$('button.deleteclientbtn span').text(doI18N('link.action.delete'));
					
					$('.editclientbtn').button({icons: {primary: "ui-icon-pencil"}}).click(function(e) {
						var getUrl = 'clients/' + clientId + '?template=true';
						var putUrl = 'clients/' + clientId;
						var templateSelector = "#editClientFormTemplate";
						var width = 600; 
						var height = 400;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	showILClient(clientId);
						}
						
						popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.client", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					$('button.editclientbtn span').text(doI18N('link.action.edit'));
					
					$('.newindividualloanbtn').button({icons: {primary: "ui-icon-document"}}).click(function(e) {
                		launchLoanApplicationDialog(clientId);
					    e.preventDefault();
					});
					$('button.newindividualloanbtn span').text(doI18N('dialog.button.new.loan.application'));
					
					$('.newsavingbtn').button({icons: {primary: "ui-icon-document"}}).click(function(e) {
						launchSavingsAccountDialog(clientId);
					    e.preventDefault();
					});
					$('button.newsavingbtn span').text(doI18N('dialog.button.new.savings.account'));

					$('.transferclientsbtn').button({icons: {primary: "ui-icon-transferthick-e-w"}}).click(function(e) {
						var linkId = this.id;
						var officeId = linkId.replace("transferclientsbtn", "");
						currentClientOffice = officeId;
						var getUrl = 'offices?fields=id,name';
						var postUrl = 'clients/' + clientId + '?command=proposeTransfer';
						var templateSelector = "#transferClientsBetweenBranchesFormTemplate";
						var width = 400; 
						var height = 225;

						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
							showILClient(clientId);
						}

						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.transfer.clients", templateSelector, width, height,  saveSuccessFunction);
						e.preventDefault();
					});

					$('.acceptClientsTransferbtn').button({icons: {primary: "ui-icon-transferthick-e-w"}}).click(function(e) {
						var linkId = this.id;
						var officeId = linkId.replace("acceptClientsTransferbtn", "");
						currentClientOffice = officeId;
						var getUrl = 'offices?fields=id,name';
						var postUrl = 'clients/' + clientId + '?command=acceptTransfer';
						var templateSelector = "#transferClientsBetweenBranchesFormTemplate";
						var width = 400; 
						var height = 225;

						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
							showILClient(clientId);
						}

						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.transfer.clients", templateSelector, width, height,  saveSuccessFunction);
						e.preventDefault();
					});

					$('.clientclosebtn').button({icons: {primary: "ui-icon-document"}}).click(function(e) {
						var clientClose = 'close';
						var getUrl = 'clients/template?commandParam=' + clientClose;
						var postUrl = 'clients/' + clientId + '?command=' + clientClose;
						var templateSelector = "#clientCloseTemplate";
						var width = 400; 
						var height = 300;

						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
							showILClient(clientId);
						}
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.client.close", templateSelector, width, height, saveSuccessFunction);
					    e.preventDefault();
					});
					$('button.clientclosebtn span').text(doI18N('dialog.button.client.close'));
					
					$('.addnotebtn').button({icons: {primary: "ui-icon-comment"}}).click(function(e) {
						var postUrl = 'clients/' + clientId + '/notes';
						var templateSelector = "#noteFormTemplate";
						var width = 600; 
						var height = 400;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
							refreshNoteWidget('clients/' + clientId, 'clienttabrightpane');
						}
						
						popupDialogWithFormView("", postUrl, 'POST', "dialog.title.add.note", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					$('button.addnotebtn span').text(doI18N('dialog.button.add.note'));

					refreshNoteWidget(clientUrl, 'clienttabrightpane');

					custom.showRelatedDataTableInfo($newtabs, "m_client", clientId); 
					
					$('#captureClientImage').button(
						{icons: {
	                	primary: "ui-icon-camera"},
	                	text: false
	            	}).click(function(e) {
	            		var imageUploadSuccessFunction = function(data, textStatus, jqXHR) {
	            			$("#dialog-form").dialog("close");
							$("#customerImage").prop("src",imageCanvas.toDataURL("image/jpeg"));
						};
						var templateSelector = "#clientImageWebcamFormTemplate";
						var width = 775; 
						var height = 400;
	            		popupDialogWithFormView("", 'clients/' + clientId + '/images', 'POST', "dialog.title.edit.client.image", templateSelector, width, height,  imageUploadSuccessFunction);
	            		var pos = 0; 
	            		var ctx = null; 
	            		var image = [];
	            		$('#imageCanvas').html('');
						var imageCanvas = $('#imageCanvas')[0];
     	            	ctx = imageCanvas.getContext("2d");
     	            	image = ctx.getImageData(0, 0, 320, 240);
     	            	
						saveCB = function(data) {
							var col = data.split(";");
							var img = image;
							for(var i = 0; i < 320; i++) {
								var tmp = parseInt(col[i]);
								img.data[pos + 0] = (tmp >> 16) & 0xff;
								img.data[pos + 1] = (tmp >> 8) & 0xff;
								img.data[pos + 2] = tmp & 0xff;
								img.data[pos + 3] = 0xff;
								pos+= 4;
							}
				
							if (pos >= 4 * 320 * 240) {
								ctx.putImageData(img, 0, 0);
								pos = 0;
							}
						};
						
						$("#webcam").webcam({
							width: 320,
							height: 240,
							mode: "callback",
							swffile: "jscam_canvas_only.swf",
							onTick: function() {},
							onSave: saveCB,
							onCapture: function() {
								webcam.save();
							},
							quality: 50,
							debug: function() {},
							onLoad: function() {}
						});
						
						$('#captureImage').button({icons: {
		                	primary: "ui-icon-zoomin"},
		            	}).click(function(e) {
		            		//reset position
		            		webcam.capture();
		            		e.preventDefault();
		            	});
						e.preventDefault();
					});
				
					$('#editClientImage').button(
						{icons: {
	                	primary: "ui-icon-zoomin"},
	                	text: false
	            	}).click(function(e) {
						var getUrl = '';
						var putUrl = 'clients/' + clientId + '/images';
						var templateSelector = "#clientImageUploadFormTemplate";
						var width = 600; 
						var height = 250;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  $("#dialog-form").dialog("close");
						  executeAjaxRequestForImageDownload('clients/' + clientId + '/images', 'GET', imageFetchSuccessFunction, errorFunction);
						};
						
						popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.client.image", templateSelector, width, height,  saveSuccessFunction);
					    e.preventDefault();
					});
					//delete client image
					$('#deleteClientImage').button({icons: {
	                	primary: "ui-icon-trash"},
	                	text: false
	            	}).click(function(e) {
					var url = 'clients/' + clientId + '/images';
					var width = 400; 
					var height = 225;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
						  	$("#customerImage").prop("src","resources/img/client-image-placeholder.png");
					};
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction);
					
					e.preventDefault();
					});

					$('.unassignstafftoclient').button().click(function(e){
						var linkId = this.id;
						var staffId = linkId.replace("unassignstafftoclient", "");
						var postUrl = clientUrl +'?command=unassignStaff';
						var getUrl = ""

						var width = 400; 
						var height = 225;
						var jsonbody = '{"staffId":"'+staffId+'"}';

						var saveSuccessFunction = function(data, textStatus, jqXHR) {
								$("#dialog-form").dialog("close");
								showILClient(clientId);
						}	
						popupConfirmationDialogAndPost(postUrl, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction , jsonbody);

						e.preventDefault();
					});

					$('.assignstafftoclient').button().click(function(e){
						var linkId = this.id;
						var clientId = linkId.replace("assignstafftoclient", "");
						var postUrl = 'clients/' + clientId +'?command=assignStaff';
						var getUrl = 'clients/' + clientId + '?template=true';

						var templateSelector = "#assignStaffFormTemplate";
						var width = 400; 
						var height = 225;

						var saveSuccessFunction = function(data, textStatus, jqXHR) {
								$("#dialog-form").dialog("close");
								showILClient(clientId);
						}	
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.assign.staff", templateSelector, width,  height, saveSuccessFunction);
					    e.preventDefault();
					});
	        };
	    
		executeAjaxRequest(clientUrl, 'GET', "", successFunction, errorFunction);
}

function refreshClientIdentifiers(clientUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			var tableHtml = $("#clientIdentifiersTemplate").render(crudObject);
			$("#clientidentifiertab").html(tableHtml);
			//initialize all edit/delete buttons
				
			var editClientIdentifierSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshClientIdentifiers(clientUrl);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editclientidentifier" + val.id).button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
			      	var clientId = clientUrl.replace("clients/", "");
					var getUrl = clientUrl + '/identifiers/'+val.id+'?template=true';
					var putUrl = clientUrl + '/identifiers/'+val.id;
					var templateSelector = "#clientIdentifiersFormTemplate";
					var width = 600; 
					var height = 450;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.clientIdentifier.edit", templateSelector, width, height,  editClientIdentifierSuccessFunction);
				    e.preventDefault();
			      });
			     $("#deleteclientidentifier" + val.id).button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {
					var url = clientUrl + '/identifiers/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editClientIdentifierSuccessFunction);
					
					e.preventDefault();
				});
				//button for add document
			   $("#addclientIdentifierdocument" + val.id).button({icons: {
                primary: "ui-icon-circle-plus"}
                }).click(function(e){
		      	var getUrl = "";
				var putUrl = "client_identifiers/"+ val.id+ '/documents';
				var templateSelector = "#clientIdentifierDocumentsFormTemplate";
				var width = 600; 
				var height = 300;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientIdentifierDocuments(val.id);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.clientIdentifier.add.document", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
		      });
		      //fetch the identifier documents for this identifier
		      refreshClientIdentifierDocuments(val.id);
			});			
			//associate event with add client Identity button
			$('#addclientidentifier').button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
				var clientId = clientUrl.replace("clients/", "");
				
				var getUrl = clientUrl + '/identifiers/template';
				var putUrl = clientUrl + '/identifiers';
				var templateSelector = "#clientIdentifiersFormTemplate";
				var width = 600; 
				var height = 450;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientIdentifiers(clientUrl);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.clientIdentifier.add", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
			});
		}
  		executeAjaxRequest(clientUrl + '/identifiers', 'GET', "", successFunction, formErrorFunction);	  	
}


function refreshClientIdentifierDocuments(clientIdentifierId) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			crudObject.clientIdentifierId	= clientIdentifierId;
			var tableHtml = $("#clientIdentifierDocumentsTemplate").render(crudObject);
			$("#clientidentifier"+clientIdentifierId+"documents").html(tableHtml);
			//initialize all edit/delete buttons
			var clientIdentifierUrl = "client_identifiers/"+ clientIdentifierId;
			var editClientIdentifierDocumentSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshClientIdentifierDocuments(clientIdentifierId);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editclientIdentifierdocument" + val.id).button({icons: {
	                primary: "ui-icon-pencil"},
	                text: false
	                }).click(function(e){
					var getUrl = clientIdentifierUrl + '/documents/'+val.id;
					var putUrl = clientIdentifierUrl + '/documents/'+val.id;
					var templateSelector = "#editClientIdentifierDocumentsFormTemplate";
					var width = 600; 
					var height = 300;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.clientIdentifier.edit.document", templateSelector, width, height,  editClientIdentifierDocumentSuccessFunction);
				    e.preventDefault();
			      });
			      $("#deleteclientIdentifierdocument" + val.id).button({icons: {
	                primary: "ui-icon-trash"},
	                text: false
	            	}).click(function(e) {
					var url = clientIdentifierUrl + '/documents/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editClientIdentifierDocumentSuccessFunction);
					
					e.preventDefault();
				});
				$("#downloadclientIdentifierdocument" + val.id).button({icons: {
	                primary: "ui-icon-arrowthickstop-1-s"},
	                text: false
	            	}).click(function(e) {
					var url = clientIdentifierUrl + '/documents/'+val.id + '/attachment';
					executeAjaxOctetStreamDownloadRequest(url);
					e.preventDefault();
				});
			});			
		}
  		executeAjaxRequest("client_identifiers/"+ clientIdentifierId + '/documents', 'GET', "", successFunction, formErrorFunction);	 
}

function refreshClientDocuments(clientUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			var tableHtml = $("#clientDocumentsTemplate").render(crudObject);
			$("#clientdocumenttab").html(tableHtml);
			//initialize all edit/delete buttons
				
			var editClientDocumentSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshClientDocuments(clientUrl);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editclientdocument" + val.id).button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
			      	var clientId = clientUrl.replace("clients/", "");
					var getUrl = clientUrl + '/documents/'+val.id;
					var putUrl = clientUrl + '/documents/'+val.id;
					var templateSelector = "#editClientDocumentsFormTemplate";
					var width = 600; 
					var height = 450;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.client.document.edit", templateSelector, width, height,  editClientDocumentSuccessFunction);
				    e.preventDefault();
			      });
			      $("#deleteclientdocument" + val.id).button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {
					var url = clientUrl + '/documents/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editClientDocumentSuccessFunction);
					
					e.preventDefault();
				});
				$("#downloadclientdocument" + val.id).button({icons: {
	                primary: "ui-icon-arrowthickstop-1-s"}
	            	}).click(function(e) {
					var url = clientUrl + '/documents/'+val.id + '/attachment';
					executeAjaxOctetStreamDownloadRequest(url);
					e.preventDefault();
				});
			});			
			//associate event with add client document button
			$('#addclientdocument').button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
				var clientId = clientUrl.replace("clients/", "");
				
				var getUrl = "";
				var putUrl = clientUrl + '/documents';
				var templateSelector = "#clientDocumentsFormTemplate";
				var width = 600; 
				var height = 450;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshClientDocuments(clientUrl);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.client.document.add", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
			});
		}
  		executeAjaxRequest(clientUrl + '/documents', 'GET', "", successFunction, formErrorFunction);	  	
}
	

function showGroup(groupId){
	isCenterSaving = false;
	var groupUrl = "groups/"+groupId;
	setGroupContent("content");

	$newtabs = $("#groupdatatabs").tabs({
    	beforeActivate: function(event, tab) {
			if (tab.newTab.index() == 0){
				if (groupDirty == true){
					refreshGroupLoanSummaryInfo(groupUrl);
					groupDirty = false;
				}
			}
		},
		"active": function( event, ui ) {
			$newtabs.tabs("option", "active", '#' + ui.newPanel.attr("id"));
		}
	});

	var successFunction = function(data, status, xhr) {
		
		var currentGroupId = groupId;
		var currentTabIndex = $newtabs.tabs('option', 'active');
    	var currentTabAnchor = $newtabs.data('ui-tabs').anchors[currentTabIndex];
		var tableHtml = $("#groupDataTabTemplate").render(data);
		var groupDetails = $("#groupDetailsTemplate").render(data);
		var groupClients = $("#groupClientsTabTemplate").render(data);
		var groupSummary = $("#groupSummaryTabTemplate").render();//group summary data should be fetched in another ajax call
		var groupRoles = $("#groupRolesTabTemplate").render(data);
		var associatedClients = data.clientMembers;

		groupDirty = false; //intended to refresh group if some data on its display has changed e.g. loan status or notes

		$("#groupdetails").html(groupDetails);
		$("#grouptab").html(tableHtml);
		$("#grouptabname").html("General");
		$("#groupclientstab").html(groupClients);
		$("#groupclientstabname").html("Clients");
		$("#groupsummarytab").html(groupSummary);
		$("#groupsummarytabname").html("Summary");
		$("#grouprolestab").html(groupRoles);
		$("#grouprolestabname").html("Roles");

		oTable = displayListTable("groupRolesTable");

		refreshGroupLoanSummaryInfo(groupUrl);

		refreshGroupSummaryInfo(groupId);

        refreshNoteWidget('groups/' + currentGroupId, 'groupnotes' );
        refreshCalendarWidget(currentGroupId, 'groups', 'centerCalendarContent');
        refreshAttendanceWidget(currentGroupId, 'groups');

        custom.showRelatedDataTableInfo($newtabs, "m_group", groupId);

		//improper use of document.ready, correct way is send these function as call back
		$(document).ready(function() {
			
			$('.activategroup').button({icons: {primary: "ui-icon-circle-check"}}).click(function(e) {
				var linkId = this.id;
				var getUrl = 'groups/' + currentGroupId + '?command=activate&template=true';
				var postUrl = 'groups/' + currentGroupId + '?command=activate';
				var templateSelector = "#activationTemplate";
				var width = 400; 
				var height = 225;

				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	showGroup(currentGroupId);
				}
				
				popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.activation', templateSelector, width, height, saveSuccessFunction);
			    e.preventDefault();
			});
			$('button.activategroup span').text(doI18N('button.activate'));
			

			$('.newgrouploanbtn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
				var linkId = this.id;
				var groupId = linkId.replace("newgrouploanbtn", "");
				launchGroupLoanApplicationDialog(groupId);
			    e.preventDefault();
			});

			$('.deletegroupbtn').button({icons: {primary: "ui-icon-trash"}}).click(function(e) {
				var linkId = this.id;
				var groupId = linkId.replace("deletegroupbtn", "");

				var url = 'groups/' + groupId;
				var width = 400; 
				var height = 225;
										
				popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
				
				e.preventDefault();
			});

			$('.associateclientbtn').button().click(function(e){
				var linkId = this.id;
				var groupId = linkId.replace("associateclientbtn", "");

				var officeId = data.officeId;

				associateClientsToGroup(groupId);
				e.preventDefault();
			});

			$('.addclientbtn').button().click(function(e){
				var linkId = this.id;
				var groupId = linkId.replace("addclientbtn", "");

				var officeId = data.officeId;

				addClient(officeId , groupId);
				e.preventDefault();
			});

			// bind click listeners to buttons.
			$('.editstandardgroupbtn').button({icons: {primary: "ui-icon-pencil"}}).click(function(e) {
				var linkId = this.id;
				var groupId = linkId.replace("editstandardgroupbtn", "");
				launchGroupDialog(groupId);
			    e.preventDefault();
			});
			
			$('.editcentergroupbtn').button({icons: {primary: "ui-icon-pencil"}}).click(function(e) {
				var linkId = this.id;
				var groupId = linkId.replace("editcentergroupbtn", "");
				
				launchCenterGroupDialog(groupId);
			    e.preventDefault();
			});

			$('.newbulkloanbtn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
				//addLJGBulkMembersLoans(groupId);
				jlgBulkMembersLoanWizard(groupId);
		    	e.preventDefault();
			});

			$('.unassignstafftogroup').button().click(function(e){

						var linkId = this.id;
						var groupId = linkId.replace("unassignstafftogroup", "");
						var staffId = $('#staffId').val();
						var postUrl = 'groups/'+ groupId +'?command=unassignStaff';
						var getUrl = ""
						
						var templateSelector = "#loanUnassignmentFormTemplate";
						var width = 400; 
						var height = 225;
						var jsonbody = '{"staffId":"'+staffId+'"}';
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  			$("#dialog-form").dialog("close");
				  			showGroup(groupId);
						}						
						//popupDialogWithFormView(jsonbody, postUrl, 'POST', 'dialog.title.assign.loan.officer', templateSelector ,width, height, saveSuccessFunctionReloadLoan );
						//popupDialogWithFormViewData(jsonbody, postUrl, 'POST', 'dialog.title.unassign.loan.officer', templateSelector, width, height, saveSuccessFunction)		
						popupConfirmationDialogAndPost(postUrl, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction , jsonbody);

						e.preventDefault();
			});
			
			$('.assignstafftogroup').button().click(function(e){
				var linkId = this.id;
				var groupId = linkId.replace("assignstafftogroup", "");
				var postUrl = 'groups/' + groupId +'?command=assignStaff';
				var getUrl = 'groups/' + groupId + '?template=true';

				var templateSelector = "#assignStaffFormTemplate";
				var width = 400; 
				var height = 225;

				var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						showGroup(groupId);
				}	
				popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.assign.staff", templateSelector, width,  height, saveSuccessFunction);
				e.preventDefault();
			});

			$('.addgroupnotebtn').button({icons: {
                         primary: "ui-icon-comment"}
            }).click(function(e) {
                var linkId = this.id;
                var groupId = linkId.replace("addgroupnotebtn", "");
                var postUrl = 'groups/' + groupId + '/notes';
                var templateSelector = "#noteFormTemplate";
                var width = 600;
                var height = 400;

                var saveSuccessFunction = function(data, textStatus, jqXHR) {
                    $("#dialog-form").dialog("close");
                    refreshNoteWidget('groups/' + groupId, 'groupnotes');
                }

                popupDialogWithFormView("", postUrl, 'POST', "dialog.title.add.note", templateSelector, width, height,  saveSuccessFunction);
                e.preventDefault();
            });

            $('.newgroupsavingsbtn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
				var linkId = this.id;
				var groupId = linkId.replace("newgroupsavingsbtn", "");
				isCenterSaving = false;
				launchGroupSavingsAccountDialog(groupId);
			    e.preventDefault();
			});

			$('.transfferclientsbtn').button({icons: {primary: "ui-icon-transferthick-e-w"}}).click(function(e) {
				var linkId = this.id;
				var officeId = linkId.replace("transfferclientsbtn", "");
				currentGroupOffice = officeId;
				launchTransferClientsDialog(currentGroupId,associatedClients);
				e.preventDefault();
			});

            $('button.addgroupnotebtn span').text(doI18N('dialog.button.add.note'));

		});

		$('.addcalendarbtn').button({icons: {primary: "ui-icon-calendar"}}).click(function(e) {
			var linkId = this.id;
            var groupId = linkId.replace("addcalendarbtn", "");
            addCalendar(groupId, 'groups', 'centerCalendarContent');
            e.preventDefault();
		});

		$('.addattendancebtn').button({icons: {primary: "ui-icon-calendar"}}).click(function(e) {
			var linkId = this.id;
            var groupId = linkId.replace("addattendancebtn", "");
            addAttendance(groupId, 'groups', data.collectionMeetingCalendar);
            e.preventDefault();
		});

		$('.addnewjlgloanbtn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
			var linkId = this.id;
            var clientId = linkId.replace("addnewjlgloanbtn", "");
            var groupId = currentGroupId;
            launchJLGLoanApplicationDialog(clientId, groupId);
            e.preventDefault();
		});
		$('.addnewjlgsavingstn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
			var linkId = this.id;
            var clientId = linkId.replace("addnewjlgsavingstn", "");
            var groupId = currentGroupId;
            launchJLGSavingsAccountDialog(clientId, groupId);
            e.preventDefault();
		});

		$('.disassociateClient	').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
			var linkId = this.id;
            var clientId = linkId.replace("disassociateClient", "");
            var groupId = currentGroupId;
            disassociateClientFromGroup(clientId, groupId);
            e.preventDefault();
		});

		$('#addgrouprole'+currentGroupId).button({icons: {
	                 primary: "ui-icon-plus"}
	            }).click(function(e) {
	        var postUrl = 'groups/' + currentGroupId + '?command=assignRole';
	        var templateSelector = "#addGroupRuleFormTemplate";
	        var width = 600;
	        var height = 400;

	        var saveSuccessFunction = function(data, textStatus, jqXHR) {
	            $("#dialog-form").dialog("close");
	            showGroup(currentGroupId);
	        }

	        popupDialogWithFormView(groupUrl + '?associations=all&template=true', postUrl, 'POST', "dialog.button.add.group.role", templateSelector, width, height,  saveSuccessFunction);
	        e.preventDefault();
	    });
	    $('button.addgrouprole span').text(doI18N('form.button.add.group.role'));

	    $("a.editgrouprole").click( function(e) {
			var linkId = this.id;
			var entityId = linkId.replace("editgrouprole", "");
			var templateSelector = "#addGroupRuleFormTemplate";
	        var width = 600;
	        var height = 400;
			var getUrl = 'groups/' + currentGroupId + '?template=true&associations=clientMembers&roleId='+entityId;
			var postUrl = 'groups/' + currentGroupId + '?command=updateRole&roleId='+entityId;

			var saveSuccessFunction = function(data, textStatus, jqXHR) {
	            $("#dialog-form").dialog("close");
	            showGroup(currentGroupId);
	        }

			popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.button.update.group.role", templateSelector, width, height,  saveSuccessFunction);
			e.preventDefault();
		});

		$("a.unassignrole").click( function(e) {
			var linkId = this.id;
			var entityId = linkId.replace("unassignrole", "");
			var width = 400; 
			var height = 150;
			var resourceUrl = 'groups/' + currentGroupId + '?command=unassignRole&roleId='+entityId;

			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	showGroup(currentGroupId);
			}
			popupConfirmationDialogAndPost(resourceUrl, 'POST', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
			e.preventDefault();
		});
	
	}

	var errorFunction = function(jqXHR, textStatus, errorThrown, index, anchor) {
    	handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
        $(anchor.hash).html("error occured while ajax loading.");
    };
    
	executeAjaxRequest(groupUrl + '?associations=all', 'GET', "", successFunction, errorFunction);
}

function refreshGroupSummaryInfo(groupId){
	var groupSummaryCountsUrl = 'runreports/GroupSummaryCounts?genericResultSet=false&R_groupId=' + groupId;

	var groupSummaryCountSuccessFunction = function(data, status, xhr){
		var groupSummaryCount = $("#groupSummaryCountContentTemplate").render(data);
		$("#groupsummaryleftcontent").html(groupSummaryCount);
	}
	executeAjaxRequest(groupSummaryCountsUrl, 'GET', "", groupSummaryCountSuccessFunction, formErrorFunction);

	var groupSummaryAmountsUrl = 'runreports/GroupSummaryAmounts?genericResultSet=false&R_groupId=' + groupId;

	var groupSummaryAmountSuccessFunction = function(data, status, xhr){
		var crudObject = new Object();
		crudObject.crudRows = data;
		var groupSummaryAmount = $("#groupSummaryAmountContentTemplate").render(crudObject);
		$("#groupsummaryloanamount").html(groupSummaryAmount);
	}
	executeAjaxRequest(groupSummaryAmountsUrl, 'GET', "", groupSummaryAmountSuccessFunction, formErrorFunction);

	var groupSavingSummarysUrl = 'runreports/GroupSavingSummary?genericResultSet=false&R_groupId=' + groupId;

	var groupSavingSummarySuccessFunction = function(data, status, xhr){
		var crudObject = new Object();
		crudObject.crudRows = data;
		var groupSavingSummary = $("#groupSavingSummaryContentTemplate").render(crudObject);
		$("#groupsavingsummary").html(groupSavingSummary);
	}
	executeAjaxRequest(groupSavingSummarysUrl, 'GET', "", groupSavingSummarySuccessFunction, formErrorFunction);
}

function refreshCenterSummaryInfo(centerId){
	var centerSummaryCountsUrl = 'runreports/GroupSummaryCounts?genericResultSet=false&R_groupId=' + centerId;

	var centerSummaryCountSuccessFunction = function(data, status, xhr){
		var centerSummaryCount = $("#centerSummaryCountContentTemplate").render(data);
		$("#centersummaryleftcontent").html(centerSummaryCount);
	}
	executeAjaxRequest(centerSummaryCountsUrl, 'GET', "", centerSummaryCountSuccessFunction, formErrorFunction);

	var centerSummaryAmountsUrl = 'runreports/GroupSummaryAmounts?genericResultSet=false&R_groupId=' + centerId;

	var centerSummaryAmountSuccessFunction = function(data, status, xhr){
		var crudObject = new Object();
		crudObject.crudRows = data;
		var centerSummaryAmount = $("#centerSummaryAmountContentTemplate").render(crudObject);
		$("#centersummaryloanamount").html(centerSummaryAmount);
	}
	executeAjaxRequest(centerSummaryAmountsUrl, 'GET', "", centerSummaryAmountSuccessFunction, formErrorFunction);

	var centerSavingSummarysUrl = 'runreports/GroupSavingSummary?genericResultSet=false&R_groupId=' + centerId;

	var centerSavingSummarySuccessFunction = function(data, status, xhr){
		var crudObject = new Object();
		crudObject.crudRows = data;
		var centerSavingSummary = $("#groupSavingSummaryContentTemplate").render(crudObject);
		$("#centersavingsummary").html(centerSavingSummary);
	}
	executeAjaxRequest(centerSavingSummarysUrl, 'GET', "", centerSavingSummarySuccessFunction, formErrorFunction);
}

function disassociateClientFromGroup(clientId, groupId){
	var postUrl = 'groups/' + groupId + '?command=disassociateClients';
	serializedArray = {};
    serializedArray["clientMembers"] = [clientId];

    var saveSuccessFunction = function(data){
        showGroup(groupId);
    }
    
    saveErrorFunction = function(jqXHR, textStatus, errorThrown) {
		handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#groupclientformerrors");
	};

    var newFormData = JSON.stringify(serializedArray);
    executeAjaxRequest(postUrl, "post", newFormData, saveSuccessFunction, saveErrorFunction);
}

function transferClients(divContainer, groupId) {
	var serializationOptions = {};
	serializationOptions["checkboxesAsBools"] = true;

	var serializedArray = {};
	serializedArray = $('#entityform').serializeObject(serializationOptions);
	var clients = new Array();
	for (var i in serializedArray["clientMembers"]) {
		var temp = new Object();
		temp.id = serializedArray["clientMembers"][i];
		clients.push(temp);
	};
	serializedArray["clients"]=clients;
	if ($("input[name='transfertype']:radio:checked").val() == 'intraBranch') {
		delete serializedArray.destinationOfficeId;
	}
	delete serializedArray.clientMembers;
	delete serializedArray.transfertype;

	var newFormData = JSON.stringify(serializedArray);

	var successFunction =  function(data, textStatus, jqXHR) {
		divContainer.dialog("close");

		if (groupId === undefined || groupId == null) {
			groupId = data.resourceId;
		}
		showGroup(groupId);
	};
	executeAjaxRequest('groups/'+groupId+'?command=transferClients', "POST", newFormData, successFunction, formErrorFunction);
}

var launchTransferClientDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	//prepare the temp data object with available data.
	var tempObject = new Object();
	tempObject.clientOptions = currentGroupClients || [];
	tempObject.officeOptions = data;
	tempObject.currentGroupOfficeId = currentGroupOffice;

	var groupId = currentGroup;
	var dialogDiv = $("<div id='dialog-form'></div>");
	var templateIdentifier = "#transferClientsBetweenGroupsFormTemplate";

	var openClientTransferDialogFunc = function (event, ui) {
		var formHtml = $(templateIdentifier).render(tempObject);
		$("#dialog-form").html(formHtml);
		$("#selecttransfertype").buttonset();
		var officeId = currentGroupOffice;

		var fetchGroupsSuccessFunction = function(data, textStatus, jqXHR) {
			$('select.destinationGroupId').empty().append(function() {
				var output = '';
				$.each(data, function(key, value) {
					output += '<option value="' + value.id + '">' + value.name + '</option>';
				});
				return output;
			});
		}

		if ($("input[name='transfertype']:radio:checked").val() == 'intraBranch') {
			$(".officedetailsdiv").hide();
			executeAjaxRequest('groups?templateType=clientstransfertemplate&officeId='+officeId+'&groupId='+groupId, 'GET', "", fetchGroupsSuccessFunction, formErrorFunction);
		} else if ($("input[name='transfertype']:radio:checked").val() == 'interBranch') {
			$(".officedetailsdiv").show();
			$('select.destinationGroupId').empty();
			$("#destinationOfficeId").change(function(e){
				var selectedOfficeId = $(this).val();
				executeAjaxRequest('groups?templateType=clientstransfertemplate&officeId='+selectedOfficeId+'&groupId='+groupId, 'GET', "", fetchGroupsSuccessFunction, formErrorFunction);
			});
		}

		$("input[name='transfertype']").change(function() {
			if ($("input[name='transfertype']:radio:checked").val() == 'intraBranch') {
				$(".officedetailsdiv").hide();
				executeAjaxRequest('groups?templateType=clientstransfertemplate&officeId='+officeId+'&groupId='+groupId, 'GET', "", fetchGroupsSuccessFunction, formErrorFunction);
			} else if ($("input[name='transfertype']:radio:checked").val() == 'interBranch') {
				$(".officedetailsdiv").show();
				$('select.destinationGroupId').empty();
				$("#destinationOfficeId").change(function(e){
					var selectedOfficeId = $(this).val();
					executeAjaxRequest('groups?templateType=clientstransfertemplate&officeId='+selectedOfficeId+'&groupId='+groupId, 'GET', "", fetchGroupsSuccessFunction, formErrorFunction);
				});
			}
		});

		$('.multiadd').click(function() {
			return !$('.multiNotSelectedItems option:selected').remove().appendTo('#clientMembers');
		});

		$('.multiremove').click(function() {
			return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');
		});

		$("#entityform textarea").first().focus();
		$('#entityform input').first().focus();
	}

	var saveClientTransferFunc = function() {
		transferClients(dialogDiv, groupId);
	};

	var dialog = gernericDialog(dialogDiv, 'dialog.title.transfer.clients.between.groups', 900, 450, openClientTransferDialogFunc, saveClientTransferFunc);
};

function launchTransferClientsDialog (groupId, clients) {
	currentGroup = groupId;
	currentGroupClients = clients;
	executeAjaxRequest('offices?fields=id,name', 'GET', "", launchTransferClientDialogOnSuccessFunction, formErrorFunction);
}

function showCenter(centerId){
	isCenterSaving = true;
	var centerUrl = "centers/"+centerId;
	setCenterContent("content");

	$newtabs = $("#centerdatatabs").tabs({
    	beforeActivate: function(event, tab) {
			if (tab.newTab.index() == 0){
				if (centerDirty == true){
					refreshGroupLoanSummaryInfo(centerUrl);
					centerDirty = false;
				}
			}
		},
		"active": function( event, ui ) {
			$newtabs.tabs("option", "active", '#' + ui.newPanel.attr("id"));
		}
	});

	var successFunction = function(data, status, xhr) {
		var currentGroupId = centerId;
		var currentTabIndex = $newtabs.tabs('option', 'active');
    	var currentTabAnchor = $newtabs.data('ui-tabs').anchors[currentTabIndex];
		var tableHtml = $("#centerDataTabTemplate").render(data);
		var centerDetailsHtml = $("#centerDetailsTemplate").render(data);
		var centerGroupsHtml = $("#centerGroupsTabTemplate").render(data);
		var centerSummaryHtml = $("#centerSummaryTabTemplate").render();//fetch summary details in another ajax call


		centerDirty = false; //intended to refresh group if some data on its display has changed e.g. loan status or notes

		$("#centerDetails").html(centerDetailsHtml);
		$("#centertab").html(tableHtml);
		$("#centertabname").html("General");

		$("#centertabsummaryname").html("Summary");
		$("#centertabsummary").html(centerSummaryHtml);
		$("#centertabgroups").html(centerGroupsHtml);
		$("#centertabgroupsname").html("Groups");

		refreshGroupLoanSummaryInfo(centerUrl);
		refreshCenterSummaryInfo(currentGroupId);
        refreshNoteWidget('groups/' + currentGroupId, 'groupnotes' );
        refreshCalendarWidget(currentGroupId, 'centers', 'centerCalendarContent');
        refreshAttendanceWidget(currentGroupId, 'centers');
        custom.showRelatedDataTableInfo($newtabs, "m_center", currentGroupId);
		//improper use of document.ready, correct way is send these function as call back
		$(document).ready(function() {

			// bind click listeners to buttons.
			$('.activatecenter').button({icons: {primary: "ui-icon-circle-check"}}).click(function(e) {
				var linkId = this.id;
				var getUrl = 'centers/' + currentGroupId + '?command=activate&template=true';
				var postUrl = 'centers/' + currentGroupId + '?command=activate';
				var templateSelector = "#activationTemplate";
				var width = 400; 
				var height = 225;

				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	showCenter(currentGroupId);
				}
				
				popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.activation', templateSelector, width, height, saveSuccessFunction);
			    e.preventDefault();
			});
			$('button.activatecenter span').text(doI18N('button.activate'));
			
			$('.editcenterbtn').button({icons: {primary: "ui-icon-pencil"}}).click(function(e) {
				var linkId = this.id;
				var centerId = linkId.replace("editcenterbtn", "");
				
				var getUrl = 'centers/' + centerId + '?template=true';
				var putUrl = 'centers/' + centerId;
				var templateSelector = "#centerFormTemplate";
				var width = 900; 
				var height = 400;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	showCenter(centerId);
				}
				
				var title = 'dialog.title.edit.center';

				var extraParam = '{"action":"disable"}';
				popupDialogWithFormView(getUrl, putUrl, 'PUT', title, templateSelector, width, height,  saveSuccessFunction , extraParam);
			    e.preventDefault();
			});

			$('.addgroupbtn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {

				var linkId = this.id;
				var centerId = linkId.replace("addgroupbtn", "");

				var addGroupSuccessFunction = function(data, textStatus, jqXHR) {
					$('#dialog-form').dialog("close");
					showGroup(data.resourceId);
				}

				var getUrl = 'groups/template?centerId='+centerId;
				var postUrl = 'groups';
				var templateSelector = "#centerGroupFormTemplate";
				var width = 900; 
				var height = 500;
				var title = 'dialog.title.add.group';
				//var extraParam = '{"action":"disable"'  + ' , "parentGroupId":"'+ centerId +'"}';
				popupDialogWithFormView(getUrl, postUrl, 'POST', title , templateSelector, width, height, addGroupSuccessFunction);
				e.preventDefault();

			});

			$('.addattendancebtn').button({icons: {primary: "ui-icon-calendar"}}).click(function(e) {
				var linkId = this.id;
	            var centerId = linkId.replace("addattendancebtn", "");
	            addAttendance(centerId, 'centers', data.collectionMeetingCalendar);
	            e.preventDefault();
			});			

			$('.addcalendarbtn').button({icons: {primary: "ui-icon-calendar"}}).click(function(e) {
				var linkId = this.id;
				var centerId = linkId.replace("addcalendarbtn", "");
				addCalendar(centerId, 'centers', 'centerCalendarContent');
			    e.preventDefault();
			});

			$('.addgroupnotebtn').button({icons: {primary: "ui-icon-comment"}}).click(function(e) {
                var linkId = this.id;
                var centerId = linkId.replace("addgroupnotebtn", "");
                var postUrl = 'groups/' + centerId + '/notes';
                var templateSelector = "#noteFormTemplate";
                var width = 600;
                var height = 400;

                var saveSuccessFunction = function(data, textStatus, jqXHR) {
                    $("#dialog-form").dialog("close");
                    refreshNoteWidget('groups/' + centerId, 'groupnotes');
                }

                popupDialogWithFormView("", postUrl, 'POST', "dialog.title.add.note", templateSelector, width, height,  saveSuccessFunction);
                e.preventDefault();
            });

            $('button.addgroupnotebtn span').text(doI18N('dialog.button.add.note'));

			$('.deletecenterbtn').button({icons:{primary: "ui-icon-trash"}}).click(function(e) {
				var linkId = this.id;
				var centerId = linkId.replace("deletecenterbtn", "");

				var url = 'centers/' + centerId;
				var width = 400; 
				var height = 225;
										
				popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
				
				e.preventDefault();
			});

			$('.unassignstafftogroup').button().click(function(e){

						var linkId = this.id;
						var centerId = linkId.replace("unassignstafftogroup", "");
						var staffId = $('#staffId').val();
						var postUrl = 'groups/'+ centerId +'/command/unassign_staff';
						var getUrl = ""
						
						var templateSelector = "#loanUnassignmentFormTemplate";
						var width = 400; 
						var height = 225;
						var jsonbody = '{"staffId":"'+staffId+'"}';
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  			$("#dialog-form").dialog("close");
				  			showCenter(centerId);
						}						
						//popupDialogWithFormView(jsonbody, postUrl, 'POST', 'dialog.title.assign.loan.officer', templateSelector ,width, height, saveSuccessFunctionReloadLoan );
						//popupDialogWithFormViewData(jsonbody, postUrl, 'POST', 'dialog.title.unassign.loan.officer', templateSelector, width, height, saveSuccessFunction)		
						popupConfirmationDialogAndPost(postUrl, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunction , jsonbody);

						e.preventDefault();
			});

			$('.assignstafftogroup').button().click(function(e){
				var linkId = this.id;
				var centerId = linkId.replace("assignstafftogroup", "");
				var postUrl = 'groups/' + centerId +'?command=assignStaff';
				var getUrl = 'groups/' + centerId + '?template=true';

				var templateSelector = "#assignStaffFormTemplate";
				var width = 400; 
				var height = 225;

				var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						showCenter(centerId);
				}	
				popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.assign.staff", templateSelector, width,  height, saveSuccessFunction);
				e.preventDefault();
			});

			$('.newcentersavingsbtn').button({icons: {primary: "ui-icon-document-b"}}).click(function(e) {
				var linkId = this.id;
				var centerId = linkId.replace("newcentersavingsbtn", "");
				isCenterSaving = true;
				launchGroupSavingsAccountDialog(centerId);
				e.preventDefault();
			});
		});
		
	}

	var errorFunction = function(jqXHR, textStatus, errorThrown, index, anchor) {
    	handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
        $(anchor.hash).html("error occured while ajax loading.");
    };

	executeAjaxRequest(centerUrl + '?associations=groupMembers,collectionMeetingCalendar', 'GET', "", successFunction, errorFunction);
}

	function jlgBulkMembersLoanWizard(groupId){
		//setAddBulkLoanContent("content");

		var viewMemberselection = function(data, textStatus, jqXHR) {

			var dialogDiv = $("<div id='dialog-form'></div>");
			var buttonsOpts = {};
			var titleCode = 'dialog.title.add.jlg.bulkMembers.loan';


			dialogDiv.dialog({
				title: doI18N(titleCode), 
		  		width: 1100, 
		  		height: 650, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
				open: function (event, ui) {
					var memberHtml = $("#jlgbulkloanmemberselect").render(data);
					dialogDiv.html(memberHtml);

					$('.multiadd').click(function() {  
						return !$('.multiNotSelectedItems option:selected').remove().appendTo('#loanMembers');  
					});
					
					$('.multiremove').click(function() {  
						return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');  
					});

					$('.cancelbtn').button({
			            icons : {
			                primary : "ui-icon-close"
			            }
			         }).click(function(e){
			             $("#dialog-form").dialog("close");
			             e.preventDefault();
			         });

					$('#continuebtn').button({icons: { primary: "ui-icon-circle-arrow-e"}}).click(function(e){
						
						//get Loan product details
						var container = $('#jlgloanproductdetails');
						var loanProductId = $('#loanProductId').val(); 
						var membersLength = $('#loanMembers > option').length;

						if(loanProductId === undefined || loanProductId === "" || membersLength === undefined || membersLength <= 0){
								var dialogErrordiv = $( '<div id="dialog-confirm" title="Errors"> </div>');
							 dialogErrordiv.dialog({
									resizable: true,
									height:200,
									width:400,
									modal: true,
									buttons: {
										Cancel: function() {
											$( this ).dialog( "close" );
										}
									},
									close: function() {
									},
									open: function (event, ui) {
										var errorHtml = $("#jlgbulkloanErrorDialogFormTemplate").render();
										dialogErrordiv.html(errorHtml);
									}
								}).dialog('open');

						   return false;
						}

						$('#membesselect').hide();
						$('#jlgloancontainer').show();
						var isjlgbulk = true;
						var loanType = 'jlg';
						loadTabbedLoanApplicationForm(container, undefined, loanProductId, data.group, loanType, isjlgbulk);
						$("#selectedmembers option").remove();
						$('#selectedmembers').empty().append(function(){
			                var output = "";
			                $('#loanMembers option').each(function(i) {  
			                    output += '<option value="' + $(this).val() + '">' + $(this).text() + '</option>';
			                });
			                return output;
			            });	

						$('#backbtn').button({icons: { primary: "ui-icon-circle-arrow-w"}}).click(function(e){
							$('#membesselect').show();
							$('#jlgloancontainer').hide();
						});

			            $('#savebtn').button({icons: { primary: "ui-icon-disk"}}).click(function(e){
			                var serializedArray = {};
			                serializedArray = $('#entityform').serializeObject();
			                serializedArray['productId'] = loanProductId;
			                serializedArray['groupId'] = groupId;
			                serializedArray["calendarId"] = $("#calendarId").val();
			                var isError = false;
			                var totalSelectedMembers = $('#selectedmembers > option').length;
			                $('#selectedmembers option').each(function(index) {  
			                    var serializedArray1 = serializedArray;
			                    serializedArray1['clientId'] = $(this).val();
			                    var newFormData = JSON.stringify(serializedArray);
			                    var successFunction =  function(data, textStatus, jqXHR) {
			                    	$("#dialog-form").dialog("close");
			                        if (index === totalSelectedMembers - 1) {
								        showGroup(groupId);
								    }
			                        
			                    };
			                    
			                    var customFormErrorFunction = function(jqXHR, textStatus, errorThrown) {
			                        formErrorFunction(jqXHR, textStatus, errorThrown);
			                        isError = true;
			                    };
			                    
			            		if(isError) return false;

			            		executeAjaxRequest('loans', "POST", newFormData , successFunction, customFormErrorFunction);
			                });
			            });		
					});
				}
			}).dialog('open');
		}

		var url = 'loans/template?templateType=jlgbulk&groupId=' + groupId + '&lendingStrategy=300';
		executeAjaxRequest(url, 'GET', "", viewMemberselection, formErrorFunction);	
	}

	// function to retrieve and display loan summary information in it placeholder
	function refreshLoanSummaryInfo(clientUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var tableHtml = $("#clientAccountSummariesTemplate").render(data);
			$("#clientaccountssummary").html(tableHtml);
		}
  		executeAjaxRequest(clientUrl + '/accounts', 'GET', "", successFunction, formErrorFunction);	  	
	}

	function refreshClientSummary(clientId) {
		var clientSummaryTabHtml = $("#clientSummaryListTemplate").render();
		$("#clientsummarypane").html(clientSummaryTabHtml);
		var clientSummarySuccessFunction =  function(data, textStatus, jqXHR) {
			$("#loanCycle").text(data[0].loanCycle);
			$("#activeLoans").text(data[0].activeLoans);
			$("#lastLoanAmount").text(data[0].lastLoanAmount);
			$("#totalSavings").text(data[0].totalSavings);
			$("#activeSavings").text(data[0].activeSavings);
		}
		executeAjaxRequest('runreports/ClientSummary?genericResultSet=false&R_clientId='+clientId, 'GET', "", clientSummarySuccessFunction, formErrorFunction);

		var getLoanCycleSuccessFunction = function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			var tableHtml = $("#clientLoanCyclePerProductListTemplate").render(crudObject);
			$("#clientloancyclespane").html(tableHtml);
		}
		executeAjaxRequest('runreports/LoanCyclePerProduct?genericResultSet=false&R_clientId='+clientId, 'GET', "", getLoanCycleSuccessFunction, formErrorFunction);
	}
	
	// function to retrieve and display group loan summary information in it placeholder
	function refreshGroupLoanSummaryInfo(groupUrl) {
		var successFunction =  function(data, textStatus, jqXHR) {
  			var tableHtml = $("#groupAccountSummariesTemplate").render(data);
  			$("#groupaccountssummary").html(tableHtml);

			$('.toggleMemberLoanDetails').click(function(e){
				var memberLoanDetailsElement = $(this).next(".memberLoanDetails"),
					loanId = memberLoanDetailsElement.attr("id").replace("memberLoanDetails",""),
					showMemberLoanDetailsSuccess = function(data, textStatus, jqXHR){
						var memberLoanDetailsHtml = $("#memberLoanDetailsPartialTemplate").render(data),
			        		offsetToSubmittedDate = data.convenienceData.maxSubmittedOnOffsetFromToday,
	        				offsetToApprovalDate = data.convenienceData.maxApprovedOnOffsetFromToday,
	        				offsetToDisbursalDate = data.convenienceData.maxDisbursedOnOffsetFromToday,
	        				maxOffset = 0;
						
						memberLoanDetailsElement.html(memberLoanDetailsHtml);
						memberLoanDetailsElement.show();
						
						$('.approveloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("approvebtn", "");
							var postUrl = 'loans/' + loanId + '?command=approve';
							var templateSelector = "#loanApplicationApprovalTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToSubmittedDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.approve.loan', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl),  offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.approveloan span').text(doI18N('dialog.button.approve.loan'));
							
						$('.undoapproveloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("undoapprovebtn", "");
							var postUrl = 'loans/' + loanId + '?command=undoapproval';
							var templateSelector = "#undoStateTransitionLoanFormTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToSubmittedDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.approval', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl), offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.undoapproveloan span').text(doI18N('dialog.button.undo.loan.approval'));
							
						$('.deleteloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("deletebtn", "");
							var url = 'loans/' + loanId;
							var width = 400; 
							var height = 225;
													
							popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, reloadGroupLoanSummarySaveSuccessFunction(groupUrl));
						    e.preventDefault();
						});
						$('button.deleteloan span').text(doI18N('dialog.button.delete.loan'));
							
						$('.disburseloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("disbursebtn", "");
							var postUrl = 'loans/' + loanId + '?command=disburse';
							var templateSelector = "#loanDisbursementTemplate";
							var width = 500; 
							var height = 450;
							var defaultOffset = offsetToApprovalDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.disburse.loan', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl),  offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.disburseloan span').text(doI18N('dialog.button.disburse.loan'));

						$('.undodisbursalloan').button().click(function(e) {
							var linkId = this.id;
							var loanId = linkId.replace("undodisbursalbtn", "");
							var postUrl = 'loans/' + loanId + '?command=undodisbursal';
							var templateSelector = "#undoStateTransitionLoanFormTemplate";
							var width = 500; 
							var height = 350;
							var defaultOffset = offsetToApprovalDate;
							popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.disbursal', templateSelector, width, height, reloadGroupLoanSummarySaveSuccessFunction(groupUrl),  offsetToSubmittedDate, defaultOffset, maxOffset)
						    e.preventDefault();
						});
						$('button.undodisbursalloan span').text(doI18N('dialog.button.undo.loan.disbursal'));
						
					};

					if (memberLoanDetailsElement.children().length > 0 ){
						memberLoanDetailsElement.toggle();
					} else {
						executeAjaxRequest('loans/' + loanId + '?associations=permissions,meeting', 'GET', "", showMemberLoanDetailsSuccess, formErrorFunction);
					}

					
					e.preventDefault();
			});
		}
  		executeAjaxRequest(groupUrl + '/accounts', 'GET', "", successFunction, formErrorFunction);	  	
	}

	function reloadGroupLoanSummarySaveSuccessFunction(groupUrl){
		return function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			refreshGroupLoanSummaryInfo(groupUrl);
		};
	}

	function refreshNoteWidget(resourceUrl, notesContent) {
			  	
		//if (jQuery.MifosXUI.showTask("ViewNotes") == true)
		//{
			eval(genRefreshNoteWidgetSuccessVar(resourceUrl, notesContent));
			executeAjaxRequest(resourceUrl + '/notes', 'GET', "", successFunction, formErrorFunction);
		//}
	}
	function genRefreshNoteWidgetSuccessVar(resourceUrl, notesContent) {

		return 'var successFunction = function(data, textStatus, jqXHR) {	' +
				  ' var noteParent = new Object();' + 
				  ' noteParent.title = doI18N("widget.notes.heading");' +
				  ' noteParent.notes = data;' +
				  ' var tableHtml = $("#noteListViewTemplate").render(noteParent);' +
				  ' $("#' + notesContent + '").html(tableHtml);' +
				  ' $(".editnote").click(function(e) { ' +
						' var linkId = this.id;' +
						' var noteId = linkId.replace("editnotelink", "");' +
						' var getAndPutUrl = "' + resourceUrl + '/notes/" + noteId;' +
						' var templateSelector = "#noteFormTemplate";' +
						' var width = 600;' +
						' var height = 400;' +
						' var saveSuccessFunction = function(data, textStatus, jqXHR) {' +
						  	' $("#dialog-form").dialog("close");' +
							' refreshNoteWidget("' + resourceUrl + '", "' + notesContent + '");' +
						' };' +
						' popupDialogWithFormView(getAndPutUrl, getAndPutUrl, "PUT", "dialog.title.edit.note", templateSelector, width, height,  saveSuccessFunction);' +
					    ' e.preventDefault();' +
			      ' });' +
			  ' };'
	}
	
	function modifyLoanApplication(clientId, loanId) {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction =  function(data, textStatus, jqXHR) {
			showILClient(clientId);
		};
		
		executeAjaxRequest('loans/' + loanId , "PUT", newFormData, successFunction, formErrorFunction);	  
	}
	
	function submitTabbedLoanApplication(divContainer, clientId, group, loanType) {
		
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);

		
		if(loanType === 'jlg' || loanType === 'group'){
            serializedArray["groupId"] = group.id;
            serializedArray["calendarId"] = $("#calendarId").val();
        }

        if (!$('#syncRepaymentsWithMeeting').is(':checked') && !$('#syncDisbursementWithMeeting').is(':checked')) {
        	delete serializedArray["calendarId"];
        }

		var newFormData = JSON.stringify(serializedArray);

		var successFunction =  function(data, textStatus, jqXHR) {
			divContainer.dialog("close");
			if (loanType === 'individual' || loanType === 'jlg') {
				showILClient(clientId);
			} else if(loanType === 'group'){
				showGroup(group.id);
			}
		};
		
		executeAjaxRequest('loans', "POST", newFormData, successFunction, formErrorFunction);	  
	}
	
	function submitTabbedModifyLoanApplication(divContainer, loanId, clientId, group) {
		
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);	
		
		// deleting all charges while modifying a loan application
		// sends a request to the platform without any json element called
		// "charges". The platform does not understand that charges have been deleted
		// Sending an empty array of charges in this associative array instead
		// for handling this scenario
		if(!("charges" in serializedArray)){
		    serializedArray["charges"] = {};
		}

		if(!("collateral" in serializedArray)){
		    serializedArray["collateral"] = [];
		}

        //If JLG loan, send group id and calendar id
        if(!(group === undefined)){
            serializedArray["groupId"] = group.id;//This is group loan
            serializedArray["calendarId"] = $("#calendarId").val();
        }

        if (!$('#syncRepaymentsWithMeeting').is(':checked') && !$('#syncDisbursementWithMeeting').is(':checked')) {
        	delete serializedArray["calendarId"];
        }

		var newFormData = JSON.stringify(serializedArray);
		
		var successFunction =  function(data, textStatus, jqXHR) {
			clientDirty = true;
			divContainer.dialog("close");
			if(data.groupId) {
				loadILLoan(loanId, "groupdatatabs");
			} else {
				loadILLoan(loanId, "clientdatatabs");
			}
		};
		
		executeAjaxRequest('loans/' + loanId , "PUT", newFormData, successFunction, formErrorFunction);	  
	}
	
	var launchLoanApplicationDialogOnSuccessFunction = function(loanType){

		return function(data, textStatus, jqXHR) {
			
			var dialogDiv = $("<div id='dialog-form'></div>");
			var saveButton = doI18N('dialog.button.save');
			var cancelButton = doI18N('dialog.button.cancel');
			
			var buttonsOpts = {};
			buttonsOpts[saveButton] = function() {
				submitTabbedLoanApplication(dialogDiv, data.clientId, data.group, loanType);
			};
			// end of buttonsOpts for save button
			
			buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
			
			dialogDiv.dialog({
			  		title: doI18N('dialog.title.newLoanApplication'), 
			  		width: 1200, 
			  		height: 575, 
			  		modal: true,
			  		buttons: buttonsOpts,
			  		close: function() {
			  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
			  			$(this).remove();
					},
			  		open: function (event, ui) {
			  			
			  			if (data.loanProductId) {
			  				loadTabbedLoanApplicationForm(dialogDiv, data.clientId, data.loanProductId , data.group, loanType);
			  			} else {
			  				var formHtml = $("#loanApplicationSelectProductDialogTemplate").render(data);
			  				dialogDiv.html(formHtml);
			  			}
			  			if ($("#productId").val() < 0) {
							$('.ui-dialog-buttonpane button:first').button("disable");
						}
						
						$("#productId").change(function() {

							var loanProductId = $("#productId").val();
							if (loanProductId >= 0) {
								$('.ui-dialog-buttonpane button:first').button("enable");
							}
							loadTabbedLoanApplicationForm(dialogDiv, data.clientId, loanProductId , data.group, loanType);
						});
			  		}
			  	}).dialog('open');		
		};
	}
	
	function launchLoanApplicationDialog(clientId) {
		executeAjaxRequest('loans/template?templateType=individual&clientId=' + clientId, 'GET', "", launchLoanApplicationDialogOnSuccessFunction("individual"), formErrorFunction);
	}
	
	function launchJLGLoanApplicationDialog(clientId, groupId) {
		executeAjaxRequest('loans/template?templateType=jlg&clientId=' + clientId + '&groupId=' + groupId, 'GET', "", launchLoanApplicationDialogOnSuccessFunction("jlg"), formErrorFunction);
	}

	function launchGroupLoanApplicationDialog(groupId) {
		executeAjaxRequest('loans/template?templateType=group&groupId=' + groupId+'&lendingStrategy=300', 'GET', "", launchLoanApplicationDialogOnSuccessFunction("group"), formErrorFunction);
	}

	var launchModifyLoanApplicationDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		
		var buttonsOpts = {};
		buttonsOpts[saveButton] = function() {
			submitTabbedModifyLoanApplication(dialogDiv, data.id, data.clientId, data.group);
		};
		// end of buttonsOpts for save button
		
		buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N('dialog.title.newLoanApplication'), 
		  		width: 1200, 
		  		height: 575, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			if (data.loanProductId) {
		  				renderLoanApplicationTabs(dialogDiv, data);
		  			} else {
		  				var formHtml = $("#loanApplicationSelectProductDialogTemplate").render(data);
		  				dialogDiv.html(formHtml);
		  			}
					
					$("#productId").change(function() {
						var loanProductId = $("#productId").val();
						loadTabbedLoanApplicationForm(dialogDiv, data.clientId, loanProductId, data.group, data.loanType);
					});
		  		}
		  	}).dialog('open');		
	};
	
	function launchModifyLoanApplicationDialog(loanId) {
		executeAjaxRequest('loans/' + loanId + '?template=true&associations=charges,collateral,meeting', 'GET', "", launchModifyLoanApplicationDialogOnSuccessFunction, formErrorFunction);
	}
	
	var renderLoanApplicationTabs = function(container, data) {
		// show full application form with values defaulted
		data.loanType = data.loanType.value.toLowerCase();

		var formHtml = $("#loanApplicationDialogTemplate").render(data);
		container.html(formHtml);
		
		var loanapplicationtabs = $(".loanapplicationtabs").tabs({
			create: function(event, ui) {
				var curTab = $('#newtabs .ui-tabs-panel[aria-hidde="false"]');
      			var curTabID = curTab.prop("id");
			},
			beforeActivate: function( event, ui ) {
				if($(ui.newPanel).attr('id') == ("schedule")) {
					previewLoanApplicationSchedule();
				}
			}
		});
		
		$("#productId").change(function() {
			var loanProductId = $("#productId").val();
			loadTabbedLoanApplicationForm(container, data.clientId, loanProductId, null, data.loanType, false);
		});
		
		$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
		$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
		
		var chargeIndex = 0;
		if(typeof data.charges === "object") {
			chargeIndex = data["charges"].length;
		}
		$("#loanapp-addLoanCharge").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
			var chargeId = $('#chargeOptions option:selected').val();
			
				var addLoanChargeSuccess = function (chargeData) {
					chargeIndex++;
					chargeData["index"] = chargeIndex;
					var loanChargeHtml = $("#loanApplicationAddChargeRowTemplate").render(chargeData);
					$("#loanchargestable tbody").append(loanChargeHtml);
		  		
					$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
					$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
					
					$('#loanchargestable tbody tr:last .loanapp-removeLoanCharge').button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
						$(this).closest('tr').remove();
	            		e.preventDefault();
	            	});
				}
				
				if (chargeId && undefined != chargeId && chargeId > 0) {
					executeAjaxRequest('charges/' + chargeId + '?template=true', 'GET', "", addLoanChargeSuccess, formErrorFunction);
				}
		    e.preventDefault();
		});
		
		if(typeof data.charges === "object") {
			 $("#loanchargestable tbody tr .loanapp-removeLoanCharge").each(function(index) {
				 $(this).button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
					$(this).closest('tr').remove();
	            	e.preventDefault();
	            });
			 });
	    }
		 
		var collateralIndex = 0;
		if(typeof data.collateral === "object") {
			collateralIndex = data["collateral"].length;
		}
		$("#loanapp-addCollateralType").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
			
			var addLoanCollateralItemSuccess = function (collateralData) {
				collateralIndex++;
				collateralData["index"] = collateralIndex;
				var collateralHtml = $("#loanApplicationAddCollateralRowTemplate").render(collateralData);
				$("#loancollateraltable tbody").append(collateralHtml);
		  		
				$('#loancollateraltable tbody tr:last .loanapp-removeCollateralType').button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
					$(this).closest('tr').remove();
            		e.preventDefault();
            	});
				}
			
			// have to add 'id' as a field (along with 'loanCollateralOptions') otherwise platform thinks it has to filter it out of json results
			var productId = $("#productId").val();
			executeAjaxRequest('loans/template?templateType=collateral&productId='+ productId +'&fields=id,loanCollateralOptions', 'GET', "", addLoanCollateralItemSuccess, formErrorFunction);
		    e.preventDefault();
		});
		
		if(typeof data.collateral === "object") {
			 $("#loancollateraltable tbody tr .loanapp-removeCollateralType").each(function(index) {
				 $(this).button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
					$(this).closest('tr').remove();
	            	e.preventDefault();
	            });
			 });
	    }
	    
	    if(data.calendarOptions){
	        loadAvailableCalendars(data.calendarOptions, data.meeting, data.id, data.syncDisbursementWithMeeting);   
        }
	};
	
	function loadTabbedLoanApplicationForm(container, clientId, productId , group, loanType, isjlgbulk) {
		
		isjlgbulk = isjlgbulk || false; 
		group = group || undefined;
		clientId = clientId || undefined;
		
		var loadTabsOnSuccessFunction = function(data, textStatus, jqXHR) {
			//set loan type
			data.loanType = loanType;

			// show full application form with values defaulted
			var formHtml = $("#loanApplicationDialogTemplate").render(data);
			container.html(formHtml);
			
			var loanapplicationtabs = $(".loanapplicationtabs").tabs({
				beforeActivate: function( event, ui ) {
					if($(ui.newPanel).attr('id') == ("schedule")) {
						previewLoanApplicationSchedule();
					}
				}
			});
			
			$("#productId").change(function() {
				var loanProductId = $("#productId").val();
				loadTabbedLoanApplicationForm(container, data.clientId, loanProductId, group, loanType, isjlgbulk);
			});
			
			//setting the minimum submission date
			var fetchActivationDateSuccess = function (data, textStatus, jqXHR) {
				activationDate = new Date(data.activationDate[0], data.activationDate[1]-1, data.activationDate[2]); 
				$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0,minDate: activationDate ,maxDate: 0, dateFormat: custom.datePickerDateFormat});              
			}
      
			if(!(clientId === undefined)){
				executeAjaxRequest('clients/' + clientId + '/?clientId=' + clientId, 'GET', "", fetchActivationDateSuccess , formErrorFunction);
			}else if(!(group === undefined)){
				executeAjaxRequest('groups/' + group.id + '/?groupId=' + group.id, 'GET', "", fetchActivationDateSuccess , formErrorFunction);
			}else{
				$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
			}
			$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
			
			var chargeIndex = 0;
			if(typeof data.charges === "object") {
				chargeIndex = data["charges"].length;
			}
			$("#loanapp-addLoanCharge").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
				var chargeId = $('#chargeOptions option:selected').val();
				
					var addLoanChargeSuccess = function (chargeData) {
						chargeIndex++;
						chargeData["index"] = chargeIndex;
						var loanChargeHtml = $("#loanApplicationAddChargeRowTemplate").render(chargeData);
						$("#loanchargestable tbody").append(loanChargeHtml);
			  		
						$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
						$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
						
						$('#loanchargestable tbody tr:last .loanapp-removeLoanCharge').button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
							$(this).closest('tr').remove();
		            		e.preventDefault();
		            	});
					}
					
					if (chargeId && undefined != chargeId && chargeId > 0) {
						executeAjaxRequest('charges/' + chargeId + '?template=true', 'GET', "", addLoanChargeSuccess, formErrorFunction);
					}
			    e.preventDefault();
			});
			
			 if(typeof data.charges === "object") {
				 $("#loanchargestable tbody tr .loanapp-removeLoanCharge").each(function(index) {
					 $(this).button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
						$(this).closest('tr').remove();
		            	e.preventDefault();
		            });
				 });
		    }
			 
			var collateralIndex = 0;
			$("#loanapp-addCollateralType").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
				
				var addLoanCollateralItemSuccess = function (collateralData) {
					collateralIndex++;
					collateralData["index"] = collateralIndex;
					var collateralHtml = $("#loanApplicationAddCollateralRowTemplate").render(collateralData);
					$("#loancollateraltable tbody").append(collateralHtml);
			  		
					$('#loancollateraltable tbody tr:last .loanapp-removeCollateralType').button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
						$(this).closest('tr').remove();
	            		e.preventDefault();
	            	});
					}
				
				// have to add 'id' as a field (along with 'loanCollateralOptions') otherwise platform thinks it has to filter it out of json results
				var productId = $("#productId").val();
				executeAjaxRequest('loans/template?templateType=collateral&productId='+ productId +'&fields=id,loanCollateralOptions', 'GET', "", addLoanCollateralItemSuccess, formErrorFunction);
			    e.preventDefault();
			});

			if(data.calendarOptions){
				loadAvailableCalendars(data.calendarOptions);   
			}

            if(isjlgbulk){
            	//This is for bulk JLG loans hide applicant
            	$('.applicant').each(function(i) {
					$(this).html('');
				});
            }
		};
		
		
		if(!(clientId === undefined) && !(group === undefined)){
			//Client Id and Group Id are not null for JLG loans 
			executeAjaxRequest('loans/template?templateType=jlg&clientId=' + clientId + '&groupId=' + group.id + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
		}else if(!(clientId === undefined)){
		// loan loan application template providing selected client and product infomation
			executeAjaxRequest('loans/template?templateType=individual&clientId=' + clientId + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
		}else if(isjlgbulk && !(group === undefined)) {
			executeAjaxRequest('loans/template?templateType=jlgbulk&groupId=' + group.id + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
		}else if(!(group === undefined)){
			executeAjaxRequest('loans/template?templateType=group&groupId=' + group.id + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
 		}	
	}
	
	function previewLoanApplicationSchedule() {
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);

		if(!$("#syncRepaymentsWithMeeting").is(':checked') && !$("#syncDisbursementWithMeeting").is(':checked')){
			delete serializedArray["calendarId"];	
		}

		var newFormData = JSON.stringify(serializedArray);
    	
		var successFunction = function(data, textStatus, jqXHR) {
	  		removeErrors("#formerrors");
	  		var loanScheduleHtml = $("#newLoanScheduleTemplate").render(data);
	  		$("#previewloanschedule").html(loanScheduleHtml);
		};
		
		var errorFunction = function(jqXHR, textStatus, errorThrown) {
			handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
		};
		executeAjaxRequest('loans?command=calculateLoanSchedule', "POST", newFormData, successFunction, errorFunction);	  
	}
	
	// loan product related
	function submitTabbedLoanProduct(divContainer, loanProductId) {
		
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);
		
		if (!serializedArray["charges"]) {
			serializedArray["charges"] = new Array();
		}

		if (!serializedArray["paymentChannelToFundSourceMappings"]) {
			serializedArray["paymentChannelToFundSourceMappings"] = new Array();
		}

		if (!serializedArray["feeToIncomeAccountMappings"]) {
			serializedArray["feeToIncomeAccountMappings"] = new Array();
		}
		
		var newFormData = JSON.stringify(serializedArray);
		
		var successFunction =  function(data, textStatus, jqXHR) {
			divContainer.dialog("close");
			listLoanProducts();
		};
		
		if (loanProductId) {
			executeAjaxRequest('loanproducts/' + loanProductId, "PUT", newFormData, successFunction, formErrorFunction);
		} else {
			executeAjaxRequest('loanproducts', "POST", newFormData, successFunction, formErrorFunction);
		}
	}
	
	function listLoanProducts() {
		
		var tableName='loanproduct';
		
		var successFunction = function(data, textStatus, jqXHR) {

			var crudObject = new Object();
			crudObject.crudRows = data;
			
			var html = $("#" + tableName + "ListTemplate").render(crudObject);
			$("#listplaceholder").html(html);  

			$("a.edit" + tableName).click( function(e) {
				var linkId = this.id;
				var entityId = linkId.replace("edit" + tableName, "");

				var resourceUrl = tableName + "s/" + entityId;
				
				launchLoanProductDialog(entityId);
				
				e.preventDefault();
			});

			$("a.edit" + tableName + "closedate").click( function(e) {
				var linkId = this.id;
				var loanProductId = linkId.replace("edit" + tableName + "closedate", "");
				var searializedArray= {};
				searializedArray["closeDate"]= "";
				var newFormData =JSON.stringify(searializedArray);

				var successFunction =  function(data, textStatus, jqXHR) {
					listLoanProducts();
				};

				executeAjaxRequest('loanproducts/' + loanProductId, "PUT", newFormData, successFunction);
			});

			var oTable = displayListTable(tableName + "stable");
		  };
	

		  executeAjaxRequest(tableName + 's', 'GET', "", successFunction, formErrorFunction);
	}
	
	var launchLoanProductDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		
		var buttonsOpts = {};
		var titleCode = 'dialog.title.add.loanproduct';
		if (data.id){
			titleCode = 'dialog.title.loanproduct.details';
		}
		dialogDiv.dialog({
		  		title: doI18N(titleCode), 
		  		width: 1100, 
		  		height: 500, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			
		  			var formHtml = $("#loanProductDialogTemplate").render(data);
		  			dialogDiv.html(formHtml);
		  			
		  			$(".loanproducttabs").jWizard({
		  				cancel: function(event, ui) {
							$("#dialog-form").dialog( "close" );
						},
						finish: function(e, ui) {
							submitTabbedLoanProduct(dialogDiv, data.id);
							//return false to disable form submission
							e.preventDefault();
							return false;
						},
						effects: { enable: true }
					})

	  				//(initialize comboboxes)
	  				$("#fundSourceAccountId").combobox();
	  				$("#loanPortfolioAccountId").combobox();
	  				$("#interestOnLoanAccountId").combobox();
	  				$("#incomeFromFeeAccountId").combobox();
	  				$("#incomeFromPenaltyAccountId").combobox();
	  				$("#writeOffAccountId").combobox();
	  				$("#receivableInterestAccountId").combobox();
	  				$("#receivableFeeAccountId").combobox();
	  				$("#receivablePenaltyAccountId").combobox();
					$("#transfersInSuspenseAccountId").combobox();
	  				
	  				var showCashFinancialPlaceholders = function() {
	  					 $("#accountingPlaceholdersDiv").show();
	  		        	 //hide receivables
	  		        	 $("#interestReceivableRow").hide();
	  		        	 $("#feeReceivableRow").hide();
	  		        	 $("#penaltyReceivableRow").hide();
	  				};
	  				
	  				var showAccrualFinancialPlaceholders = function() {
	  					 $("#accountingPlaceholdersDiv").show();
	  		        	 //show receivables
	  		        	 $("#interestReceivableRow").show();
	  		        	 $("#feeReceivableRow").show();
	  		        	 $("#penaltyReceivableRow").show();
	  				}
	  				
	  				//onchange events for radio buttonaccountingRule
	  				 $("input[name=accountingRule]").change(function() {
	  			        var selectedValue = $(this).val();
	  			        if(selectedValue == "1"){
	  			        	 $("#accountingPlaceholdersDiv").hide();
	  			        	 $("#advancedAccountingOptionsContainer").hide();
	  			        }else if (selectedValue == "2"){
	  			        	 showCashFinancialPlaceholders();
	  			        	 $("#advancedAccountingOptionsContainer").show();
	  			        }else if (selectedValue == "3"){
	  			        	 showAccrualFinancialPlaceholders();
	  			        }
	  			    }); 
	  			    
	  			    //hide accounting placeholders div on page load
	  			    if(data.accountingRule.value == "NONE"){
	  			    	$("#accountingPlaceholdersDiv").hide();
	  			    	$("#advancedAccountingOptionsContainer").hide();
	  			    }else if (data.accountingRule.value == "CASH BASED"){
	  			    	 showCashFinancialPlaceholders();
	  			    	 $("#advancedAccountingOptionsContainer").show();
	  			    }else if (data.accountingRule.value == "ACCRUAL BASED"){
	  			    	 showAccrualFinancialPlaceholders();
	  			    }

	  			    //hide advanced accounting div on page load (and setup toggle functionality)
	  			    $('#advancedAccountingRulesDiv').hide();
		            $('#toggleAdvancedAccountingOptions').on("click", function(e) {
					    $("#advancedAccountingRulesDiv").toggle();
					    if ($('#toggleAdvancedAccountingOptions').html() == doI18N('label.show')) {
					  		$('#toggleAdvancedAccountingOptions').html(doI18N('label.hide'));
					    } else{
					  		$('#toggleAdvancedAccountingOptions').html(doI18N('label.show'));
					  	}
					 	e.preventDefault();
					});

				  	//initialize button for adding new "payment Type to Fund source mappings"
				  	var paymentChannelToFundSourceMappingIndex = 0;
					if(undefined === data.paymentChannelToFundSourceMappings || data.paymentChannelToFundSourceMappings === null) {
						paymentChannelToFundSourceMappingIndex = 0;
					} else {
						paymentChannelToFundSourceMappingIndex = data["paymentChannelToFundSourceMappings"].length;
						//initialize all delete buttons for "payment Type to Fund source mappings"
						$("#paymentChannelToFundSourceMappingTable tbody tr .removePaymentChannelToFundSourceMappings").each(function(index) {
							 $(this).button().click(function(e) {
								$(this).closest('tr').remove();
				            	e.preventDefault();
				            });
						});
					}
				  	$("#addPaymentChannelToFundSourceMappings").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
				  		paymentChannelToFundSourceMappingIndex++;
						var crudObject = new Object();
						crudObject["index"] = paymentChannelToFundSourceMappingIndex;
						crudObject["paymentTypeOptions"] = data.paymentTypeOptions;
						crudObject["assetAccountOptions"] = data["accountingMappingOptions"]["assetAccountOptions"];
						var paymentChannelToFundSourceMappingHtml = $("#loanProductAddPaymentChannelToFundSourceRowTemplate").render(crudObject);
						$("#paymentChannelToFundSourceMappingTable tbody").append(paymentChannelToFundSourceMappingHtml);
			  		
						$('#removePaymentChannelToFundSourceMappings'+paymentChannelToFundSourceMappingIndex)
						.button()
						.click(function(e) {
							$(this).closest('tr').remove();
		            		e.preventDefault();
		            	});
					    e.preventDefault();
					});

					//initialize button for adding new "charge to income account mappings"
				  	var chargeToIncomeAccountMappingIndex = 0;
					if(undefined === data.feeToIncomeAccountMappings || data.feeToIncomeAccountMappings === null) {
						chargeToIncomeAccountMappingIndex = 0;
					} else {
						chargeToIncomeAccountMappingIndex = data["feeToIncomeAccountMappings"].length;
						//initialize all delete buttons for "charge to income account mappings"
						$("#feeToIncomeAccountMappingTable tbody tr .removeFeeToIncomeAccountMappings").each(function(index) {
							 $(this).button().click(function(e) {
								$(this).closest('tr').remove();
				            	e.preventDefault();
				            });
						});
					}
				  	$("#addFeeToIncomeAccountMappings").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
				  		chargeToIncomeAccountMappingIndex++;
						var crudObject = new Object();
						crudObject["index"] = chargeToIncomeAccountMappingIndex;
						crudObject["chargeOptions"] = data.chargeOptions;
						crudObject["incomeAccountOptions"] = data["accountingMappingOptions"]["incomeAccountOptions"];
						var chargeToIncomeAccountMappingHtml = $("#loanProductAddFeeToIncomeAccountRowTemplate").render(crudObject);
						$("#feeToIncomeAccountMappingTable tbody").append(chargeToIncomeAccountMappingHtml);
			  		
						$('#removeFeeToIncomeAccountMappings'+chargeToIncomeAccountMappingIndex)
						.button()
						.click(function(e) {
							$(this).closest('tr').remove();
		            		e.preventDefault();
		            	});
					    e.preventDefault();
					});

					//initialize button for adding new "penalty to income account mappings"
				  	var penaltyToIncomeAccountMappingIndex = 0;
					if(undefined === data.penaltyToIncomeAccountMappings || data.penaltyToIncomeAccountMappings === null) {
						penaltyToIncomeAccountMappingIndex = 0;
					} else {
						penaltyToIncomeAccountMappingIndex = data["penaltyToIncomeAccountMappings"].length;
						//initialize all delete buttons for "charge to income account mappings"
						$("#penaltyToIncomeAccountMappingTable tbody tr .removePenaltyToIncomeAccountMappings").each(function(index) {
							 $(this).button().click(function(e) {
								$(this).closest('tr').remove();
				            	e.preventDefault();
				            });
						});
					}
				  	$("#addPenaltyToIncomeAccountMappings").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
				  		penaltyToIncomeAccountMappingIndex++;
						var crudObject = new Object();
						crudObject["index"] = penaltyToIncomeAccountMappingIndex;
						crudObject["penaltyOptions"] = data.penaltyOptions;
						crudObject["incomeAccountOptions"] = data["accountingMappingOptions"]["incomeAccountOptions"];
						var chargeToIncomeAccountMappingHtml = $("#loanProductAddPenaltyToIncomeAccountRowTemplate").render(crudObject);
						$("#penaltyToIncomeAccountMappingTable tbody").append(chargeToIncomeAccountMappingHtml);
			  		
						$('#removePenaltyToIncomeAccountMappings'+ penaltyToIncomeAccountMappingIndex)
						.button()
						.click(function(e) {
							$(this).closest('tr').remove();
		            		e.preventDefault();
		            	});
					    e.preventDefault();
					});


	  			
		  			$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
					$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
					
					var chargeIndex = 0;
					if(undefined === data.charges || data.charges === null) {
						chargeIndex = 0;
					} else {
						chargeIndex = data["charges"].length;
					}
					
					$("#loanproduct-addLoanCharge").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
						
						var chargeId = $('#chargeOptions option:selected').val();
						
						var addProductChargeSuccess = function (chargeData) {
								chargeIndex++;
								chargeData["index"] = chargeIndex;
								var loanChargeHtml = $("#loanProductAddChargeRowTemplate").render(chargeData);
								$("#loanchargestable tbody").append(loanChargeHtml);
					  		
								$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
								$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
								
								
								// remove icon {icons: {primary: "ui-icon-trash"},text: false} as seems is cause of bug https://mifosforge.jira.com/browse/MIFOSX-386
								$('#loanchargestable tbody tr:last .loanproduct-removeLoanCharge').button().click(function(e) {
									$(this).closest('tr').remove();
				            		e.preventDefault();
				            	});
						}
							
						if (chargeId && undefined != chargeId && chargeId > 0) {
							executeAjaxRequest('charges/' + chargeId + '?template=true', 'GET', "", addProductChargeSuccess, formErrorFunction);
						}
					    e.preventDefault();
					});
					
					if(undefined === data.charges || data.charges === null) {
						// do nothing
					} else {
						 $("#loanchargestable tbody tr .loanproduct-removeLoanCharge").each(function(index) {
							 
							// remove icon {icons: {primary: "ui-icon-trash"},text: false} as seems is cause of bug https://mifosforge.jira.com/browse/MIFOSX-386
							 $(this).button().click(function(e) {
								$(this).closest('tr').remove();
				            	e.preventDefault();
				            });
						 });
					}
		  		}
		  	}).dialog('open');		
	};

	function launchLoanProductDialog(loanProductId) {
		
		if (loanProductId) {
			executeAjaxRequest('loanproducts/' + loanProductId + '?template=true', 'GET', "", launchLoanProductDialogOnSuccessFunction, formErrorFunction);
		} else {
			executeAjaxRequest('loanproducts/template', 'GET', "", launchLoanProductDialogOnSuccessFunction, formErrorFunction);
		}
	}
	// end of loan product
	
	// start of savings product
	function submitTabbedSavingsProduct(divContainer, savingsProductId) {
		
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);

		if (!serializedArray["paymentChannelToFundSourceMappings"]) {
			serializedArray["paymentChannelToFundSourceMappings"] = new Array();
		}
		
		var newFormData = JSON.stringify(serializedArray);
		
		var successFunction =  function(data, textStatus, jqXHR) {
			divContainer.dialog("close");
			listSavingsProducts();
		};
		
		if (savingsProductId) {
			executeAjaxRequest('savingsproducts/' + savingsProductId, "PUT", newFormData, successFunction, formErrorFunction);
		} else {
			executeAjaxRequest('savingsproducts', "POST", newFormData, successFunction, formErrorFunction);
		}
	}
	
	function listSavingsProducts() {
		
		var successFunction = function(data, textStatus, jqXHR) {

			var crudObject = new Object();
			crudObject.crudRows = data;
			
			var html = $("#savingsProductListTemplate").render(crudObject);
			$("#listplaceholder").html(html);  

			$("a.editsavingproduct").click( function(e) {
				var linkId = this.id;
				var entityId = linkId.replace("editsavingproduct", "");

				var resourceUrl = "savingsproducts/" + entityId;
				
				launchSavingsProductDialog(entityId);
				
				e.preventDefault();
			});

			var oTable = displayListTable("savingsproductstable");
		  };
	

		  executeAjaxRequest('savingsproducts', 'GET', "", successFunction, formErrorFunction);
	}
	
	var launchSavingsProductDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		
		var buttonsOpts = {};
		buttonsOpts[saveButton] = function() {
			submitTabbedSavingsProduct(dialogDiv, data.id);
		};
		// end of buttonsOpts for save button
		
		buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		
		var titleCode = 'dialog.title.add.savingsproduct';
		if (data.id){
			titleCode = 'dialog.title.savingsproduct.details';
		}
		dialogDiv.dialog({
		  		title: doI18N(titleCode), 
		  		width: 1100, 
		  		height: 500, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			
		  			var formHtml = $("#savingsProductDialogTemplate").render(data);
		  			dialogDiv.html(formHtml);
		  			
		  			var savingsproducttabs = $(".savingsproducttabs").tabs({
		  				create: function(event, ui) {
		  					var curTab = $('.savingsproducttabs .ui-tabs-panel[aria-hidde="false"]');
		  	      			var curTabID = curTab.prop("id");
		  				},
		  				beforeActivate: function( event, ui ) {
		  				}
		  			});

		  			//(initialize comboboxes)
	  				$("#savingsReferenceAccountId").combobox();
	  				$("#savingsControlAccountId").combobox();
	  				$("#interestOnSavingsAccountId").combobox();
	  				$("#incomeFromFeeAccountId").combobox();
	  				
	  				
	  				var showCashFinancialPlaceholders = function() {
	  					 $("#accountingPlaceholdersDiv").show();
	  				};
	  				
	  						
	  				//onchange events for radio buttonaccountingRule
	  				 $("input[name=accountingRule]").change(function() {
	  			        var selectedValue = $(this).val();
	  			        if(selectedValue == "1"){
	  			        	 $("#accountingPlaceholdersDiv").hide();
	  			        	 $("#advancedAccountingOptionsContainer").hide();
	  			        }else if (selectedValue == "2"){
	  			        	 showCashFinancialPlaceholders();
	  			        	 $("#advancedAccountingOptionsContainer").show();
	  			        }
	  			    }); 
	  			    
	  			    //hide accounting placeholders div on page load
	  			    if(data.accountingRule.value == "NONE"){
	  			    	$("#accountingPlaceholdersDiv").hide();
	  			    	$("#advancedAccountingOptionsContainer").hide();
	  			    }else if (data.accountingRule.value == "CASH BASED"){
	  			    	showCashFinancialPlaceholders();
	  			    	$("#advancedAccountingOptionsContainer").show();
	  			    }

	  			    //hide advanced accounting div on page load (and setup toggle functionality)
	  			    $('#advancedAccountingRulesDiv').hide();
		            $('#toggleAdvancedAccountingOptions').on("click", function(e) {
					    $("#advancedAccountingRulesDiv").toggle();
					    if ($('#toggleAdvancedAccountingOptions').html() == doI18N('label.show')) {
					  		$('#toggleAdvancedAccountingOptions').html(doI18N('label.hide'));
					    } else{
					  		$('#toggleAdvancedAccountingOptions').html(doI18N('label.show'));
					  	}
					 	e.preventDefault();
					});


				  	//initialize button for adding new "payment Type to Fund source mappings"
				  	var paymentChannelToFundSourceMappingIndex = 0;
					if(undefined === data.paymentChannelToFundSourceMappings || data.paymentChannelToFundSourceMappings === null) {
						paymentChannelToFundSourceMappingIndex = 0;
					} else {
						paymentChannelToFundSourceMappingIndex = data["paymentChannelToFundSourceMappings"].length;
						//initialize all delete buttons for "payment Type to Fund source mappings"
						$("#paymentChannelToFundSourceMappingTable tbody tr .removePaymentChannelToFundSourceMappings").each(function(index) {
							 $(this).button().click(function(e) {
								$(this).closest('tr').remove();
				            	e.preventDefault();
				            });
						});
					}
				  	$("#addPaymentChannelToFundSourceMappings").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
						paymentChannelToFundSourceMappingIndex++;
						var crudObject = new Object();
						crudObject["index"] = paymentChannelToFundSourceMappingIndex;
						crudObject["paymentTypeOptions"] = data.paymentTypeOptions;
						crudObject["assetAccountOptions"] = data["accountingMappingOptions"]["assetAccountOptions"];
						var paymentChannelToFundSourceMappingHtml = $("#loanProductAddPaymentChannelToFundSourceRowTemplate").render(crudObject);
						$("#paymentChannelToFundSourceMappingTable tbody").append(paymentChannelToFundSourceMappingHtml);
			  		
						$('#removePaymentChannelToFundSourceMappings'+paymentChannelToFundSourceMappingIndex).button().click(function(e) {
							$(this).closest('tr').remove();
		            		e.preventDefault();
		            	});
					    e.preventDefault();
					});

		  			
		  			$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
					$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
					
					$('.noyeardatepickerfield').datepicker(
					{
						constrainInput: true, 
						defaultDate: 0, 
						dateFormat: 'dd MM',
						changeMonth: true,
				        changeYear: false,
				        showButtonPanel: false,
				        beforeShow : function(input, inst) {
				        	$('#ui-datepicker-div').addClass('hide-year-label');
				        },
				        onClose: function() {
				        	$('#ui-datepicker-div').removeClass('hide-year-label');
				        }
				    });
		  		}
		  	}).dialog('open');		
	};
	
	function launchSavingsProductDialog(savingsProductId) {
		
		if (savingsProductId) {
			executeAjaxRequest('savingsproducts/' + savingsProductId + '?template=true', 'GET', "", launchSavingsProductDialogOnSuccessFunction, formErrorFunction);
		} else {
			executeAjaxRequest('savingsproducts/template', 'GET', "", launchSavingsProductDialogOnSuccessFunction, formErrorFunction);
		}
	}
	// end of savings product
	
	// start of savings account
	function displayTabbedSavingsAccountForm(data, container) {
		data.isCenterSavingAccount= isCenterSaving;
		var formHtml = $("#savingsAccountDialogTemplate").render(data);
		container.html(formHtml);
		
		var loanapplicationtabs = $(".savingsaccounttabs").tabs({
			create: function(event, ui) {
				var curTab = $('.savingsaccounttabs .ui-tabs-panel[aria-hidde="false"]');
      			var curTabID = curTab.prop("id");
			},
			beforeActivate: function( event, ui ) {
			}
		});
		
		$("#productId").change(function() {
			var savingsProductId = $("#productId").val();
			loadTabbedSavingsAccountForm(container, data.clientId, savingsProductId, data.groupId);
		});
		
		$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
		$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
		
		$('.noyeardatepickerfield').datepicker(
		{
			constrainInput: true, 
			defaultDate: 0, 
			dateFormat: 'dd MM',
			changeMonth: true,
	        changeYear: false,
	        showButtonPanel: false,
	        beforeShow : function(input, inst) {
	        	$('#ui-datepicker-div').addClass('hide-year-label');
	        },
	        onClose: function() {
	        	$('#ui-datepicker-div').removeClass('hide-year-label');
	        }
	    });
	}
	
	function loadTabbedSavingsAccountForm(container, clientId, productId, groupId) {
		
		var loadTabsOnSuccessFunction = function(data, textStatus, jqXHR) {
			displayTabbedSavingsAccountForm(data, container);
		};
		
		// load savings account template providing selected client and product infomation
		if(!(clientId === undefined) && !(groupId === undefined)) {
			executeAjaxRequest('savingsaccounts/template?clientId=' + clientId + '&groupId=' + groupId + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
		}else if(!(clientId === undefined)) {
			executeAjaxRequest('savingsaccounts/template?clientId=' + clientId + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
		}
		else if(!(groupId === undefined)){
			executeAjaxRequest('savingsaccounts/template?groupId=' + groupId + '&productId=' + productId, 'GET', "", loadTabsOnSuccessFunction, formErrorFunction);
		};
	}
	
	function submitTabbedSavingsAccount(divContainer, clientId, groupId) {
		
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);	
		var newFormData = JSON.stringify(serializedArray);
		
		var successFunction =  function(data, textStatus, jqXHR) {
			divContainer.dialog("close");
			if (clientId) {
				showILClient(clientId);
			} else {
				if (isCenterSaving) {
					showCenter(groupId);
				} else{
					showGroup(groupId);
				}
			}
		};
		
		executeAjaxRequest('savingsaccounts', "POST", newFormData, successFunction, formErrorFunction);	  
	}

	var launchSavingsAccountDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		data.isCenterSavingAccount = isCenterSaving;
		
		var buttonsOpts = {};
		buttonsOpts[saveButton] = function() {
			submitTabbedSavingsAccount(dialogDiv, data.clientId, data.groupId);
		};
		// end of buttonsOpts for save button
		
		buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N('dialog.title.newSavingsAccount'), 
		  		width: 1100, 
		  		height: 450, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			if (data.savingsProductId) {
		  				loadTabbedSavingsAccountForm(dialogDiv, data.clientId, data.savingsProductId , data.groupId);
		  			} else {
		  				var formHtml = $("#savingsAccountSelectProductDialogTemplate").render(data);
		  				dialogDiv.html(formHtml);
		  			}
					
					$("#productId").change(function() {
						var savingsProductId = $("#productId").val();
						loadTabbedSavingsAccountForm(dialogDiv, data.clientId, savingsProductId, data.groupId);
					});
		  		}
		  	}).dialog('open');		
	};
	
	function submitTabbedSavingsApplicationForUpdate(divContainer, savingsId, clientId, group) {
		
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;
		
		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);	

		var groupId = null;
		
        //If JLG loan, send group id and calendar id
        if(!(group === undefined)){
        	groupId = group.id;
            serializedArray["groupId"] = groupId;
            serializedArray["calendarId"] = $("#calendarId").val();
        }
        if (serializedArray.annualFeeOnMonthDay === "") {
			delete serializedArray.annualFeeOnMonthDay;
		}

		var newFormData = JSON.stringify(serializedArray);
		
		var successFunction =  function(data, textStatus, jqXHR) {
			divContainer.dialog("close");
			if(data.groupId) {
				if (isCenterSaving) {
					loadSavingAccount(savingsId);
					centerDirty=true;
				} else{
					loadSavingAccount(savingsId);
					groupDirty=true;
				}
			} else {
				loadSavingAccount(savingsId, 'clientdatatabs');
			}
		};
		
		executeAjaxRequest('savingsaccounts/' + savingsId , "PUT", newFormData, successFunction, formErrorFunction);	  
	}
	
	function launchSavingsAccountDialog(clientId) {
		executeAjaxRequest('savingsaccounts/template?clientId=' + clientId, 'GET', "", launchSavingsAccountDialogOnSuccessFunction, formErrorFunction);	
	}
	
	var launchModifySavingsAccountDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		
		var buttonsOpts = {};
		buttonsOpts[saveButton] = function() {
			submitTabbedSavingsApplicationForUpdate(dialogDiv, data.id, data.clientId, data.groupId);
			groupDirty=true;
			centerDirty=true;
		};
		// end of buttonsOpts for save button
		
		buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N('dialog.title.modifySavingsAccount'), 
		  		width: 1100, 
		  		height: 450, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			
		  			displayTabbedSavingsAccountForm(data, dialogDiv);
					
					$("#productId").change(function() {
						var savingsProductId = $("#productId").val();
					});
					
					$('.datepickerfield').datepicker({constrainInput: true, defaultDate: 0, maxDate: 0, dateFormat: custom.datePickerDateFormat});
					$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
					
					$('.noyeardatepickerfield').datepicker(
					{
						constrainInput: true, 
						defaultDate: 0, 
						dateFormat: 'dd MM',
						changeMonth: true,
				        changeYear: false,
				        showButtonPanel: false,
				        beforeShow : function(input, inst) {
				        	$('#ui-datepicker-div').addClass('hide-year-label');
				        },
				        onClose: function() {
				        	$('#ui-datepicker-div').removeClass('hide-year-label');
				        }
				    });
		  		}
		  	}).dialog('open');		
	};
	
	function launchModifySavingsAccountDialog(savingsId) {
		executeAjaxRequest('savingsaccounts/' + savingsId + '?template=true', 'GET', "", launchModifySavingsAccountDialogOnSuccessFunction, formErrorFunction);	
	}
	
	function launchGroupSavingsAccountDialog(groupId) {
		executeAjaxRequest('savingsaccounts/template?groupId=' + groupId, 'GET', "", launchSavingsAccountDialogOnSuccessFunction, formErrorFunction);
	}

	function launchJLGSavingsAccountDialog(clientId,groupId) {
		executeAjaxRequest('savingsaccounts/template?clientId=' + clientId +'&groupId=' + groupId, 'GET', "", launchSavingsAccountDialogOnSuccessFunction, formErrorFunction);
	}

	// end of savings account
	
	function removeLoanCharge(loanId, loanChargeId, parenttab) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId, parenttab);
		};

		popupConfirmationDialogAndPost('loans/' + loanId +'/charges/' + loanChargeId, 'DELETE', 'dialog.title.confirmation.required', 400, 225, 0, successFunction);
	}
	
	function modifyLoanCharge(loanId, loanChargeId, parenttab) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId, parenttab);
		};
		
		var getAndPutUrl = 'loans/' + loanId +'/charges/' + loanChargeId;
		var templateSelector = "#modifyLoanChargeFormTemplate";
		var width = 400;
		var height = 250;
		
		popupDialogWithFormView(getAndPutUrl, getAndPutUrl, 'PUT', 'dialog.title.update.details', templateSelector, 400, 225, successFunction);

		return false;
	}
	
	function waiveLoanCharge(loanId, loanChargeId, parenttab) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId, parenttab);
		};

		popupConfirmationDialogAndPost('loans/' + loanId +'/charges/' + loanChargeId + '?command=waive', 'POST', 'dialog.title.confirmation.required', 400, 225, 0, successFunction);

		return false;
	}
	
	function removeLoanCollateral(loanId, loanCollateralId, parenttab) {

        var successFunction = function(data, textStatus, jqXHR) {
            $("#dialog-form").dialog("close");
            loadILLoan(loanId, parenttab);
        };

        popupConfirmationDialogAndPost('loans/' + loanId +'/collaterals/' + loanCollateralId, 'DELETE', 'dialog.title.confirmation.required', 400, 225, 0, successFunction);

        return false;
    }
    
    function modifyLoanCollateral(loanId, loanCollateralId, parenttab) {

		var successFunction = function(data, textStatus, jqXHR) {
			$("#dialog-form").dialog("close");
			loadILLoan(loanId, parenttab);
		};	
        
        var getUrl = 'loans/' + loanId +'/collaterals/' + loanCollateralId+"?template=true";
        var putUrl = 'loans/' + loanId +'/collaterals/' + loanCollateralId;
        var templateSelector = "#loanCollateralFormTemplate";
        var width = 550;
        var height = 425;
        
        popupDialogWithFormView(getUrl, putUrl, 'PUT', 'dialog.title.update.details', templateSelector, width, height, successFunction);

        return false;
    }

	function genSaveSuccessFunctionReloadLoan(loanId, parenttab) {
		return 'var saveSuccessFunctionReloadLoan = function(data, textStatus, jqXHR) { ' + 
						  	' $("#dialog-form").dialog("close");' +
						  	' var contentTab = ' + parenttab + ';' +
							' loadLoan(' + loanId + ', "' + parenttab + '");' +
							' clientDirty = true;' +
							' groupDirty = true;' +
						'};';
	}

	function submitLoanApplication(clientId, groupId) {
		
		var newFormData = JSON.stringify($('#entityform').serializeObject());
    	
		var successFunction =  function(data, textStatus, jqXHR) {
			if (clientId){
				showILClient(clientId);
			} else {
				showGroup(groupId);
			}
		};
		
		executeAjaxRequest('loans', "POST", newFormData, successFunction, formErrorFunction);	  

	}
	
$.fn.addTab = function(panelId,title) {
	var tabTemplate = "<li><a href='#{href}'>#{label}</a> </li>";

    var li = $( tabTemplate.replace( /#\{href\}/g, "#" + panelId ).replace( /#\{label\}/g, title ) );
 
    this.find( ".ui-tabs-nav" ).eq(0).append( li );
    this.append( "<div id='" + panelId + "'></div>" );
    this.tabs( "refresh" );
}
	
function showILLoan(loanId, product, loanAccountNo) {
	showLoan(loanId, product, loanAccountNo, 'clientdatatabs');	
}

function showGroupLoan(loanId, product, loanAccountNo) {
	showLoan(loanId, product, loanAccountNo, 'groupdatatabs');	
}

function showLoan(loanId, product, loanAccountNo, parenttab){
	var newLoanTabId='loan'+loanId+'tab';
	//show existing tab if this Id is already present
	if(tabExists(parenttab, newLoanTabId)){
		var index = $('#'+ parenttab +' a[href="#'+ newLoanTabId +'"]').parent().index(); 
		$('#'+ parenttab).tabs("option", "active", index);
		
		var title = product + ": #" + loanAccountNo;		
		if (undefined === loanAccountNo || loanAccountNo == '') {
			title = product + ": #" + loanId;
		}
		$('#'+ parenttab +' .ui-tabs-active:first a').text(title);
	}
	//else create new tab and set identifier properties
	else{
		var title = product + ": #" + loanAccountNo;		
		if (undefined === loanAccountNo) {
			title = product + ": #" + loanId;
		}
		$newtabs.addTab(newLoanTabId, title);

		$newtabs.tabs( "option", "active", $('#'+ parenttab +'> ul > li').length-1);
		loadLoan(loanId, parenttab);
		
	}
}

//checks for existence of tab with given Id
function tabExists(parenttab, tabId){
    var tabFound = false;
    $('#' + parenttab + ' > div').each(function(index, ui) {
        if($(ui).attr('id') == tabId){
        	tabFound = true;
        }
    });
    return tabFound;
}

function loadILLoan(loanId, parenttab) {
	loadLoan(loanId, parenttab);	
}

function loadGroupLoan(loanId) {
	loadLoan(loanId);
}

function loadLoan(loanId, parenttab) {
	var parenttab = parenttab;	
	var loanUrl = 'loans/' + loanId + "?associations=all";

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
		handleXhrError(jqXHR, status, errorThrown, "#formErrorsTemplate", "#formerrors");
	};

	var successFunction = function(data, status, xhr) {

	            	var currentTabIndex = $('#' + parenttab).tabs('option', 'active');
	            	$("#" + parenttab + " li:eq(" + currentTabIndex + ") *:last").text(data.loanProductName + ": " + data.accountNo);
	            
	        		var tableHtml = $("#loanDataTabTemplate").render(data);
	        		
	        		var currentTab = $("#"+parenttab).children(".ui-tabs-panel").not('[aria-hidden="true"]');
	        		currentTab.html(tableHtml);

	        		var curTabID = currentTab.prop("id")

	        		var offsetToSubmittedDate = 0;
	        		var offsetToApprovalDate = 0;
	        		var offsetToExpectedDisbursementDate = 0;
	            	var offsetToDisbursalDate = 0;
	            	var maxOffset = 0; // today
	        		var today = new Date();
	        		
	        		var dateParts = data.timeline.submittedOnDate;
	        		if (undefined != dateParts) {
        				var year = dateParts[0];
        				var month = parseInt(dateParts[1]) - 1; // month is zero indexed
        				var day = dateParts[2];

        				var today = new Date();
        				var offsetDate = new Date();
        				offsetDate.setFullYear(year, month, day);

        				offsetToSubmittedDate = Date.daysBetween(today, offsetDate);
        			}
	        		
	        		dateParts = data.timeline.approvedOnDate;
	        		if (undefined != dateParts) {
        				var year = dateParts[0];
        				var month = parseInt(dateParts[1]) - 1; // month is zero indexed
        				var day = dateParts[2];

        				var today = new Date();
        				var offsetDate = new Date();
        				offsetDate.setFullYear(year, month, day);

        				offsetToApprovalDate = Date.daysBetween(today, offsetDate);
        			}
	        		
	        		dateParts = data.timeline.expectedDisbursementDate;
	        		if (undefined != dateParts) {
        				var year = dateParts[0];
        				var month = parseInt(dateParts[1]) - 1; // month is zero indexed
        				var day = dateParts[2];

        				var today = new Date();
        				var offsetDate = new Date();
        				offsetDate.setFullYear(year, month, day);

        				offsetToExpectedDisbursementDate = Date.daysBetween(today, offsetDate);
        				if (offsetToApprovalDate > offsetToExpectedDisbursementDate) {
        					offsetToExpectedDisbursementDate = offsetToApprovalDate;
        				}
        			}
	        		
	        		dateParts = data.timeline.actualDisbursementDate;
	        		if (undefined != dateParts) {
        				var year = dateParts[0];
        				var month = parseInt(dateParts[1]) - 1; // month is zero indexed
        				var day = dateParts[2];

        				var today = new Date();
        				var offsetDate = new Date();
        				offsetDate.setFullYear(year, month, day);

        				offsetToDisbursalDate = Date.daysBetween(today, offsetDate);
        			}
	        		
		        	var $loantabs = $("#loantabs" + loanId).tabs({
						beforeActivate: function( event, ui ) {
        					if($(ui.newPanel).attr( 'id' ) == ( "loanDocuments"+ loanId )){
        						refreshLoanDocuments(loanId)
        					}
   						}
					});
		        
		        $('.modifyloanapp'+loanId).unbind('click');	
	        	$('.modifyloanapp'+loanId).button({icons: {primary: "ui-icon-document"}}).click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("modifyloanappbtn", "");
					launchModifyLoanApplicationDialog(loanId);
					
				    e.preventDefault();
				});
				$('button.modifyloanapp span').text(doI18N('button.application.modify'));
	        		
	        	$('.rejectloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("rejectbtn", "");
					var postUrl = 'loans/' + loanId + '?command=reject';
					var templateSelector = "#loanApplicationRejectionTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToSubmittedDate;
	
					popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.reject.loan', templateSelector, width, height, saveSuccessFunctionReloadClient, offsetToSubmittedDate, defaultOffset, maxOffset);
				    e.preventDefault();
				});
	        	$('button.rejectloan span').text(doI18N('button.application.reject'));
					
				$('.withdrawnbyapplicantloan'+loanId).button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("withdrawnbyapplicantloanbtn", "");
						var postUrl = 'loans/' + loanId + '?command=withdrawnByApplicant';
						var templateSelector = "#loanApplicationWithdrawnTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToSubmittedDate;
						popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.loan.withdrawn.by.client', templateSelector, width, height, saveSuccessFunctionReloadClient,  offsetToSubmittedDate, defaultOffset, maxOffset)
					    e.preventDefault();
				});
				$('button.withdrawnbyapplicantloan span').text(doI18N('button.application.withdrawnByApplicant'));
				
				$('.approveloan'+loanId).button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("approvebtn", "");
						var postUrl = 'loans/' + loanId + '?command=approve';
						var templateSelector = "#loanApplicationApprovalTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToSubmittedDate;
						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.approve.loan', templateSelector, width, height, saveSuccessFunctionReloadLoan,  offsetToSubmittedDate, defaultOffset, maxOffset)
					    e.preventDefault();
				});
				$('button.approveloan span').text(doI18N('button.application.approve'));
					
				$('.undoapproveloan'+loanId).button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("undoapprovebtn", "");
						var postUrl = 'loans/' + loanId + '?command=undoapproval';
						var templateSelector = "#undoStateTransitionLoanFormTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToSubmittedDate;
						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.approval', templateSelector, width, height, saveSuccessFunctionReloadLoan, offsetToSubmittedDate, defaultOffset, maxOffset)
					    e.preventDefault();
				});
				$('button.undoapproveloan span').text(doI18N('button.application.undoApproval'));
					
				$('.deleteloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("deletebtn", "");
					var url = 'loans/' + loanId;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClient);
				    e.preventDefault();
				});
				$('button.deleteloan span').text(doI18N('button.application.delete'));
					
				$('.disburseloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("disbursebtn", "");
					var getUrl = 'loans/' + loanId + '/transactions/template?command=disburse';
					var postUrl = 'loans/' + loanId + '?command=disburse';
					var templateSelector = "#loanDisbursementTemplate";
					var width = 500; 
					var height = 400;
					var defaultOffset = offsetToExpectedDisbursementDate;
					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
			
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.loan.repayment", templateSelector, width, height,  saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.disburseloan span').text(doI18N('button.loan.disburse'));
					
				$('.undodisbursalloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("undodisbursalbtn", "");
					var postUrl = 'loans/' + loanId + '?command=undodisbursal';
					var templateSelector = "#undoStateTransitionLoanFormTemplate";
					var width = 500; 
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
					popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undo.loan.disbursal', templateSelector, width, height, saveSuccessFunctionReloadLoan,  offsetToSubmittedDate, defaultOffset, maxOffset)
				    e.preventDefault();
				});
				$('button.undodisbursalloan span').text(doI18N('button.loan.undoDisbursal'));
					
				$('.repaymentloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("repaymentbtn", "");
					var getUrl = 'loans/' + loanId + '/transactions/template?command=repayment';
					var postUrl = 'loans/' + loanId + '/transactions?command=repayment';
					
					var templateSelector = "#transactionLoanFormTemplate";
					var width = 500; 
					var height = 450;
					var defaultOffset = offsetToApprovalDate;
					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
		
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.loan.repayment", templateSelector, width, height,  saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.repaymentloan span').text(doI18N('button.loan.repayment'));
					
				$('.loaaccountfundstransfer'+loanId).button({icons: {primary: "ui-icon-transferthick-e-w"}}).click(function(e) {
					launchAccountTransferDialog(loanId, 1 ,parenttab);
					e.preventDefault();
				});

				$('.waiveinterestloan'+loanId).button().click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("waiveinterestbtn", "");
						
						var getUrl = 'loans/' + loanId + '/transactions/template?command=waiveinterest';
						var postUrl = 'loans/' + loanId + '/transactions?command=waiveinterest';
						
						var templateSelector = "#transactionLoanWaiveInterestFormTemplate";
						var width = 500; 
						var height = 350;
						var defaultOffset = offsetToApprovalDate;
						
						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.waive.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
					    e.preventDefault();
				});
				$('button.waiveloan span').text(doI18N('button.loan.waiveInterest'));
				
				$('.writeoffloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("writeoffbtn", "");
					
					var getUrl = 'loans/' + loanId + '/transactions/template?command=writeoff';
					var postUrl = 'loans/' + loanId + '/transactions?command=writeoff';
					
					var templateSelector = "#loanTransactionWriteOffFormTemplate";
					var width = 500;
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					
					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
					
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.writeoff.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.writeoffloan span').text(doI18N('button.loan.writeOff'));
				
				$('.closeasrescheduledloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("closeasrescheduledbtn", "");
					
					var getUrl = 'loans/' + loanId + '/transactions/template?command=close-rescheduled';
					var postUrl = 'loans/' + loanId + '/transactions?command=close-rescheduled';
					
					var templateSelector = "#loanTransactionWriteOffFormTemplate";
					var width = 500;
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					
					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
					
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.closeasrescheduledloan.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.closeasrescheduledloan span').text(doI18N('button.loan.closeAsRescheduled'));
				
				$('.closeloan'+loanId).button().click(function(e) {
					var linkId = this.id;
					var loanId = linkId.replace("closebtn", "");
					
					var getUrl = 'loans/' + loanId + '/transactions/template?command=close';
					var postUrl = 'loans/' + loanId + '/transactions?command=close';
					
					var templateSelector = "#loanTransactionWriteOffFormTemplate";
					var width = 500;
					var height = 350;
					var defaultOffset = offsetToApprovalDate;
					
					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
					
					popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.close.loan", templateSelector, width, height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.closeloan span').text(doI18N('button.loan.close'));
					
				$(".printSchedule"+loanId).button({icons: {primary: "ui-icon-print"},text: false}).click(function(e){
					var loanId=	this.offsetParent.id.replace("loantabs","");

					var printButtons = document.getElementsByClassName('printSchedule');
                    for(var i=0; i < printButtons.length; i++) { 
                      printButtons[i].style.display = 'none';
                	}
				
					$("#schedule"+loanId).printThis();
					e.preventDefault();
				});	
					
				$('.adjustloanrepayment'+loanId).button({
                    icons : {
                        primary : "ui-icon-pencil"
                    },
                    text : false
                }).click(function(e) {
					var linkId = this.id;
					var loanAndRepaymentId = linkId.replace("adjustrepaymentbtn", "");
					var ids = loanAndRepaymentId.split("_");
					var loanId = ids[0];
					var transactionId = ids[1];
					var getAndPostUrl = 'loans/' + loanId + '/transactions/' + transactionId + '/?template=true';
					
					var templateSelector = "#transactionLoanFormTemplate";
					var width = 500; 
					var height = 450;
					var defaultOffset = offsetToApprovalDate;

					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));						
					popupDialogWithFormView(getAndPostUrl, getAndPostUrl, 'POST', "dialog.title.adjust.loan.repayment", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				
				//$('button.adjustloanrepayment span').text(doI18N('button.loanTransaction.adjust'));
				
				$('.undoloanrepayment'+loanId).button({
                    icons : {
                        primary : "ui-icon-trash"
                    },
                    text : false
                }).click(function(e) {
                    var linkId = this.id;
                    var loanAndRepaymentId = linkId.replace("undorepaymentbtn", "");
                    var ids = loanAndRepaymentId.split("_");
                    var loanId = ids[0];
                    var transactionId = ids[1];
                    var postURL = 'loans/' + loanId + '/transactions/' + transactionId;
                
                    var templateSelector = "#transactionLoanFormTemplate";
                    var width = 500;
                    var height = 350;
                    var searializedArray = {};
                
                    searializedArray["dateFormat"] = custom.helperFunctions.currentDateFormat();
                    searializedArray["locale"] = custom.helperFunctions.currentLocale();
                    searializedArray["transactionDate"] = $.datepicker.formatDate(custom.datePickerDateFormat, new Date());
                    searializedArray["transactionAmount"] = 0;
                    var jsonString = JSON.stringify(searializedArray);
                
                    eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
                    popupConfirmationDialogAndPost(postURL, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadLoan,jsonString);
                    e.preventDefault();
                }); 
                
				$('.addloancharge'+loanId).button().click(function(e){
						var linkId = this.id;
						var loanId = linkId.replace("addloanchargebtn", "");
						var postUrl = 'loans/' + loanId + '/charges';
						var getUrl = 'loans/' + loanId + '/charges/template';

						var templateSelector = "#loanChargeFormTemplate";
						var width = 450; 
						var height = 300;

						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.addLoanCharge", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
					    e.preventDefault();
				});
				$('button.addloancharge span').text(doI18N('button.addLoanCharge'));
				
				$('.addloancollateral'+loanId).button().click(function(e){
                        var linkId = this.id;
                        var loanId = linkId.replace("addloancollateralbtn", "");
                        var postUrl = 'loans/' + loanId + '/collaterals';
                        var getUrl = 'loans/' + loanId + '/collaterals/template';

                        var templateSelector = "#loanCollateralFormTemplate";
                        var width = 550; 
                        var height = 425;

                        eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
                        popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.addCollateral", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
                        e.preventDefault();
                });
				$('button.addloancollateral span').text(doI18N('button.addLoanCharge'));
				
				//Guarantor for loan functionality
				$('.setguarantor'+loanId).button({icons: {primary: "ui-icon-link"}}).click(function(e) {
						var linkId = this.id;
						var loanId = linkId.replace("setGuarantorbtn", "");
						var getUrl = 'loans/'+loanId+'/guarantors/template';
						var postUrl = 'loans/'+loanId+'/guarantors';
						
						var templateSelector = "#guarantorFormTemplate";
						var width = 600; 
						var height = 390;
						
						
						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						//update hidden loan Id
						
						$("#").val(loanId);
	            		popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.add.guarantor", templateSelector, width, height,  saveSuccessFunctionReloadLoan);
	            		e.preventDefault();
	            });
	            
	            //remove guarantor buttons
	            if(data.guarantors !=null){
		            $.each(data.guarantors, function(i, val) {
		            	$('#removeguarantor'+val.id).button(
							{icons: {
		                	primary: "ui-icon-trash"},
		                	text: false
		            	}).click(function(e) {
							var deleteUrl = 'loans/'+loanId+'/guarantors/' + val.id;
							var width = 500; 
							var height = 350;
							eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
							popupConfirmationDialogAndPost(deleteUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadLoan);
		            		e.preventDefault();
		            	});		            	
						$('#editguarantor'+val.id).button({
							icons: {primary: "ui-icon-pencil"},
							text: false
						}).click(function(e) {
							var putUrl = 'loans/'+loanId+'/guarantors/' + val.id;
							var getUrl = 'loans/'+loanId+'/guarantors/' + val.id +'?template=true';
							var templateSelector = "#guarantorFormTemplate";
							var width = 600;
							var height = 390;
							eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
							popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.guarantor", templateSelector, width, height,  saveSuccessFunctionReloadLoan);
							e.preventDefault();
						});
					});
			    }
	            
				$('.assignloanofficer'+loanId).button().click(function(e){

						var linkId = this.id;
						var loanId = linkId.replace("assignloanofficerbtn", "");
						var postUrl = 'loans/' + loanId + '?command=assignloanofficer';
						var getUrl = 'loans/' + loanId + '?template=true&fields=id,loanOfficerId,loanOfficerOptions';

						var templateSelector = "#loanReassignmentFormTemplate";
						var width = 425; 
						var height = 225;

						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						popupDialogWithFormView(getUrl, postUrl, 'POST', "dialog.title.assign.loan.officer", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
					    e.preventDefault();
				});
				$('button.assignloanofficer span').text(doI18N('button.assignLoanOfficer'));

				$('.unassignloanofficer'+loanId).button({icons: {primary: "ui-icon-circle-close"}}).click(function(e){

						var linkId = this.id;
						var loanId = linkId.replace("unassignloanofficerbtn", "");
						var postUrl = 'loans/' + loanId + '?command=unassignloanofficer';
						var getUrl = ""
						
						var templateSelector = "#loanUnassignmentFormTemplate";
						var width = 400; 
						var height = 225;
						eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
						
						popupDialogWithFormViewData("", postUrl, 'POST', 'dialog.title.unassign.loan.officer', templateSelector, width, height, saveSuccessFunctionReloadLoan)		
						e.preventDefault();
				});

				$('.editaccountnobtn'+loanId).button({icons: {primary: "ui-icon-pencil"}}).click(function(e){

					var linkId = this.id;
					var loanId = linkId.replace("editaccountnobtn", "");
					var putUrl = 'loans/' + loanId;
					var getUrl = 'loans/' + loanId;

					var templateSelector = "#editAccountNoFormTemplate";
					var width = 425; 
					var height = 225;

					eval(genSaveSuccessFunctionReloadLoan(loanId, parenttab));
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.accountno", templateSelector, width,  height, saveSuccessFunctionReloadLoan);
				    e.preventDefault();
				});
				$('button.editaccountnobtn span').text(doI18N('link.action.edit'));
				
				custom.showRelatedDataTableInfo($loantabs, "m_loan", loanId); 

				//also fetch loan documents for this loan
				refreshLoanDocuments(loanId);
				
				//jqueryify charges buttons
				if(data.charges !=null){
				     $.each(data.charges, function(i, val) {
				        //waive loan charge buttons
				        if(document.getElementById('waiveloan'+ loanId +'charge'+val.id)){
                            $('#waiveloan'+ loanId +'charge'+val.id).button(
                                {icons: {
                                primary: "ui-icon-flag"},
                                text: false
                            }).click(function(e) {
                                waiveLoanCharge(loanId,val.id,parenttab);
                                e.preventDefault();
                            });
                        }
                        
                        //delete loan charge buttons
                        if(document.getElementById('deleteloan'+ loanId +'charge'+val.id)){
                            $('#deleteloan'+ loanId +'charge'+val.id).button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
                                removeLoanCharge(loanId,val.id,parenttab);
                                e.preventDefault();
                            });
                        }
                        //modify loan charge buttons
                        if(document.getElementById('modifyloan'+ loanId +'charge'+val.id)){
                            $('#modifyloan'+ loanId +'charge'+val.id).button(
                                {icons: {
                                primary: "ui-icon-pencil"},
                                text: false
                            }).click(function(e) {
                                modifyLoanCharge(loanId,val.id,parenttab);
                                e.preventDefault();
                            });
                        }
                    });
                }
                
                //jqueryify collaterals buttons
                if(data.collateral !=null){
                     $.each(data.collateral, function(i, val) {
                        //delete loan collateral buttons
                        if(document.getElementById('deleteloan'+ loanId +'collateral'+val.id)){
                            $('#deleteloan'+ loanId +'collateral'+val.id).button(
                                {icons: {
                                primary: "ui-icon-trash"},
                                text: false
                            }).click(function(e) {
                                removeLoanCollateral(loanId,val.id,parenttab);
                                e.preventDefault();
                            });
                        }
                        //modify loan collateral buttons
                        if(document.getElementById('modifyloan'+ loanId +'collateral'+val.id)){
                            $('#modifyloan'+ loanId +'collateral'+val.id).button(
                                {icons: {
                                primary: "ui-icon-pencil"},
                                text: false
                            }).click(function(e) {
                                modifyLoanCollateral(loanId,val.id,parenttab);
                                e.preventDefault();
                            });
                        }
                    });
                }

			   	$(".editnote").click(function(e) {  
					 var linkId = this.id; 
					 var noteId = linkId.replace("editnotelink", ""); 
					 var getAndPutUrl = "loans/"+loanId+"/notes/"+noteId; 
					 var templateSelector = "#noteFormTemplate"; 
					 var width = 600; 
					 var height = 400; 
					 var saveSuccessFunction = function(data, textStatus, jqXHR) { 
					  	 $("#dialog-form").dialog("close"); 
						 loadILLoan(loanId, parenttab); 
					 }; 
					 popupDialogWithFormView(getAndPutUrl, getAndPutUrl, "PUT", "dialog.title.edit.note", templateSelector, width, height,  saveSuccessFunction); 
				     e.preventDefault(); 
		       }); 
	        };
	    
		executeAjaxRequest(loanUrl, 'GET', "", successFunction, errorFunction);	  
		
}

function loadTransactionForm(){
	//initially hide all payment details
	$('.paymentDetail').hide();

	$('#togglePaymentDetail').on("click", function(e) {
		$('.paymentDetail').toggle();
		if ($('#togglePaymentDetail').html() == doI18N('label.show')) {
		  	$('#togglePaymentDetail').html(doI18N('label.hide'));
		} else{
		  	$('#togglePaymentDetail').html(doI18N('label.show'));
		};
		e.preventDefault();
	});
}

function loadGuarantorForm(){
	//initially load the appropriate div
	var isChecked = $('#internalGuarantorCheckbox').is(':checked')
	if(isChecked){
		$('#internalGuarantorDiv').show();
		$('#externalGuarantorDiv').hide();
	}else{
		$('#internalGuarantorDiv').hide();
		$('#externalGuarantorDiv').show();
	}

	$("#internalGuarantorCheckbox").change(function() {
	  var isChecked = $('#internalGuarantorCheckbox').is(':checked')
	  if(isChecked){
	 	$('#internalGuarantorDiv').show();
	  	$('#externalGuarantorDiv').hide();
	  }else{
	  	$('#internalGuarantorDiv').hide();
	  	$('#externalGuarantorDiv').show();
	  }
	});
		
    $("#smartGuarantorSearch" ).autocomplete({
        source: function(request, response){
        	//get selected office
			var sqlSearchValue = "display_name like '%" + request.term + "%' and c.status_enum != 600"; 
			smartSearchSuccessFunction =  function(data, textStatus, jqXHR) {
				response( $.map( data.pageItems, function( item ) {
                    return {
                        label: item.displayName + "(" + item.officeName + ")",
                        value: item.displayName,
                        activationDate: item.activationDate,
                        id: item.id,
                        branchName:item.officeName
                    }
                }));
	  		};
			executeAjaxRequest("clients?limit=15&sqlSearch=" + encodeURIComponent(sqlSearchValue), 'GET', "", smartSearchSuccessFunction, formErrorFunction);
        },
        minLength: 3,
        select: function( event, ui ) {
        	$("#smartGuarantorSearch" ).val(ui.item.value);
            $( "#selectedGuarantorName" ).val(ui.item.value);
            $( "#selectedGuarantorBranch" ).val(ui.item.branchName);
            $( "#selectedGuarantorJoinedDate" ).val(custom.helperFunctions.globalDate(ui.item.activationDate));
            $( "#selectedGuarantorIdentifier" ).val(ui.item.id);
            return false;
        }
    });
}

function refreshLoanDocuments(loanId) {
		var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			crudObject.loanId	= loanId;
			var tableHtml = $("#loanDocumentsTemplate").render(crudObject);
			$("#loanDocuments"+loanId).html(tableHtml);
			//initialize all edit/delete buttons
			var loanUrl = "loans/"+ loanId;
			var editLoanDocumentSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	refreshLoanDocuments(loanId);
			}
			$.each(crudObject.crudRows, function(i, val) {
			      $("#editloandocument" + val.id).button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
			      	
					var getUrl = loanUrl + '/documents/'+val.id;
					var putUrl = loanUrl + '/documents/'+val.id;
					var templateSelector = "#editLoanDocumentsFormTemplate";
					var width = 600; 
					var height = 450;
					popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.loan.document.edit", templateSelector, width, height,  editLoanDocumentSuccessFunction);
				    e.preventDefault();
			      });
			      $("#deleteloandocument" + val.id).button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {
					var url = loanUrl + '/documents/'+val.id;
					var width = 400; 
					var height = 225;
											
					popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, editLoanDocumentSuccessFunction);
					
					e.preventDefault();
				});
				$("#downloadloandocument" + val.id).button({icons: {
	                primary: "ui-icon-arrowthickstop-1-s"}
	            	}).click(function(e) {
					var url = loanUrl + '/documents/'+val.id + '/attachment';
					executeAjaxOctetStreamDownloadRequest(url);
					e.preventDefault();
				});
			});			
			//associate event with add loan document button
			$('#addloandocument'+loanId).button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
				var getUrl = "";
				var putUrl = loanUrl + '/documents';
				var templateSelector = "#loanDocumentsFormTemplate";
				var width = 600; 
				var height = 450;
				
				var saveSuccessFunction = function(data, textStatus, jqXHR) {
				  	$("#dialog-form").dialog("close");
				  	refreshLoanDocuments(loanId);
				}
				
				popupDialogWithFormView(getUrl, putUrl, 'POST', "dialog.title.loan.document.add", templateSelector, width, height,  saveSuccessFunction);
			    e.preventDefault();
			});
		}
  		executeAjaxRequest("loans/"+ loanId + '/documents', 'GET', "", successFunction, formErrorFunction);	 
}

/* crud admin code */

	function refreshTableView(tableName) {

		var successFunction = function(data, textStatus, jqXHR) {

				var crudObject = new Object();
				crudObject.crudRows = data;
				
				if (tableName == "configuration") {
					crudObject.crudRows = data.globalConfiguration;
				}
				
				var html = $("#" + tableName + "ListTemplate").render(crudObject);
				$("#listplaceholder").html(html);  

				if (tableName == "permission") jQuery.MifosXPermissions.addViewPermissionsTabs(data, "#permissionsDiv");

				$("a.enableconfiguration").click( function(e) {
					
					var linkId = this.id;
					var configName = linkId.replace("enableconfiguration-", "");
					var resourceUrl = "configurations?" + configName + "=true";
					
					var width = 400; 
					var height = 150;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  	$("#dialog-form").dialog("close");
					  	refreshTableView(tableName);
					};
					popupConfirmationDialogAndPost(resourceUrl, 'PUT', 'dialog.title.confirmation.required', width, height, configName, saveSuccessFunction);
				
					e.preventDefault();
				});

				$("a.disableconfiguration").click( function(e) {
					var linkId = this.id;
					var configName = linkId.replace("disableconfiguration-", "");
					var resourceUrl = "configurations?" + configName + "=false";
					
					var width = 400; 
					var height = 150;
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  	$("#dialog-form").dialog("close");
					  	refreshTableView(tableName);
					};
					popupConfirmationDialogAndPost(resourceUrl, 'PUT', 'dialog.title.confirmation.required', width, height, configName, saveSuccessFunction);
				
					e.preventDefault();
				});
								
				//#Add/Edit Code Values
                $("a.editcodevalue").click( function(e) {
                    var linkId = this.id;
                    editCodeValueFunction(linkId, tableName);
                    e.preventDefault();
                });

				$("a.edit" + tableName).click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("edit" + tableName, "");

					var resourceUrl = tableName + "s/" + entityId;
					if(tableName == 'employee'){
						resourceUrl = "staff" + "/" + entityId;
					}
					if (tableName == 'report') {
						launchReportDialog(entityId);
					}
					else {
						maintainTable(tableName, resourceUrl, 'PUT');
					}
					e.preventDefault();
				});

				$("a.permissions" + tableName).click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("permissions" + tableName, "");
					var resourceUrl = tableName + "s/" + entityId + "/permissions";
					maintainTable(tableName, resourceUrl, 'PUT');
					e.preventDefault();
				});


				$("a.delete" + tableName).click( function(e) {
					
					if (tableName === 'savingproduct' ||tableName === 'depositproduct' || tableName ==='charge' || tableName ==='user' || tableName == 'code' || tableName == 'officetransaction'|| tableName == 'report' || tableName == 'accountingrule' || tableName == 'datatable') {
						var linkId = this.id;
						var entityId = linkId.replace("delete" + tableName, "");

						var resourceUrl = tableName + "s/" + entityId;
						var width = 400; 
						var height = 170;
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	refreshTableView(tableName);
						};
						popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
					} else {
						showNotAvailableDialog('dialog.title.functionality.not.available');	
					}
					
					e.preventDefault();
				});
				
				$("a.deactivate"  + tableName).click( function(e) {
					showNotAvailableDialog('dialog.title.functionality.not.available');
					e.preventDefault();
				});
				
				$("a.changepassword"  + tableName).click( function(e) {
					var linkId = this.id;
					var entityId = linkId.replace("changepassword" + tableName, "");
					
					if (tableName ==='user') {
						var putUrl = 'users/' + entityId;
						var templateSelector = "#changePasswordFormTemplate";
						var width = 600; 
						var height = 350;
						
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
							$("#dialog-form").dialog("close");
							if (currentUser == entityId) resetBasicAuthKey(false);
						}
						
						popupDialogWithPostOnlyFormView(putUrl, 'PUT', 'dialog.title.update.password', templateSelector, width, height, saveSuccessFunction, 0, 0, 0);
					}
					e.preventDefault();
				});

				$("a.updatedatatable").click( function(e) {
					
						var linkId = this.id;
						var entityId = linkId.replace("updatedatatable", "");
                        maintainTable("datatableUpdate", entityId, "PUT");
					
						e.preventDefault();
				});

				$("a.deregister" + tableName).click( function(e) {
					
						var linkId = this.id;
						var entityId = linkId.replace("deregister" + tableName, "");

						var resourceUrl = tableName + "s/deregister/" + entityId;
						var width = 400; 
						var height = 150;
						var saveSuccessFunction = function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
						  	refreshTableView(tableName);
						};
						popupConfirmationDialogAndPost(resourceUrl, 'POST', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
					
						e.preventDefault();
				});

				$("a.bulkloanreassignment").click(function(e){

					var officeId = $(this).attr("data-officeid");
					var fromLoanOfficerId = $(this).attr("data-fromloanofficerid");
					var getUrl = "loans/loanreassignment/template?officeId="+officeId+"&fromLoanOfficerId="+fromLoanOfficerId;
					var postUrl = "loans/loanreassignment";

					var saveSuccessFunction = function(data, textStatus, jqXHR) {
					  	$("#dialog-form").dialog("close");
					  	refreshTableView("employee");
					};

					popupDialogWithFormView(getUrl, postUrl, "POST", "bulkLoanReassignment", "#bulkLoanReassignmentFormTemplate", crudData["bulkLoanReassignment"].dialogWidth, crudData["bulkLoanReassignment"].dialogHeight, saveSuccessFunction); 

					e.preventDefault();
				})

				
				
				var oTable;
				if (tableName == "report") oTable= displayEnhancedListTable(tableName + "stable")
				else oTable = displayListTable(tableName + "stable");
				
			  };
		
		if(tableName=="employee"){
			executeAjaxRequest('staff', 'GET', "", successFunction, formErrorFunction);
		}else{
  			executeAjaxRequest(tableName + 's', 'GET', "", successFunction, formErrorFunction);
  		}
	}
	

	function maintainTable(tableName, resourceUrl, submitType, putPostQuery) {
		if (!(submitType == "PUT" || submitType == "POST"))
		 {
			alert("System Error - Invalid submitType: " + submitType);
			return;
		}

		var templateSelector = "#" + tableName + "FormTemplate";

		var dialogTitle = "dialog.title." + tableName + ".details";
		if (submitType == "POST") dialogTitle = 'dialog.title.add.' + tableName;

		var dialogWidth = crudData[tableName].dialogWidth;
		var dialogHeight = crudData[tableName].dialogHeight;
		if (dialogWidth == undefined) dialogWidth = custom.fitPopupWidth();
		if (dialogHeight == undefined) dialogHeight = custom.fitPopupHeight();
		
		var genSSF = 'var saveSuccessFunction = function(data, textStatus, jqXHR) {';
		genSSF += '$("#dialog-form").dialog("close");';
		if (crudData[tableName].refreshListNeeded == true) genSSF += 'refreshTableView("' + tableName + '");';
		genSSF += '}';
		eval(genSSF);
		
		//datatable specific code
		if (tableName == "datatable") {
			dialogTitle = 'dialog.title.register.datatable';
			popupRegisterDatatableDialog('dialog.title.register.datatable', templateSelector, dialogWidth, dialogHeight, saveSuccessFunction, 0, 0, 0);
			return false;
		} else if (tableName == "datatableCreate") {
			dialogTitle = 'dialog.title.create.datatable';
			popupCreateDatatableDialog(dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction, 0, 0, 0);
			return false;
		} else if (tableName == "datatableUpdate") {
            dialogTitle = 'dialog.title.update.datatable';
            popupUpdateDatatableDialog(dialogTitle, resourceUrl, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction, 0, 0, 0);

			return false;
        }
		//end datatable specific code

		if (resourceUrl.indexOf("/permissions") > -1) 
		{
			templateSelector = "#rolePermissionsFormTemplate";
			dialogTitle = "dialog.title.role.permissions.details";

			dialogWidth = 1200;
			dialogHeight = 500;
		}

		if (resourceUrl.indexOf("makerCheckerable") > -1) 
		{//configure maker-checker on maintenance permissions
				dialogTitle = "dialog.title.maintainMC.details";
		}

		var getUrl = ''; 
		var putPostUrl = resourceUrl;
		if (putPostQuery > "") putPostUrl += "?" + putPostQuery;

		if (submitType == "POST") 
		{
			if (crudData[tableName].editTemplateNeeded == true) //needs to read data to populate dialog form
			{
				if(tableName== "employee"){
					getUrl = "offices" 
				}else{
					getUrl = resourceUrl + '/template';
				}
				popupDialogWithFormView(getUrl, putPostUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction);
			}
			else popupDialogWithPostOnlyFormView(putPostUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction, 0, 0, 0);
		}
		else
		{
			if (crudData[tableName].editTemplateNeeded == true) {
				getUrl = resourceUrl + '?template=true'
			}
			else {
				getUrl = resourceUrl;
			}
			
			popupDialogWithFormView(getUrl, putPostUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, saveSuccessFunction);
		}
	}


function launchReportDialog(reportId) {
	if (reportId) {
		executeAjaxRequest('reports/' + reportId + '?template=true', 'GET', "", launchReportDialogOnSuccessFunction, formErrorFunction);
	} else {
		executeAjaxRequest('reports/template', 'GET', "", launchReportDialogOnSuccessFunction, formErrorFunction);
	}
}

function submitTabbedReport(divContainer, id) {
	
	var serializationOptions = {};
	serializationOptions["checkboxesAsBools"] = true;
	
	var serializedArray = {};
	serializedArray = $('#entityform').serializeObject(serializationOptions);

	if(!("reportParameters" in serializedArray)){
	    serializedArray["reportParameters"] = [];
	}
	var newFormData = JSON.stringify(serializedArray);
	
	var successFunction =  function(data, textStatus, jqXHR) {
		divContainer.dialog("close");
		refreshTableView("report");
	};
	
	if (id) {
		executeAjaxRequest('reports/' + id, "PUT", newFormData, successFunction, formErrorFunction);
	} else {
		executeAjaxRequest('reports', "POST", newFormData, successFunction, formErrorFunction);
	}
}

var launchReportDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	var dialogDiv = $("<div id='dialog-form'></div>");
	var saveButton = doI18N('dialog.button.save');
	var cancelButton = doI18N('dialog.button.cancel');
	
	var buttonsOpts = {};
	buttonsOpts[saveButton] = function() {
		submitTabbedReport(dialogDiv, data.id);
	};
	// end of buttonsOpts for save button
	
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	 
	var titleCode = 'dialog.title.add.report';
	if (data.id){
		titleCode = 'dialog.title.report.details';
	}	
	
	dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: dialogWidth = custom.fitPopupWidth(), 
	  		height: dialogHeight = custom.fitPopupHeight(), 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			},
	  		open: function (event, ui) {
	  			
	  			var formHtml = $("#reportFormTemplate").render(data);
	  			dialogDiv.html(formHtml);
	  			$( "#reportMaintenanceTabs").tabs();
  				
				var reportParameterIndex = 0;
				if(undefined === data.reportParameters || data.reportParameters === null) {
					reportParameterIndex = 0;
				} else {
					reportParameterIndex = data["reportParameters"].length;
				}
				
				$("#reportParameter-add").button({icons: {primary: "ui-icon-circle-plus"}}).click(function(e) {
					
					var parameterId = $('#reportParameterOptions option:selected').val();

					if (parameterId && undefined != parameterId && parameterId > 0) {
					
						var parameterName = $('#reportParameterOptions option:selected').text();
						reportParameterIndex++;
					
						var newRowTemplateData = {};
						newRowTemplateData["index"] = reportParameterIndex;
						newRowTemplateData["parameterId"] = parameterId;
						newRowTemplateData["parameterName"] = parameterName;
						var html = $("#AddReportParameterRowTemplate").render(newRowTemplateData);
						$("#reportparameterstable tbody").append(html);
				  									
						$('#reportparameterstable tbody tr:last .reportParameters-remove').button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
								$(this).closest('tr').remove();
			            		e.preventDefault();
						});
					
					}
				    e.preventDefault();
				});
				
				if(undefined === data.reportParameters || data.reportParameters === null) {
					// do nothing
				} else {
					 $("#reportparameterstable tbody tr .reportParameters-remove").each(function(index) {
						 $(this).button({icons: {primary: "ui-icon-trash"},text: false}).click(function(e) {
							$(this).closest('tr').remove();
			            	e.preventDefault();
			            });
					 });
				}
	  		}
	  	}).dialog('open');		
};
	

/* reports code */

function showILReporting(reportCategory) {
	setReportingContent("content");

//var reportingParams = {
 reportingParams = {
	RESTUrl: baseApiUrl + "runreports",
	basicAuthKey: base64,
	tenantIdentifier: tenantIdentifier,
	initialLanguage: currentCulture,
	bundleDir: "resources/stretchyreporting/mifosngbundle/",
	reportsListDiv: "myListOfReports",
	reportOutputOptionsDiv: "reportOutputOptionsDiv",
	runReportDiv: "myRunReportButton",
	clearReportDiv: "myClearReportButton",
	inputParametersDiv: "myInputParameters",
	reportOutputDiv: "myOutput",
	indianFormat: false,
	highlightMissingXlations: "N",
	loadingImg: "resources/stretchyreporting/dots64.gif",
	resValue: "resources/libs/"
};

	if (reportCategory)
	{
		reportingParams.reportQuery = 'reportCategoryList';
		reportingParams.reportQueryParams = {
									"reportCategory": reportCategory
								};
	}

	jQuery.stretchyReporting.initialise(reportingParams);

	$("#toptable").slideToggle("slow");

}

function selectNewDecimals(selectedVal) {
	if (!(selectedVal == "")) jQuery.stretchyReporting.changeDecimals(selectedVal);
}

function selectNewThousandsSep(selectedVal) {

	if (!(selectedVal == "")) 
	{

		switch(selectedVal )
		{
			case "INDIAN":
				jQuery.stretchyReporting.changeSeparator(",", ".", true);
  				break;
			case "NONE":
				jQuery.stretchyReporting.changeSeparator("", ".", false);
  				break;
			default:
				jQuery.stretchyReporting.changeSeparator(selectedVal.substr(0,1), selectedVal.substr(1,1), false);
		}
	}
}


//account settings
function showAccountSettings() {
	setAccountSettingsContent("content"); 
	$tabs = $("#tabs").tabs();

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
		$(anchor.hash).html("error occured while ajax loading.");
	};

	var successFunction = function(data, status, xhr) {
				var tableHtml = $("#userSettingsTemplate").render(data);
				$("#settings").html(tableHtml);
				
				$('#changepassword').click(function(e) {
					var putUrl = 'users/' + currentUser;
					var templateSelector = "#changePasswordFormTemplate";
					var width = 600; 
					var height = 350;
					
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						resetBasicAuthKey(true);
					}
					
					popupDialogWithPostOnlyFormView(putUrl, 'PUT', 'dialog.title.update.password', templateSelector, width, height, saveSuccessFunction, 0, 0, 0);
				    e.preventDefault();
				});
				
				$('#changedetails').click(function(e) {
					var getAndPutUrl = 'users/' + currentUser;
					var templateSelector = "#userSettingsFormTemplate";
					var width = 600; 
					var height = 350;
					
					var saveSuccessFunction = function(data, textStatus, jqXHR) {
						$("#dialog-form").dialog("close");
						resetBasicAuthKey(true);
					}
					
					popupDialogWithFormView(getAndPutUrl, getAndPutUrl, 'PUT', 'dialog.title.update.details', templateSelector, width, height, saveSuccessFunction);
					
				    e.preventDefault();
				});
	        };
    
	executeAjaxRequest("users/" + currentUser, 'GET', "", successFunction, errorFunction);	  
}
	


//authenticate user and set global details
function setBasicAuthKey(logonDivName, username, password) 
{ 

	base64 = "";
	currentUser = -1;
	currentUserName = "";
	currentPwd = "";
	newPassword = "";
	newUserName = "";


	var url = "authentication?username=" + username + "&password=" + password;
	var successFunction = function(data, textStatus, jqXHR) { 
					base64 = data.base64EncodedAuthenticationKey; 
					currentUser = data.userId;
					currentUserName = data.username;
					currentPwd = password;

					var staffUser = {
							staffId: data.staffId,
							staffDisplayName: data.staffDisplayName,
							organisationalRole: data.organisationalRole
					}
					jQuery.MifosXUI.initialise(staffUser, data.permissions, applicationProfile, tenantIdentifier, applicationMode, currentUser);

					//jQuery.MifosXUI.initialise(data.organisationalRole, data.permissions, applicationProfile, tenantIdentifier, applicationMode, currentUser);

					showMainContainer(logonDivName, username);
					custom.showFirstPage();
					return false;
			};

	var errorFunction = function(jqXHR, textStatus, errorThrown) {
	        			handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
					return true;
				};

	executeAjaxRequest(url, 'POST', "", successFunction, errorFunction);
}

function resetBasicAuthKey(refreshAccountSettings) 
{ 

	base64 = "";
	var usePassword = currentPwd;
	if (newPassword > "") usePassword = newPassword;
	var useUserName = currentUserName;
	if (newUserName > "") useUserName = newUserName;

	var url = "authentication?username=" + useUserName + "&password=" + usePassword;
	var successFunction = function(data, textStatus, jqXHR) { 
					base64 = data.base64EncodedAuthenticationKey; 
					currentUser = data.userId;
					currentUserName = data.username;
					currentPwd = usePassword;
					$("#displayUN").html(currentUserName);
					if (refreshAccountSettings == true) showAccountSettings();
					newPassword = "";
					newUserName = "";
					return false;
			};

	var errorFunction = function(jqXHR, textStatus, errorThrown) {
	        			handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");
					return true;
				};

	executeAjaxRequest(url, 'POST', "", successFunction, errorFunction);

}


//Popups used for saving data and confirmation
function popupDialogWithReadOnlyFormView(getUrl, titleCode, templateSelector, width, height) {

	var executeGetUrlSuccessFunction = function(data, textStatus, jqXHR) {
		popupDialogWithReadOnlyFormViewData(data, titleCode, templateSelector, width, height);
  	};
  	
	if (getUrl.indexOf("/permissions") > -1) 
	{
		executeGetUrlSuccessFunction = function(data, textStatus, jqXHR) {
			popupDialogWithReadOnlyFormViewData(data, titleCode, templateSelector, width, height);
			
			// TODO - KW - need to support ability to display 'proposed changes'
			jQuery.MifosXPermissions.addRolePermissionsTabs(data, "#rolePermissionsDiv");
	  	};
	}
	
	if (getUrl == "") {
		popupDialogWithReadOnlyFormViewData("", titleCode, templateSelector, width, height);
	}
	else {
		executeAjaxRequest(getUrl, "GET", "", executeGetUrlSuccessFunction, formErrorFunction);
	}
}

function popupDialogWithReadOnlyFormViewData(data, titleCode, templateSelector, width, height, button_msg_name )  {
	button_msg_name = button_msg_name || "dialog.button.cancel";
	var dialogDiv = $("<div id='dialog-form'></div>");
	var cancelButton = doI18N(button_msg_name);

	var buttonsOpts = {};
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	
	dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: width, 
	  		height: height, 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			},
	  		open: function (event, ui) {
	  			var dialogDiv = $("#dialog-form");
	  			var formHtml = $(templateSelector).render(data);
	  			dialogDiv.html(formHtml);
	  		}
	  	}).dialog('open');
}

// end of readonly form view

function popupDialogWithFormView(getUrl, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction , extraParam) {

		var successFunction = function(data, textStatus, jqXHR) {

				if(templateSelector == "#employeeFormTemplate" && submitType!= "PUT"){
					var officesObject = new Object();
			    	officesObject.crudRows = data;
					popupDialogWithFormViewData(officesObject, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
				}else if(templateSelector == "#employeeFormTemplate" && submitType == "PUT") {
					templateSelector = "#employeeFormEditTemplate";
					popupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
				}else if (templateSelector == "#clientCloseTemplate") {
					var codeValuesObject = new Object();
			    	codeValuesObject.crudRows = data.closureReasons;
					popupDialogWithFormViewData(codeValuesObject, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
				}else if (templateSelector == "#transferClientsBetweenBranchesFormTemplate") {
					offices = data; //create & intialize window varible officesObject to reuse for OfficesOptions 
					var tempObject = new Object();
					tempObject.officeOptions = data;
					tempObject.clientOfficeId = currentClientOffice;
					popupDialogWithFormViewData(tempObject, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
				}else{
					popupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
		  		}
		  		
				// When create Client is invoked from parent group profile 
				// set  parentGroup and Office by default and make it un-editable

				if (templateSelector == "#clientFormTemplate") 
				{
					
					if(!(extraParam === undefined))
						{
							var officeId = jQuery.parseJSON(extraParam).officeId;
							var groupId = jQuery.parseJSON(extraParam).groupId;
							$("#officeId option[value='"+ officeId +"']").prop("selected", "selected");
							$('#officeId').prop('disabled', true);
							$('<input>').attr({type: 'hidden',id: 'officeId',name: 'officeId',value:officeId}).appendTo('#entityform');
							$('<input>').attr({type: 'hidden',id: 'groupId',name: 'groupId',value:groupId}).appendTo('#entityform');
						}	
				}

				if (templateSelector == "#centerFormTemplate") {
					if(!(extraParam === undefined)){
						var action = jQuery.parseJSON(extraParam).action;
						if(action == 'disable'){
							var office = $('.officeId');
							office.attr('disabled','disabled');
						}
					}
				}

				if (templateSelector == "#groupFormTemplate") 
				{

					// Scenario 1: For creating new group from quick link extraParam will be undefined
					// Scenario 2: For creating new group from parent group extraParam will be defined and disable selecting parent group
					// Scenario 3: For editing group extraParam will be undefined

					if(!(extraParam === undefined)){
						var centerId = jQuery.parseJSON(extraParam).parentGroupId;
						var action = jQuery.parseJSON(extraParam).action;
						$('#officeId').prop('disabled', true);
						if(!(centerId === undefined) ){
							$("#centerId option[value='"+ centerId +"']").prop("selected", "selected");
							if(action == 'disable'){
								$('#centerId').prop('disabled', true);
								$('<input>').attr({type: 'hidden',id: 'centerId',name: 'centerId',value:centerId}).appendTo('#entityform');

							}
						}	
					}
				}
				//End group create specific code

				if (templateSelector == "#userFormTemplate") 
				{
					$('#sendPasswordToEmail').change(function(){
        				if((!$(this).is(':checked'))){
            				$('#passworddiv').show();
			        	}else{
			        		$('#passworddiv').hide();
			        	}
			    	});
					if (submitType == "PUT") {
						$('#sendPasswordCheckboxDiv').hide();
					};
				}	
				
				if (templateSelector == "#userFormTemplate" && submitType == "PUT") 
				{
					$('#sendPasswordToEmail').remove();
        			$('#passworddiv').remove();
				}
		  	};

		if (getUrl == "") {
			popupDialogWithFormViewData("", postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
		}
		else {
			executeAjaxRequest(getUrl, "GET", "", successFunction, formErrorFunction);
		}
}

function popupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)  {

	var dialogDiv = $("<div id='dialog-form'></div>");
	var saveButton = doI18N('dialog.button.save');
	var cancelButton = doI18N('dialog.button.cancel');
	
	var serializationOptions = {};
	serializationOptions["checkboxesAsBools"] = true;
	
	var buttonsOpts = {};
	buttonsOpts[saveButton] = function() {
		
		$('#notSelectedClients option').each(function(i) {
			$(this).prop("selected", "selected");
		});

		$('#clientMembers option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#notSelectedCharges option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#charges option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#notSelectedRoles option').each(function(i) {
			$(this).prop("selected", "selected");  
		});
		
		$('#roles option').each(function(i) { 
		   	$(this).prop("selected", "selected");  
		});
		
		$('#notSelectedItems option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#selectedItems option').each(function(i) { 
			$(this).prop("selected", "selected");
		});
		
		$('#notSelectedCurrencies option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#currencies option').each(function(i) {
			$(this).prop("selected", "selected");
		});

		$('#notSelectedcreditTags option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#creditTags option').each(function(i) {
			$(this).prop("selected", "selected");
		});

		$('#notSelecteddebitTags option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		$('#debitTags option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		
		if (document.changeUserSettingsForm!=undefined) {
			newUserName = document.changeUserSettingsForm.username.value;
		}
		
		var serializedArray = {};
			
		if (templateSelector === "#bulkLoanReassignmentFormTemplate"){
			serializationOptions["checkboxesAsBools"] = false; // send checkboxes values (which contain loans ids) instead of bools
		} 
		serializedArray = $('#entityform').serializeObject(serializationOptions);	
		
		//manipulate serialized array for clients
		if (postUrl.toLowerCase().indexOf("clients") >= 0) {
			if (serializedArray["clientType"]=="1") {
				
				if (submitType.toLowerCase().indexOf("post") >= 0) {
					delete serializedArray["fullname"];	
				} else {
					serializedArray["fullname"] = "";
				}
			} else if (serializedArray["clientType"]=="2"){
				
				if (submitType.toLowerCase().indexOf("post") >= 0) {
					delete serializedArray["firstname"];
					delete serializedArray["middlename"];
					delete serializedArray["lastname"];
				} else {
					serializedArray["firstname"] = "";
					serializedArray["middlename"] = "";
					serializedArray["lastname"] = "";
				}
			}
			delete serializedArray["clientType"];
		}

		//manipulate serialized array for guarantors
    	if (postUrl.toLowerCase().indexOf("guarantor") >= 0){
			//TODO: Vishwas...var is repeated
			var serializedArray = {};
			serializedArray["locale"] = $('#locale').val();
			var isChecked = $('#internalGuarantorCheckbox').is(':checked')
		    if(isChecked){
				serializedArray["entityId"] = $('#selectedGuarantorIdentifier').val();
				serializedArray["guarantorTypeId"] = 1;
				serializedArray["clientRelationshipTypeId"] =$('#relationshipTypeIdForInternalGuarantor').val();
			}else{
				serializedArray["clientRelationshipTypeId"] =$('#relationshipTypeIdForExternalGuarantor').val();
				serializedArray["guarantorTypeId"] = 3;
				serializedArray["firstname"] = $('#guarantorFirstName').val();
				serializedArray["lastname"] = $('#guarantorLastName').val();
				serializedArray["dob"] = $('#guarantorDateOfBirth').val();
				serializedArray["addressLine1"] = $('#guarantorAddressLine1').val();
				serializedArray["addressLine2"] = $('#guarantorAddressLine2').val();
				serializedArray["city"] = $('#guarantorCity').val();
				serializedArray["zip"] = $('#guarantorZip').val();
				serializedArray["mobileNumber"] = $('#guarantorMobileNumber').val();
				serializedArray["housePhoneNumber"] = $('#guarantorHouseNumber').val();
				serializedArray["dateFormat"] = $('#dateFormat').val();
			}
		}
    	
    	//manipulate serialized array for journal entries
    	if (postUrl.toLowerCase().indexOf("journalentries") >= 0 ){
    		serializedArray = {};
			serializedArray["locale"] = $('#locale').val();
    	   	serializedArray["dateFormat"] = $('#dateFormat').val();
    	   	serializedArray["officeId"] = $('#officeId').val();
    	   	serializedArray["transactionDate"] = $('#transactionDate').val();
    	   	serializedArray["referenceNumber"] = $('#referenceNumber').val();	
			serializedArray["comments"] = $('#comments').val();
			//populate debits and credits array
    	   	var populateCreditOrDebitArray = function(type){
    	   		serializedArray[type] = new Array();
    	   		$("#" + type).children('p').each(function (i) {
    	   		// "this" is the current element in the loop
    	   		var tempObject= new Object();
			    $(this).children('label').each(function(j){
			    	if(j==0){
			    		//for property of label had Id of glAccount selectbox
			    		tempObject.glAccountId=$("#"+$(this).attr("for")).val();
			    	}else{
			    		//for property of label had Id of amount input
			    		tempObject.amount=$("#"+$(this).attr("for")).val();;
			    	}
			    }); 
			    serializedArray[type][i]=tempObject;
				});
    	   	}
    	   	if (templateSelector === "#journalEntryFormTemplate") {
	    	   	populateCreditOrDebitArray("debits");
				populateCreditOrDebitArray("credits");
			} else if(templateSelector === "#predefinedPostingEntryFormTemplate") {

				//get the selected object from data object
				var ruleObject = new Object();
				var selectedRule = $('#accountingRule').val();
				for(i=0; i<data.accountingRuleOptions.length; i++) {
					var tempObject = data.accountingRuleOptions[i];
					if (selectedRule == tempObject.id) {
						ruleObject = tempObject;
					}
				}
				serializedArray["accountingRule"] = $('#accountingRule').val();
				
				if (ruleObject.creditAccounts != undefined) {
					if (ruleObject.creditAccounts.length>0) {
						populateCreditOrDebitArray("creditaccounts");
						serializedArray["credits"]=serializedArray["creditaccounts"];
						delete serializedArray["creditaccounts"];
					}
				}
				if (ruleObject.debitAccounts != undefined) {
					if (ruleObject.debitAccounts.length>0) {
						populateCreditOrDebitArray("debitaccounts");
						serializedArray["debits"]=serializedArray["debitaccounts"];
						delete serializedArray["debitaccounts"];
					}
				}
			}	
		}

		//Caledar form data
        if (postUrl.toLowerCase().indexOf("calendars") > 0){
            
            //var rrule = convertToRfc5545();
            var freq = $("#repeats").val();
            serializedArray = {};
            serializedArray["locale"] = $('#locale').val();
            serializedArray["dateFormat"] = $('#dateFormat').val();
            //serializedArray["title"] = $('#title').val();
            //Provide default title value
            var urlSplit = postUrl.split('/');
            serializedArray["title"] = urlSplit[0] + '_' + urlSplit[1] + '_CollectionMeeting';
            //e.g. : group_1_CollectionMeeting
            serializedArray["description"] = $('#description').val();
            //serializedArray["typeId"] = $('#meetingTypeId').val();
            serializedArray["typeId"] = 1;
            serializedArray["startDate"] = $('#startDate').val();
            if($('input:checkbox[name=repeating]').is(':checked')){
				serializedArray["repeating"] = "true";
            }else{
				serializedArray["repeating"] = "false";
            }
            serializedArray["repeats"] = $("#repeats").val();
            serializedArray["repeatsEvery"] = $('#repeatsEvery').val();

			if(freq == "Weekly"){
				//Get weekly details
				var values = new Array();
				$.each($("input[name='repeatson[]']:checked"), function() {
					values.push($(this).val());
				});

				if (values) {
					serializedArray["repeatsOnDay"] =  values.toString();
				}
			}
            //serializedArray["recurrence"] = rrule;
            
            if($('input:checkbox[name=repeating]').is(':checked')){
                if($('#endson').is(':checked')){
                    serializedArray["endDate"] = $('#endondate').val();
                }
            }

            //In first release no other meeting types are supported
            /*
            if($('#meetingTypeId').val() != "1"){
            	serializedArray["location"] = $('#location').val();
            	serializedArray["duration"] = $('#duration').val();
	            serializedArray["remindById"] = $('#remindById').val();
	            serializedArray["firstReminder"] = $('#firstReminder').val();
	            serializedArray["secondReminder"] = $('#secondReminder').val();
            }
            */
            
		}
	
		if (templateSelector === "#accountingruleFormTemplate") {
			if (serializedArray.name === "") {
				delete serializedArray.name;
			}
			if (serializedArray.accountToDebit === "") {
				delete serializedArray.accountToDebit;
			}
			if (serializedArray.accountToCredit === "") {
				delete serializedArray.accountToCredit;
			}
			
			//allow only one value for debits
			if (serializedArray.debitRuleType === "Fixed") {
				delete serializedArray.debitTags;
				delete serializedArray.allowMultipleDebitEntries;
			} else if (serializedArray.debitRuleType === "List") {
				delete serializedArray.accountToDebit;
				if (typeof serializedArray.debitTags === 'string') {
					var debits = [];
					debits.push(serializedArray.debitTags);
					delete serializedArray.debitTags;
					serializedArray["debitTags"] = debits;
				}
			} else {
				delete serializedArray.debitTags;
				delete serializedArray.accountToDebit;
				delete serializedArray.allowMultipleDebitEntries;
			}

			//allow only one value for credits
			if (serializedArray.creditRuleType === "Fixed") {
				delete serializedArray.creditTags;
				delete serializedArray.allowMultipleCreditEntries;
			} else if (serializedArray.creditRuleType === "List") {
				delete serializedArray.accountToCredit;
				if (typeof serializedArray.creditTags === 'string') {
					var credits = [];
					credits.push(serializedArray.creditTags);
					delete serializedArray.creditTags;
					serializedArray["creditTags"] = credits;
				}
			} else {
				delete serializedArray.creditTags;
				delete serializedArray.accountToCredit;
				delete serializedArray.allowMultipleCreditEntries;
			}

			delete serializedArray.debitRuleType;
			delete serializedArray.creditRuleType;
		}

		if (templateSelector == '#userFormTemplate') {
			if (serializedArray.password === "") {
				delete serializedArray.password;
			}
		}

		var newFormData = JSON.stringify(serializedArray);
		if (postUrl.toLowerCase().indexOf("permissions") > -1) {
			var permissions = {};
			permissions.permissions = serializedArray;
			newFormData = JSON.stringify(permissions);
		}
		
		//spl ajax req for webcam and doc upload
		if( templateSelector == '#clientImageWebcamFormTemplate'){
			var imageCanvas = $('#imageCanvas')[0];
			var imageForUpload = imageCanvas.toDataURL("image/jpeg");
			executeAjaxRequest(postUrl, submitType, imageForUpload, saveSuccessFunction, formErrorFunction);
		}
		else if (postUrl.toLowerCase().indexOf("documents") >= 0 || postUrl.toLowerCase().indexOf("images") >= 0){
			var formData = new FormData();    
			formData.append( 'file', $('#file')[0].files[0] );
			$.each(serializedArray, function (name, val) {
		        formData.append(name, val);
		    });	
			executeMultipartUploadAjaxRequest(postUrl, submitType, formData, saveSuccessFunction, formErrorFunction);
		}else{
			executeAjaxRequest(postUrl, submitType, newFormData, saveSuccessFunction, formErrorFunction);
		}
		  
	};
	// end of buttonsOpts for save button
	
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	
	dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: width, 
	  		height: height, 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			},
	  		open: function (event, ui) {
	  			repopulateOpenPopupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
	  		}
	  	}).dialog('open');
}

function repopulateOpenPopupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction){
	var dialogDiv = $("#dialog-form");
	var formHtml = "";
	switch(templateSelector)
	{
			case "#rolePermissionsFormTemplate":
				formHtml = $(templateSelector).render(data);
				dialogDiv.html(formHtml);
				jQuery.MifosXPermissions.addRolePermissionsTabs(data, "#rolePermissionsDiv");
  				break;
			case "#permissionFormTemplate":
				formHtml = $(templateSelector).render({dummy: true});
				dialogDiv.html(formHtml);
				jQuery.MifosXPermissions.maintainMakerCheckerTabs(data, "#makerCheckerPermissionsDiv");
  				break;
			default:
				formHtml = $(templateSelector).render(data);
				dialogDiv.html(formHtml);
	}

	//attaching charges to loan from popup
	$('#chargeOptions').change(function(e) {
		if ($(this).val() > 0){
			var selectChargeForLoanSuccess = function(chargeData, textStatus, jqXHR){
				var partialFormHtml = $("#loanChargeDetailsPartialFormTemplate").render(chargeData);
				$("#loanChargeDetails").html(partialFormHtml);
				$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
			}
			executeAjaxRequest("charges/" + $(this).val() + "?template=true", "GET", "", selectChargeForLoanSuccess, formErrorFunction);    	
		}
	})

	// for accounting rule initialize comboboxes
	if (templateSelector === "#accountingruleFormTemplate") {
		$("#officeId").combobox();

		var debitRuleType = $('input:radio[name=debitRuleType]:checked').val();
		var creditRuleType = $('input:radio[name=creditRuleType]:checked').val();

		if (debitRuleType == "Fixed") {
			$("#fixeddebitaccount").show();
			$("#fixeddebitaccountlabel").show();
			$("#availabledebittags").hide();
			$("#selecteddebittags").hide();
			$("#allowmultipledebitentrieslabel").hide();
			$("#allowmultipledebitentries").hide();
			$("#accountToDebit").combobox();
		} else if (debitRuleType == "List"){
			$("#fixeddebitaccount").hide();
			$("#fixeddebitaccountlabel").hide();
			$("#availabledebittags").show();
			$("#selecteddebittags").show();
			$("#allowmultipledebitentrieslabel").show();
			$("#allowmultipledebitentries").show();
			// enable the buttons for add and remove
			$('.addmultipledebits').click(function() {  
  			     return !$('.multiNotSelectedDebits option:selected').remove().appendTo('#debitTags');  
  			});
  			$('.removemultipledebits').click(function() {  
  				return !$('.multiSelectedDebits option:selected').remove().appendTo('#notSelecteddebitTags');  
  			});
		} else {
			$('input:radio[name=debitRuleType]')[0].checked=true;
			$("#fixeddebitaccount").show();
			$("#fixeddebitaccountlabel").show();
			$("#availabledebittags").hide();
			$("#selecteddebittags").hide();
			$("#allowmultipledebitentrieslabel").hide();
			$("#allowmultipledebitentries").hide();
			$("#accountToDebit").combobox();
		}

		if (creditRuleType == "Fixed") {
			$("#fixedcreditaccount").show();
			$("#fixedcreditaccountlabel").show();
			$("#availablecredittags").hide();
			$("#selectedcredittags").hide();
			$("#allowmultiplecreditentrieslabel").hide();
			$("#allowmultiplecreditentries").hide();
			$("#accountToCredit").combobox();
		} else if (creditRuleType == "List"){
			$("#fixedcreditaccount").hide();
			$("#fixedcreditaccountlabel").hide();
			$("#availablecredittags").show();
			$("#selectedcredittags").show();
			$("#allowmultiplecreditentrieslabel").show();
			$("#allowmultiplecreditentries").show();
			// enable the buttons for add and remove
			$('.addmultiplecredits').click(function() {  
  			     return !$('.multiNotSelectedCredits option:selected').remove().appendTo('#creditTags');  
  			});
  			$('.removemultiplecredits').click(function() {  
  				return !$('.multiSelectedCredits option:selected').remove().appendTo('#notSelectedcreditTags');  
  			});
		} else {
			$('input:radio[name=creditRuleType]')[0].checked=true;
			$("#fixedcreditaccount").show();
			$("#fixedcreditaccountlabel").show();
			$("#availablecredittags").hide();
			$("#selectedcredittags").hide();
			$("#allowmultiplecreditentrieslabel").hide();
			$("#allowmultiplecreditentries").hide();
			$("#accountToCredit").combobox();
		}

		$('input:radio[name=debitRuleType]').change(function (){
			var selectedType = $(this).val();
			if (selectedType == "Fixed") {
				$("#fixeddebitaccount").show();
	            $("#fixeddebitaccountlabel").show();
	            $("#availabledebittags").hide();
	            $("#selecteddebittags").hide();
	            $("#allowmultipledebitentrieslabel").hide();
	            $("#allowmultipledebitentries").hide();
	            $("#accountToDebit").combobox();
			} else if (selectedType == "List"){
				$("#fixeddebitaccount").hide();
	            $("#fixeddebitaccountlabel").hide();
	            $("#availabledebittags").show();
	            $("#selecteddebittags").show();
	            $("#allowmultipledebitentrieslabel").show();
	            $("#allowmultipledebitentries").show();
	            // enable the buttons for add and remove
	            $('.addmultipledebits').click(function() {  
  			     return !$('.multiNotSelectedDebits option:selected').remove().appendTo('#debitTags');  
	  			});
	  			$('.removemultipledebits').click(function() {  
	  				return !$('.multiSelectedDebits option:selected').remove().appendTo('#notSelecteddebitTags');  
	  			});

			}
		});

		$('input:radio[name=creditRuleType]').change(function () {
			var selectedType = $(this).val();
			if (selectedType == "Fixed") {
				$("#fixedcreditaccount").show();
	            $("#fixedcreditaccountlabel").show();
	            $("#availablecredittags").hide();
	            $("#selectedcredittags").hide();
	            $("#allowmultiplecreditentrieslabel").hide();
	            $("#allowmultiplecreditentries").hide();
	            $("#accountToCredit").combobox();
			} else if (selectedType == "List"){
				$("#fixedcreditaccount").hide();
	            $("#fixedcreditaccountlabel").hide();
	            $("#availablecredittags").show();
	            $("#selectedcredittags").show();
	            $("#allowmultiplecreditentrieslabel").show();
	            $("#allowmultiplecreditentries").show();
	            // enable the buttons for add and remove
	            $('.addmultiplecredits').click(function() {  
	  			     return !$('.multiNotSelectedCredits option:selected').remove().appendTo('#creditTags');  
	  			});
	  			$('.removemultiplecredits').click(function() {  
	  				return !$('.multiSelectedCredits option:selected').remove().appendTo('#notSelectedcreditTags');  
	  			});
			}
		});
	}

	if (templateSelector === "#groupFormTemplate"){
		$("#dialog-form #officeId").change(function(e){
			var selectedOfficeId = $(this).val();
			var officeIdChangeSuccess = function(groupData, textStatus, jqXHR){
				groupData['officeId'] = selectedOfficeId;
				repopulateOpenPopupDialogWithFormViewData(groupData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			if (data['id']){
				executeAjaxRequest("groups/" + data['id'] + "?template=true&officeId=" + selectedOfficeId, "GET", "", officeIdChangeSuccess, formErrorFunction);	
			} else {
				executeAjaxRequest("groups/template?officeId=" + selectedOfficeId +"&levelId="+data['groupLevelData'].levelId, "GET", "", officeIdChangeSuccess, formErrorFunction);	
			}
		})
	}

	if (templateSelector === "#centerFormTemplate"){
		$("#dialog-form #officeId").change(function(e){
			var selectedOfficeId = $(this).val();
			var officeIdChangeSuccess = function(centerData, textStatus, jqXHR){
				centerData['officeId'] = selectedOfficeId;
				repopulateOpenPopupDialogWithFormViewData(centerData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			if (data['id']){
				executeAjaxRequest("centers/" + data['id'] + "?template=true&officeId=" + selectedOfficeId, "GET", "", officeIdChangeSuccess, formErrorFunction);	
			} else {
				executeAjaxRequest("centers/template?officeId=" + selectedOfficeId , "GET", "", officeIdChangeSuccess, formErrorFunction);	
			}
		})
	}
	
	if (templateSelector === "#glAccountsFormTemplate") {
		$("#type").change(function(e){
			var name = $("#name").val();
			var glCode = $("#glCode").val();
			
			var type = $(this).val();
			var selectedType = new Object();
			for(i=0;i<data.accountTypeOptions.length;i++){
				if(type == data.accountTypeOptions[i].id){
					selectedType.id = data.accountTypeOptions[i].id;
					selectedType.code = data.accountTypeOptions[i].code;
					selectedType.value = data.accountTypeOptions[i].value;
					data.type = selectedType;
				}
			}

			data.name = name;
			data.glCode = glCode;
			repopulateOpenPopupDialogWithFormViewData(data, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);	
		})
	}

	if (templateSelector === "#guarantorFormTemplate"){
    	loadGuarantorForm();	
	}

	if (templateSelector === "#transactionLoanFormTemplate"){
    	loadTransactionForm();
	}

	if (templateSelector === "#loanDisbursementTemplate"){
    	loadTransactionForm();
	}

	if (templateSelector === "#savingsAccountTransactionFormTemplate") {
		loadTransactionForm();
	};

	if (templateSelector === "#bulkLoanReassignmentFormTemplate"){
		$("#dialog-form #officeId").change(function(e){
			var selectedOfficeId = $("#dialog-form #officeId").val();
			withOfficeIdUrl = postUrl + "/template?officeId=" + selectedOfficeId;
			var officeIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			executeAjaxRequest(withOfficeIdUrl, "GET", "", officeIdSelectSuccess, formErrorFunction);
		});
		$("#dialog-form #fromLoanOfficerId").change(function(e){
			var selectedOfficeId = $("#dialog-form #officeId").val();
			var selectedFromLoanOfficerId = $("#dialog-form #fromLoanOfficerId").val();
			var withOfficeIdAndFromLoanOfficerIdUrl = postUrl  + "/template?officeId=" + selectedOfficeId + "&fromLoanOfficerId="+selectedFromLoanOfficerId+"";
			var fromLoanOfficerIdSelectSuccess = function(loanReassignmentData, textStatus, jqXHR){
				repopulateOpenPopupDialogWithFormViewData(loanReassignmentData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
			}
			executeAjaxRequest(withOfficeIdAndFromLoanOfficerIdUrl, "GET", "", fromLoanOfficerIdSelectSuccess, formErrorFunction); 
		});
		$("input[type='checkbox']").click(function(){ // checkboxes hierarchy handler
			if ($(this).is("[data-id]")){
				var isChecked = $(this).is(":checked");
				$("input[data-parentid='"+$(this).attr("data-id")+"']").prop("checked", isChecked);
			} else {
				if( $("input[data-parentid='"+$(this).attr("data-parentid")+"']").filter(':not(:checked)').length === 0){
					$("input[data-id='"+$(this).attr("data-parentid")+"']").prop("checked", true);
				} else {
					$("input[data-id='"+$(this).attr("data-parentid")+"']").prop("checked", false);
				}			
			}
		})
	}

	if (templateSelector === "#clientFormTemplate" || templateSelector === "#editClientFormTemplate") {

		if (templateSelector === "#clientFormTemplate") {
			$("#dialog-form #officeId").change(function(e){
				var selectedOfficeId = $(this).val();
				var officeIdChangeSuccess = function(clientData, textStatus, jqXHR){
					clientData['officeId'] = selectedOfficeId;
					repopulateOpenPopupDialogWithFormViewData(clientData, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction)
				}
				if (data['id']){
					executeAjaxRequest("clients/" + data['id'] + "?template=true&officeId=" + selectedOfficeId, "GET", "", officeIdChangeSuccess, formErrorFunction);	
				} else {
					executeAjaxRequest("clients/template?staffInSelectedOfficeOnly=false&officeId=" + selectedOfficeId , "GET", "", officeIdChangeSuccess, formErrorFunction);	
				}
			})
		}

		//onchange events for radio button clientType
		$("input[name='clientType']").change(function() {
	  		var selectedValue = $(this).val();
	  		if (selectedValue == "1"){
	  		    $("#individualRow").show();
	  		   	$("#businessRow").hide();
			}else if (selectedValue == "2"){
				$("#individualRow").hide();
				$("#businessRow").show()
			}
		});

		if (!(data.fullname == undefined)) {
			$("#individualRow").hide();
	  		$("#businessRow").show();
		} else {
			$("#individualRow").show();
	  		$("#businessRow").hide();
		}
	}

	if (templateSelector === "#chargeFormTemplate") {
		$("#chargeCalculationType").change(function() {
			var selectedValue = $(this).val();
	  		if (selectedValue == "1"){
	  			$("label[for='amount']").text(doI18N('label.amount'));
			}else if (selectedValue == "2"){
				$("label[for='amount']").text(doI18N('label.percentage'));
			}
		});

		if(data.chargeCalculationType.id == "1") {
			$("label[for='amount']").text(doI18N('label.amount'));
		} else if (data.chargeCalculationType.id == "2") {
			$("label[for='amount']").text(doI18N('label.percentage'));
		}
	}

	if (templateSelector === "#transferClientsBetweenBranchesFormTemplate") {
		$("#destinationOfficeId").change(function(e){
			var selectedOfficeId = $(this).val();
			var officeIdChangeSuccess = function(staffData, textStatus, jqXHR){
				var tempObject = new Object();
				tempObject['officeId'] = selectedOfficeId;
				tempObject.officeOptions = offices;
				tempObject.staffOptions = staffData;
				tempObject.clientOfficeId = currentClientOffice;
				repopulateOpenPopupDialogWithFormViewData(tempObject, postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction);
			}
			executeAjaxRequest("staff?staffInOfficeHierarchy=true&fields=id,displayName&officeId=" + selectedOfficeId, "GET", "", officeIdChangeSuccess, formErrorFunction);
		});
	}

	if (templateSelector === "#attendanceFormTemplate") {
		var availableDate = function(date) {
  
		    var recurringDatesArr = [];
		    var recurringDates = data.calendarData.recurringDates;
		    $.each(recurringDates, function(n,i){
		        var newdate = i[0] + "-" + ("0"+(i[1])).slice(-2) + "-" + ("0"+(i[2])).slice(-2);
		        recurringDatesArr[n] = newdate;
		    });
		    
		    var ymd = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);

		    if ($.inArray(ymd, recurringDatesArr) < 0 ) {
		        return [false, "","Not a meeting date"];
		    } else {
		        return [true,"","Available meeting date"];
		    }
		}

		$('#meetingDate').datepicker({ dateFormat: custom.datePickerDateFormat, beforeShowDay: availableDate});	
	}

	$('#addclientmembers').click(function() {  
		return !$('#notSelectedClients option:selected').remove().appendTo('#clientMembers');  
	});

	$('#removeclientmembers').click(function() {  
		return !$('#clientMembers option:selected').remove().appendTo('#notSelectedClients');  
	});

	$('#addcharges').click(function() {  
		return !$('#notSelectedCharges option:selected').remove().appendTo('#charges');  
	});
	$('#removecharges').click(function() {  
		return !$('#charges option:selected').remove().appendTo('#notSelectedCharges');  
	});

	$('#addroles').click(function() {  
		return !$('#notSelectedRoles option:selected').remove().appendTo('#roles');  
	});	
	$('#removeroles').click(function() {  
		return !$('#roles option:selected').remove().appendTo('#notSelectedRoles');  
	}); 

	$('#add').click(function() {  
	     return !$('#notSelectedItems option:selected').remove().appendTo('#selectedItems');  
	});
	
	$('#remove').click(function() {  
		return !$('#selectedItems option:selected').remove().appendTo('#notSelectedItems');  
	});

	$('#addcurrencies').click(function() {  
		return !$('#notSelectedCurrencies option:selected').remove().appendTo('#currencies');  
	});
	
	$('#removecurrencies').click(function() {  
		return !$('#currencies option:selected').remove().appendTo('#notSelectedCurrencies');  
	});

	$('#adddebitTags').click(function() {  
		return !$('#notSelecteddebitTags option:selected').remove().appendTo('#debitTags');  
	});

	$('#removedebitTags').click(function() {  
		return !$('#debitTags option:selected').remove().appendTo('#notSelecteddebitTags');  
	});

	$('#addcreditTags').click(function() {  
		return !$('#notSelectedcreditTags option:selected').remove().appendTo('#creditTags');  
	});

	$('#removecreditTags').click(function() {  
		return !$('#creditTags option:selected').remove().appendTo('#notSelectedcreditTags');  
	});

	$('#removeRestrictedProduct').click(function() {  
        return !$('#restrictedProducts option:selected').remove().appendTo('#allowedProducts');  
    });

    $('#addToRestrictedProduct').click(function() {  
        return !$('#allowedProducts option:selected').remove().appendTo('#restrictedProducts');  
    });
	
	$('.datepickerfield').datepicker({constrainInput: true, maxDate: 0, dateFormat: custom.datePickerDateFormat});
	$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
	
	$("#entityform textarea").first().focus();
	$('#entityform input').first().focus();	
}

function validateCreateDatatableRow(row, index, validationErrors) {
    var name = $(row).find("input[name=columnName]").val();
    var type = $(row).find("select[name=columnType]").val();
    var length = $(row).find("input[name=columnLength]").val();
    var code = $(row).find("select[name=columnCode]").val();

    validationErrors[index] = new Object();
    if (name.length <= 0 || !(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,}[a-zA-Z0-9]$/.test(name))) {
        validationErrors[index].name = true;
    }
    if (type == "String") {
        if (isNaN(parseInt(length)) || !isFinite(length) || length <= 0) {
            validationErrors[index].length = true;
        }
    }
    if (type == "Dropdown")
    {
        if (!(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,48}[a-zA-Z0-9]$/.test(code))) {
            validationErrors[index].code = true;
        }
    }
}

function validateUpdateDatatableRow(row, validationErrors) {
    var id = $(row).attr("id");
    var name = $(row).find("input[name=columnName]").val();
    var newName = $(row).find("input[name=columnNewName]").val();
    var type = $(row).find("select[name=columnType]").val();
    var length = $(row).find("input[name=columnLength]").val();
    var code = $(row).find("input[name=columnCode]").val();
    var newCode = $(row).find("select[name=columnCode]").val();

    validationErrors[id] = new Object();
    if (name.length <= 0 || !(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,}[a-zA-Z0-9]$/.test(name))) {
        validationErrors[id].name = true;
    }
    if (newName.length > 0 && !(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,}[a-zA-Z0-9]$/.test(newName))) {
        validationErrors[id].newName = true;
    }
    if (type == "String") {
        if (isNaN(parseInt(length)) || !isFinite(length) || length <= 0) {
            validationErrors[id].length = true;
        }
    }
    if (type == "Dropdown")
    {
        if (!(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,48}[a-zA-Z0-9]$/.test(code))) {
            validationErrors[id].code = true;
        }
        if (newCode.length > 0 && !(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,48}[a-zA-Z0-9]$/.test(newCode))) {
            validationErrors[id].newCode = true;
        }
    }
}

function popupCreateDatatableDialog(titleCode, templateSelector, width, height, saveSuccessFunction) {

var validationErrors = null;
var dialogDiv = $("<div id='dialog-form'></div>");
var data = new Object();
var formHtml = $(templateSelector).render(data);
dialogDiv.append(formHtml);

var saveButton = doI18N('dialog.button.save');
var cancelButton = doI18N('dialog.button.cancel');
var buttonsOpts = {};

buttonsOpts[saveButton] = function() {
    validationErrors = new Object();
    var datatableObject = new Object();
    datatableObject.datatableName = $("#registeredTableName").val();
    datatableObject.apptableName = $("#applicationTableName").val();
    datatableObject.multiRow = $("#multiRow").prop("checked");
    datatableObject.columns = new Array();
    $("#createDatatableColumns tbody tr").each(function(index) {
        var column = new Object();
        column.name = $(this).find("input[name=columnName]").val();
        column.type = $(this).find("select[name=columnType]").val();
        column.mandatory = $(this).find("input[name=columnMandatory]").prop("checked");
        if (column.type == "String") {
            column.length = $(this).find("input[name=columnLength]").val();
        }
        if (column.type == "Dropdown") {
            column.code = $(this).find("select[name=columnCode]").val();
        }

        validateCreateDatatableRow($(this), index, validationErrors);

        datatableObject.columns.push(column);
    });

    var errorFunction = function(jqXHR, textStatus, errorThrown) {
        handleXhrError(jqXHR, textStatus, errorThrown, "#formErrorsTemplate", "#formerrors");

        if (!(/^[a-zA-Z][a-zA-Z0-9\-_\s]{0,48}[a-zA-Z0-9]$/.test(datatableObject.datatableName))) {
            $("#registeredTableName").addClass("ui-state-error");
        }
        if (datatableObject.apptableName.length <= 0) {
            $("#applicationTableName").addClass("ui-state-error");
        }

        $.each(validationErrors, function(index, item) {
            var row = $("table#createDatatableColumns tbody").children().eq(index);

            if (item.name) {
                $(row).find("input[name=columnName]").addClass("ui-state-error");
            }
            if (item.length) {
                $(row).find("input[name=columnLength]").addClass("ui-state-error");
            }
            if (item.code) {
                $(row).find("input[name=columnCode]").addClass("ui-state-error");
            }
        });
    };

	executeAjaxRequest("datatables", "POST", JSON.stringify(datatableObject), saveSuccessFunction, errorFunction);
};
buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};

dialogDiv.dialog({
  		title: doI18N(titleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: function (event, ui) {  			
  			$("#entityform textarea").first().focus();
  			$('#entityform input').first().focus();
  		}
  }).dialog('open');

var templateTableRow ="";

var successFunction = function(data, textStatus, jqXHR) {
	var crudObject = new Object();
	crudObject.crudRows = data;
	var html = $('#codeValuedatatableTemplate').render(crudObject);
	$('#codeValues').html(html);
	templateTableRow = $("table#createDatatableColumns tbody tr").first().clone();
};	
executeAjaxRequest('codes', 'GET', "", successFunction, formErrorFunction);

var rowDeleteFunction = function(e) {
    e.preventDefault();
    $(this).parent().parent().remove();
    return false;
};
var changeTypeFunction = function(e) {
    e.preventDefault();

    var type = $(this).val();
    $(this).parent().parent().find("input[name=columnLength]").prop("disabled", (type != "String")).removeClass("ui-state-error");
    $(this).parent().parent().find("select[name=columnCode]").prop("disabled", (type != "Dropdown")).removeClass("ui-state-error");
    
    return false;
}

$("table#createDatatableColumns tbody button").click(rowDeleteFunction);
$("table#createDatatableColumns tbody select").change(changeTypeFunction);

$("table#createDatatableColumns tfoot button").click(function(e) {
    e.preventDefault();
    var newRow = $(templateTableRow).clone().appendTo("table#createDatatableColumns tbody");
    $(newRow).find("button").click(rowDeleteFunction);
    $(newRow).find("select").change(changeTypeFunction);

    return false;
});

var fixHelper = function(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
};

$("table#createDatatableColumns tbody").sortable({ helper: fixHelper,
    handle: "div[data-handle=handle]" });

}

function getDatatableColumnRealName(datatableRowObject) {

    var name = $(datatableRowObject).find("input[name=columnName]").val();
    var type = $(datatableRowObject).find("select[name=columnType]").val();

    if (type == "Dropdown") {
        var code =  $(datatableRowObject).find("input[name=columnCode]").val();

        name = code + "_cd_" + name;
    }

    return name;
}

function getDatatableColumnNewName(datatableRowObject) {

    var newName = $(datatableRowObject).find("input[name=columnNewName]").val();
    var name = (newName.length > 0) ? newName : $(datatableRowObject).find("input[name=columnName]").val();
    var type = $(datatableRowObject).find("select[name=columnType]").val();

    if (type == "Dropdown") {
        var newCode =  $(datatableRowObject).find("select[name=columnCode]").val();
        var code = (newCode.length > 0) ? newCode : $(datatableRowObject).find("input[name=columnCode]").val();

        name = code + "_cd_" + name;
    }

    return name;
}

function insertUpdateDatatableColumnFromTemplate(columnData, templateTableRow, changeTypeFunction, rowDeleteFunction, dropColumns, crudObject) {
    var newRow = $(templateTableRow).clone().appendTo("table#updateDatatableColumns tbody");
    $(newRow).find("button").click({ array: dropColumns }, rowDeleteFunction);
    $(newRow).find("select").change(changeTypeFunction);

    $(newRow).find("input[name=columnName]").val(columnData.name).prop("disabled", (columnData.action == "change"));
    $(newRow).find("input[name=columnNewName]").val(columnData.newName).prop("disabled", (columnData.action == "add"));
    $(newRow).find("select[name=columnType]").prop("disabled", (columnData.action == "change"));
    $(newRow).find("select[name=columnType] option[value=" + columnData.type + "]").attr("selected", "selected");
    $(newRow).find("input[name=columnMandatory]").prop("checked", columnData.mandatory);
    $(newRow).find("input[name=columnLength]").val(columnData["length"]).prop("disabled", (columnData.type != "String"));
    $(newRow).find("input[name=columnCode]").val(columnData.code).prop("disabled", (columnData.type != "Dropdown" || columnData.action == "change"));

    var html = $('#codeValuedatatableTemplate').render(crudObject);
	$(newRow).find('#columnNewCode').html(html);
	$(newRow).find("select[name=columnCode]").prop("disabled", (columnData.type != "Dropdown"));

    if (columnData.action == "change") {
        $(newRow).find("input[name=columnName]").attr("data-original-name", getDatatableColumnRealName($(newRow)));
        $(newRow).attr("data-original-index", columnData.index);
    }

    $(newRow).attr("id", columnData.id);
}

function populateUpdateDatatableDialog(datatableName, changeTypeFunction, rowDeleteFunction, templateTableRow, dropColumns, enteredFormData, validationErrors) {
    $("#updateDatatableColumns tbody").empty();

    var crudObject = new Object();
	var successFunction = function(data, textStatus, jqXHR) {
		crudObject.crudRows = data;

    var populateSuccessFunction = function(data) {

        var datatableData = JSON.parse(JSON.stringify(data));
        var typeMap = {};
        typeMap["varchar"] = "String";
        typeMap["decimal"] = "Decimal";
        typeMap["int"] = "Number";
        typeMap["date"] = "Date";
        typeMap["text"] = "Text";

        $("#registeredTableName").text(datatableName);
        $("#applicationTableName option[value=" + datatableData.applicationTableName + "]").attr("selected", "selected");

        if (datatableData.columnHeaderData) {
            $.each(datatableData.columnHeaderData, function(index, column) {
                var fkFieldName = datatableData.applicationTableName.substring(2, datatableData.applicationTableName.length) + "_id";
                if (column.columnName == fkFieldName || column.columnName == "id") {
                    return true;
                }

                var name = "";
                var newName = "";
                var type = "";
                var mandatory = false;
                var length = "";
                var code = "";
                var newCode = "";
                var action = "change";
                var id = "";

                if (enteredFormData && enteredFormData[column.columnName]) {
                    var data = enteredFormData[column.columnName];

                    name = data.name;
                    newName = (data.newName) ? data.newName : "";
                    type = data.type;
                    mandatory = data.mandatory;
                    length = (data["length"]) ? data["length"] : "";
                    code = (data.code) ? data.code : "";
                    newCode = "";
                    action = data.action;
                    id = data.id;

                    delete enteredFormData[column.columnName];
                } else {
                    var indexOfCD = column.columnName.indexOf("_cd_");
                    name = (indexOfCD > -1) ? column.columnName.substring(indexOfCD + 4, column.columnName.length) : column.columnName;
                    type = (indexOfCD > -1) ? "Dropdown" : typeMap[column.columnType.toLowerCase()];
                    mandatory = !column.isColumnNullable;
                    length = (type == "String") ? column.columnLength : "";
                    code = (indexOfCD > -1) ? column.columnName.substring(0, indexOfCD) : "";
                    id = new Date().getTime();
                }

                var columnData = {
                    name: name,
                    newName: newName,
                    type: type,
                    mandatory: mandatory,
                    length: length,
                    code: code,
                    newCode: newCode,
                    action: action,
                    index: index,
                    id: id
                };

                insertUpdateDatatableColumnFromTemplate(columnData, templateTableRow, changeTypeFunction, rowDeleteFunction, dropColumns, crudObject);
            });
        }
        $.each(enteredFormData, function(index, item) {
            if (item.action != "add") {
                return true;
            }

            var columnData = {
                name: (item.name) ? item.name : "",
                newName: "",
                type: item.type,
                mandatory: item.mandatory,
                length: (item["length"]) ? item["length"] : "",
                code: (item.code) ? item.code : "",
                newCode: "",
                action: item.action,
                after: item.after,
                id: item.id
            };
            insertUpdateDatatableColumnFromTemplate(columnData, templateTableRow, changeTypeFunction, rowDeleteFunction, dropColumns , crudObject);
        });

        if (validationErrors) {
            $.each(validationErrors, function(index, item) {
                var row = $("table#updateDatatableColumns tbody tr[id='" + index + "']");

                if (item.name) {
                    $(row).find("input[name=columnName]").addClass("ui-state-error");
                }
                if (item.newName) {
                    $(row).find("input[name=columnNewName]").addClass("ui-state-error");
                }
                if (item.length) {
                    $(row).find("input[name=columnLength]").addClass("ui-state-error");
                }
                if (item.code) {
                    $(row).find("input[name=columnCode]").addClass("ui-state-error");
                }
                if (item.newCode) {
                    $(row).find("select[name=columnCode]").addClass("ui-state-error");
                }
            });
        }
    };

    executeAjaxRequest("datatables/" + datatableName, "GET", {}, populateSuccessFunction);
    };

	executeAjaxRequest('codes', 'GET', "", successFunction, formErrorFunction);
	
}

function popupUpdateDatatableDialog(titleCode, datatableName, templateSelector, width, height, saveSuccessFunction) {

var validationErrors = null;
var dropColumns = new Array();
var dialogDiv = $("<div id='dialog-form'></div>");
var data = new Object();
var formHtml = $(templateSelector).render(data);
dialogDiv.append(formHtml);

var saveButton = doI18N('dialog.button.save');
var cancelButton = doI18N('dialog.button.cancel');
var buttonsOpts = {};

buttonsOpts[saveButton] = function () { };
buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};

dialogDiv.dialog({
  		title: doI18N(titleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: function (event, ui) {  			
  			$("#entityform textarea").first().focus();
  			$('#entityform input').first().focus();
  		}
  }).dialog('open');

var enteredFormData = new Object();
var templateTableRow = $("table#updateDatatableColumns tbody tr").first().clone();
var rowDeleteFunction = function(e) {
    e.preventDefault();

    var originalName = $(this).parent().parent().find("input[name=columnName]").attr("data-original-name");
    if (originalName) {
        var columnObject = new Object();
        columnObject.name = originalName;
        e.data.array.push(columnObject);
    }

    $(this).parent().parent().remove();

    return false;
};
var changeTypeFunction = function(e) {
    e.preventDefault();

    var attr = $(this).parent().parent().find("input[name=columnName]").attr("data-original-name");
    var indexOfCD = (attr) ? attr.indexOf("_cd_") : -1;
    var type = $(this).val();

    $(this).parent().parent().find("input[name=columnLength]").prop("disabled", (type != "String")).removeClass("ui-state-error");

    if (indexOfCD > -1) {
        $(this).parent().parent().find("select[name=columnCode]").prop("disabled", (type != "Dropdown")).removeClass("ui-state-error");
    } else {
        $(this).parent().parent().find("input[name=columnCode]").prop("disabled", (type != "Dropdown")).removeClass("ui-state-error");
    }

    if (type == "Dropdown") {
    	$(this).parent().parent().find("select[name=columnCode]").prop("disabled", (type != "Dropdown"));
    } else {
    	$(this).parent().parent().find("select[name=columnCode]").attr("disabled", "disabled");
    }
    return false;
}

// Populate Data Table
populateUpdateDatatableDialog(datatableName, changeTypeFunction, rowDeleteFunction, templateTableRow, dropColumns, enteredFormData);

// Handle Events
$("table#updateDatatableColumns tbody tr").first().remove();

$("table#updateDatatableColumns tfoot button").click(function(e) {
    e.preventDefault();
    var newRow = $(templateTableRow).clone().appendTo("table#updateDatatableColumns tbody");
    var id = new Date().getTime();
    $(newRow).find("button").click({ array: dropColumns }, rowDeleteFunction);
    $(newRow).find("select").change(changeTypeFunction);
    $(newRow).attr("id", id);

    var crudObject = new Object();
	var successFunction = function(data, textStatus, jqXHR) {
		crudObject.crudRows = data;
		$(newRow).find('#columnCodeInputType').hide();
		var html = $('#codeValuedatatableTemplate').render(crudObject);
		$(newRow).find('#columnCodeSelectType').html(html);
	};

	executeAjaxRequest('codes', 'GET', "", successFunction, formErrorFunction);

    return false;
});

var fixHelper = function(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
};

$("table#updateDatatableColumns tbody").sortable({ 
    helper: fixHelper,
    handle: "div[data-handle=handle]",
    change: function(e, ui) {
        $(ui.item).attr("data-order-changed", "true");
    }
});

$("div[class=ui-dialog-buttonset]").children().first().click({ array: dropColumns }, function(e) {
    enteredFormData = new Object();
    var datatableObject = new Object();
    datatableObject.apptableName = $("#applicationTableName").val();
    var fkFieldName = datatableObject.apptableName.substring(2, datatableObject.apptableName.length) + "_id";

    var dropColumns = e.data.array;
    if (dropColumns && dropColumns.length > 0) {
        datatableObject.dropColumns = new Array();
    }
    // Drop Columns
    $.each(dropColumns, function(index, column) {
        var dropObject = new Object();
        dropObject.name = column.name;
        datatableObject.dropColumns.push(dropObject);
    });
    // Add Columns
    $("table#updateDatatableColumns tbody tr").not("[data-original-index]").each(function() {
        if (datatableObject.addColumns == null) {
            datatableObject.addColumns = new Array();
        }

        var addObject = new Object();
        addObject.name = $(this).find("input[name=columnName]").val();
        addObject.type = $(this).find("select[name=columnType]").val();
        addObject.mandatory = $(this).find("input[name=columnMandatory]").prop("checked");
        if (addObject.type == "String") {
            addObject.length = $(this).find("input[name=columnLength]").val();
        }
        if (addObject.type == "Dropdown") {
            addObject.code = $(this).find("select[name=columnCode]").val();
        }

        var prev = $(this).prevAll("tr[data-original-index]");
        if (prev.length > 0) {
            prev = prev.first();
        }

        prev = (prev.length) ? getDatatableColumnRealName($(prev)) : fkFieldName;
        addObject.after = prev;

        var fullName = (addObject.code) ? addObject.code + "_cd_" + addObject.name : addObject.name;
        enteredFormData[fullName] = new Object();
        enteredFormData[fullName].name = addObject.name;
        enteredFormData[fullName].type = addObject.type;
        enteredFormData[fullName].mandatory = addObject.mandatory;
        enteredFormData[fullName].length = addObject.length;
        enteredFormData[fullName].code = addObject.code;
        enteredFormData[fullName].after = addObject.after;
        enteredFormData[fullName].action = "add";
        enteredFormData[fullName].id = $(this).attr("id");

        datatableObject.addColumns.unshift(addObject);
    });
    // Change Columns
    $("table#updateDatatableColumns tbody tr[data-original-index]").each(function() {
        if (datatableObject.changeColumns == null) {
            datatableObject.changeColumns = new Array();
        }

        var type = $(this).find("select[name=columnType]").val();
        var newName = $(this).find("input[name=columnNewName]").val();
        var changeObject = new Object();

        changeObject.name = $(this).find("input[name=columnName]").val();
        if (newName.length > 0) {
            changeObject.newName = newName;
        }
        changeObject.mandatory = $(this).find("input[name=columnMandatory]").prop("checked");
        if (type == "String") {
            changeObject.length = $(this).find("input[name=columnLength]").val();
        }
        if (type == "Dropdown") {
            changeObject.code = $(this).find("input[name=columnCode]").val();
            changeObject.newCode = $(this).find("select[name=columnCode]").val();
        }

        var prev = $(this).prev();
        prev = (prev.length) ? getDatatableColumnNewName($(prev)) : fkFieldName;
        changeObject.after = prev;

        var fullName = (changeObject.code) ? changeObject.code + "_cd_" + changeObject.name : changeObject.name;
        enteredFormData[fullName] = new Object();
        enteredFormData[fullName].name = changeObject.name;
        enteredFormData[fullName].newName = changeObject.newName;
        enteredFormData[fullName].type = type;
        enteredFormData[fullName].mandatory = changeObject.mandatory;
        enteredFormData[fullName].length = changeObject.length;
        enteredFormData[fullName].code = changeObject.code;
        enteredFormData[fullName].newCode = changeObject.newCode;
        enteredFormData[fullName].after = changeObject.after;
        enteredFormData[fullName].action = "change";
        enteredFormData[fullName].id = $(this).attr("id");

        datatableObject.changeColumns.push(changeObject);
    });

    validationErrors = new Object();
    $("table#updateDatatableColumns tbody tr").each(function(index) {
        validateUpdateDatatableRow($(this), validationErrors);
    });

    var errorFunction = function(jqXHR, textStatus, errorThrown) {
        dropColumns = new Array();
        populateUpdateDatatableDialog(datatableName, changeTypeFunction, rowDeleteFunction, templateTableRow, dropColumns, enteredFormData, validationErrors);
        formErrorFunction(jqXHR, textStatus, errorThrown);
    };

	executeAjaxRequest("datatables/" + datatableName, "PUT", JSON.stringify(datatableObject), saveSuccessFunction, errorFunction);
});

}

function popupRegisterDatatableDialog(titleCode, templateSelector, width, height, saveSuccessFunction) {

var dialogDiv = $("<div id='dialog-form'></div>");
var data = new Object();
var formHtml = $(templateSelector).render(data);
dialogDiv.append(formHtml);

var saveButton = doI18N('dialog.button.save');
var cancelButton = doI18N('dialog.button.cancel');
var buttonsOpts = {};		

buttonsOpts[saveButton] = function() {
	var registeredTableName=document.registerDatatableForm.registeredTableName.value ;
	if(!registeredTableName){
		alert(doI18N('validation.msg.datatable.name.mandatory'));
		return;
	}
	var registerUrl = "datatables/register/" + registeredTableName + "/" + document.registerDatatableForm.applicationTableName.value;
	executeAjaxRequest(registerUrl, "POST", {}, saveSuccessFunction, formErrorFunction);
};
buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};

dialogDiv.dialog({
  		title: doI18N(titleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: function (event, ui) {  			
  			$("#entityform textarea").first().focus();
  			$('#entityform input').first().focus();
  		}
  }).dialog('open');
}

// used by deposit account functionality
function popupDialogWithPostOnlyFormView(postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction) {
var dialogDiv = $("<div id='dialog-form'></div>");
var data = new Object();
var formHtml = $(templateSelector).render(data);
dialogDiv.append(formHtml);

var saveButton = doI18N('dialog.button.save');
var cancelButton = doI18N('dialog.button.cancel');
var buttonsOpts = {};		
buttonsOpts[saveButton] = function() {
	$('.multiSelectedItems option').each(function(i) {  
		$(this).prop("selected", "selected");  
    });

	if (document.changePasswordForm!=undefined) newPassword = document.changePasswordForm.password.value;

	var newFormData = JSON.stringify($('#entityform').serializeObject());

	executeAjaxRequest(postUrl, submitType, newFormData, saveSuccessFunction, formErrorFunction);
};
buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};

dialogDiv.dialog({
  		title: doI18N(titleCode), 
  		width: width, 
  		height: height, 
  		modal: true,
  		buttons: buttonsOpts,
  		close: function() {
  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
  			$(this).remove();
		},
  		open: function (event, ui) {
  			$('.multiadd').click(function() {  
  			     return !$('.multiNotSelectedItems option:selected').remove().appendTo('#selectedItems');  
  			});
  			
  			$('.multiremove').click(function() {  
  				return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedItems');  
  			});
  			
  			$('.datepickerfield').datepicker({constrainInput: true, dateFormat: custom.datePickerDateFormat});
  			
  			$("#entityform textarea").first().focus();
  			$('#entityform input').first().focus();
  		}
  }).dialog('open');
}

function popupDialogWithPostOnlyFormView(postUrl, submitType, titleCode, templateSelector, width, height, saveSuccessFunction, minOffset, defaultOffset, maxOffset) {
		var dialogDiv = $("<div id='dialog-form'></div>");
		var data = new Object();
		var formHtml = $(templateSelector).render(data);
		dialogDiv.append(formHtml);
		
		var saveButton = doI18N('dialog.button.save');
		var cancelButton = doI18N('dialog.button.cancel');
		var buttonsOpts = {};		
		buttonsOpts[saveButton] = function() {
			$('.multiSelectedItems option').each(function(i) {  
		    	   		$(this).prop("selected", "selected");  
		    		});

			if (document.changePasswordForm!=undefined) newPassword = document.changePasswordForm.password.value;

			var serializedArray = {};
			serializedArray = $('#entityform').serializeObject();
			if(templateSelector==="#holidayFormTemplate") {
				serializedArray["offices"] = new Array();

				var items = $('#offices').jqxTree('getCheckedItems');
				$(items).each(function(i){
					var tempObject = new Object();
					tempObject.officeId = this.id;
					serializedArray["offices"][i] = tempObject;
				});
			}
			var newFormData = JSON.stringify(serializedArray);
			executeAjaxRequest(postUrl, submitType, newFormData, saveSuccessFunction, formErrorFunction);
		};
		buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N(titleCode), 
		  		width: width, 
		  		height: height, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {
		  			$('.multiadd').click(function() {  
		  			     return !$('.multiNotSelectedItems option:selected').remove().appendTo('#selectedItems');  
		  			});
		  			
		  			$('.multiremove').click(function() {  
		  				return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedItems');  
		  			});
		  			
		  			$('.datepickerfield').datepicker({constrainInput: true, minDate: minOffset, defaultDate: defaultOffset, maxDate: maxOffset, dateFormat: custom.datePickerDateFormat});
		  			$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, minDate: minOffset, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
		  			$("#entityform textarea").first().focus();
		  			$('#entityform input').first().focus();
		  		}
		  }).dialog('open');
}

function popupConfirmationDialogAndPost(url, submitType, titleCode, width, height, tabIndex, saveSuccessFunction, jsonString) {
		    var dialogDiv = $("<div id='dialog-form'><div id='formerrors'></div>" + doI18N('text.confirmation.required') + "</div>");
		  
		  	var confirmButton = doI18N('dialog.button.confirm');
			var cancelButton = doI18N('dialog.button.cancel');
			
			var buttonsOpts = {};
			buttonsOpts[confirmButton] = function() {
				executeAjaxRequest(url, submitType, jsonString, saveSuccessFunction, formErrorFunction);
			};
			
			buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
		  
		  dialogDiv.dialog({
		  		title: doI18N(titleCode), 
		  		width: width, 
		  		height: height, 
		  		modal: true,
		  		buttons: buttonsOpts,
		  		close: function() {
		  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
		  			$(this).remove();
				},
		  		open: function (event, ui) {}
		  	}).dialog('open');
}



//sign-out
function signOut(containerDivName) {
	base64 = "";
	$("#" + containerDivName).html("");
	alert("Close the Browser for a Complete Sign Out");
}


//Audit / Makerchecker functionality
function auditSearch(useType) {

	var successFunction = function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			crudObject.crudRows = data;
			crudObject.useType = useType;
			var html = $("#auditSearchTemplate").render(crudObject);
			$("#content").html(html);  
			
			var datetimeOptions = {
							dateFormat: 'yy-mm-dd',
							timeFormat: "HH:mm:ss",
							showSecond: true
							}

			$('#auditdatetimefrom').datetimepicker(datetimeOptions);
			$('#auditdatetimeto').datetimepicker(datetimeOptions);
			$('#auditcheckeddatetimefrom').datetimepicker(datetimeOptions);
			$('#auditcheckeddatetimeto').datetimepicker(datetimeOptions);

			$('#searchaudit').button().click(function(e) {
				var validated = true;
				var auditSearchOptions = {};
				var auditAction = $('#auditaction').find(":selected").val();
				if (!(auditAction == "ALL")) auditSearchOptions.actionName = auditAction;

				var auditEntity = $('#auditentity').find(":selected").val();
				if (!(auditEntity == "ALL")) auditSearchOptions.entityName = auditEntity;

				var auditResourceId = $('#auditresourceId').val();
				if (auditResourceId > "") 
				{
					if (parseInt(auditResourceId) != auditResourceId )
					{
						alert(doI18N("resourceId.not.integer"));
						validated = false;
					}
					else auditSearchOptions.resourceId = parseInt(auditResourceId);
				}

				var auditMaker = $('#auditmaker').find(":selected").val();
				if (!(auditMaker == "ALL")) auditSearchOptions.makerId = auditMaker;


				var auditMadeOnDateTimeFrom = $('#auditdatetimefrom').val();
				if (auditMadeOnDateTimeFrom > "") auditSearchOptions.makerDateTimeFrom = auditMadeOnDateTimeFrom;

				var auditMadeOnDateTimeTo = $('#auditdatetimeto').val();
				if (auditMadeOnDateTimeTo > "") auditSearchOptions.makerDateTimeTo = auditMadeOnDateTimeTo;

				if (useType == 'audit')
				{
					var auditChecker = $('#auditchecker').find(":selected").val();
					if (!(auditChecker == "ALL")) auditSearchOptions.checkerId = auditChecker;
				
					var auditCheckedOnDateTimeFrom = $('#auditcheckeddatetimefrom').val();
					if (auditCheckedOnDateTimeFrom > "") auditSearchOptions.checkerDateTimeFrom = auditCheckedOnDateTimeFrom;

					var auditCheckedOnDateTimeTo = $('#auditcheckeddatetimeto').val();
					if (auditCheckedOnDateTimeTo > "") auditSearchOptions.checkerDateTimeTo = auditCheckedOnDateTimeTo;

					var auditProcessingResult = $('#auditprocessingresult').val();
					if (!(auditProcessingResult == "ALL")) auditSearchOptions.processingResult = auditProcessingResult;
				}
				
				if (validated == true) viewAudits(useType, auditSearchOptions);

			    e.preventDefault();
			});

	};

  	executeAjaxRequest(useType + 's/searchtemplate', 'GET', "", successFunction, formErrorFunction);

}

function viewAudits(useType, auditSearchOptions) {

	var url = useType + "s";
	
	var paramCount = 1;
	for (var i in auditSearchOptions)
	{
		if (paramCount > 1) url += "&"
		else url += "?";
		url += encodeURIComponent(i) + "=" + encodeURIComponent(auditSearchOptions[i]);
		paramCount = paramCount + 1;
	}	

	var successFunction = function(data, textStatus, jqXHR) {

				var crudObject = new Object();
				crudObject.crudRows = data;
				crudObject.useType = useType;
				var html = $("#auditListTemplate").render(crudObject);
				$("#auditSearchResults").html(html);  

				$("a.viewaudit").click( function(e) {
					
					var linkId = this.id;
					var entityId = linkId.replace("viewaudit", "");
					viewAuditEntry(entityId)
					e.preventDefault();
				});
				
				if (useType == "makerchecker") {
					var width = 400; 
					var height = 225;
					
					$("a.deletemc").click( function(e) {
						var linkId = this.id;
						var entityId = linkId.replace("deletemc", "");
						var url = 'makercheckers/' + entityId;
						var onMakerCheckerActionSuccessFunction = function(data) {
							  $('#dialog-form').dialog("close");
							  viewAudits(useType, auditSearchOptions);
							 }
						popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, onMakerCheckerActionSuccessFunction);
						e.preventDefault();
					});
					$("a.approvemc").click( function(e) {
						var linkId = this.id;
						var entityId = linkId.replace("approvemc", "");
						var url = 'makercheckers/' + entityId + '?command=approve';						
						var onSuccessFunction = function(data) {
							$('#dialog-form').dialog("close");
							viewAudits(useType, auditSearchOptions);
						}
													
						popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, onSuccessFunction);
						e.preventDefault();
					});
				}

				var oTable = displayEnhancedListTable("auditstable")
	};
		
	executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}

function viewAuditEntry(auditId) {

	var url = 'audits/' + auditId;

	var successFunction = function(data, textStatus, jqXHR) {

		var dialogDiv = $("<div id='dialog-form'></div>");
		var obj = new Object();
		obj.crudRows = data;
		var html = $("#auditEntryTemplate").render(obj);
		dialogDiv.append(html);
		
		var closeButton = doI18N('dialog.button.close');
		var buttonsOpts = {};	
		buttonsOpts[closeButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N("view.audit.entry") + " - " + doI18N(data.actionName) + " " + doI18N(data.entityName), 
				width : custom.fitPopupWidth(),
				height : custom.fitPopupHeight(),
		  		modal: true,
		  		buttons: buttonsOpts,
	  			close: function() {
	  				$(this).remove();
				}
		  }).dialog('open');

	};
		
	executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}
//end of audit & makercheck functions


//utility functions

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


function initialiseAndShowLogon() {
	jQuery.support.cors = true;

	setInitialCulture();

	jsViewsRegisterHelpers();

	baseApiUrl = getBaseApiURL(window.location.href);

	showLogon("container");
	$( document ).tooltip();
}

function getBaseApiURL(docURL)
{
	var l = getLocation(docURL);
	
	var baseApiUrl = "";
	if (l.hostname == "localhost" || l.hostname == "" || l.hostname == null) {
		baseApiUrl = "https://demo.openmf.org/mifosng-provider/api/v1/";
	}
	else if (l.hostname == "demo.openmf.org") {
		baseApiUrl = "/mifosng-provider/api/v1/";
	}
	else if (l.hostname.toLowerCase().indexOf("openmf.org") >= 0) {
		baseApiUrl = "https://" + l.hostname + "/mifosng-provider/api/v1/";
	} else {
		baseApiUrl = "https://" + l.hostname + ":8443/mifosng-provider/api/v1/";
	}
	
	if (QueryParameters["baseApiUrl"]) {
		baseApiUrl = QueryParameters["baseApiUrl"];
	}
    
    return baseApiUrl; 
}

getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function setInitialCulture() {

	baseCulture = 'en';
	if (QueryParameters["baseCulture"]) baseCulture = QueryParameters["baseCulture"];
	switch(baseCulture)
	{
			case "en":
  				break;
			case "fr":
  				break;
			case "es":
  				break;
			case "pt":
  				break;
			case "zh":
  				break;
			default:
  				alert("The culture/language you specified (" + baseCulture + ") isn't available so will default to 'en' (English).");
				baseCulture = 'en';
	}
	setCulture(baseCulture);	
}

function setCultureReshowFirstPage(cultureVal) {
	setCulture(cultureVal);
	showMainContainer("container");
	custom.showFirstPage();
}


function setCulture(cultureVal) {
	currentCulture = cultureVal;

	Globalize.culture(currentCulture);
	
	$.datepicker.setDefaults( $.datepicker.regional[currentCulture]);

	var tenantTranslation = "messages-tenant-" + tenantIdentifier;
	jQuery.i18n.properties({
		name:['messages', 'messages-platform-validation', 'messages-savings', 'messages-groups', 'messages-fields', tenantTranslation], 
		path: 'resources/global-translations/',
		mode:'map',
		cache: true,
		language: currentCulture,
		callback: function() {
		}
	});

	$.timepicker.regional[currentCulture] = {
		timeOnlyTitle: doI18N('timeOnlyTitle'),
		timeText: doI18N('timeText'),
		hourText: doI18N('hourText'),
		minuteText: doI18N('minuteText'),
		secondText: doI18N('secondText'),
		millisecText: doI18N('millisecText'),
		timezoneText: doI18N('timezoneText'),
		currentText: doI18N('currentText'),
		closeText: doI18N('closeText'),
		amNames: ['AM', doI18N('amNames'),],
		pmNames: ['PM', doI18N('pmNames'),],
		isRTL: false
	};

	$.timepicker.setDefaults($.timepicker.regional[currentCulture]);
}


QueryParameters = (function()
{
    var result = {};
    if (window.location.search)
    {
        // split up the query string and store in an associative array
        var params = window.location.search.slice(1).split("&");
        for (var i = 0; i < params.length; i++)
        {
            var tmp = params[i].split("=");
            result[tmp[0]] = unescape(tmp[1]);
        }
    }
    return result;
}());


function showNotAvailableDialog(titleCode) {
		var dialogDiv = $("<div id='notavailable-dialog-form'></div>");
		
		dialogDiv.append("<p>" + doI18N('dialog.messages.functionality.not.available') + "</p>");
		
		var okButton = doI18N('dialog.button.ok');
		
		var buttonsOpts = {};
		buttonsOpts[okButton] = function() {$(this).dialog("close");};
		
		dialogDiv.dialog({
	  		title: doI18N(titleCode), 
	  		width: 300, 
	  		height: 200, 
	  		modal: true,
	  		buttons: buttonsOpts,
	  		close: function() {
	  			// if i dont do this, theres a problem with errors being appended to dialog view second time round
	  			$(this).remove();
			}
		 }).dialog('open');
}
	
function showJsonRecursive(jsonObj) {
    var html = "";
    if (typeof jsonObj === 'object') {
        if (jsonObj instanceof Array) {
            for (var j = 0; j < jsonObj.length; j++) {
                html += showJsonRecursive(jsonObj[j]);
            }
        } else {
            for (var i in jsonObj) {
                if ((i != "dateFormat") && (i != "locale"))
                {
                    html += '<tr><td width="100px"></td>';
                    html += "<td>";
                    html += "<b>" + doI18N(i) + ": </b>";
                    html += "</td>";
                    html += "<td>";
                    html += showJsonRecursive(jsonObj[i]);
                    html += "</td></tr>";
                }
            }
        }
        
    } else {
        html += jsonObj;
    }
    return html;
}

function showJson(commandAsJson) {

    var jsonObj = JSON.parse(commandAsJson);
    if (jsonObj.permissions) jsonObj = jsonObj.permissions;

    var html = "";

    html += showJsonRecursive(jsonObj);

    if (html > "") html = '<table width="100%">' + html + "</table><br><br>";
    
    return html;
}

$.fn.serializeObject = function(serializationOptions)
{
	var o = {};
	var a;
	if (serializationOptions !== null && serializationOptions !== undefined) {
		a = this.serializeArray(serializationOptions);
	} else {
		a = this.serializeArray({checkboxesAsBools: true});
	}
	
	var arrayName, propertyName, index;

	$.each(a, function() {
		
		if (this.name === 'notSelectedCurrencies' || this.name === 'notSelectedRoles' 
	    		|| this.name === 'notSelectedClients' || this.name === 'notSelectedCharges'
	    		|| this.name === 'notSelecteddebitTags' || this.name === 'notSelectedcreditTags'
	    		|| this.name === 'allowedProducts') {
			// do not serialize
		} else if (this.name.indexOf('[') !== -1) { //serialize as separate object
			arrayName = this.name.substring(0, this.name.indexOf("["));
			if (o[arrayName] === undefined){
				o[arrayName] = [];				
			}
			index = parseInt(this.name.substring(this.name.indexOf("[") + 1, this.name.indexOf("]")));
			if (index > 0){
				index -= 1;
			}
			if (o[arrayName][index] === undefined){
				o[arrayName][index] = {};
			}
			propertyName = this.name.substring(this.name.lastIndexOf("[") + 1, this.name.lastIndexOf("]"));
			o[arrayName][index][propertyName] = this.value || '';
		} else  {
		    if (o[this.name] !== undefined) {
		        if (!o[this.name].push) {
		            o[this.name] = [o[this.name]];
		        }
		        o[this.name].push(this.value || '');
		    } else {
		    	
		    	if (this.name === 'selectedItems' || this.name === 'notSelectedItems' || this.name === 'currencies'  
	        		|| this.name === 'roles' || this.name === 'clientMembers' || this.name === 'charges' || this.name === 'loans' || this.name === 'creditTags' || this.name === 'debitTags'
	        		|| this.name === 'restrictedProducts') {
		    		o[this.name] = new Array();
		    		o[this.name].push(this.value || '');
		    	} else {
		    		o[this.name] = this.value || '';	
		    	}
		    }
		}
	});
	
	//clean serialized arrays - remove nulls 
	$.each(o, function(key, value){
		if (value instanceof Array){
			o[key] = value.filter(function(e){return e}); 
		}
	})

	return o;
};

$.fn.serializeArray = function (options) {
    var o = $.extend({
        checkboxesAsBools: false
    }, options || {});

    var rselectTextarea = /select|textarea/i;
    var rinput = /text|hidden|password|search/i;

    return this.map(function () {
        return this.elements ? $.makeArray(this.elements) : this;
    })
    .filter(function () {
        return this.name && !this.disabled &&
            (this.checked
            || (o.checkboxesAsBools && this.type === 'checkbox')
            || rselectTextarea.test(this.nodeName)
            || rinput.test(this.type));
    })
        .map(function (i, elem) {
            var val = $(this).val();
            return val == null ?
            null :
            $.isArray(val) ?
            $.map(val, function (val, i) {
                return { name: elem.name, value: val };
            }) :
            {
                name: elem.name,
                value: (o.checkboxesAsBools && this.type === 'checkbox') ? 
                    (this.checked ? 'true' : 'false') :
                    val
            };
        }).get();
};

	
function displayListTable(tableDiv) {
	return  $("#" + tableDiv).dataTable(custom.jqueryDataTableLayout.basic());
}

function displayEnhancedListTable(tableDiv) {
	return  $("#" + tableDiv).dataTable(custom.jqueryDataTableLayout.enhanced());
}

function displayListTableWithExportOption(tableDiv) {
	return  $("#" + tableDiv).dataTable(custom.jqueryDataTableLayout.withExportOption());
}




function simpleOptionsHtml(htmlOptions) {

	//var htmlVar = '<div id="inputarea"></div><div id="schedulearea"></div>';
	var htmlVar = '<div>';
	htmlVar += '<span style="float: left">';
	htmlVar += htmlOptions;
	htmlVar += '</span>';
	htmlVar += '</div>';
	htmlVar += '<br><br><br>';
	htmlVar += '<div id="listplaceholder" ></div>';
	return htmlVar;
}

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
		  	var valErrors = jsonErrors.errors;
		  	var errorArray = new Array();
		  	var arrayIndex = 0;
		  	$.each(valErrors, function() {
		  	
		      // add error class to input in dialog
		  	  var fieldId = '#' + this.parameterName;
		  	  $("#dialog-form #entityform " + fieldId).addClass("ui-state-error");
		  	  
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
		  	
		  	var templateArray = new Array();
		  	var templateErrorObj = new Object();
		  	templateErrorObj.title = doI18N('error.msg.header');
		  	templateErrorObj.errors = errorArray;
		  	
		  	templateArray[0] = templateErrorObj;
		  	
		  	var formErrorsHtml = $(templateSelector).render(templateArray);
		  	
		  	$(placeholderDiv).append(formErrorsHtml);
		}
}

function jsViewsRegisterHelpers() {
	$.views.registerHelpers(custom.helperFunctions);
}
function postInterest(){
	var url = 'depositaccounts/postinterest';
	var width = 400; 
	var height = 225;
							
	popupConfirmationDialogAndPost(url, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClientListing);
}

function showILSavingAccount(loanId, product, loanAccountNo) {
	showSavingAccount(loanId, product, loanAccountNo, 'clientdatatabs');	
}

function showGroupSavingAccount(loanId, product, loanAccountNo) {
	if (isCenterSaving) {
		showSavingAccount(loanId, product, loanAccountNo, 'centerdatatabs');
	} else{
		showSavingAccount(loanId, product, loanAccountNo, 'groupdatatabs');
	}
}


function showSavingAccount(accountId, accountNo, productName, parenttab) {
	
	var newSavingTabId='saving'+accountId+'tab';
	
	//show existing tab if this Id is already present
	if(tabExists(parenttab, newSavingTabId)){
		var index = $('#'+ parenttab +' a[href="#'+ newSavingTabId +'"]').parent().index(); 
		$('#'+ parenttab).tabs("option", "active", index);
	}
	//else create new tab and set identifier properties
	else{
		var title = productName + ": #" + accountNo;			    
		// $newtabs.tabs( "add", "unknown.html", title); Deprecated
		$newtabs.addTab(newSavingTabId, title);
		$newtabs.tabs( "option", "active", $('#'+ parenttab +' > ul > li').length-1);
		loadSavingAccount(accountId,parenttab);
	}
}

function genSaveSuccessFunctionReloadLoan(loanId, parenttab) {
		return 'var saveSuccessFunctionReloadLoan = function(data, textStatus, jqXHR) { ' + 
						  	' $("#dialog-form").dialog("close");' +
						  	' var contentTab = ' + parenttab + ';' +
							' loadLoan(' + loanId + ', "' + parenttab + '");' +
							' clientDirty = true;' +
							' groupDirty = true;' +
						'};';
	}

function genSaveSuccessFunctionReloadSaving(savingAccountId,parenttab) {

	return 'var saveSuccessFunctionReloadSaving = function(data, textStatus, jqXHR) { ' +
	' $("#dialog-form").dialog("close");' +
	' var contentTab = ' + parenttab + ';' +
	' loadSavingAccount(' + savingAccountId + ', "' + parenttab + '");' +
	' clientDirty = true;' +
	' groupDirty = true;' +
	' centerDirty = true;' +
	'};';
}

function loadSavingAccount(accountId,parenttab) {

	var clientId = null;
	var groupId = null;

	var accountUrl = 'savingsaccounts/' + accountId+ "?associations=all";

	var errorFunction = function(jqXHR, status, errorThrown, index, anchor) {
    	handleXhrError(jqXHR, status, errorThrown, "#formErrorsTemplate", "#formerrors");
	};
	
	var successFunction = function(data, status, xhr) {
		
		clientId = data.clientId;
		groupId = data.groupId;
		
		var currentTabIndex = $newtabs.tabs('option', 'active');
    	var currentTabAnchor = $newtabs.data('ui-tabs').anchors[currentTabIndex];
    	
    	var tableHtml = $("#savingAccountDataTabTemplate").render(data);
    	
		var currentTab = $("#"+parenttab).children(".ui-tabs-panel").not('[aria-hidden="true"]');
		currentTab.html(tableHtml);

		var curTabID = currentTab.prop("id");
		
		var offsetToSubmittedDate = 0;
		var offsetToApprovalDate = 0;
		var offsetToExpectedDisbursementDate = 0;
    	var offsetToDisbursalDate = 0;
    	var maxOffset = 0; // today
		
		var dateParts = data.timeline.submittedOnDate;
		if (undefined != dateParts) {
			var year = dateParts[0];
			var month = parseInt(dateParts[1]) - 1; // month is zero indexed
			var day = dateParts[2];

			var today = new Date();
			var offsetDate = new Date();
			offsetDate.setFullYear(year, month, day);

			offsetToSubmittedDate = Date.daysBetween(today, offsetDate);
		}
		
		dateParts = data.timeline.approvedOnDate;
		if (undefined != dateParts) {
			var year = dateParts[0];
			var month = parseInt(dateParts[1]) - 1; // month is zero indexed
			var day = dateParts[2];

			var today = new Date();
			var offsetDate = new Date();
			offsetDate.setFullYear(year, month, day);

			offsetToApprovalDate = Date.daysBetween(today, offsetDate);
		}

		var $savingtabs = $("#savingtabs" + accountId).tabs({
			create: function(event, ui) {
				var curTab = $('#savingtabs .ui-tabs-panel[aria-hidden="false"]');
      			var curTabID = curTab.prop("id")
			}
		});
		
		$('.savingsaccountmodify'+accountId).unbind('click');	
     	$('.savingsaccountmodify'+accountId).button({icons: {primary: "ui-icon-document"}}).click(function(e) {
			launchModifySavingsAccountDialog(accountId);

			e.preventDefault();
		});
		$('button.savingsaccountmodify span').text(doI18N('button.application.modify'));
		
		$('#editsavingsaccountnobtn'+accountId).button({icons: {primary: "ui-icon-pencil"}}).click(function(e){

			var putUrl = 'savingsaccounts/' + accountId;
			var getUrl = 'savingsaccounts/' + accountId;

			var templateSelector = "#editAccountNoFormTemplate";
			var width = 425; 
			var height = 225;

			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithFormView(getUrl, putUrl, 'PUT', "dialog.title.edit.accountno", templateSelector, width,  height, saveSuccessFunctionReloadSaving);
		    e.preventDefault();
		});
		$('button.editaccountnobtn span').text(doI18N('link.action.edit'));
		
		$('.savingsaccountdelete'+accountId).button({icons: {primary: "ui-icon-trash"}}).click(function(e) {
			var url = 'savingsaccounts/' + accountId;
			var width = 400; 
			var height = 225;
									
			popupConfirmationDialogAndPost(url, 'DELETE', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadClient);
		    e.preventDefault();
		});
		$('button.savingsaccountdelete span').text(doI18N('button.delete'));
     		
     	$('.savingsaccountreject'+accountId).button({icons: {primary: "ui-icon-circle-close"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '?command=reject';
			var templateSelector = "#loanApplicationRejectionTemplate";
			var width = 500; 
			var height = 350;
			var defaultOffset = offsetToSubmittedDate;

			popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.reject.savingsaccount', templateSelector, width, height, saveSuccessFunctionReloadClient, offsetToSubmittedDate, defaultOffset, maxOffset);
		    e.preventDefault();
		});
     	$('button.savingsaccountreject span').text(doI18N('button.application.reject'));
				
		$('.savingsaccountwithdrawnbyapplicant'+accountId).button({icons: {primary: "ui-icon-circle-close"}}).click(function(e) {
				var postUrl = 'savingsaccounts/' + accountId + '?command=withdrawnByApplicant';
				var templateSelector = "#loanApplicationWithdrawnTemplate";
				var width = 500; 
				var height = 350;
				var defaultOffset = offsetToSubmittedDate;
				popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.withdrawnbyapplicant.savingsaccount', templateSelector, width, height, saveSuccessFunctionReloadClient,  offsetToSubmittedDate, defaultOffset, maxOffset)
			    e.preventDefault();
		});
		$('button.savingsaccountwithdrawnbyapplicant span').text(doI18N('button.application.withdrawnByApplicant'));
		
		$('.savingsaccountapprove'+accountId).button({icons: {primary: "ui-icon-circle-check"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '?command=approve';
			var templateSelector = "#loanApplicationApprovalTemplate";
			var width = 500; 
			var height = 350;
			var defaultOffset = offsetToSubmittedDate;
			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.approve.savingsaccount', templateSelector, width, height, saveSuccessFunctionReloadSaving,  offsetToSubmittedDate, defaultOffset, maxOffset)
		    e.preventDefault();
		});
		$('button.savingsaccountapprove span').text(doI18N('button.application.approve'));
			
		$('.savingsaccountundoapprove'+accountId).button({icons: {primary: "ui-icon-arrowreturnthick-1-w"}}).click(function(e) {
				var postUrl = 'savingsaccounts/' + accountId + '?command=undoapproval';
				var templateSelector = "#undoStateTransitionLoanFormTemplate";
				var width = 500; 
				var height = 350;
				var defaultOffset = offsetToSubmittedDate;
				eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
				popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.undoapproval.savingsaccount', templateSelector, width, height, saveSuccessFunctionReloadSaving, offsetToSubmittedDate, defaultOffset, maxOffset)
			    e.preventDefault();
		});
		$('button.undoapproveloan span').text(doI18N('button.application.undoApproval'));
		
		$('.savingsaccountactivate'+accountId).button({icons: {primary: "ui-icon-circle-check"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '?command=activate';
			var templateSelector = "#savingsAccountActivationTemplate";
			var width = 400; 
			var height = 225;
			
			var defaultOffset = offsetToApprovalDate;
			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.title.activation', templateSelector, width, height, saveSuccessFunctionReloadSaving, offsetToApprovalDate, defaultOffset, maxOffset);
		    e.preventDefault();
		});
		$('button.savingsaccountactivate span').text(doI18N('button.activate'));

		$('.savingsaccountclose'+accountId).button({icons: {primary: "ui-icon-circle-close"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '?command=close';
			var templateSelector = "#savingsAccountCloseTemplate";
			var width = 500; 
			var height = 350;
			
			var defaultOffset = offsetToApprovalDate;
			popupDialogWithPostOnlyFormView(postUrl, 'POST', 'dialog.button.close', templateSelector, width, height, saveSuccessFunctionReloadClient, offsetToApprovalDate, defaultOffset, maxOffset);
		    e.preventDefault();
		});
		$('button.savingsaccountclose span').text(doI18N('CLOSE'));

		
		$('.savingsaccountdeposit'+accountId).button({icons: {primary: "ui-icon-arrowthick-1-e"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '/transactions?command=deposit';
			var getUrl = 'savingsaccounts/' + accountId + '/transactions/template?command=deposit';
			var templateSelector = "#savingsAccountTransactionFormTemplate";
			var width = 400; 
			var height = 280;

			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.deposit', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.savingsaccountdeposit span').text(doI18N('button.deposit'));
		
		$('.savingsaccountwithdrawal'+accountId).button({icons: {primary: "ui-icon-arrowthick-1-w"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '/transactions?command=withdrawal';
			var getUrl = 'savingsaccounts/' + accountId + '/transactions/template?command=withdrawal';
			var templateSelector = "#savingsAccountTransactionFormTemplate";
			var width = 400; 
			var height = 280;

			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.withdrawal', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.savingsaccountwithdrawal span').text(doI18N('button.withdrawal'));
		
		$('.savingsaccountinterestcalc'+accountId).button({icons: {primary: "ui-icon-calculator"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '?command=calculateInterest';
			var width = 400; 
			var height = 280;
			
			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupConfirmationDialogAndPost(postUrl, 'POST', 'dialog.title.calculateInterest', width, height, 0, saveSuccessFunctionReloadSaving);
			e.preventDefault();
		});
		$('button.savingsaccountinterestcalc span').text(doI18N('button.calculateInterest'));
		
		$('.savingsaccountinterestpost'+accountId).button({icons: {primary: "ui-icon-clock"}}).click(function(e) {
			var postUrl = 'savingsaccounts/' + accountId + '?command=postInterest';
			var width = 400; 
			var height = 280;
			
			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupConfirmationDialogAndPost(postUrl, 'POST', 'dialog.title.postInterest', width, height, 0, saveSuccessFunctionReloadSaving);
			e.preventDefault();
		});
		$('button.savingsaccountinterestpost span').text(doI18N('button.postInterest'));
		
		$('.savingsaccountapplyannualfee'+accountId).button({icons: {primary: "ui-icon-clock"}}).click(function(e) {
			
			var postUrl = 'savingsaccounts/' + accountId + '?command=applyAnnualFees';
			var getUrl = 'savingsaccounts/' + accountId + '/?template=true';
			var templateSelector = "#savingsAccountApplyAnnualFeeFormTemplate";
			var width = 400; 
			var height = 280;

			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithFormView(getUrl, postUrl, 'POST', 'dialog.title.applyAnnualFee', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();
		});
		$('button.savingsaccountapplyannualfee span').text(doI18N('button.applyAnuualFee'));
		
		$('.savingsaccountfundstransfer'+accountId).button({icons: {primary: "ui-icon-transferthick-e-w"}}).click(function(e) {
			launchAccountTransferDialog(accountId, 2 ,parenttab);
			e.preventDefault();
		});
		$('button.savingsaccountfundstransfer span').text(doI18N('button.transferFunds'));
		
		$('.undotransaction').button({icons : {primary : "ui-icon-trash"},text : false}).click(function(e) {
			
			var linkId = this.id;
			var transactionAndAccountId = linkId.replace("undotransactionbtn", "");
			var ids = transactionAndAccountId.split("_");
			var transactionId = ids[0];
			var savingsAccountId = ids[1];
			var postURL = 'savingsaccounts/' + savingsAccountId + '/transactions/' + transactionId + '?command=undo';
			 
            var templateSelector = "#transactionLoanFormTemplate";
            var width = 500;
            var height = 250;
            
            var searializedArray = {};
            searializedArray["dateFormat"] = custom.helperFunctions.currentDateFormat();
            searializedArray["locale"] = custom.helperFunctions.currentLocale();
            searializedArray["transactionDate"] = $.datepicker.formatDate(custom.datePickerDateFormat, new Date());
            searializedArray["transactionAmount"] = 0;
            var jsonString = JSON.stringify(searializedArray);
        
            eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
            popupConfirmationDialogAndPost(postURL, 'POST', 'dialog.title.confirmation.required', width, height, 0, saveSuccessFunctionReloadSaving, jsonString);
            e.preventDefault();
        }); 

		$('.adjusttransaction').button({
                icons : {
                    primary : "ui-icon-pencil"
                },
                text : false
            }).click(function(e) {
				var linkId = this.id;
				var transactionAndAccountId = linkId.replace("adjusttransaction", "");
				var ids = transactionAndAccountId.split("_");
				var transactionId = ids[0];
				var savingsAccountId = ids[1];
				var postURL = 'savingsaccounts/' + savingsAccountId + '/transactions/' + transactionId + '?command=modify';
				var getUrl = 'savingsaccounts/' + savingsAccountId + '/transactions/' + transactionId + '?template=true';
				var templateSelector = "#savingsAccountTransactionFormTemplate";
				var width = 400; 
				var height = 280;
				var defaultOffset = offsetToApprovalDate;

			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			popupDialogWithFormView(getUrl, postURL, 'POST', 'dialog.title.adjust', templateSelector, width, height, saveSuccessFunctionReloadSaving);
		    
			e.preventDefault();		});
		
		$('.showtransferdetails').button({icons : {primary : "ui-icon-info"},text : false}).click(function(e) {
			
			var linkId = this.id;
			var transferId = linkId.replace("showtransferdetailsbtn", "");
			
			viewTransferDetails(transferId);
            e.preventDefault();
        }); 
		
		/*
		 * This works but not showing savings datatables by default yet.  When ready just uncomment
		 * custom.showRelatedDataTableInfo($savingtabs, "m_savings_account", accountId); 
		 */
	}
		
	executeAjaxRequest(accountUrl, 'GET', "", successFunction, errorFunction);	
}

function launchAccountTransferDialog(accountId, accountType, parenttab) {

	var postUrl = 'accounttransfers/';
	var getUrl = 'accounttransfers/template?fromAccountId=' + accountId + '&fromAccountType='+accountType;
	var templateSelector = "#accounttransfersFormTemplate";
	var width = 800; 
	var height = 300;

	var onSaveFunction = function() {
		var serializationOptions = {};
		serializationOptions["checkboxesAsBools"] = true;

		var serializedArray = {};
		serializedArray = $('#entityform').serializeObject(serializationOptions);

		var newFormData = JSON.stringify(serializedArray);
		if(accountType == 1){
			eval(genSaveSuccessFunctionReloadLoan(accountId,parenttab));
			executeAjaxRequest(postUrl, 'POST', newFormData, saveSuccessFunctionReloadLoan, formErrorFunction);
		}else{
			eval(genSaveSuccessFunctionReloadSaving(accountId,parenttab));
			executeAjaxRequest(postUrl, 'POST', newFormData, saveSuccessFunctionReloadSaving, formErrorFunction);
		}
		
	};

	var openDialogFunction = function (event, ui) {

		var renderFormOnSuccess = function(data, textStatus, jqXHR) {
			var dialogFormSelector = "#dialog-form";
			rerenderAccountTransferDialogForm(dialogFormSelector, templateSelector, data);
		}

		executeAjaxRequest(getUrl, "GET", "", renderFormOnSuccess, formErrorFunction);
	}

	// open dialog
	var titleCode;
	if(accountType == 1){
		titleCode ="dialog.title.loan.transferFunds";
	}else{
		titleCode = 'dialog.title.transferFunds';
	}
	openAccountTransferDialog(titleCode, width, height, onSaveFunction, openDialogFunction);
}

function rerenderAccountTransferDialogForm(dialogFormSelector, templateSelector, data) {
	var formHtml = $(templateSelector).render(data);
	$(dialogFormSelector).html(formHtml);

	var renderFormOnSuccess = function(data, textStatus, jqXHR) {
		var dialogFormSelector = "#dialog-form";
		rerenderAccountTransferDialogForm(dialogFormSelector, templateSelector, data);
	}

	$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});

	$("#toOfficeId").change(function() {
		var toOfficeId = $("#toOfficeId").val();
		var getUrl = 'accounttransfers/template?fromAccountId=' + data.fromAccount.id + '&fromAccountType='+ data.fromAccountType.id+ '&toOfficeId=' + toOfficeId;
		executeAjaxRequest(getUrl, "GET", "", renderFormOnSuccess, formErrorFunction);
	});

	$("#toClientId").change(function() {
		var toOfficeId = $("#toOfficeId").val();
		var toClientId = $("#toClientId").val();
		var getUrl = 'accounttransfers/template?fromAccountId=' + data.fromAccount.id + '&fromAccountType='+ data.fromAccountType.id+ '&toClientId=' + toClientId + '&toOfficeId=' + toOfficeId;
		executeAjaxRequest(getUrl, "GET", "", renderFormOnSuccess, formErrorFunction);
	});

	$("#toAccountType").change(function() {
		var toOfficeId = $("#toOfficeId").val();
		var toClientId = $("#toClientId").val();
		var toAccountType = $("#toAccountType").val();
		var getUrl = 'accounttransfers/template?fromAccountId=' + data.fromAccount.id + '&fromAccountType='+ data.fromAccountType.id+ '&toClientId=' + toClientId + '&toOfficeId=' + toOfficeId + '&toAccountType=' + toAccountType;
		executeAjaxRequest(getUrl, "GET", "", renderFormOnSuccess, formErrorFunction);
	});

	$("#toAccountId").change(function() {
		var toOfficeId = $("#toOfficeId").val();
		var toClientId = $("#toClientId").val();
		var toAccountType = $("#toAccountType").val();
		var toAccountId = $("#toAccountId").val();
		var getUrl = 'accounttransfers/template?fromAccountId=' + data.fromAccount.id + '&fromAccountType='+ data.fromAccountType.id+ '&toAccountId=' + toAccountId + '&toAccountType=' + toAccountType;
		executeAjaxRequest(getUrl, "GET", "", renderFormOnSuccess, formErrorFunction);
	});
}

function openAccountTransferDialog(titleCode, width, height, onSaveFunction, loadFormViewFunction)  {

	var dialogDiv = $("<div id='dialog-form'></div>");
	var saveButton = doI18N('dialog.button.save');
	var cancelButton = doI18N('dialog.button.cancel');
	
	var buttonsOpts = {};
	buttonsOpts[saveButton] = onSaveFunction;
	buttonsOpts[cancelButton] = function() {$(this).dialog( "close" );};
	
	dialogDiv.dialog({
		title: doI18N(titleCode), 
		width: width, 
		height: height, 
		modal: true,
		buttons: buttonsOpts,
		close: function() {
			// if i dont do this, theres a problem with errors being appended to dialog view second time round
			$(this).remove();
		},
		open: loadFormViewFunction
	}).dialog('open');
}

function viewTransferDetails(transferId) {

	var url = 'accounttransfers/' + transferId;

	var successFunction = function(data, textStatus, jqXHR) {

		var dialogDiv = $("<div id='dialog-form'></div>");
		var html = $("#accounttransfersDetailsTemplate").render(data);
		dialogDiv.append(html);
		
		var closeButton = doI18N('dialog.button.close');
		var buttonsOpts = {};	
		buttonsOpts[closeButton] = function() {$(this).dialog( "close" );};
		
		dialogDiv.dialog({
		  		title: doI18N("dialog.title.transferdetails"), 
				width : custom.fitPopupWidth(),
				height : custom.fitPopupHeight(),
		  		modal: true,
		  		buttons: buttonsOpts,
	  			close: function() {
	  				$(this).remove();
				}
		  }).dialog('open');

	};
		
	executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}

function checkSubmit(e, logonDivName, username, password)
{
	 if(e && e.keyCode == 13)
	 {
		 setBasicAuthKey(logonDivName, username, password);
	 }
}
  
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}


function refreshCalendarWidget(resourceId, resource, calendarContent) {
                    
    eval(genRefreshCalendarWidgetSuccessVar(resourceId, resource, calendarContent));
    if (resource == 'centers') {
    	executeAjaxRequest(resource + '/' + resourceId + '/calendars', 'GET', "", successFunction, formErrorFunction);
    }else{
    	executeAjaxRequest(resource + '/' + resourceId + '/calendars?associations=parentCalendars', 'GET', "", successFunction, formErrorFunction);
    }
    
}

function genRefreshCalendarWidgetSuccessVar(resourceId, resource, calendarContent) {

return 'var successFunction = function(data, textStatus, jqXHR) {   ' +
          ' var calendar = new Object();' + 
          ' calendar.crudRows = data;' +
          ' var tmp = "' + resource.toUpperCase() + '";' + 
          ' calendar.resource = tmp;' +
          ' var tableHtml = $("#calendarWidgetFormTemplate").render(calendar);' +
          'if(calendar.crudRows.length > 0){var addCalbtn = $(".addcalendarbtn"); if(addCalbtn != undefined){addCalbtn.remove();}}' +
          ' $("#' + calendarContent + '").html(tableHtml);' +
          ' $(".editcalendar").click(function(e) { ' +
                ' var linkId = this.id;' +
                ' var resourceName = "' + resource + '";' +
                ' var resourceId = ' + resourceId + ';' +
                ' var entityType = $(this).prop("entityType");' +
                ' var entityId = $(this).prop("entityId");' +
                ' if (entityType) {' +
                	'resourceName = entityType.toLowerCase();' +
                	' resourceId = entityId;' +
                ' }' + 
                ' var contentDiv = ' + calendarContent + ';' +
                ' var calendarId = linkId.replace("editcalendarlink", "");' +
                ' editCalendar(resourceId, resourceName,"' + calendarContent + '",calendarId);' +
                //' popupDialogWithFormView(getAndPutUrl, getAndPutUrl, "PUT", "dialog.title.edit.note", templateSelector, width, height,  saveSuccessFunction);' +
                ' e.preventDefault();' +
          ' });' +
          //' var recurringdata = "recurringdata"; ' +
            ' $(".recurringdata").hide();' +
            ' $(".recurshow").click(function(e){' +
            ' var linkId = this.id;' +
            ' var calendarId = linkId.replace("recurshow", "");' +
            ' var recdataDivId = "recurringdata" + calendarId;' +
            ' var recdataDiv = $("#" + recdataDivId);' +
            ' $("#showrecurlink").hide();' + 
            ' recdataDiv.show();' +
            ' e.preventDefault();' + 
            ' }); ' +
    	
            ' $(".recurhide").click(function(e){' +
            ' var linkId = this.id;' +
            ' var calendarId = linkId.replace("recurhide", "");' +
            ' var recdataDivId = "recurringdata" + calendarId;' +
            ' var recdataDiv = $("#" + recdataDivId);' +
            ' recdataDiv.hide();' +
            ' $("#showrecurlink").show();' + 
            ' e.preventDefault();' + 
            ' });' +
      ' };'
}    

function addCalendar(resourceId, resource, contentDiv){
    var postUrl = resource + "/" + resourceId + "/calendars";
    getCalendar(resourceId, resource, contentDiv, 'template', 'POST', postUrl);
}

function editCalendar(resourceId, resource, contentDiv, calendarId){
    var action = calendarId + '?template=true';
    var putUrl = resource + "/" + resourceId + "/calendars/" + calendarId;
    getCalendar(resourceId, resource, contentDiv, action, 'PUT', putUrl);
}

function getCalendar(resourceId, resource, contentDiv, action, submitType, postPutUrl){

    var getUrl = resource + "/" + resourceId + "/calendars/" + action;
        
    var dialogTitle = 'dialog.title.add.calendar';
    var templateSelector = "#calendarFormTemplate";
    var width = 700;
    var height = 580;
        
    var successFunction = function(data, textStatus, jqXHR) {
        
        var saveSuccessFunction = function(data, textStatus, jqXHR) {
            $("#dialog-form").dialog("close");
            refreshCalendarWidget(resourceId, resource, contentDiv);
        }
        
        popupDialogWithFormViewData(data, postPutUrl, submitType, dialogTitle, templateSelector, width, height, saveSuccessFunction);

        if(!(data.id === undefined)){
        	$( '#startDate' ).datepicker( "destroy" );
        	//should not allow to change start date to a past date.
        	$('#startDate').datepicker({minDate: 0, constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
        	$('#startDate').val(custom.helperFunctions.globalDate(data.startDate));

        	//do not allow to edit frequency and repeats every

        	$('#repeats').attr("disabled", true);
        	$('#repeatsEvery').attr("disabled", true);

        }

        var repeats =  $('select.repeats');
        var repeatsEvery = $('select.repeatsEvery');
        
        if(data.repeating === true){
            $("#repeatingdetails").show();
        }else{
            $("#repeatingdetails").hide();
        }
        
        
        $('input:checkbox[name=repeating]').change(function(){
            var repeatdetails = $('#repeatingdetails');
            var checked = this.checked ? repeatdetails.show(): repeatdetails.hide();
            //collection meeting never ends
            if($('#meetingTypeId').val() == "1"){
            	$('.endsafter').hide();
		    	$('.endson').hide();
            }else{
            	$('.endsafter').show();
		    	$('.endson').show();
            }
            
        });
        
        var repeatsOptions = {
            "Daily":"day(s)",
            "Weekly":"week(s)",
            "Monthly":"month(s)",
            "Yearly":"year(s)"
        }
                            
        //Load Repeats options
        repeats.empty().append(function() {
            var output = '';
            $.each(repeatsOptions, function(key, value) {
                output += '<option value="' + key + '">' + key + '</option>';
            });
            return output;
        });

        var repeatsEveryLimit=3;
		repeatsEvery.empty().append(function() {
			var output = '';
			for(i=1; i<=repeatsEveryLimit; i++){
				output += '<option value="' + i + '">' + i + '</option>';
			}
			return output;
		});
        
        repeats.change(function() {
            var textOpt = repeatsOptions[repeats.val()];
            $('.repeatsOnText').html(textOpt);
            if(repeats.val() == "Weekly"){
                $('#weeklyoptions').show();    
            }else{
                $('#weeklyoptions').hide();
            }
			if(repeats.val() == "Monthly"){
				repeatsEveryLimit = 11;
			}else{
				repeatsEveryLimit = 3;
			}
			repeatsEvery.empty().append(function() {
				var output = '';
				for(i=1; i<=repeatsEveryLimit; i++){
					output += '<option value="' + i + '">' + i + '</option>';
				}
				return output;
			});
        });
    	
        $('#meetingTypeId').change(function() {
            var meetingTypeId = $(this).val();
            if(meetingTypeId == "1"){
        		$('.location').hide();//Not required for collection meeting
		        $('.reminders').hide();//Not required for collection meeting
		        $('.duration').hide();//Not required for collection meeting
		        $('input:checkbox[name=repeating]').prop('checked', true);
		        $('input:checkbox[name=repeating]').trigger('change');
		        
            }else{
            	$('.location').show();
	        	$('.reminders').show();
    		    $('.duration').show();
    		    $('input:checkbox[name=repeating]').prop('checked', false);
		        $('input:checkbox[name=repeating]').trigger('change');
            }
        });

        $( "input:radio" ).on( "click", function() {
            var checkedValue = $("input:checked").val();
            switch (checkedValue) {
                case "endsnever":
                    $('.endsafter').val('').prop('readonly', true);                  
                break;
                case "endsafter":
                    $('.endsafter').prop('readonly', false);
                break;
                case "endondate":
                    $('.endsafter').val('').prop('readonly', true);
                break;
            }
            
        });
        
        $('#weeklyoptions').hide();
        
        $('input:checkbox[name=repeating]').prop('checked', data.repeating);
        
        if(data.recurrence){
            var freqoptions = {
                'DAILY':'Daily',
                'WEEKLY':'Weekly',
                'MONTHLY':'Monthly',
                'YEARLY':'Yearly'
            }
            
            matches = /FREQ=([^;]+);?/.exec(data.recurrence);
            if (matches) {
                var freq = matches[1];
                var repeatOption = freqoptions[freq];
                $('#repeats').val(repeatOption);
                
                //If recurring weekly, set week day
                if(freq === 'WEEKLY'){
                    matches = /BYDAY=([^;]+);?/.exec(data.recurrence);
                    if (matches) {
                        var byday = matches[1]; 
                        $('#weeklyoptions').show();
                        
                        $.each($("input[name='repeatson[]']"), function() {
                          if($(this).val() === byday){
                              $(this).prop('checked', true);
                          }
                        }); 
                    }
                }
            }
            
            matches = /INTERVAL=([0-9]+);?/.exec(data.recurrence);
            if (matches) {
                interval = matches[1];
            } else {
                interval = '1';
            }
            $('#repeatsEvery').val(interval);
            
            matches = /COUNT=([0-9]+);?/.exec(data.recurrence);
            if (matches) {
                count = matches[1];
                $('#endsafterrd').prop('checked',true);
                $('endsafter').val(count);    
            }else{
                $('#endsnever').prop('checked',true);
            }
            
            if(data.endDate){
                $('#endson').prop('checked',true);
            }
                
        }

                //hide non-required fields, enable them based on selected meeting type

        $('.location').hide();
        $('.reminders').hide();
        $('.duration').hide();

        $('#meetingTypeId').val(data.type.id);
        $('#meetingTypeId').trigger('change');
        if(data.remindBy){
        	$('#remindById').val(data.remindBy.id);	
        }
		
		$('.calendarhide').hide();        
                                       
    }

    executeAjaxRequest(getUrl, "GET", "", successFunction, formErrorFunction);

}
/*
function convertToRfc5545(){
    // RRULE TEMPLATES
    
    var rruletemplate = {
        "Daily":"FREQ=DAILY",
        "Weekly":"FREQ=WEEKLY",
        "Monthly":"FREQ=MONTHLY",
        "Yearly": "FREQ=YEARLY"
    }

    var field, freq, interval, rrule, occurrences, date;

    //Get Frequency
    freq = $("#repeats").val();
    rrule = rruletemplate[freq];
    interval = $('#repeatsEvery').val();
    if (interval !== '1') {
        rrule += ';INTERVAL=' + interval;
    }
    
    if(freq == "Weekly"){
        //Get weekly details
        var values = new Array();
        $.each($("input[name='repeatson[]']:checked"), function() {
          values.push($(this).val());
        });
        
        if (values) {
            rrule += ';BYDAY=' + values.toString();
        }
    }
    
    //Ends on
    var endType = $('input[name=endsonrd]:checked').val();
    
    switch (endType) {

    case 'endsafter':
        occurrences = $('input[name=endsafter]').val();
        rrule += ';COUNT=' + occurrences;
        break;
    case 'endondate':
        field = $('input[name=endondate]');
        date = $.datepicker.formatDate('yymmdd', $( "input[name=endondate]" ).datepicker( "getDate" ));
        rrule += ';UNTIL=' + date + 'T000000';
        break;
    }
        
    return rrule;
}*/

function loadAvailableCalendars(allAttachedCalendars, meetingCalendar, loanId, syncDisbursementWithMeeting){
    var calendars = new Object();
    calendars.crudRows = allAttachedCalendars;
    var tableHtml = $('#meetingCalendarTemplate').render(calendars);
    $('#meetingCalendarPlaceholder').html(tableHtml);

    $('#syncRepaymentsWithMeeting').change(function(){
		if((!$(this).is(':checked')) && ($('#syncDisbursementWithMeeting').is(':checked'))){
	    	$('input:checkbox[id=syncDisbursementWithMeeting]').prop('checked', false);
	    	var msgHtml = $("#msgLoanSyncCheckbox").render();
	    	$("#uncheckSyncRepayment").html(msgHtml).show().delay(4000).fadeOut(300);
    	}
    });

    $('#syncDisbursementWithMeeting').change(function(){
		if($(this).is(':checked') && !$('#syncRepaymentsWithMeeting').is(':checked')){
			$('input:checkbox[id=syncRepaymentsWithMeeting]').prop('checked', true);
			var msgHtml = $("#msgLoanSyncCheckbox").render();
			$("#uncheckSyncRepayment").html(msgHtml).show().delay(4000).fadeOut(300);
    	}
    });
    
    if(!meetingCalendar && !loanId){ 
		//If meeting is null and loanId is null then syncRepayment should be checked
    	//New loan application
		$('input:checkbox[id=syncRepaymentsWithMeeting]').prop('checked', true);
		$('input:checkbox[id=syncDisbursementWithMeeting]').prop('checked', true);
	}else{ //Edit loan application
		if(syncDisbursementWithMeeting) {
			$('input:checkbox[id=syncDisbursementWithMeeting]').prop('checked', true);
		}
		if(meetingCalendar){
			$('input:checkbox[id=syncRepaymentsWithMeeting]').prop('checked', true);
		}

	}

    var getAttachedCalendarData = function(){
    	var attachedcalendars = $.grep(calendars.crudRows, function(n, i) {
            return n.id;
        });
        if (attachedcalendars.length > 0) {
            var selectedCalendar = attachedcalendars[0];//get calendar from array
            return selectedCalendar;
        }
    }

    var firstRecurringDate = function(){
    	var attachedCalendar = getAttachedCalendarData();
    	var recurringDates = attachedCalendar.nextTenRecurringDates; 
    	return recurringDates[0];
    }

    var secondRecurringDate = function(){
    	var attachedCalendar = getAttachedCalendarData();
    	var recurringDates = attachedCalendar.nextTenRecurringDates; 
    	return recurringDates[1];	
    }

    var availableDate = function(date) {
  
        var recurringDatesArr = [];
        var attachedCalendarData = getAttachedCalendarData();
        var recurringDates = attachedCalendarData.recurringDates;
        $.each(recurringDates, function(n,i){
            var newdate = i[0] + "-" + ("0"+(i[1])).slice(-2) + "-" + ("0"+(i[2])).slice(-2);
            recurringDatesArr[n] = newdate;
        });
        
        var ymd = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);

        if ($.inArray(ymd, recurringDatesArr) < 0 ) {
            return [false, "","Not a meeting date"];
        } else {
            return [true,"","Available meeting date"];
        }
    }

    $('input:checkbox[id=syncRepaymentsWithMeeting]').change(function(){	
        var checked = this.checked;
        $( '#repaymentsStartingFromDate' ).datepicker( "destroy" );
        if(checked){
		    $('#repaymentsStartingFromDate').datepicker({ dateFormat: custom.datePickerDateFormat, beforeShowDay: availableDate});
        }else{
		    $('#repaymentsStartingFromDate').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
        }
    });

	$('input:checkbox[id=syncDisbursementWithMeeting]').change(function(){	
        var checked = this.checked;
		$( '#expectedDisbursementDate' ).datepicker( "destroy" );
        if(checked){
    		if(!meetingCalendar) {
    			var firstMeetingDate = firstRecurringDate();
				$('#expectedDisbursementDate' ).val(custom.helperFunctions.globalDate(firstMeetingDate));
	        }
		    $('#expectedDisbursementDate').datepicker({ dateFormat: custom.datePickerDateFormat, beforeShowDay: availableDate});
        }else{
		    $('#expectedDisbursementDate').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
        }
    });

	$('#syncRepaymentsWithMeeting').trigger('change');
	$('#syncDisbursementWithMeeting').trigger('change');
	
}
function loadAttachedCalendarToLoan(loanId){
    var successFunction = function(data, textStatus, jqXHR) {
        var calendars = new Object();
        calendars.crudRows = data;
        if(calendars.crudRows.length > 0){
            var calendar = calendars.crudRows[0];
            $("#calendarId").val(calendar.id);
        }            
    }        
    executeAjaxRequest('loans/' + loanId + '/calendars?parameters=id,entityId,entityType', 'GET', "", successFunction, formErrorFunction);
}

function showCollectionSheet() {

    setCollectionSheetContent("content");
    
    $("#tabs").tabs({
        beforeActivate: function(event, ui) {
        },
        load: function(event, ui) {
        },
        create: function(event, ui) {

			var tableHtml = $("#collectionSheetTabTemplate").render();
			$("#collectionsheettab").html(tableHtml);
			var postUrl;

			$(".collectionsheettabs").jWizard({
				buttons: {
					next: {
						text: "Continue"
					}
				},
				cancel: function(event, ui) {
					$('#collectionsheettabs').html("<label><b>Collection Sheet operation cancelled</b></label>");
				},
				finish: function(e, ui) {
					var saveCollectionSheetTransactions = function(postUrl){
					var serializedArray = {};
					var serializedFormData = $('#collectionSheetEntityform').serializeObject();
					serializedArray["locale"] = $('#locale').val();
					serializedArray["dateFormat"] = $('#dateFormat').val();
					serializedArray["transactionDate"] = $('#transactionDate').val();
					serializedArray["actualDisbursementDate"] = $('#transactionDate').val();
					serializedArray["calendarId"] = $('#calendarId').val();
					serializedArray["note"] = $('#note').val();
					serializedArray["bulkRepaymentTransactions"] = new Array();
					serializedArray["clientsAttendance"] = serializedFormData["clientsAttendance"];
					$.each($('.grouptotaldue'), function(i){
						var transactionAmount = $(this).val();
						var loanId = this.id.replace("totaldue_", "");
						var tempObject = new Object();
						tempObject.loanId = loanId;
						tempObject.transactionAmount = transactionAmount;
						serializedArray["bulkRepaymentTransactions"][i] = tempObject;
					});

					serializedArray["bulkDisbursementTransactions"] = new Array();
					$.each($('.grouptotaldisbursal'), function(i){
						var transactionAmount = $(this).val();
						var loanId = this.id.replace("disbursement_", "");
						var tempObject = new Object();
						tempObject.loanId = loanId;
						tempObject.transactionAmount = transactionAmount;
						serializedArray["bulkDisbursementTransactions"][i] = tempObject;
					});

					var saveSuccessFunction = function(data){
						$('#collectionsheettabs').html("<label><b>Collection Sheet saved successfully</b></label>");
					}

					var newFormData = JSON.stringify(serializedArray);
					executeAjaxRequest(postUrl + '?command=saveCollectionSheet', "post", newFormData, saveSuccessFunction, formErrorFunction);
				}
					saveCollectionSheetTransactions(postUrl);
				},
				effects: { enable: true }
			}).validate();

			$("#enterdetails").on("stephide", function (e) {
				if (!$(this).find(":input").valid()) {
					return false;
				}
				var centerId = $('#centerId').val();
				var groupId = $('#groupId').val();
				if(!(centerId === undefined || centerId === "0") && (groupId === undefined || groupId === "0")){
					loadCenterCollectionSheet(centerId);
					postUrl = 'centers/' + centerId;
				}else{
					loadGroupCollectionSheet(groupId);
					postUrl = 'groups/' + groupId;
				}
			});

            var initCollectionSheet =  function() {
                //fetch all Offices 
                var officeSuccessFunction =  function(data) {
                    var officeObject = new Object();
                    officeObject.crudRows = data;

                    $('#officeId').empty().append(function(){
                        var output = '<option value=0> -- Select a Branch Office -- </option>';
                        $.each(officeObject.crudRows, function(key, value){
                           output += '<option value=' + value.id + '>' + value.nameDecorated + '</option>';
                        });
                        return output;
                    });

                    $("#officeId").change(function(){
                    	$('#continuebtn').prop('disabled','disabled');
                        loadCentersAssociatedToOffice($(this).val());
                        loadGroupsAssociatedToOffice($(this).val());
                    })
                };
                executeAjaxRequest('offices', 'GET', "", officeSuccessFunction, formErrorFunction);

                $('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
            }
            initCollectionSheet();
        }
    });  

} // end showCollectionSheet

function setCollectionSheetContent(divName) {
    var htmlVar = "";
    
    htmlVar += '<div id="tabs"><ul><li><a href="#collectionsheettab" title="CollectionSheet">' + doI18N("tab.collection.sheet") + '</a></li></ul><div id="collectionsheettab"></div></div>';

    $("#" + divName).html(htmlVar);
}

function loadCentersAssociatedToOffice(officeId){

    var centersSuccessFunction =  function(data) {
        var centerObject = new Object();
        centerObject.crudRows = data.pageItems;

        $('#centerId').empty().append(function(){
            var output = '<option value=0> -- Select a Center -- </option>';
            $.each(centerObject.crudRows, function(key, value){
               output += '<option value=' + value.id + '>' + value.name + '</option>';
            });
            return output;
        });        

        $("#centerId").change(function(){
            loadCenterDetails($(this).val());
            //loadCenterMeetingCalendarForCollectionsheet($(this).val());
            //loadGroupsAssociatedToCenter($(this).val());
            $('#continuebtn').removeAttr('disabled');
        })

        /*
        if(centerObject.crudRows.length === 1){
        	$('select[name=centerId] option:eq(1)').prop('selected', 'selected');
        	$('#centerId').trigger('change');	
        }
        */
    };
    clearMeetingCalendarsAndTransactionDate();
    executeAjaxRequest('centers?officeId=' + officeId, 'GET', "", centersSuccessFunction, formErrorFunction);
}

//used for collectionsheet
function loadCenterDetails(centerId){
	var csCenterDetailsSuccessFunction = function(data){
		var centerObject = data;
		var recudatearr = centerObject.collectionMeetingCalendar.recurringDates;
		var nextTenRecurringDates = centerObject.collectionMeetingCalendar.nextTenRecurringDates;
		var recentEligibleMeetingDate = centerObject.collectionMeetingCalendar.recentEligibleMeetingDate;
		var recurringDates = [];
        $.each(recudatearr, function(n,i){
            var newdate = i[0] + "-" + ("0"+(i[1])).slice(-2) + "-" + ("0"+(i[2])).slice(-2);
            recurringDates[n] = newdate;
        });
		
		$('#calendarId').val(centerObject.collectionMeetingCalendar.id);
		var availableDate = function(date) {
	        var ymd = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
	        if ($.inArray(ymd, recurringDates) < 0 ) {
	            return [false, "","unAvailable"];
	        } else {
	            return [true,"","Available"];
	        }
	    }

	    $( '#transactionDate' ).datepicker( "destroy" );
	    $('#transactionDate').datepicker({ dateFormat: custom.datePickerDateFormat, maxDate: 0, beforeShowDay: availableDate});
	    $( '#transactionDate' ).val(custom.helperFunctions.globalDate(recentEligibleMeetingDate));

		$('#groupId').empty().append(function(){
            var output = '<option value=0> -- Select a Group -- </option>';
            var groups = centerObject.groupMembers;
            $.each(groups, function(key, value){
               output += '<option value=' + value.id + '>' + value.name + '</option>';
            });
            return output;
        });		

		
        $("#groupId").change(function(){
			loadGroupDetails($(this).val());
			//loadGroupMeetingCalendarForCollectionsheet($(this).val());            
			$('#continuebtn').removeAttr('disabled');
        })    
		
		/*
        if(centerObject.groupMembers.length === 1){
        	$('select[name=groupId] option:eq(1)').prop('selected', 'selected');
        	$('#groupId').trigger('change');	
        }
        */
	}	
	clearMeetingCalendarsAndTransactionDate();
	executeAjaxRequest('centers/' + centerId + '?associations=groupMembers,collectionMeetingCalendar', 'GET', "", csCenterDetailsSuccessFunction, formErrorFunction);	
}

//used for collectionsheet

function loadGroupDetails(groupId){
	var csGroupDetailsSuccessFunction = function(data){
		var groupObject = data;
		var recudatearr = groupObject.collectionMeetingCalendar.recurringDates;
		var nextTenRecurringDates = groupObject.collectionMeetingCalendar.nextTenRecurringDates;
		var recentEligibleMeetingDate = groupObject.collectionMeetingCalendar.recentEligibleMeetingDate;
		var recurringDates = [];
        $.each(recudatearr, function(n,i){
            var newdate = i[0] + "-" + ("0"+(i[1])).slice(-2) + "-" + ("0"+(i[2])).slice(-2);
            recurringDates[n] = newdate;
        });
		
		$('#calendarId').val(groupObject.collectionMeetingCalendar.id);
		var availableDate = function(date) {
	        var ymd = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
	        if ($.inArray(ymd, recurringDates) < 0 ) {
	            return [false, "","unAvailable"];
	        } else {
	            return [true,"","Available"];
	        }
	    }

	    $( '#transactionDate' ).datepicker( "destroy" );
	    $('#transactionDate').datepicker({ dateFormat: custom.datePickerDateFormat, maxDate: 0, beforeShowDay: availableDate});
	    $( '#transactionDate' ).val(custom.helperFunctions.globalDate(recentEligibleMeetingDate));

	}
	clearMeetingCalendarsAndTransactionDate();
	executeAjaxRequest('groups/' + groupId + '?associations=collectionMeetingCalendar', 'GET', "", csGroupDetailsSuccessFunction, formErrorFunction);	
}


function loadGroupsAssociatedToOffice(officeId){

    var csGroupSearchSuccessFunction =  function(data) {
        var groupObject = new Object();
        groupObject.crudRows = data.pageItems;

        $('#groupId').empty().append(function(){
            var output = '<option value=0> -- Select a Group -- </option>';
            $.each(groupObject.crudRows, function(key, value){
               output += '<option value=' + value.id + '>' + value.name + '</option>';
            });
            return output;
        });    

        $("#groupId").change(function(){
			//loadGroupMeetingCalendarForCollectionsheet($(this).val());
			loadGroupDetails($(this).val());
			$('#continuebtn').removeAttr('disabled');
        })    
        
    };
    executeAjaxRequest('groups?officeId=' + officeId, 'GET', "", csGroupSearchSuccessFunction, formErrorFunction);
}

/*
function loadCenterMeetingCalendarForCollectionsheet(centerId){
	var getUrl = 'centers/' + centerId + '/calendars';
	loadMeetingCalendarForCollectionsheet(getUrl);
}

function loadGroupMeetingCalendarForCollectionsheet(groupId){
	var getUrl = 'groups/' + groupId + '/calendars?associations=parentCalendars';
	loadMeetingCalendarForCollectionsheet(getUrl);
}

function loadMeetingCalendarForCollectionsheet(getUrl){

	var calendarSuccessFunction = function(data, textStatus, jqXHR){
		var calendars = new Object();
	    calendars.crudRows = data;
	    var output = "";
	    if(calendars.crudRows.length > 1){
	    	output = '<option value=0> -- Select a meeting -- </option>';
	    }

	    $('#calendarId').empty().append(function(){
	        
	        $.each(calendars.crudRows, function(key, value){
	            output += '<option value=' + value.id + '>' + value.title + ' - ';
	            if(value.entityType.value === 'CLIENTS'){
	                output += doI18N("label.select.calendar.client");
	            } else if(value.entityType.value === 'CENTERS'){
	                output += doI18N("label.select.calendar.center");
	            } else if(value.entityType.value === 'GROUPS'){
	                output += doI18N("label.select.calendar.group");
	            } else if(value.entityType.value === 'LOANS'){
	                output += doI18N("label.select.calendar.loan");
	            }
	                
	            output += '</option>';
	        });
	        return output;
	    });		

	    $('#calendarId').change(function(){
	        var calendarId = $(this).val();
	        if(calendarId !== 0){
	        
	            //set first recurring date as expected disbursal date
	            var selectedCalendars = $.grep(calendars.crudRows, function(n, i) {
	                return n.id == calendarId;
	            });
	        
	            if (selectedCalendars.length > 0) {
	                var selectedCalendar = selectedCalendars[0];//get calendar from array
	                var recurringDates = selectedCalendar.nextTenRecurringDates;
	                var firstDate = recurringDates[0];//First recurring date
	                
	                $( '#dueDate' ).val(custom.helperFunctions.globalDate(firstDate));
	            }
	        }
	    });

	    var availableDate = function(date) {
	          
	        var recurringDates = [];
	        var selectedcals = $.grep(calendars.crudRows, function(n, i) {
	            return n.id == $("#calendarId").val();
	        });
	    	
	        if (selectedcals.length > 0) {
	            var selcal = selectedcals[0];
	            var recudatearr = selcal.recurringDates;
	            $.each(recudatearr, function(n,i){
	                var newdate = i[0] + "-" + ("0"+(i[1])).slice(-2) + "-" + ("0"+(i[2])).slice(-2);
	                //alert(newdate);
	                recurringDates[n] = newdate;
	            });
	        }
	        
	        var ymd = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);

	        if ($.inArray(ymd, recurringDates) < 0 ) {
	            return [false, "","unAvailable"];
	        } else {
	            return [true,"","Available"];
	        }
	    }

	    $( '#dueDate' ).datepicker( "destroy" );
	    $('#dueDate').datepicker({ dateFormat: custom.datePickerDateFormat, maxDate: 0, beforeShowDay: availableDate});
	    
	 	if(calendars.crudRows.length === 1){
	    	//if meeting is not attached then only trigger change event
	    	$('#calendarId').trigger('change');
	    }
	}

	executeAjaxRequest(getUrl, 'GET', "", calendarSuccessFunction, formErrorFunction);
}
*/

function clearMeetingCalendarsAndTransactionDate(){

	    $('#calendarId').val('');
	    $('.datepickerfieldnoconstraint').datepicker( "destroy" );
	    $('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
	    $('.datepickerfieldnoconstraint').datepicker('setDate', null);
}

function loadCenterCollectionSheet(centerId){
	var postUrl = 'centers/' + centerId;
	loadCollectionSheet(postUrl);
}

function loadGroupCollectionSheet(groupId){
	var postUrl = 'groups/' + groupId;
	loadCollectionSheet(postUrl);
}

function loadCollectionSheet(postUrl){
	removeErrors('#formerrors');
	var serializedArray = {};
	serializedArray["locale"] = $('#locale').val();
   	serializedArray["dateFormat"] = $('#dateFormat').val();
    serializedArray["transactionDate"] = $('#transactionDate').val();
    serializedArray["calendarId"] = $('#calendarId').val();
    var newFormData = JSON.stringify(serializedArray);
    $("#collectionSheetContent").html("");
    var successFunction = function(data){
        var collections = new Object();
        if (data.groups.length <= 0) {
        	var msg = '<p><b><i> No repayments and disbursal are available for selected Group and meeting date</i></b></p>';
        	$("#collectionSheetContent").html(msg);
        }else{
	        collections.crudRows = data;
	        var tableHtml = $("#collectionSheetTemplate").render(collections);
	        $("#collectionSheetContent").html(tableHtml);
        }  
        var sumTotalDue = function(data){
            var groups = data.groups;
            var loanProducts = data.loanProducts;
            $.each(loanProducts, function(key, value){
                var loanProd = value;
                var sumTotalDue = 0.0, sumTotalDisbarsal = 0.0;
                $.each(groups, function(key, value){
                    var group = value;
                    var grouptotalDue = 0.0, groupTotalDisbarsal = 0.0;
                    $('.grouptotaldue_' + group.groupId + '_' + loanProd.id).each(function(){
                        var tmpAmount = parseFloat(($(this).val()).replace(",", ""));
                       grouptotalDue += tmpAmount;
                       sumTotalDue += tmpAmount;
                    });

                    $('#grouptotaldue_' + group.groupId + '_' + loanProd.id).val(grouptotalDue);
                    
                    $('.grouptotaldisbursal_' + group.groupId + '_' + loanProd.id).each(function(){
                        var tmpAmount = parseFloat(($(this).val()).replace(",", ""));
                       groupTotalDisbarsal += tmpAmount;
                       sumTotalDisbarsal += tmpAmount;
                    });
                    $('#grouptotaldisbursal_' + group.groupId + '_' + loanProd.id).val(groupTotalDisbarsal);
               }); 
                $('#sumtotaldue_' + loanProd.id).val(sumTotalDue);
                $('#sumdisbursal_' + loanProd.id).val(sumTotalDisbarsal);
            });
            
        }

        sumTotalDue(data);

        $('.grouptotaldue').change(function(){
            var data = collections.crudRows;
            sumTotalDue(data); 
        });
        
        $(".collections td:last-child").addClass('righthighlightcolheader');
        $(".collections th:last-child").addClass('righthighlightcolheader');
    }
    executeAjaxRequest(postUrl + '?command=generateCollectionSheet', "post", newFormData, successFunction, formErrorFunction);

}

function addHoliday() {

	setOrgAdminContent('content');
	var officeSearchSuccessFunction =  function(data) {
		var finalJson = [];
		
		for(i=0;i<data.length;i++){
			var currentObj = data[i];
			delete currentObj.nameDecorated;
			delete currentObj.openingDate;
			delete currentObj.hierarchy;
			delete currentObj.parentName;
			finalJson.push(currentObj);
		}
		
		var data = finalJson;
		// prepare the data
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'id' },
                { name: 'name' },
                { name: 'parentId' }
            ],
            id: 'id',
            localdata: data
        };
		 // create data adapter.
        var dataAdapter = new $.jqx.dataAdapter(source);
        // perform Data Binding.
        dataAdapter.dataBind();
        var records = dataAdapter.getRecordsHierarchy('id', 'parentId', 'items', [{ name: 'name', map: 'label'}]);

        var addHolidaySuccessFunction = function(data, textStatus, jqXHR) {
		$('#dialog-form').dialog("close");
		}
	
		var submitType = 'POST';
		var postUrl = 'holidays';
		var templateSelector = "#holidayFormTemplate";
		var dialogWidth = 650; 
		var dialogHeight = 600;
		var dialogTitle = 'dialog.title.add.holiday';
		
		popupDialogWithPostOnlyFormView(postUrl, submitType, dialogTitle, templateSelector, dialogWidth, dialogHeight, addHolidaySuccessFunction, 0, 0, 0);	  	

	    $('#offices').jqxTree({ source: records, checkboxes: true, width: '100%' });   
	    $('#offices').jqxTree({ height: '300px', hasThreeStates: true,checkboxes: true, width: '440px'});   
   	}
  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);
}

function listProductMix() {

	var tableName='productmix';

	var successFunction = function(data, textStatus, jqXHR) {

		var crudObject = new Object();
		crudObject.crudRows = data;
		
		var html = $("#" + tableName + "ListTemplate").render(crudObject);
		$("#listplaceholder").html(html);  

		$("a.edit" + tableName).click( function(e) {
			var linkId = this.id;
			var entityId = linkId.replace("edit" + tableName, "");
			launchProductMixDialog(entityId);
			e.preventDefault();
		});

		$("a.delete" + tableName).click( function(e) {
			var linkId = this.id;
			var entityId = linkId.replace("delete" + tableName, "");
			var resourceUrl = 'loanproducts/' + entityId + '/productmix';
			var width = 400; 
			var height = 150;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
			  	$("#dialog-form").dialog("close");
			  	listProductMix();
			};
			popupConfirmationDialogAndPost(resourceUrl, 'DELETE', 'dialog.title.confirmation.required', width, height, entityId, saveSuccessFunction);
			e.preventDefault();
		});

		var oTable = displayListTable(tableName + "table");
	};

	executeAjaxRequest('loanproducts?associations=productMixes', 'GET', "", successFunction, formErrorFunction);
}

function loadProductMixForm(container, productId, templateIdentifier) {
	
	var renderOnSuccessFunction = function(data, textStatus, jqXHR) {
		data.productId = productId;
		var formHtml = $(templateIdentifier).render(data);
		container.html(formHtml);
		
		$("#dialog-form #productId").change(function() {
			var selectedValue = $(this).find(":selected").val();
			loadProductMixForm(container, selectedValue, templateIdentifier);
		});

		$('.multiadd').click(function() {  
            return !$('.multiNotSelectedItems option:selected').remove().appendTo('#restrictedProducts');  
        });
        
        $('.multiremove').click(function() {  
            return !$('.multiSelectedItems option:selected').remove().appendTo('#allowedProducts');  
        });
	};
	
	executeAjaxRequest('loanproducts/' + productId + '/productmix?template=true', 'GET', "", renderOnSuccessFunction, formErrorFunction);
}

function saveProductMix(divContainer, submitType, productId) {
	var serializationOptions = {};
	serializationOptions["checkboxesAsBools"] = true;
	var serializedArray = {};
	serializedArray = $('#entityform').serializeObject(serializationOptions);
	if(!("restrictedProducts" in serializedArray)){
		serializedArray["restrictedProducts"] = [];
	}
	
	var newFormData = JSON.stringify(serializedArray);
	
	var successFunction =  function(data, textStatus, jqXHR) {
		divContainer.dialog("close");
		listProductMix();
	};

	if (submitType === "POST") {
		productId = $("#productId").val();
	}

	if (productId === "-1" || productId === undefined || productId === "" || productId === null) {
		alert("Please select a product for mix");
	} else {
		executeAjaxRequest('loanproducts/' + productId + '/productmix', submitType, newFormData, successFunction, formErrorFunction);
	}
}

var launchLoanProductMixDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	
	var dialogDiv = $("<div id='dialog-form'></div>");
	var templateIdentifier = "#productMixFormTemplate";

	var saveButton = doI18N('dialog.button.save');
	var cancelButton = doI18N('dialog.button.cancel');
	
	var buttonsOpts = {};
	var titleCode = 'dialog.title.add.product.mix';
	if (data.productName){
		titleCode = 'dialog.title.product.mix.details';
	}
	var productId = data.productId;
	var openProductMixDialogFunc = function (event, ui) {
		var formHtml = $(templateIdentifier).render(data);
		$("#dialog-form").html(formHtml);

		$("#productId").change(function() {
			var selectedValue = $(this).find(":selected").val();
			loadProductMixForm(dialogDiv, selectedValue, templateIdentifier);
		});
		if (data.productName) {
			$("#productId").attr("disabled", "disabled");
		} else{
			$("#productId").removeAttr("disabled");
		};
		

		$('.multiSelectedItems option').each(function(i) {  
			$(this).prop("selected", "selected");  
	    });

		$('.multiadd').click(function() {  
            return !$('.multiNotSelectedItems option:selected').remove().appendTo('#restrictedProducts');  
        });
        
        $('.multiremove').click(function() {  
            return !$('.multiSelectedItems option:selected').remove().appendTo('#allowedProducts');  
        });
	}
	var saveProductMixFunc = function() {
		var submitType = "POST";
		if (data.productName) {
			submitType = "PUT";
		};
		$('.multiSelectedItems option').each(function(i) {
			$(this).prop("selected", "selected");
		});
		saveProductMix(dialogDiv, submitType, productId);
	};
	var dialog = gernericDialog(dialogDiv, titleCode, 580, 340, openProductMixDialogFunc, saveProductMixFunc);
};

function launchProductMixDialog(loanProductId) {
		
	if (loanProductId) {
		executeAjaxRequest('loanproducts/' + loanProductId + '/productmix?template=true', 'GET', "", launchLoanProductMixDialogOnSuccessFunction, formErrorFunction);
	} else {
		executeAjaxRequest('loanproducts/template?isProductMixTemplate=true', 'GET', "", launchLoanProductMixDialogOnSuccessFunction, formErrorFunction);
	}
}

function listHolidays() {

	setOrgAdminContent('content');
	var officeSearchSuccessFunction =  function(data) {
		var officeSearchObject = new Object();
	    officeSearchObject.crudRows = data;
		
		var html = $("#holidaysFetchOnInputs").render();
		$("#listplaceholder").html(html);

		$('.datepickerfieldnoconstraint').datepicker({constrainInput: true, defaultDate: 0, dateFormat: custom.datePickerDateFormat});
		
		var tableHtml = $("#officesTemplate").render(officeSearchObject);
		$("#officesdropdown").html(tableHtml);
		
		var holidayListSuccessFunction = function(data) {
			
			var holidayListObject = new Object();
	    	holidayListObject.crudRows = data;
			
			var html = $("#holidayListTemplate").render(holidayListObject);
			$("#holidaytablediv").html(html);

			displayListTable("holidaystable");
		}

		var officeId = "";
		var fromDate = "";
		var toDate = "";
		var dateFormat = "";
		var locale = "";
		$(".searchHolidays").button({
			icons : {
				primary : "ui-icon-search"
			}
		}).click(function(){

			var temp = "";
			var getUrl = 'holidays?officeId=';
			dateFormat = "dd MMMM yyyy";
			locale = "en";

			officeId = $("#officeId").val();
			getUrl += officeId;
			fromDate =  $("input[name=fromDate]").val();
			getUrl += fromDate.length > 1 ? '&fromDate='+fromDate : "";
			toDate =  $("input[name=toDate]").val();
			getUrl += toDate.length > 1 ? '&toDate='+toDate : "";

			if (fromDate != "" || toDate != "") {
				getUrl += '&locale='+locale+'&dateFormat='+dateFormat
			}

			executeAjaxRequest(getUrl, 'GET', "", holidayListSuccessFunction, formErrorFunction);	
		});
  	};

  	executeAjaxRequest('offices', 'GET', "", officeSearchSuccessFunction, formErrorFunction);	
}

function showBatchJobDetails() {
	var schedulerJobsSuccessFunction = function(data, textStatus, jqXHR) {
		var crudObject = new Object();
		crudObject.crudRows = data;

		var html = $("#batchJobFormTemplate").render(crudObject);
		$("#listplaceholder").html(html);
		$("#schedularjobsSentForExecution").html("");

		//get scheduler job status
		showSchedulerStatus();

		$("#selectAllJobs:checkbox").change(function(){
			$(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
		});

		$(".runSelectedJobs").button().click(function(e){
			var selectedJobs = [];
			var jobsSentForExecution = [];
			$(".scheduleJob:checked").each(function() {
				selectedJobs.push($(this).val());
			});
			if (selectedJobs.length > 0) {
				for (var i = 0; i < selectedJobs.length; i++) {
					executeAjaxRequest('jobs/'+selectedJobs[i]+'?command=executeJob', 'POST', "", "", formErrorFunction);
					for (var j = 0; j < data.length; j++) {
						var currentJobObj = data[j];
						if (currentJobObj.jobId == selectedJobs[i]) {
							var job = new Object();
							job.name = currentJobObj.displayName;
							jobsSentForExecution.push(job);
						}
					}
					var executingJobs = new Object();
					executingJobs.jobDetails = jobsSentForExecution;
					var jobDetailsHtml = $("#executingJobDetailsFormTemplate").render(executingJobs);
					$("#schedularjobsSentForExecution").html(jobDetailsHtml);
				}
				$(this).closest('fieldset').find(':checkbox').prop('checked', false);
			} else{
				errorDialog(200, 400, "schedularJobErrorDialogFormTemplate");
			}
			e.preventDefault();
		});

		$(".jobHistory").button({
        icons : {
            primary : "ui-icon-disk"
        },
        text: false
        }).click(function(e){
			var linkId = this.id;
			var jobId = linkId.replace("jobHistory", "");
			var getUrl = "jobs/"+jobId+"/history";
			var templateSelector = "#viewJobHistoryFormTemplate";
			var width = 1210;
			var height = 560;
			popupDialogWithReadOnlyFormViewData(null,"dialog.title.view.job.history", templateSelector, width, height);
			var schedulerHistotyHtml = $("#jobHistoryTableTemplate").render();
			$("#jobHistoryDetails").html(schedulerHistotyHtml);
			var oTable = $("#schedulerjobstable").dataTable(custom.jqueryDataTableServerSide.paginated("schedulerjobstable"+jobId));
			initTableConf("schedulerjobstable",oTable);
			e.preventDefault();
		});

		$(".errorinfobtn").button({
        icons : {
            primary : "ui-icon-info"
        },
        text: false
        }).click(function(e){
			var linkId = this.id;
			var jobId = linkId.replace("errorinfo", "");
			var templateSelector = "#viewJobErrorInfoFormTemplate";
			var width = 775;
			var height = 350;
			for (var i = 0; i < data.length; i++) {
				var currentJobObj = data[i];
				if (currentJobObj.jobId == jobId) {
					if (currentJobObj.lastRunHistory) {
						if (currentJobObj.lastRunHistory.status == "failed") {
							var errorObj = new Object();
							errorObj.jobRunErrorMessage = currentJobObj.lastRunHistory.jobRunErrorMessage;
							errorObj.jobRunErrorLog = currentJobObj.lastRunHistory.jobRunErrorLog;
							popupDialogWithReadOnlyFormViewData(errorObj ,"dialog.title.view.error.info", templateSelector, width, height);
						}
					}
					break;
				}
			}
			e.preventDefault();
        });

        $(".refreshSchedulerJobPage").button({
        icons : { primary : "ui-icon-arrowrefresh-1-e" }
        }).click(function(e){
			showBatchJobDetails();
			e.preventDefault();
		});

		$(".editjobbtn").button({
        icons : {
            primary : "ui-icon-pencil"
        },
        text: false
        }).click(function(e){
			var linkId = this.id;
			var jobId = linkId.replace("editjob", "");
			var getUrl = "jobs/"+jobId;
			var putUrl = "jobs/"+jobId;
			var templateSelector = "#editSchedulerJobFormTemplate";
			var width = 450;
			var height = 250;
			var saveSuccessFunction = function(data, textStatus, jqXHR) {
				$("#dialog-form").dialog("close");
				showBatchJobDetails();
			}
			popupDialogWithFormView(getUrl, putUrl, 'PUT', 'dialog.title.scheduler.job.details', templateSelector, width, height, saveSuccessFunction);
			e.preventDefault();
		});

		$(".initializingErrorInfo").button({
        icons : {
            primary : "ui-icon-info"
        },
        text: false
        }).click(function(e){
			var linkId = this.id;
			var jobId = linkId.replace("initializingErrorInfo", "");
			var templateSelector = "#viewJobInitializingErrorFormTemplate";
			var width = 1100;
			var height = 480;
			for (var i = 0; i < data.length; i++) {
				var currentJobObj = data[i];
				if (currentJobObj.jobId == jobId) {
					if (currentJobObj.initializingError) {
						popupDialogWithReadOnlyFormViewData(currentJobObj ,"dialog.title.view.job.initialization.error.info", templateSelector, width, height);
					}
					break;
				}
			}
			e.preventDefault();
        });
	}
	executeAjaxRequest('jobs', 'GET', "", schedulerJobsSuccessFunction, formErrorFunction);
}

function errorDialog (height, width, templateIdentifier) {
	var dialogErrordiv = $( '<div id="dialog-confirm" title="Errors"> </div>');
	dialogErrordiv.dialog({
			resizable: true,
			height:height,
			width:width,
			modal: true,
			buttons: {
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
			},
			open: function (event, ui) {
				var errorHtml = $("#"+templateIdentifier).render();
				dialogErrordiv.html(errorHtml);
			}
		}).dialog('open');
}

function showSchedulerStatus () {
	var getSchedulerStatusSuccessFunction = function(data, textStatus, jqXHR) {

		var html = $("#showSchedulerStatusFormTemplate").render(data);
		$("#showschedulerstatus").html(html);

		$(".suspendScheduler").button({
		icons : { primary : "ui-icon-circle-close" }
		}).click(function(e){
			executeAjaxRequest('scheduler?command=stop', 'POST', "", "", formErrorFunction);
			showBatchJobDetails();
			e.preventDefault();
		});

		$(".activateScheduler").button({
		icons : { primary : "ui-icon-circle-check" }
		}).click(function(e){
			executeAjaxRequest('scheduler?command=start', 'POST', "", "", formErrorFunction);
			showBatchJobDetails();
			e.preventDefault();
		});

	}
	executeAjaxRequest('scheduler', 'GET', "", getSchedulerStatusSuccessFunction, formErrorFunction);
}

function addAttendance(resourceId, resource, collectionMeetingCalendar){
    var postUrl = resource + "/" + resourceId + "/meetings";
    var getUrl = resource + "/" + resourceId + "/meetings/template";
    if(collectionMeetingCalendar !== undefined) {
    	postUrl += "?calendarId=" + collectionMeetingCalendar.id;
    	getUrl += "?calendarId=" + collectionMeetingCalendar.id;
    }

    var dialogTitle = 'dialog.title.add.attendance';
    var templateSelector = "#attendanceFormTemplate";
    var width = 700;
    var height = 580;

	var successFunction = function(data, textStatus, jqXHR) {
        var saveSuccessFunction = function(data, textStatus, jqXHR) {
            $("#dialog-form").dialog("close");
            refreshAttendanceWidget(resourceId, resource);
        }
        popupDialogWithFormViewData(data, postUrl, "POST", dialogTitle, templateSelector, width, height, saveSuccessFunction);

	}

    executeAjaxRequest(getUrl, "GET", "", successFunction, formErrorFunction);
}

function editAttendance(resourceId, resource, meetingId){
    var postUrl = resource + "/" + resourceId + "/meetings/" + meetingId + "?command=saveOrUpdateAttendance";
    var getUrl = resource + "/" + resourceId + "/meetings/" + meetingId;

    var dialogTitle = 'dialog.title.edit.attendance';
    var templateSelector = "#attendanceEditFormTemplate";
    var width = 700;
    var height = 580;

	var successFunction = function(data, textStatus, jqXHR) {
        var saveSuccessFunction = function(data, textStatus, jqXHR) {
            $("#dialog-form").dialog("close");
            refreshAttendanceWidget(resourceId, resource);
        }
        popupDialogWithFormViewData(data, postUrl, "POST", dialogTitle, templateSelector, width, height, saveSuccessFunction);

	}

    executeAjaxRequest(getUrl, "GET", "", successFunction, formErrorFunction);
}

function refreshAttendanceWidget(resourceId, resource) {
	var successFunction = function(data, textStatus, jqXHR) {
		var meetings = new Object();
		meetings.crudRows = data;
		var html = $("#attendanceWidgetFormTemplate").render(meetings);
		var attendanceContainer = resource + "AttendanceContent";
		$("#" + attendanceContainer).html(html);	

		$('.editattendance').click(function(e) {
			var linkId = this.id;
			var meetingId = linkId.replace("editattendance", "");
			editAttendance(resourceId, resource, meetingId);
			e.preventDefault();
		});
	}
	executeAjaxRequest(resource + '/' + resourceId + '/meetings?limit=5', 'GET', "", successFunction, formErrorFunction);
}
