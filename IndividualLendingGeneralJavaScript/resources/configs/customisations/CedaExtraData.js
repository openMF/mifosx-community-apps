//over-ride out-of-the-box data table presentation functionality for m_client with CEDA specific one

custom.datatablePresentation["M_CLIENT"].renderInfo.push({
	registeredTableName : "client additional data",
	type : "template",
	templateName : "ceda_client_additional_data_template",
	itemDiv : "ceda_client_additional_data_tab",
	itemDivLabel : "client additional data",
	onLoadForm : "CEDA_Functions.onLoadFormCAD()"
});

custom.datatablePresentation["M_LOAN"].renderInfo.push({
	registeredTableName : "loan additional data",
	type : "template",
	templateName : "ceda_loan_additional_data_template",
	itemDiv : "ceda_loan_additional_data_tab",
	itemDivLabel : "loan additional data",
	onLoadForm : "CEDA_Functions.onLoadFormLAD()",
});

custom.datatablePresentation["M_LOAN"].renderInfo.push({
	registeredTableName : "impact measurement",
	type : "template",
	templateName : "ceda_impact_measurement_template",
	itemDiv : "ceda_impact_measurement_tab",
	itemDivLabel : "impact measurement",
	onLoadForm : "CEDA_Functions.onLoadFormIM()",
});

//Notes: Column Names are used as the html tag id of the input elements
//Spaces are converted to underscores but other non alphanumeric characters
//aren't valid for a column name because they are not valid for a html tag id
CEDA_Functions = {};

CEDA_Functions.onLoadFormLAD = function() {
	
	CEDA_Functions.onChangeLADGuarantor();
}

CEDA_Functions.onChangeLADGuarantor = function() {

	var tmp = $("#YesNo_cd_Guarantor option:selected").attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#Guarantor_name").attr('disabled', disabled);
	$("#Guarantor_relation").attr('disabled', disabled);
	$("#Guarantor_address").attr('disabled', disabled);
	$("#Guarantor_telephone_number").attr('disabled', disabled);
}

CEDA_Functions.onLoadFormIM = function() {

	CEDA_Functions.onChangeIMRepaid();
	CEDA_Functions.onChangeIMJobs();
}

CEDA_Functions.onChangeIMRepaid = function() {

	var tmp = $("#YesNo_cd_RepaidOnSchedule option:selected").attr("I18NValue");
	var disabled = true;
	if (tmp == "option.No")
		disabled = false;

	$("#ReasonNotRepaidOnSchedule").attr('disabled', disabled);
	
}

CEDA_Functions.onChangeIMJobs = function() {

	var tmp = $("#YesNo_cd_NewJobsCreated option:selected").attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#Number_of_Jobs_Created").attr('disabled', disabled);
}

CEDA_Functions.onLoadFormCAD = function() {

	CEDA_Functions.onChangeCADEmployed();
	CEDA_Functions.onChangeCADSelfEmployed();
	CEDA_Functions.onChangeCADLoansOther();

	$("#Date_of_Birth").datepicker('option', 'yearRange', "-100:-10");
}

CEDA_Functions.onChangeCADEmployed = function() {

	var tmp = $("#YesNo_cd_Employed option:selected").attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#FieldOfEmployment_cd_Field_of_employment").attr('disabled', disabled);
	$("#Employer_name").attr('disabled', disabled);
	$("#Number_of_years").attr('disabled', disabled);
	$("#Monthly_salary").attr('disabled', disabled);
}

CEDA_Functions.onChangeCADSelfEmployed = function() {

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

CEDA_Functions.onChangeCADLoansOther = function() {

	var tmp = $("#YesNo_cd_Loans_with_other_institutions option:selected")
			.attr("I18NValue");
	var disabled = true;
	if (tmp == "option.Yes")
		disabled = false;

	$("#From_whom").attr('disabled', disabled);
	$("#Amount").attr('disabled', disabled);
	$("#Interest_rate_pa").attr('disabled', disabled);
}
