package com.shiftshop.service.rest.dtos.catalog;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CategoryDto {

	private Long id;
	private String name;

	public CategoryDto() {}

	public CategoryDto(Long id, String name) {

		this.id = id;
		this.name = name;

	}

	@NotNull
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@NotNull
	@Size(max = 30)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
