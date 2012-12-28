
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


//over-ride out-of-the-box data table presentation functionality with CEDA specific one
	custom.datatablePresentation["M_CLIENT"] = {
												renderInfo: [
												             {
												            	 registeredTableName: "client additional data",
														         templateName: "#cedaadditionalclientdataFormTemplate",
														         itemDiv: "CEDA_ClientAdditionalDataTab",
														         itemDivLabel: "client.additional.data.tab.name"
												             }
												             ],
												exclude: []
											};
		
