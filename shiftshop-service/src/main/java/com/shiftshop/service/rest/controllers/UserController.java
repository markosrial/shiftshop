package com.shiftshop.service.rest.controllers;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.User.RoleType;
import com.shiftshop.service.model.services.*;
import com.shiftshop.service.rest.common.JwtGenerator;
import com.shiftshop.service.rest.common.JwtInfo;
import com.shiftshop.service.rest.dtos.common.BlockDto;
import com.shiftshop.service.rest.dtos.common.ErrorConversor;
import com.shiftshop.service.rest.dtos.common.ErrorsDto;
import com.shiftshop.service.rest.dtos.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;

import static com.shiftshop.service.rest.dtos.user.UserConversor.*;

@RestController
@RequestMapping("/users")
public class UserController {

	private static final String INCORRECT_LOGIN_EXCEPTION_CODE = "project.exceptions.IncorrectLoginException";
	private static final String USER_NOT_ACTIVE_EXCEPTION_CODE = "project.exceptions.UserNotActiveException";
	private static final String NO_USER_ROLES_EXCEPTION_CODE = "project.exceptions.NoUserRolesException";
	private static final String BLOCK_USER_EXCEPTION_CODE = "project.exceptions.BlockUserException";

	@Autowired
	private ErrorConversor errorConversor;

	@Autowired
	private JwtGenerator jwtGenerator;

	@Autowired
	private UserService userService;

	// Exception handlers

	@ExceptionHandler(IncorrectLoginException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleIncorrectLoginException(IncorrectLoginException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromException(INCORRECT_LOGIN_EXCEPTION_CODE, locale);
	}

	@ExceptionHandler(UserNotActiveException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleUserNotActiveException(UserNotActiveException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromException(USER_NOT_ACTIVE_EXCEPTION_CODE, locale);
	}

	@ExceptionHandler(NoUserRolesException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleNoUserRolesException(NoUserRolesException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromException(NO_USER_ROLES_EXCEPTION_CODE, locale);
	}

	@ExceptionHandler(BlockUserException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleBlockUserException(BlockUserException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromException(BLOCK_USER_EXCEPTION_CODE, locale);
	}

	// Controller methods

	@GetMapping("/roles")
	public List<RoleDto> getUserRoles() {
		return toRoleDtos(Arrays.asList(RoleType.values()));
	}

	@PostMapping
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void registerUser(
			@Validated({InsertUserParamsDto.AddValidations.class}) @RequestBody InsertUserParamsDto user)
			throws DuplicateInstancePropertyException, NoUserRolesException {
		userService.registerUser(
				new User(user.getUserName(), user.getPassword(),
						user.getName(), user.getSurnames(), user.getRoles()));
	}

	@PostMapping("/login")
	public AuthenticatedUserDto login(@Validated @RequestBody LoginParamsDto params)
			throws IncorrectLoginException, UserNotActiveException {

		User user = userService.login(params.getUserName(), params.getPassword());

		return toAuthenticatedUserDto(generateServiceToken(user), user);

	}

	@PostMapping("/loginFromServiceToken")
	public AuthenticatedUserDto loginFromServiceToken(
			@RequestAttribute Long userId,
			@RequestAttribute String serviceToken)
			throws InstanceNotFoundException, UserNotActiveException {

		User user = userService.loginFromId(userId);

		return toAuthenticatedUserDto(serviceToken, user);

	}

	@GetMapping
	public BlockDto<UserDto> getUsers(
			@RequestParam(defaultValue = "true", required = false) boolean onlyActive,
			@RequestParam(defaultValue = "0", required = false) @Min(0) int page,
			@RequestParam(defaultValue = "15", required = false) @Min(0) int size) {

		Block<User> userBlock = userService.getUsers(onlyActive, page, size);

		return new BlockDto<>(toUserDtos(userBlock.getItems()), userBlock.getExistMoreItems());

	}

	@PutMapping("/{id}")
	public UserDto updateUser(@PathVariable Long id,
							  @Validated @RequestBody InsertUserParamsDto updateUser)
			throws NoUserRolesException, InstanceNotFoundException {
		return toUserDto(userService.updateUser(id, updateUser.getName(), updateUser.getSurnames(),
				updateUser.getRoles()));
	}

	@PutMapping("/{id}/active")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void setActiveUser(@PathVariable Long id) throws BlockUserException, InstanceNotFoundException {
		userService.setActiveUser(id, true);
	}

	@PutMapping("/{id}/inactive")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void setInactiveUser(@PathVariable Long id) throws BlockUserException, InstanceNotFoundException {
		userService.setActiveUser(id, false);
	}

	private String generateServiceToken(User user) {

		HashSet<String> userRoles = new HashSet<>();
		user.getRoles().forEach(role -> userRoles.add(role.name()));

		JwtInfo jwtInfo = new JwtInfo(user.getId(), user.getUserName(), userRoles);

		return jwtGenerator.generate(jwtInfo);

	}

}
