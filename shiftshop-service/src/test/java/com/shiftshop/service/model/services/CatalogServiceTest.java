package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.CategoryDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

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

}
