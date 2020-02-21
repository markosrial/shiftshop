package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.entities.Category;

public interface CatalogService {

    Category addCategory(String name) throws DuplicateInstancePropertyException;

}
