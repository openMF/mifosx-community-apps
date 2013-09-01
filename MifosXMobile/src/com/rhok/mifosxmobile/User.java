package com.rhok.mifosxmobile;

public class User {

	private String username;
	
	private String userId;
	
	private String base64AuthenticationKey;
	
	private boolean authenticated;
	
	private String[] permissions;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getBase64AuthenticationKey() {
		return base64AuthenticationKey;
	}

	public void setBase64AuthenticationKey(String base64AuthenticationKey) {
		this.base64AuthenticationKey = base64AuthenticationKey;
	}

	public boolean isAuthenticated() {
		return authenticated;
	}

	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}

	public String[] getPermissions() {
		return permissions;
	}

	public void setPermissions(String[] permissions) {
		this.permissions = permissions;
	}
}
