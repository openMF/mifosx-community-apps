tevi = {
	root:{
		programDir:{
			fullName:'',
			id: 0,
			organisational_role_enum:0,
			top: false
		},
		branchDir:{
			fullName:'',
			id: 0,
			organisational_role_enum:0,
			top: false
		},
		coordinator:{
			fullName:'',
			id: 0,
			organisational_role_enum:0,
			top: false
		},
		fieldAgent:{
			fullName:'',
			id: 0,
			organisational_role_enum:0,
			top: false
		}
	}
}

//over-ride show first page
custom.showFirstPage = function() {
	if (mStaffUser.organisationalRole == undefined) {
		showILClientListing("content");
		return;
	}
	else{
		cleanRoot();
		switch(mStaffUser.organisationalRole.id)
		{
			case 100:
				tevi.root.programDir.top = true;
				tevi.root.programDir.organisational_role_enum = 100;
				showProgramDirectorPage("content");
				break;
			case 200:
				tevi.root.branchDir.top = true;
				tevi.root.branchDir.organisational_role_enum = 200;
				showBranchManagerPage("content");
				break;
			case 300:
				tevi.root.coordinator.top = true;
				tevi.root.coordinator.organisational_role_enum = 300
				showCoordinatorPage("content");
				break;
			case 400:
				tevi.root.fieldAgent.top = true;
				tevi.root.fieldAgent.organisational_role_enum = 400
				showFieldAgentPage("content");
				break;
			default:
				showILClientListing("content");
		}
	}
}
function cleanRoot(){
	
	tevi.root.fieldAgent.id = 0;
	tevi.root.fieldAgent.fullName = '';
	tevi.root.coordinator.id = 0;
	tevi.root.coordinator.fullName = '';
	tevi.root.branchDir.id = 0;
	tevi.root.branchDir.fullName = '';
	tevi.root.programDir.id = 0;
	tevi.root.programDir.fullName = '';
	
}
function viewBelow(roleId, parent_id, parent_fullName, staffId, display_name){
	//alert("viewAbove: " + roleId + "   staff id: " + staffId + "  parent: " + parent_fullName + "   name: " + display_name)
	var staff = new Object();
	staff.staffId = staffId;
	staff.display_name = display_name;
	switch(roleId){
		case 400:
			tevi.root.coordinator.id = parent_id;
			tevi.root.coordinator.fullName = parent_fullName;
			tevi.root.coordinator.organisational_role_enum = 300
			showFieldAgentPage("content", staff);
			break;
		case 300:
			tevi.root.branchDir.id = parent_id;
			tevi.root.branchDir.fullName = parent_fullName;
			tevi.root.branchDir.organisational_role_enum = 200;
			showCoordinatorPage("content", staff);
			break;
		case 200:
			tevi.root.programDir.id = parent_id ;
			tevi.root.programDir.fullName = parent_fullName;
			tevi.root.programDir.organisational_role_enum = 100;
			showBranchManagerPage("content",staff);
			break;
		default:
			return;
	}
}
function viewAbove(roleId, staffId){
	var url = "staff/"+staffId;
	//alert("viewAbove: " + roleId + "   staff id: " + staffId)
	executeAjaxRequest(url, 'GET', "",function(data){
		var staff = new Object();
		staff.staffId = data.id;
		staff.display_name = data.displayName;
		if(roleId<=100){
			tevi.root.programDir.id = 0;
			tevi.root.programDir.fullName = '';
		}
		if(roleId<=200){
			tevi.root.branchDir.id = 0;
			tevi.root.branchDir.fullName = '';
		}
		if(roleId<=300){
			tevi.root.coordinator.id = 0;
			tevi.root.coordinator.fullName = '';
		}
		if(roleId<=400){
			tevi.root.fieldAgent.id = 0;
			tevi.root.fieldAgent.fullName = '';
		}
		switch(roleId){
			case 100:
				showProgramDirectorPage("content", staff);
				break;
			case 200:
				showBranchManagerPage("content", staff);
				break;
			case 300:
				showCoordinatorPage("content", staff);
				break;
			case 400:
				showFieldAgentPage("content", staff);
				
				break;
			default:
				return;
		}
	}, formErrorFunction);
}
function showProgramDirectorPage(divName) {
	var data = new Object();
	var role = new Object();
	role.name = doI18N("page.title.programDir");
	role.childname = "Branch Managers";
	role.id = 2;
	data.role = role;
	data.root = tevi.root;
	var htmlVar = $("#dashboardTemplate").render(data);
	$("#" + divName).html(htmlVar);
	if(typeof staff === "undefined"){
		staff = new Object();
		staff.staffId = mStaffUser.staffId;
		staff.display_name = mStaffUser.staffDisplayName;
	}
	
	
	fillRole_FieldAgent(staff.staffId, staff.display_name);
	fillRoleStats(staff.staffId, "ProgramDirector");
	fillStaffList(staff.staffId);
}
function showBranchManagerPage(divName, staff) {
	var data = new Object();
	var role = new Object();
	role.name = doI18N("page.title.branchManager");
	role.childname = "Coordinators";
	role.id = 3;
	data.role = role;
	data.root = tevi.root;
	var htmlVar = $("#dashboardTemplate").render(data);
	$("#" + divName).html(htmlVar);
	if(typeof staff === "undefined"){
		staff = new Object();
		staff.staffId = mStaffUser.staffId;
		staff.display_name = mStaffUser.staffDisplayName;
	}
	fillRole_FieldAgent(staff.staffId, staff.display_name);
	fillRoleStats(staff.staffId, "BranchManager");
	fillStaffList(staff.staffId);
}
function showCoordinatorPage(divName, staff) {
	var data = new Object();
	var role = new Object();
	role.name = doI18N("page.title.coordinator");
	role.childname = "Field Agents";
	role.id = 4;
	data.role = role;
	data.root = tevi.root;
	var htmlVar = $("#dashboardTemplate").render(data);
	$("#" + divName).html(htmlVar);
	if(typeof staff === "undefined"){
		staff = new Object();
		staff.staffId = mStaffUser.staffId;
		staff.display_name = mStaffUser.staffDisplayName;
	}
	fillRole_FieldAgent(staff.staffId, staff.display_name);
	fillRoleStats(staff.staffId, "Coordinator");
	fillStaffList(staff.staffId);
}
function showFieldAgentPage(divName, staff) {
	var data = new Object();
	var role = new Object();
	role.name = doI18N("page.title.fieldAgent");
	role.childname = "Groups";
	role.id = 5;
	data.role = role;
	data.root = tevi.root;
	var htmlVar = $("#dashboardTemplate").render(data);    
	$("#" + divName).html(htmlVar);
	if(typeof staff === "undefined"){
		staff = new Object();
		staff.staffId = mStaffUser.staffId;
		staff.display_name = mStaffUser.staffDisplayName;
	}
	fillRole_FieldAgent(staff.staffId, staff.display_name);
	fillRoleStats(staff.staffId, "FieldAgent");
	fillList_FieldAgent(staff.staffId);
}

