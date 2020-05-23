package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.Product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface CatalogService {

    Category addCategory(String name) throws DuplicateInstancePropertyException;

    Category findCategoryById(Long id) throws InstanceNotFoundException;

    List<Category> findAllCategories();

    Category updateCategory(Long id, String name) throws DuplicateInstancePropertyException, InstanceNotFoundException;

    Product addProduct(String name, BigDecimal providerPrice, BigDecimal salePrice, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException;

    Product findProductById(Long id) throws InstanceNotFoundException;

    Block<Product> findProducts(Long categoryId, String keywords, boolean onlyActive,
                                String orderBy, String direction, int page, int size);

    Product updateProduct(Long id, String name, BigDecimal providerPrice, BigDecimal salePrice,
                          String barcode, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException;

    void setActiveProduct(Long id, boolean active) throws InstanceNotFoundException;

    LocalDateTime getLastProductUpdatedTimestamp();

    List<Product> getUpdatedProducts(LocalDateTime lastUpdate);

}
