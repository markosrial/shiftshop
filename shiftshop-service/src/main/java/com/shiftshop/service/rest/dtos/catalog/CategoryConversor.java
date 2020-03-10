package com.shiftshop.service.rest.dtos.catalog;

import com.shiftshop.service.model.entities.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryConversor {

	private CategoryConversor() {}

	public static final CategoryDto toCategoryDto(Category category) {
		return new CategoryDto(category.getId(), category.getName());
	}

	public static final List<CategoryDto> toCategoryDtos(List<Category> categories) {
		return categories.stream().map(c -> toCategoryDto(c)).collect(Collectors.toList());
	}

}
