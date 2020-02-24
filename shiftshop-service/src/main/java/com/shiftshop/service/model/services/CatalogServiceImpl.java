package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.CategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

}