function fillRole_FieldAgent(id, name) {
	//alert("fillRole_FieldAgent: " + id + "   name: " + name)
	var data = {
					id: id,
					name: name
				}
	
    var htmlVar = $("#quipuExampleRoleFieldAgentTemplate").render(data);  
	$("#quipuExGenDashboardRole").html(htmlVar);
}

function fillRoleStats(id, roleName) {

    var url = "runreports/" + roleName + "Stats?R_staffId=" + id + "&genericResultSet=false";
    
	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;	    
	    var htmlVar = $("#quipuExampleRoleStatsTemplate").render(obj);  
		$("#quipuExGenDashboardRoleStats").html(htmlVar);
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}
function fillList_FieldAgent(id) {

	//alert("fillList_FieldAgent: " + id)
    var url = "runreports/FieldAgentPrograms?R_staffId=" + id + "&genericResultSet=false";
    
	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;	    
	    obj.roleId = 5
	    var htmlVar = $("#quipuExampleListFieldAgentTemplate").render(obj);  
		$("#quipuExGenDashboardList").html(htmlVar);
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}
function fillListDetails_FieldAgent(id, groupName) {

    var url = "runreports/ProgramDetails?R_programId=" + id + "&genericResultSet=false";

	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;
	    obj.groupName =   groupName;
	    var htmlVar = $("#quipuExampleListDetailsFieldAgentTemplate").render(obj);  
		$("#quipuExGenDashboardListDetails").html(htmlVar);
		$("#quipuExGenDashboardListDetails #groupsstatstable").dataTable(custom.jqueryDataTableLayout.basic());
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}

