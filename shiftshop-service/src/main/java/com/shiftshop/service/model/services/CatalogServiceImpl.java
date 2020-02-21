package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.CategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
public class CatalogServiceImpl implements CatalogService {

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public Category addCategory(String name) throws DuplicateInstancePropertyException {

        String categoryName = name;

        if (categoryDao.findByNameIgnoreCase(categoryName).isPresent()) {
            throw new DuplicateInstancePropertyException("project.entities.category", "project.entities.props.name", name);
        }

        return categoryDao.save(new Category(StringUtils.capitalize(categoryName)));

    }

}
