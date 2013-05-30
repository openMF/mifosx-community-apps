

//over-ride show first page
custom.showFirstPage = function() {
	
	if (mStaffUser.organisationalRole == undefined) {
		showILClientListing("content");
	}
	else 
	{
		switch(mStaffUser.organisationalRole.id)
		{
		case 100:
			showProgramDirectorPage("content");
			break;
		case 200:
			showBranchManagerPage("content");
			break;
		case 300:
			showCoordinatorPage("content");
			break;
		case 400:
			showFieldAgentPage("content");
			break;
		default:
			showILClientListing("content");
		}
	}
}


function showProgramDirectorPage(divName) {

	var htmlVar = "Program Director Page";
	$("#" + divName).html(htmlVar);
}

function showBranchManagerPage(divName) {
	var htmlVar = "Branch Manager Page";
	$("#" + divName).html(htmlVar);
}

function showCoordinatorPage(divName) {
	var htmlVar = "Coordinator Page";
	$("#" + divName).html(htmlVar);
}

function showFieldAgentPage(divName) {
    var htmlVar = $("#quipoExampleGeneralDashboardTemplate").render();    
	$("#" + divName).html(htmlVar);

	fillRole_FieldAgent(mStaffUser.staffId, mStaffUser.staffDisplayName);
	fillRoleStats_FieldAgent(mStaffUser.staffId);
	fillList_FieldAgent(mStaffUser.staffId);                   

}

function fillRole_FieldAgent(id, name) {
	
	var data = {
					id: id,
					name: name
				}
	
    var htmlVar = $("#quipoExampleRoleFieldAgentTemplate").render(data);  
	$("#quipoExGenDashboardRole").html(htmlVar);
}

function fillRoleStats_FieldAgent(id) {
	
    var url = "runreports/FieldAgentStats?R_staffId=" + id + "&genericResultSet=false";
    
	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;	    
	    var htmlVar = $("#quipoExampleRoleStatsFieldAgentTemplate").render(obj);  
		$("#quipoExGenDashboardRoleStats").html(htmlVar);
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}

function fillList_FieldAgent(id) {

    var url = "runreports/FieldAgentPrograms?R_staffId=" + id + "&genericResultSet=false";
    
	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;	    
	    var htmlVar = $("#quipoExampleListFieldAgentTemplate").render(obj);  
		$("#quipoExGenDashboardList").html(htmlVar);
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}


function fillListDetails_FieldAgent(id) {

    var url = "runreports/FieldAgentProgramsDetails?R_programId=" + id + "&genericResultSet=false";
    
	var successFunction = function(data, textStatus, jqXHR) {
	    var obj = new Object();
	    obj.dataRows = data;	    
	    var htmlVar = $("#quipoExampleListDetailsFieldAgentTemplate").render(obj);  
		$("#quipoExGenDashboardListDetails").html(htmlVar);
	}
    executeAjaxRequest(url, 'GET', "", successFunction, formErrorFunction);
}
