package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.CategoryDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class CatalogServiceTest {

    private final Long NON_EXISTENT_ID = -1L;
    private final String CATEGORY_NAME = "category";

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private CatalogService catalogService;

    private Category createCategory(String name) throws DuplicateInstancePropertyException {
        return catalogService.addCategory(name);
    }

    /* Test Categories */

    @Test
    public void testAddAndFindCategories() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        String categoryName1 = CATEGORY_NAME + "1";
        Category category1 = createCategory(categoryName1);
        Category category2 = createCategory(CATEGORY_NAME + "2");

        assertEquals(category1, categoryDao.findByNameIgnoreCase(categoryName1).get());
        assertEquals(category1, catalogService.findCategoryById(category1.getId()));

        assertEquals(Arrays.asList(category1, category2), catalogService.findAllCategories());

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testFindCategoryNonExistentId() throws InstanceNotFoundException {

        catalogService.findCategoryById(NON_EXISTENT_ID);

    }

    @Test(expected = DuplicateInstancePropertyException.class)
    public void testAddCategoryDuplicatedName() throws DuplicateInstancePropertyException {

        createCategory("category");
        createCategory("cAteGory");

    }

    @Test
    public void testUpdateCategory() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        // Update with no changes
        category = catalogService.updateCategory(category.getId(), category.getName());
        assertEquals(StringUtils.capitalize(CATEGORY_NAME), category.getName());

        // Update with new name
        String newName = CATEGORY_NAME + "X";
        category = catalogService.updateCategory(category.getId(), newName);
        assertEquals(StringUtils.capitalize(newName), category.getName());

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testUpdateCategoryNonExistentId() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        catalogService.updateCategory(NON_EXISTENT_ID, CATEGORY_NAME);

    }

    @Test(expected = DuplicateInstancePropertyException.class)
    public void testUpdateCategoryDuplicatedName() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category1 = createCategory(CATEGORY_NAME + "1");
        Category category2 = createCategory(CATEGORY_NAME + "2");

        catalogService.updateCategory(category1.getId(), category2.getName());

    }

}
