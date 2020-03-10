package com.shiftshop.service.rest.dtos.common;

import org.springframework.util.StringUtils;

import java.util.List;

public class ErrorsDto {

	private String globalError;
	private List<FieldErrorDto> fieldErrors;

	public ErrorsDto(String globalError) {
		setGlobalError(globalError);
	}

	public ErrorsDto(List<FieldErrorDto> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}

	public String getGlobalError() {
		return globalError;
	}

	public void setGlobalError(String globalError) {
		this.globalError = StringUtils.capitalize(globalError);
	}

	public List<FieldErrorDto> getFieldErrors() {
		return fieldErrors;
	}

	public void setFieldErrors(List<FieldErrorDto> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}

}