function fillStaffList(id) {
	var	url = "runreports/ChildrenStaffList?R_staffId=" + id + "&genericResultSet=false";
	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;	    
	    obj.roleId = 5
	    var htmlVar = $("#quipuExampleStaffListTemplate").render(obj);  
		$("#quipuExGenDashboardList").html(htmlVar);
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}


//Group creation for TEVI
function launchTeviGroupDialog(groupId) {
	
	if (groupId) {
		executeAjaxRequest('groups/' + groupId + '?template=true&associations=clientMembers', 'GET', "", launchTeviGroupDialogOnSuccessFunction, formErrorFunction);
	} else {
		executeAjaxRequest('groups/template', 'GET', "", launchTeviGroupDialogOnSuccessFunction, formErrorFunction);		
	}
}
var launchTeviGroupDialogOnSuccessFunction = function(data, textStatus, jqXHR) {
	
	var dialogDiv = $("<div id='dialog-form'></div>");

	data.clientOptions = new Array();
	var groupId = data.id;
	var templateIdentifier = "#teviGroupFormTemplate";
	if (groupId) {
		templateIdentifier = "#teviGroupEditFormTemplate";
	}
	
	var openGroupDialogFunc = function (event, ui) {
		renderTeviGorupForm(data);
	}
	
	var saveNewGroupFunc = function() {
		saveGroup(dialogDiv, groupId);
	};
	
	var dialog = null;
	if (groupId) {
		dialog = genericDialog(dialogDiv, 'dialog.title.edit.group', 380, 250, openGroupDialogFunc, saveNewGroupFunc);	
	} else {
		dialog = genericDialog(dialogDiv, 'dialog.title.add.group', 900, 450, openGroupDialogFunc, saveNewGroupFunc);
	}
};



function loadTeviGroupForm(selectedValue){
	var url='groups/template?officeId=' + selectedValue;
	executeAjaxRequest(url,'GET',"",renderTeviGorupForm, formErrorFunction);
}
function renderTeviGorupForm(data) {
	var groupId = data.id;
	var templateIdentifier = "#teviGroupFormTemplate";
	if (groupId) {
		templateIdentifier = "#teviGroupEditFormTemplate";
	}
	var formHtml = $(templateIdentifier).render(data);
	$("#dialog-form").html(formHtml);
	
	$("#dialog-form #officeId").change(function() {
		var selectedValue = $(this).find(":selected").val();
		loadTeviGroupForm(selectedValue);
	});
	
	$('.multiremove').click(function() {  
		return !$('.multiSelectedItems option:selected').remove().appendTo('#notSelectedClients');  
	});
	
	$('.datepickerfield').datepicker({constrainInput: true, dateFormat: custom.datePickerDateFormat});
	
	$("#entityform textarea").first().focus();
	$('#entityform input').first().focus();

	var success = function(data){
		var obj = new Object();
		obj.clientOptions = data;
		var html = $("#teviClientOptions").render(obj);
		$("#dialog-form #notSelectedClients").append(html);

		$('.multiadd').click(function() {  
			return !$('.multiNotSelectedItems option:selected').remove().appendTo('#clientMembers');  
		});
	}
	executeAjaxRequest('runreports/ClientsByOffice?R_officeId='+data.officeId+'&genericResultSet=false','GET',"",success, formErrorFunction);
}


//Associate Clients to a group for TEVI

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
		var success = function(data2, textStatus, jqXHR){
			data.clientOptions = data2;
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
		executeAjaxRequest('runreports/ClientsByOffice?R_officeId='+data.officeId+'&genericResultSet=false','GET',"",success, formErrorFunction);
		
	}
	
	var saveAssociateClientsToGroupFunc = function() {
		saveAssociateClientsToGroup(dialogDiv, groupId);
	};

	var dialog = genericDialog(dialogDiv, 'dialog.title.associate.clients', 900, 300, openAssociateClientsToGroupDialogFunc, saveAssociateClientsToGroupFunc);	
}

function associateClientsToGroup(groupId){
	executeAjaxRequest('groups/' + groupId + '?template=true&associations=clientMembers', 'GET', "", launchAssociateClientsToGroupDialogOnSuccessFunction, formErrorFunction);
}

function justNumbers(e)
{
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46))
		return true;
	 
	return /\d/.test(String.fromCharCode(keynum));
}