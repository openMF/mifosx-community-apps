
	custom.helperFunctions.GKRA_MakeAmountInputFieldxxx = function(fieldName, fieldValue, displayMode, fieldType) {
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


	custom.helperFunctions.getDataTableFieldEntry = function(data, rowNum, fieldName, displayMode) {

				return jQuery.stretchyDataTables.getDataTableFieldEntry(data, rowNum, fieldName, displayMode);
			};

	custom.helperFunctions.getDataTableFieldValueEntry = function(data, rowNum, fieldName, displayMode) {

				return jQuery.stretchyDataTables.getDataTableFieldValueEntry(data, rowNum, fieldName, displayMode);
			};




//over-ride out-of-the-box data table functionality with GK specific one
	custom.showRelatedDataTableInfo = function (tabVar, appTableName, appTablePKValue) {	 

		var url = 'datatables?apptable=' + appTableName;

		var successFunction =  function(data, textStatus, jqXHR) {
				
				if (data.length > 0)
				{
					var datatableArray = [];
					var datatableInfo = {};		
					datatableInfo.applicationTableName = appTableName;

					switch (appTableName) {	
					case "m_client":
					//show customised data tables seperately
						var itemDiv = "CEDA_ClientAdditionalDataTab";
						tabVar.append("<div id=" + itemDiv + "></div>");
						//jpw tabVar.tabs( "add", "#" + itemDiv , doI18N("client.additional.data.tab.name"));
						datatableInfo.registeredTableName = "client additional data";
						datatableInfo.itemDiv = itemDiv;
						datatableInfo.templateName = "#cedaadditionalclientdataFormTemplate";
						//jpw datatableArray.push(datatableInfo);

						var defaultItemFound = false;
						for (var i in data)
						{
							if (data[i].registeredTableName != "client additional datajpw") 
							{
								datatableArray.push(data[i]);
								defaultItemFound = true;
							}
						}
						break;
					case "m_loan": //exclude m_guarantor_external from default m_loan data table display
						for (var i in data)
						{
							if (data[i].registeredTableName != "m_guarantor_external") datatableArray.push(data[i])
						}
						break;
					default:
						datatableArray = data;
					}

					var datatablesDiv = "N/A";
					if (defaultItemFound == true)
					{
						datatablesDiv = appTableName + "_" + appTablePKValue + "_addData";
						tabVar.tabs( "add", "#" + datatablesDiv , doI18N("Additional.Data"));
					}

					tabVar.tabs('select', 0); //back to main tab
					var additionalInfoParams = {
						baseApiUrl : baseApiUrl,
						base64: base64,
						tenantIdentifier: tenantIdentifier,
						appTableName: appTableName,
						appTablePKValue: appTablePKValue, 
						datatableArray: datatableArray,
						globaliseFunctions: custom.helperFunctions,
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


