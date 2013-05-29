

//over-ride show first page
custom.showFirstPage = function() {
	
	if (mOrganisationalRole == undefined) {
		showILClientListing("content");
	}
	else 
	{
		switch(mOrganisationalRole.id)
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
	var htmlVar = "Field Agent Page";
	$("#" + divName).html(htmlVar);
}

