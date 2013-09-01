package com.rhok.mifosxmobile;

public class Client {
	
	private String keyId; 
	
	private String clientId; 
	
	private String officeId;
	
	private String firstName;
	
	private String lastName;

	private String joinedDate;
	
	private boolean existsOnServer; 

	public String getOfficeId() {
		return officeId;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getJoinedDate() {
		return joinedDate;
	}

	public void setJoinedDate(String joinedDate) {
		this.joinedDate = joinedDate;
	}

	public boolean isExistsOnServer() {
		return existsOnServer;
	}

	public void setExistsOnServer(boolean existsOnServer) {
		this.existsOnServer = existsOnServer;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getKeyId() {
		return keyId;
	}

	public void setKeyId(String keyId) {
		this.keyId = keyId;
	}
	
}
