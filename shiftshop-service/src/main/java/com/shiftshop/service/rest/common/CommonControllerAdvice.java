package com.shiftshop.service.rest.common;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.services.PermissionException;
import com.shiftshop.service.rest.dtos.common.ErrorConversor;
import com.shiftshop.service.rest.dtos.common.ErrorsDto;
import com.shiftshop.service.rest.dtos.common.FieldErrorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@ControllerAdvice
public class CommonControllerAdvice {

	private static final String DUPLICATE_INSTANCE_PROPERTY_EXCEPTION_CODE = "project.exceptions.DuplicateInstancePropertyException";
	private static final String INSTANCE_NOT_FOUND_EXCEPTION_CODE = "project.exceptions.InstanceNotFoundException";
	private static final String INSTANCE_PROPERTY_NOT_FOUND_EXCEPTION_CODE = "project.exceptions.InstancePropertyNotFoundException";
	private static final String PERMISSION_EXCEPTION_CODE = "project.exceptions.PermissionException";

	@Autowired
	private ErrorConversor errorConversor;

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {

		List<FieldErrorDto> fieldErrors = exception.getBindingResult().getFieldErrors().stream()
			.map(error -> new FieldErrorDto(error.getField(), error.getDefaultMessage())).collect(Collectors.toList());

		return new ErrorsDto(fieldErrors);

	}

	@ExceptionHandler(DuplicateInstancePropertyException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public ErrorsDto handleDuplicateInstancePropertyException(DuplicateInstancePropertyException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromInstancePropertyException(exception, DUPLICATE_INSTANCE_PROPERTY_EXCEPTION_CODE, locale);
	}

	@ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleInstanceNotFoundException(InstanceNotFoundException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromInstanceException(exception, INSTANCE_NOT_FOUND_EXCEPTION_CODE, locale);
	}

	@ExceptionHandler(InstancePropertyNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleInstancePropertyNotFoundException(InstancePropertyNotFoundException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromInstancePropertyException(exception, INSTANCE_PROPERTY_NOT_FOUND_EXCEPTION_CODE, locale);
	}

	@ExceptionHandler(PermissionException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public ErrorsDto handlePermissionException(PermissionException exception, Locale locale) {
		return errorConversor.toErrorsDtoFromException(PERMISSION_EXCEPTION_CODE, locale);
	}

}
