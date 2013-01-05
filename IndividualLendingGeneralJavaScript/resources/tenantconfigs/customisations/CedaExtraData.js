//over-ride out-of-the-box data table presentation functionality for m_client with CEDA specific one

custom.datatablePresentation["M_CLIENT"].renderInfo.push({
	registeredTableName : "client additional data",
	type : "template",
	templateName : "ceda_client_additional_data_template",
	itemDiv : "ceda_client_additional_data_tab",
	itemDivLabel : "client.additional.data.tab.name",
	onLoadForm : "CEDA_Functions.onLoadForm()",
	onLoadForm : "CEDA_Functions.onLoadForm()"
});

CEDA_Functions = {};

CEDA_Functions.onLoadForm = function() {

	CEDA_Functions.onChangeEmployed();
	CEDA_Functions.onChangeSelfEmployed();
	CEDA_Functions.onChangeLoansOther();

	$("#Date_of_Birth").datepicker('option', 'yearRange', "-100:-10");
}
// Column Names are used as the html tag id of the input elements
// Spaces are converted to underscores but other non alphanumeric characters
// aren't valid for a column name because they are not valid for a html tag id
CEDA_Functions.onChangeEmployed = function() {

	var tmp = $("#YesNo_cd_Employed option:selected").attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#FieldOfEmployment_cd_Field_of_employment").attr('disabled', disabled);
	$("#Employer_name").attr('disabled', disabled);
	$("#Number_of_years").attr('disabled', disabled);
	$("#Monthly_salary").attr('disabled', disabled);
}

CEDA_Functions.onChangeSelfEmployed = function() {

	var tmp = $("#YesNo_cd_Self_employed option:selected").attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#FieldOfEmployment_cd_Field_of_self-employment").attr('disabled',
			disabled);
	$("#Business_address").attr('disabled', disabled);
	$("#Number_of_employees").attr('disabled', disabled);
	$("#Monthly_salaries_paid").attr('disabled', disabled);
	$("#Monthly_net_income_of_business_activity").attr('disabled', disabled);
	$("#Monthly_rent").attr('disabled', disabled);
	$("#Other_income_generating_activities").attr('disabled', disabled);
	$("#YesNo_cd_Bookkeeping").attr('disabled', disabled);
}

CEDA_Functions.onChangeLoansOther = function() {

	var tmp = $("#YesNo_cd_Loans_with_other_institutions option:selected")
			.attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#From_whom").attr('disabled', disabled);
	$("#Amount").attr('disabled', disabled);
	$("#Interest_rate_pa").attr('disabled', disabled);
}
