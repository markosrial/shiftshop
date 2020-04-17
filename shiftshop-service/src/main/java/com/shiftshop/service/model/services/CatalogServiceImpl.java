package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.utils.MessageConstants;
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
import java.time.LocalDateTime;
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
            throw new DuplicateInstancePropertyException(MessageConstants.ENTITIES_CATEGORY,
                    MessageConstants.ENTITIES_PROPS_NAME, name);
        }

        return categoryDao.save(new Category(StringUtils.capitalize(categoryName)));

    }

    @Override
    @Transactional(readOnly = true)
    public Category findCategoryById(Long id) throws InstanceNotFoundException {

        Optional<Category> category = categoryDao.findById(id);

        if (!category.isPresent()) {
            throw new InstanceNotFoundException(MessageConstants.ENTITIES_CATEGORY, id);
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
            throw new DuplicateInstancePropertyException(MessageConstants.ENTITIES_CATEGORY,
                    MessageConstants.ENTITIES_PROPS_NAME, name);
        }

        category.setName(StringUtils.capitalize(name));

        return category;

    }

    @Override
    public Product addProduct(String name, BigDecimal providerPrice, BigDecimal salePrice, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = findCategoryById(categoryId);

        if (productDao.findByNameIgnoreCase(name).isPresent()) {
            throw new DuplicateInstancePropertyException(MessageConstants.ENTITIES_PRODUCT,
                    MessageConstants.ENTITIES_PROPS_NAME, name);
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
    public Product findProductById(Long id) throws InstanceNotFoundException {

        Optional<Product> product = productDao.findById(id);

        if (!product.isPresent()) {
            throw new InstanceNotFoundException(MessageConstants.ENTITIES_PRODUCT, id);
        }

        return product.get();
    }

    @Override
    @Transactional(readOnly = true)
    public Block<Product> findProducts(Long categoryId, String keywords, boolean onlyActive,
                                       String orderType, String order, int page, int size) {

        Slice<Product> slice = productDao.find(categoryId, keywords, onlyActive,
                ProductOrderType.fromString(orderType), OrderAscDesc.fromString(order), page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public Product updateProduct(Long id, String name, BigDecimal providerPrice, BigDecimal salePrice,
                                 String barcode, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Product product = findProductById(id);

        if (categoryId != null) {
            Category category = findCategoryById(categoryId);
            product.setCategory(category);
        }

        if (name != null) {
            if (productDao.findByNameIgnoreCaseAndIdIsNot(name, id).isPresent()) {
                throw new DuplicateInstancePropertyException(MessageConstants.ENTITIES_PRODUCT,
                        MessageConstants.ENTITIES_PROPS_NAME, name);
            }
            product.setName(StringUtils.capitalize(name));
        }

        if (barcode != null) {
            if (productDao.findByBarcodeAndIdIsNot(barcode, id).isPresent()) {
                throw new DuplicateInstancePropertyException(MessageConstants.ENTITIES_PRODUCT,
                        MessageConstants.ENTITIES_PROPS_BARCODE, barcode);
            }
            product.setBarcode(barcode.toUpperCase());
        }

        if (providerPrice != null) {
            product.setProviderPrice(providerPrice.setScale(2, RoundingMode.DOWN));
        }

        if (salePrice != null) {
            product.setSalePrice(salePrice.setScale(2, RoundingMode.DOWN));
        }

        return product;

    }

    @Override
    public void setActiveProduct(Long id, boolean active) throws InstanceNotFoundException {

        Product product = findProductById(id);

        if (product.isActive() != active) {
            product.setActive(active);
        }

    }


    @Override
    @Transactional(readOnly = true)
    public LocalDateTime getLastProductUpdatedTimestamp() {

        Optional<LocalDateTime> lastUpdate = productDao.getLastUpdateTimestamp();

        if (lastUpdate.isEmpty()) {
            return LocalDateTime.MIN;
        }

        return lastUpdate.get();

    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> getUpdatedProducts(LocalDateTime lastUpdate) {

        if (lastUpdate != null) {
            return productDao.findByUpdateTimestampIsAfter(lastUpdate);
        } else {
            return productDao.findAllByActiveIsTrue();
        }

    }

}
