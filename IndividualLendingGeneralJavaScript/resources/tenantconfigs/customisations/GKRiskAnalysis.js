
	custom.helperFunctions.GKRA_MakeAmountInputField = function(fieldName, fieldValue, displayMode, fieldType) {
			      try {
					var amountInputFieldHtml = "<input ";
			  		if (displayMode == "view")
					{
						amountInputFieldHtml  += ' class="rightreadonly" readonly="readonly" ';
					}
					else
					{
						if (fieldType == "calc")
						{
							amountInputFieldHtml  += ' class="rightreadonly" readonly="readonly" id="' + fieldName + '" name="' + fieldName + '" title="" ';
						}
						else
						{
							amountInputFieldHtml  += ' class="right" onchange="GKRA.RiskAnalysisCalc();" id="' + fieldName + '" name="' + fieldName + '" title="" ';
						}
			  		}

					var currentVal = $.trim(fieldValue);
					if (!(currentVal > "")) currentVal = 0.00;
					currentVal = parseFloat(currentVal);
					var currentValGlobal = Globalize.format(currentVal, "n2");
					amountInputFieldHtml += ' style="width: 100px;" value="' + currentValGlobal + '" />';
					return amountInputFieldHtml;
			      } catch(e) {
			        return "System Error: GKRA_MakeAmountInputField - fieldName: " + fieldName + "  fieldValue: " + fieldValue + "   displayMode: " + displayMode;
			      }
			};


//over-ride out-of-the-box data table functionality with GK specific one
	custom.datatablePresentation["M_CLIENT"].renderInfo.push(
																{
																	registeredTableName: "risk_analysis",
													            	type: "user-defined",
																    itemDiv: "GKRA_ClientRiskAnalysisTab",
																    itemDivLabel: "client.riskanalysis.tab.name",
																    itemFunction: "GKRA.refreshRiskAnalysis(PKValue, itemDiv)"
																});

GKRA = {};

GKRA.refreshRiskAnalysis = function (clientId, riskAnalysisDiv) {
	
	var datatableUrl = 'datatables/risk_analysis/' + clientId;

	var templateSelector = "#clientRiskAnalysisFormTemplate";
	var width = 1100; 
	var height = 600;
				
	var saveSuccessFunction = function(data, textStatus, jqXHR) {
		$("#dialog-form").dialog("close");
		GKRA.refreshRiskAnalysis(clientId, riskAnalysisDiv);
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
};


//GK specific risk analysis code for validating and calculating derived field values
GKRA.RiskAnalysisCalc = function(){

	var calc;

	if (GKRA.validRAData("#entityform", "#formerrors") == false)
	{
		return false;
	}
	else
	{
		calc = GKRA.amountRA("assets_cash") + GKRA.amountRA("assets_bank_accounts") + GKRA.amountRA("assets_accounts_receivable") + GKRA.amountRA("assets_inventory") + GKRA.amountRA("assets_total_fixed_business");
		$("#assets_total_business").val(Globalize.format(calc, "n2"));

		calc = GKRA.amountRA("assets_total_business") - GKRA.amountRA("liabilities_total_business");
		$("#liabilities_equity_working_capital").val(Globalize.format(calc, "n2"));

		calc = GKRA.amountRA("assets_total_household") - GKRA.amountRA("liabilities_total_household");
		$("#liabilities_household_equity").val(Globalize.format(calc, "n2"));

		calc = (GKRA.amountRA("cashflow_cash_sales") + GKRA.amountRA("cashflow_cash_sales2")) - (GKRA.amountRA("cashflow_cost_goods_sold") + GKRA.amountRA("cashflow_cost_goods_sold2"));
		$("#cashflow_gross_profit").val(Globalize.format(calc, "n2"));

		calc = (GKRA.amountRA("cashflow_gross_profit") + GKRA.amountRA("cashflow_other_income1") + GKRA.amountRA("cashflow_total_income2")) - (GKRA.amountRA("cashflow_household_expense") + GKRA.amountRA("cashflow_payments_to_savings") + GKRA.amountRA("cashflow_operational_expenses"));
		$("#cashflow_disposable_income").val(Globalize.format(calc, "n2"));

		calc = GKRA.amountRA("cashflow_disposable_income") - GKRA.amountRA("cashflow_amount_loan_installment");
		$("#cashflow_available_surplus").val(Globalize.format(calc, "n2"));

		if (GKRA.amountRA("assets_inventory") != 0.0)
		{
			calc = GKRA.amountRA("cashflow_cost_goods_sold") / GKRA.amountRA("assets_inventory");
			$("#fi_inventory_turnover").val(Globalize.format(calc, "n2"));
		}
		else $("#fi_inventory_turnover").val("");

		if (GKRA.amountRA("cashflow_cash_sales") != 0.0)
		{
			calc = (GKRA.amountRA("cashflow_cash_sales") + GKRA.amountRA("cashflow_cash_sales2") - GKRA.amountRA("cashflow_cost_goods_sold")) / GKRA.amountRA("cashflow_cash_sales");
			$("#fi_gross_margin").val(Globalize.format(calc, "n2"));
		}
		else $("#fi_gross_margin").val("");

		if (GKRA.amountRA("liabilities_equity_working_capital") != 0.0)
		{
			calc = GKRA.amountRA("liabilities_total_business") / GKRA.amountRA("liabilities_equity_working_capital");
			$("#fi_indebtedness").val(Globalize.format(calc, "n2"));

			calc = (GKRA.amountRA("liabilities_total_business") + GKRA.amountRA("proposed_loan_amount") ) / GKRA.amountRA("liabilities_equity_working_capital");
			$("#fi_loan_recommendation").val(Globalize.format(calc, "n2"));

			calc = GKRA.amountRA("cashflow_gross_profit") / GKRA.amountRA("liabilities_equity_working_capital");
			$("#fi_roe").val(Globalize.format(calc, "n2"));
		}
		else 
		{
			$("#fi_indebtedness").val("");
			$("#fi_loan_recommendation").val("");
			$("#fi_roe").val("");
		}

		if (GKRA.amountRA("cashflow_disposable_income") != 0.0)
		{
			calc = GKRA.amountRA("cashflow_amount_loan_installment") / GKRA.amountRA("cashflow_disposable_income");
			$("#fi_repayment_capacity").val(Globalize.format(calc, "n2"));
		}
		else $("#fi_repayment_capacity").val("");

	}
	return true;
};

GKRA.amountRA = function(idName) {
	
	var currentVal = $.trim($("#" + idName).val());
	if (!(currentVal > "")) currentVal = 0.00;
	return Globalize.parseFloat(currentVal);
};

GKRA.validRAData = function(formDiv, formErrorsDiv) {

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
				GKRA.jsError(currentId, formErrorsDiv, "not.a.number");
				return false;
			}
			else
			{
				$(currentId).val(Globalize.format(num, "n2"));
			}
		}
	}
	return true;
};

GKRA.jsError = function(fieldName, formErrorsDiv, formErrorMsg) {
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
};


