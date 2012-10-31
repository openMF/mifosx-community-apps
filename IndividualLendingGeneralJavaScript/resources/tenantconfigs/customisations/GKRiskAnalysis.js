

//over-ride out-of-the-box data table functionality with GK specific one
showRelatedDataTableInfo = function (tabVar, appTableName, appTablePKValue) {	 

		var url = 'datatables?apptable=' + appTableName;

		var successFunction =  function(data, textStatus, jqXHR) {
				
				if (data.length > 0)
				{
//assume risk_analysis is one of the data tables and has been registered for m_client
//show client risk_analysis separate to other data tables
					if (appTableName == "m_client")
					{
						var riskAnalysisDiv = "ClientRiskAnalysisTab";
						tabVar.append("<div id=" + riskAnalysisDiv + "></div>");
						tabVar.tabs( "add", "#" + riskAnalysisDiv , doI18N("client.riskanalysis.tab.name"));
						refreshRiskAnalysis(appTablePKValue, riskAnalysisDiv);
					}
				//else if (tab.index == 3){
					//temporarily hardcoded at tab 3 (jpw)
					//refreshRiskAnalysis(appTablePKValue);
				//}
	//htmlVar += '<li><a href="nothing" title="clientriskanalysistab" class="topleveltab"><span id="clientriskanalysistabname">' + doI18N("client.riskanalysis.tab.name")  + '</span></a></li>';

					var datatablesDiv = appTableName + "_" + appTablePKValue + "_addData";
					tabVar.tabs( "add", "#" + datatablesDiv , doI18N("Additional.Data"));
					tabVar.tabs('select', 0); //back to main tab

					var additionalInfoParams = {
						baseApiUrl : baseApiUrl,
						base64: base64,
						tenantIdentifier: tenantIdentifier,
						appTableName: appTableName,
						appTablePKValue: appTablePKValue, 
						ignoreDatatableArray: ["risk_analysis"],
						globaliseFunctions: helperFunctions,
						resValue: "resources/libs/",

						datatablesDiv: datatablesDiv,
						labelClass: "datatableLabel",
						valueClass:	"",
						saveLabel: doI18N("dialog.button.save"),	
						cancelLabel: doI18N("dialog.button.cancel")				
					};
					jQuery.stretchyDataTables.displayAdditionalInfo(additionalInfoParams);

				}
			  };

		executeAjaxRequest(url, 'GET', "", successFunction, generalErrorFunction);	
	}



function refreshRiskAnalysis(clientId, riskAnalysisDiv) {

	var datatableUrl = 'datatables/risk_analysis/' + clientId;

	var templateSelector = "#clientRiskAnalysisFormTemplate";
	var width = 1100; 
	var height = 600;
				
	var saveSuccessFunction = function(data, textStatus, jqXHR) {
		$("#dialog-form").dialog("close");
		refreshRiskAnalysis(clientId, riskAnalysisDiv);
	}

	var successFunction =  function(data, textStatus, jqXHR) {
			var crudObject = new Object();
			var tableHtml = "";

			if (data.length > 0)
			{
				crudObject.crudRows = data;
				crudObject.crudRows[0].displayMode = "view";
				crudObject.crudRows[0].displayButtons = "editDelete";
				tableHtml = $(templateSelector).render(crudObject.crudRows[0]);
			}
			else
			{
				crudObject.displayMode = "view";
				crudObject.displayButtons = "add";
				tableHtml = $(templateSelector).render(crudObject);
			}
			$("#" + riskAnalysisDiv).html(tableHtml);

			//initialize all buttons
			$("#editclientriskanalysis").button({icons: {
	                primary: "ui-icon-pencil"}}
	                ).click(function(e){
					popupDialogWithFormView(datatableUrl, datatableUrl, 'PUT', "dialog.title.edit.risk.analysis", templateSelector, width, height,  saveSuccessFunction);
				    	e.preventDefault();
			      });
			$("#deleteclientriskanalysis").button({icons: {
	                primary: "ui-icon-circle-close"}
	            	}).click(function(e) {									
					popupConfirmationDialogAndPost(datatableUrl, 'DELETE', 'dialog.title.confirmation.required', 400, 225, 0, saveSuccessFunction);
					e.preventDefault();
				});

			$('#addclientriskanalysis').button({icons: {
	                primary: "ui-icon-plusthick"}
	            	}).click(function(e) {
					popupDialogWithFormView("", datatableUrl, 'POST', "dialog.title.create.risk.analysis", templateSelector, width, height,  saveSuccessFunction);
			    		e.preventDefault();
			});
		}

  		executeAjaxRequest(datatableUrl, 'GET', "", successFunction, formErrorFunction);	  
}










