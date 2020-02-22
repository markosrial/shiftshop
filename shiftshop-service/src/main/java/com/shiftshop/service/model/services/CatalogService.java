package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;

import java.util.List;

public interface CatalogService {

    Category addCategory(String name) throws DuplicateInstancePropertyException;

    Category findCategoryById(Long id) throws InstanceNotFoundException;

    List<Category> findAllCategories();

}
