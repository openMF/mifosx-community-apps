
//over-ride out-of-the-box data table presentation functionality for m_client with CEDA specific one
		custom.datatablePresentation["M_CLIENT"].renderInfo.push(
																{
												            	 registeredTableName: "client additional data",
												            	 type: "template",
														         templateName: "ceda_client_additional_data_template",
														         itemDiv: "ceda_client_additional_data_tab",
														         itemDivLabel: "client.additional.data.tab.name"
																});
		
