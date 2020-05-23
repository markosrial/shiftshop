package com.shiftshop.service.rest.dtos.user;

import java.util.Set;

public class UserDto {

	private Long id;
	private String userName;
	private String name;
	private String surnames;
	private boolean active;
	private Set<Integer> roles;

	public UserDto() {}

	public UserDto(Long id, String userName, String name, String surnames,
				   boolean active, Set<Integer> roles) {

		this.id = id;
		this.userName = userName;
		this.name = name;
		this.surnames = surnames;
		this.active = active;
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
		this.userName = userName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurnames() {
		return surnames;
	}

	public void setSurnames(String surnames) {
		this.surnames = surnames;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Set<Integer> getRoles() {
		return roles;
	}

	public void setRoles(Set<Integer> role) {
		this.roles = role;
	}

}
