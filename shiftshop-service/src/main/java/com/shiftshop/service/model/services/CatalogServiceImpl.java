package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.utils.UUIDGenerator;
import com.shiftshop.service.model.entities.*;
import com.shiftshop.service.model.entities.Product.ProductOrderType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CatalogServiceImpl implements CatalogService {

    @Autowired
    private UUIDGenerator uuidGenerator;

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private ProductDao productDao;

    @Override
    public Category addCategory(String name) throws DuplicateInstancePropertyException {

        String categoryName = name;

        if (categoryDao.findByNameIgnoreCase(categoryName).isPresent()) {
            throw new DuplicateInstancePropertyException("project.entities.category", "project.entities.props.name", name);
        }

        return categoryDao.save(new Category(StringUtils.capitalize(categoryName)));

    }

    @Override
    @Transactional(readOnly = true)
    public Category findCategoryById(Long id) throws InstanceNotFoundException {

        Optional<Category> category = categoryDao.findById(id);

        if (!category.isPresent()) {
            throw new InstanceNotFoundException("project.entities.category", id);
        }

        return category.get();

    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> findAllCategories() {

        Iterable<Category> categories = categoryDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
        List<Category> categoriesAsList = new ArrayList<>();

        categories.forEach(c -> categoriesAsList.add(c));

        return categoriesAsList;

    }

    @Override
    public Category updateCategory(Long id, String name) throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = findCategoryById(id);

        if (categoryDao.findByNameIgnoreCaseAndIdIsNot(name, category.getId()).isPresent()) {
            throw new DuplicateInstancePropertyException("project.entities.category", "project.entities.props.name", name);
        }

        category.setName(StringUtils.capitalize(name));

        return category;

    }

    @Override
    public Product addProduct(String name, BigDecimal providerPrice, BigDecimal salePrice, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = findCategoryById(categoryId);

        if (productDao.findByNameIgnoreCase(name).isPresent()) {
            throw new DuplicateInstancePropertyException("project.entities.product", "project.entities.props.name", name);
        }

        Product product = new Product(StringUtils.capitalize(name),
                providerPrice.setScale(2, RoundingMode.DOWN),
                salePrice.setScale(2, RoundingMode.DOWN),
                category);

        product.setBarcode(uuidGenerator.randomId());
        product.setActive(true);

        return productDao.save(product);

    }

    @Override
    @Transactional(readOnly = true)
    public Block<Product> findProducts(Long categoryId, String keywords, Boolean onlyActive,
                                       String orderType, String order, int page, int size) {

        Slice<Product> slice = productDao.find(categoryId, keywords, onlyActive,
                ProductOrderType.fromString(orderType), OrderAscDesc.fromString(order), page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

}
