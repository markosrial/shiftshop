package com.shiftshop.service.rest.dtos.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticatedUserDto {

	private String serviceToken;
	private UserLoggedDto userLoggedDto;

	public AuthenticatedUserDto() {}

	public AuthenticatedUserDto(String serviceToken, UserLoggedDto userLoggedDto) {

		this.serviceToken = serviceToken;
		this.userLoggedDto = userLoggedDto;

	}

	public String getServiceToken() {
		return serviceToken;
	}

	public void setServiceToken(String serviceToken) {
		this.serviceToken = serviceToken;
	}

	@JsonProperty("user")
	public UserLoggedDto getUserLoggedDto() {
		return userLoggedDto;
	}

	public void setUserLoggedDto(UserLoggedDto userLoggedDto) {
		this.userLoggedDto = userLoggedDto;
	}

}
