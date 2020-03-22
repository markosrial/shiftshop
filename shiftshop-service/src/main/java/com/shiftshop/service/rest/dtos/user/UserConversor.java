package com.shiftshop.service.rest.dtos.user;

import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.User.RoleType;

import java.util.List;
import java.util.stream.Collectors;

public class UserConversor {

	private UserConversor() {}

	public static final UserLoggedDto toUserLoggedDto(User user) {
		return new UserLoggedDto(user.getId(), user.getUserName(), user.getName(),
				user.getRoles().stream().map(role -> role.name()).collect(Collectors.toSet()));
	}

	public static final AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		return new AuthenticatedUserDto(serviceToken, toUserLoggedDto(user));
	}

	public static final RoleDto toRoleDto(RoleType role) {
		return new RoleDto(role.ordinal(), role.name());
	}

	public static final List<RoleDto> toRoleDtos(List<RoleType> roles) {
		return roles.stream().map(r -> toRoleDto(r)).collect(Collectors.toList());
	}

	public static final UserSummaryDto toUserSummaryDto(User user) {
		return new UserSummaryDto(user.getId(), user.getName(), user.getSurnames());
	}

	public static final List<UserSummaryDto> toUserSummaryDtos(List<User> users) {
		return users.stream().map(u -> toUserSummaryDto(u)).collect(Collectors.toList());
	}

	public static final UserDto toUserDto(User user) {
		return new UserDto(user.getId(), user.getUserName(), user.getName(), user.getSurnames(),
				user.getRoles().stream().map(role -> role.ordinal()).collect(Collectors.toSet()));
	}

	public static final List<UserDto> toUserDtos(List<User> users) {
		return users.stream().map(u -> toUserDto(u)).collect(Collectors.toList());
	}

}
