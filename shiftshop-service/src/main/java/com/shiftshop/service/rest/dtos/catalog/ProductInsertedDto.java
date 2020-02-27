package com.shiftshop.service.rest.dtos.catalog;

public class ProductInsertedDto {

	private Long id;
	private String name;

	public ProductInsertedDto() {}

	public ProductInsertedDto(Long id, String name) {

		this.id = id;
		this.name = name;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() { return this.name; }

	public void setName(String name) { this.name = name; }

}
