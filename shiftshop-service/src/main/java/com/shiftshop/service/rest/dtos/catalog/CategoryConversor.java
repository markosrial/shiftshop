package com.shiftshop.service.rest.dtos.catalog;

import com.shiftshop.service.model.entities.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryConversor {

	private CategoryConversor() {}

	public final static CategoryDto toCategoryDto(Category category) {
		return new CategoryDto(category.getId(), category.getName());
	}

}
