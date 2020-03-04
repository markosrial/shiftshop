package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.Product;

import java.math.BigDecimal;
import java.util.List;

public interface CatalogService {

    Category addCategory(String name) throws DuplicateInstancePropertyException;

    Category findCategoryById(Long id) throws InstanceNotFoundException;

    List<Category> findAllCategories();

    Category updateCategory(Long id, String name) throws DuplicateInstancePropertyException, InstanceNotFoundException;

    Product addProduct(String name, BigDecimal providerPrice, BigDecimal salePrice, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException;

    Product findProductById(Long id) throws InstanceNotFoundException;

    Block<Product> findProducts(Long categoryId, String keywords, Boolean onlyActive,
                                String orderType, String order, int page, int size);
}
