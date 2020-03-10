package com.shiftshop.service.rest.dtos.user;

import com.shiftshop.service.model.entities.User;

import java.util.stream.Collectors;

public class UserConversor {

	private UserConversor() {}

	public static final UserDto toUserDto(User user) {
		return new UserDto(user.getId(), user.getUserName(),
				user.getRoles().stream().map(role -> role.name()).collect(Collectors.toSet()));
	}

	public static final AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		return new AuthenticatedUserDto(serviceToken, toUserDto(user));
	}

}
