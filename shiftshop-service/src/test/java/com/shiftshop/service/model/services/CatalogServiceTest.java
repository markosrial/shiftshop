package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.util.List.of;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class CatalogServiceTest {

    private final Long NON_EXISTENT_ID = -1L;
    private final String CATEGORY_NAME = "category";
    private final String PRODUCT_NAME = "product";
    private final BigDecimal PROV_PRICE = new BigDecimal(5.25);
    private final BigDecimal SALE_PRICE = new BigDecimal(21.95);
    private final String BARCODE = "ABCD1234";

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private CatalogService catalogService;

    private Category createCategory(String name) throws DuplicateInstancePropertyException {
        return catalogService.addCategory(name);
    }

    private Product createProduct(String name, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {

        return catalogService.addProduct(name, PROV_PRICE, SALE_PRICE, categoryId);

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

    /* Test Products */

    @Test
    public void testAddAndFindProductByIdAndByBarCode() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());

        assertEquals(product, catalogService.findProductById(product.getId()));

    }

    @Test(expected = DuplicateInstancePropertyException.class)
    public void testAddProductDuplicatedName() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        createProduct(PRODUCT_NAME, category.getId());
        createProduct(PRODUCT_NAME, category.getId());

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testFindProductByNonExistentId() throws InstanceNotFoundException {
        catalogService.findProductById(NON_EXISTENT_ID);
    }

    @Test
    public void testFindProductsByCategory() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category1 = createCategory(CATEGORY_NAME + "1");
        Category category2 = createCategory(CATEGORY_NAME + "2");

        Product product1 = createProduct(PRODUCT_NAME + "1", category1.getId());
        createProduct(PRODUCT_NAME + "2", category2.getId());
        createProduct(PRODUCT_NAME + "3", category2.getId());

        Block<Product> expectedBlock = new Block<>(Arrays.asList(product1), false);
        assertEquals(expectedBlock, catalogService.findProducts(category1.getId(), "prod", false,
                null, null, 0, 3));

    }

    @Test
    public void testFindProductsByKeywordsInOrder() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        Product product1 = createProduct("Product 1", category.getId());
        Product product2 = createProduct("Product X", category.getId());
        createProduct("another", category.getId());

        // Test case sensitive
        Block<Product> expectedBlock = new Block<>(Arrays.asList(product1, product2), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, "PrOd", false,
                null, null, 0, 2));

        // Test multiple keywords
        expectedBlock = new Block<>(Arrays.asList(product2), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, "Prod X", false,
                null, null, 0, 3));

    }

    @Test
    public void testFindProductsByOrderTypeAndOrder() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        Product product1 = createProduct("product 1", category.getId());
        Product product2 = createProduct("X Product", category.getId());
        Product product3 = createProduct("another", category.getId());

        Block<Product> expectedBlock = new Block<>(Arrays.asList(product3, product1, product2), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                Product.ProductOrderType.name.getType(), null, 0, 3));

        expectedBlock = new Block<>(Arrays.asList(product1, product2, product3), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                Product.ProductOrderType.creationDate.getType(), OrderAscDesc.ASC.name(), 0, 3));

        expectedBlock = new Block<>(Arrays.asList(product3, product2, product1), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                Product.ProductOrderType.creationDate.getType(), OrderAscDesc.DESC.name(), 0, 3));

        expectedBlock = new Block<>(Arrays.asList(product3, product1, product2), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                Product.ProductOrderType.name.getType(), OrderAscDesc.ASC.name(), 0, 3));

        expectedBlock = new Block<>(Arrays.asList(product2, product1, product3), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                Product.ProductOrderType.name.getType(), OrderAscDesc.DESC.name(), 0, 3));

    }

    @Test
    public void testFindNoProducts() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        createProduct(PRODUCT_NAME, category.getId());

        Block<Product> expectedBlock = new Block<>(new ArrayList<>(), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, "non-existent", false,
                null, null, 0, 1));

    }

    @Test
    public void testFindProductsByPages() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME + "2", category.getId());
        Product product3 = createProduct(PRODUCT_NAME + "3", category.getId());

        Block<Product> expectedBlock = new Block<>(Arrays.asList(product1, product2), true);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                null, null, 0, 2));

        expectedBlock = new Block<>(of(product3), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                null, null, 1, 2));

        expectedBlock = new Block<>(new ArrayList<>(), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, false,
                null, null, 2, 2));

    }

    @Test
    public void testSetActiveAndFindOnlyActiveProducts() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME + "2", category.getId());
        Product product3 = createProduct(PRODUCT_NAME + "3", category.getId());

        catalogService.setActiveProduct(product2.getId(), false);

        Block<Product> expectedBlock = new Block<>(Arrays.asList(product1, product3), false);
        assertEquals(expectedBlock, catalogService.findProducts(category.getId(), null, true,
                null, null, 0, 3));

        catalogService.setActiveProduct(product2.getId(), true);

        expectedBlock = new Block<>(Arrays.asList(product1, product2, product3), false);
        assertEquals(expectedBlock, catalogService.findProducts(null, null, true,
                null, null, 0, 3));

    }

    @Test
    public void testUpdateProduct() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);

        Product product = createProduct(PRODUCT_NAME, category.getId());

        Product updProduct = catalogService.updateProduct(product.getId(), null, null, null, null, null);

        assertEquals(product, updProduct);

        // Update with all changes
        String newName = PRODUCT_NAME + "X";
        BigDecimal newProviderPrice = PROV_PRICE.add(new BigDecimal(1L)).setScale(2, RoundingMode.DOWN);
        BigDecimal newSalePrice = SALE_PRICE.add(new BigDecimal(1L)).setScale(2, RoundingMode.DOWN);
        String newBarcode = BARCODE + "X";
        Category newCategory = createCategory(CATEGORY_NAME + "X");

        updProduct = catalogService.updateProduct(updProduct.getId(), newName, newProviderPrice, newSalePrice, newBarcode, newCategory.getId());

        assertEquals(StringUtils.capitalize(newName), updProduct.getName());
        assertEquals(newProviderPrice, updProduct.getProviderPrice());
        assertEquals(newSalePrice, updProduct.getSalePrice());
        assertEquals(newBarcode, updProduct.getBarcode());
        assertEquals(newCategory, updProduct.getCategory());

    }

    @Test(expected = DuplicateInstancePropertyException.class)
    public void testUpdateProductDuplicatedName() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);
        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME + "2", category.getId());

        catalogService.updateProduct(product1.getId(), product2.getName(), null, null, null,null);

    }

    @Test(expected = DuplicateInstancePropertyException.class)
    public void testUpdateProductDuplicatedBarcode() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        Category category = createCategory(CATEGORY_NAME);
        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME + "2", category.getId());

        catalogService.updateProduct(product1.getId(), product2.getName(), null, null, product2.getBarcode(), null);

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testSetActiveProductNonExistentId() throws InstanceNotFoundException {

        catalogService.setActiveProduct(NON_EXISTENT_ID, true );

    }

    @Test
    public void testLastProductUpdates() throws DuplicateInstancePropertyException, InstanceNotFoundException {

        // Test update timestamp

        assertEquals(LocalDateTime.MIN, catalogService.getLastProductUpdatedTimestamp());

        Category category = createCategory(CATEGORY_NAME);

        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());

        assertEquals(product1.getUpdateTimestamp(), catalogService.getLastProductUpdatedTimestamp());

        // Test updated products

        Product product2 = createProduct(PRODUCT_NAME + "2", category.getId());

        List<Product> expectedProducts = new ArrayList<>(Arrays.asList(product1, product2));
        assertEquals(expectedProducts, catalogService.getUpdatedProducts(null));


        expectedProducts = new ArrayList<>(Arrays.asList(product2));
        assertEquals(expectedProducts, catalogService.getUpdatedProducts(product1.getUpdateTimestamp()));

        assertEquals(new ArrayList<>(), catalogService.getUpdatedProducts(catalogService.getLastProductUpdatedTimestamp()));

    }

}
