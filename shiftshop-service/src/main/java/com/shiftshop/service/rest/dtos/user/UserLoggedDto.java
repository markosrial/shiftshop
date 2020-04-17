package com.shiftshop.service.rest.dtos.user;

import java.util.Set;

public class UserLoggedDto {

	private Long id;
	private String userName;
	private String name;
	private Set<String> roles;

	public UserLoggedDto() {}

	public UserLoggedDto(Long id, String userName, String name, Set<String> roles) {

		this.id = id;
		this.userName = userName;
		this.name = name;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name.trim();
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> role) {
		this.roles = role;
	}

}