//GK specific risk analysis code for validating and calculating derived field values
function gkRiskAnalysisCalc(){

	var calc;

	if (validRAData("#entityform", "#formerrors") == false)
	{
		return false;
	}
	else
	{
		calc = amountRA("assets_cash") + amountRA("assets_bank_accounts") + amountRA("assets_accounts_receivable") + amountRA("assets_inventory") + amountRA("assets_total_fixed_business");
		$("#assets_total_business").val(Globalize.format(calc, "n2"));

		calc = amountRA("assets_total_business") - amountRA("liabilities_total_business");
		$("#liabilities_equity_working_capital").val(Globalize.format(calc, "n2"));

		calc = amountRA("assets_total_household") - amountRA("liabilities_total_household");
		$("#liabilities_household_equity").val(Globalize.format(calc, "n2"));

		calc = (amountRA("cashflow_cash_sales") + amountRA("cashflow_cash_sales2")) - (amountRA("cashflow_cost_goods_sold") + amountRA("cashflow_cost_goods_sold2"));
		$("#cashflow_gross_profit").val(Globalize.format(calc, "n2"));

		calc = (amountRA("cashflow_gross_profit") + amountRA("cashflow_other_income1") + amountRA("cashflow_total_income2")) - (amountRA("cashflow_household_expense") + amountRA("cashflow_payments_to_savings") + amountRA("cashflow_operational_expenses"));
		$("#cashflow_disposable_income").val(Globalize.format(calc, "n2"));

		calc = amountRA("cashflow_disposable_income") - amountRA("cashflow_amount_loan_installment");
		$("#cashflow_available_surplus").val(Globalize.format(calc, "n2"));

		if (amountRA("assets_inventory") != 0.0)
		{
			calc = amountRA("cashflow_cost_goods_sold") / amountRA("assets_inventory");
			$("#fi_inventory_turnover").val(Globalize.format(calc, "n2"));
		}
		else $("#fi_inventory_turnover").val("");

		if (amountRA("cashflow_cash_sales") != 0.0)
		{
			calc = (amountRA("cashflow_cash_sales") + amountRA("cashflow_cash_sales2") - amountRA("cashflow_cost_goods_sold")) / amountRA("cashflow_cash_sales");
			$("#fi_gross_margin").val(Globalize.format(calc, "n2"));
		}
		else $("#fi_gross_margin").val("");

		if (amountRA("liabilities_equity_working_capital") != 0.0)
		{
			calc = amountRA("liabilities_total_business") / amountRA("liabilities_equity_working_capital");
			$("#fi_indebtedness").val(Globalize.format(calc, "n2"));

			calc = (amountRA("liabilities_total_business") + amountRA("proposed_loan_amount") ) / amountRA("liabilities_equity_working_capital");
			$("#fi_loan_recommendation").val(Globalize.format(calc, "n2"));

			calc = amountRA("cashflow_gross_profit") / amountRA("liabilities_equity_working_capital");
			$("#fi_roe").val(Globalize.format(calc, "n2"));
		}
		else 
		{
			$("#fi_indebtedness").val("");
			$("#fi_loan_recommendation").val("");
			$("#fi_roe").val("");
		}

		if (amountRA("cashflow_disposable_income") != 0.0)
		{
			calc = amountRA("cashflow_amount_loan_installment") / amountRA("cashflow_disposable_income");
			$("#fi_repayment_capacity").val(Globalize.format(calc, "n2"));
		}
		else $("#fi_repayment_capacity").val("");

	}
	return true;
} 

function amountRA(idName) {
	
	var currentVal = $.trim($("#" + idName).val());
	if (!(currentVal > "")) currentVal = 0.00;
	return Globalize.parseFloat(currentVal);
}

function validRAData(formDiv, formErrorsDiv) {

	// get all the input fields except 'locale'
	var IDs = [];
	$(formDiv).find("input").each(function(){ if (this.id != 'locale') IDs.push(this.id); });

	$(formErrorsDiv).html("");
	var currentId = "";
	for (var i in IDs)
	{
		currentId = "#" + IDs[i];
	      $(currentId).removeClass("ui-state-error"); // clear error highlight if there
	}

  	var num="";
	var currentVal = "";
	for (var i in IDs)
	{
		currentId = "#" + IDs[i];
		//alert(currentId + " - " + $(currentId).val());
		currentVal = $.trim($(currentId).val());
		if (currentVal > "")
		{
			num = Globalize.parseFloat($(currentId).val());
			if (isNaN(num)) 
			{
				jsError(currentId, formErrorsDiv, "not.a.number");
				return false;
			}
			else
			{
				$(currentId).val(Globalize.format(num, "n2"));
			}
		}
	}
	return true;
}

function jsError(fieldName, formErrorsDiv, formErrorMsg) {
	$(fieldName).addClass("ui-state-error");	

	var errorHtml = '<div class="ui-widget">';
	errorHtml += '	<div class="ui-state-error ui-corner-all">';
	errorHtml += '		<span class="ui-icon ui-icon-alert" style="float: left; margin-right: 5px;" ></span>';
	errorHtml += '		<div style="margin-left: 5px;">';
	errorHtml += '			<div><em>' + doI18N(formErrorMsg) + '</em></div>';
	errorHtml += '		</div>';
	errorHtml += ' </div>';
	errorHtml += '</div>';

	$(formErrorsDiv).html(errorHtml );
}
