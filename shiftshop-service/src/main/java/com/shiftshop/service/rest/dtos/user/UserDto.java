package com.shiftshop.service.rest.dtos.user;

import java.util.Set;

public class UserDto {

	private Long id;
	private String userName;
	private Set<String> roles;

	public UserDto() {}

	public UserDto(Long id, String userName, Set<String> roles) {

		this.id = id;
		this.userName = userName != null ? userName.trim() : null;
		this.roles = roles;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName.trim();
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> role) {
		this.roles = role;
	}

}
