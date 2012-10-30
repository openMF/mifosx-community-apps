
//alert("hi there in the default");
/*
crudDatax = {
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
			}
		};

bbbb =  function(data, textStatus, jqXHR) {
						  	$("#dialog-form").dialog("close");
		  					showILClient(currentClientId );
				  		};

function yada() { 
}
*/







//GK specific risk analysis code
function gkRiskAnalysisCalc(){

	var calc;

	if (validRAData("#RAentityform", "#RAformerrors") == false)
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
