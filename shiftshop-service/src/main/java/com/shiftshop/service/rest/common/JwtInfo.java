package com.shiftshop.service.rest.common;

import java.util.Set;

public class JwtInfo {

	private Long userId;
	private String userName;
	private Set<String> roles;

	public JwtInfo(Long userId, String userName, Set<String> roles) {

		this.userId = userId;
		this.userName = userName;
		this.roles = roles;

	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

}
