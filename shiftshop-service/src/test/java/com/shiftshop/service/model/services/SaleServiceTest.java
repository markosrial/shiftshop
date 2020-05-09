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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class SaleServiceTest {

    private final Long NON_EXISTENT_ID = -1L;
    private final String CATEGORY_NAME = "category";
    private final String PRODUCT_NAME = "product";
    private final BigDecimal PROV_PRICE = new BigDecimal(5.25);
    private final BigDecimal SALE_PRICE = new BigDecimal(21.95);
    private final String USERNAME = "user";
    private final String NAME = "User";
    private final String SURNAMES = "Test Tester";
    private final String PASSWORD = "password";
    private final String SALE_BARCODE = "ABCD1234";

    @Autowired
    private SaleDao saleDao;

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private UserService userService;

    @Autowired
    private SaleService saleService;

    private Category createCategory(String name) throws DuplicateInstancePropertyException {
        return catalogService.addCategory(name);
    }

    private Product createProduct(String name, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {

        return catalogService.addProduct(name, PROV_PRICE, SALE_PRICE, categoryId);

    }

    private User createUser(String userName) throws DuplicateInstancePropertyException, NoUserRolesException {

        User user = new User(userName, PASSWORD, NAME, SURNAMES,
                new HashSet<>(Arrays.asList(User.RoleType.ADMIN, User.RoleType.SALESMAN)));

        return userService.registerUser(user);

    }

    @Test
    public void testRegisterAndFindSale() throws CashAmountException, DuplicateInstancePropertyException, EmptySaleException,
            InstanceNotFoundException, NoUserRolesException {

        Category category = createCategory(CATEGORY_NAME);
        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME + "2", category.getId());
        User user = createUser(USERNAME);

        // Prepare sale items
        HashSet<SaleItem> items = new HashSet<>();

        /// Sale item 1
        Product itemProduct = new Product();
        itemProduct.setId(product1.getId());
        SaleItem saleItem1 = new SaleItem(product1.getSalePrice(), 2, itemProduct);


        // Sale item 2 -> Product sold with sale price bigger than actual
        itemProduct = new Product();
        itemProduct.setId(product2.getId());
        BigDecimal extraSalePrice = product2.getSalePrice().add(new BigDecimal(2));
        SaleItem saleItem2 = new SaleItem(extraSalePrice, 3, itemProduct);

        items.add(saleItem1);
        items.add(saleItem2);

        // Register sale
        BigDecimal discount = new BigDecimal(3);
        Sale sale = new Sale(SALE_BARCODE, LocalDateTime.now(), discount, null);
        sale = saleService.registerSale(user.getId(), sale, items);

        // Assertions
        assertEquals(sale, saleDao.findById(sale.getId()).get());

        // Check correct total
        BigDecimal totalPrice = saleItem1.getTotalPrice().add(saleItem2.getTotalPrice()).subtract(discount);

        assertEquals(totalPrice, sale.getTotal());

        // Check correct cost
        BigDecimal cost = saleItem1.getTotalCost().add(saleItem2.getTotalCost());

        assertEquals(cost, sale.getCost());

    }

    @Test
    public void testRegisterRepeatedSale() throws CashAmountException, DuplicateInstancePropertyException, EmptySaleException,
            InstanceNotFoundException, NoUserRolesException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        // Prepare sale items
        HashSet<SaleItem> items = new HashSet<>();

        Product itemProduct = new Product();
        itemProduct.setId(product.getId());
        items.add(new SaleItem(product.getSalePrice(), 1, itemProduct));

        // Register sale
        Sale sale = new Sale(SALE_BARCODE, LocalDateTime.now(), new BigDecimal(0), null);
        sale = saleService.registerSale(user.getId(), sale, items);

        // Check repeat register sale
        assertEquals(sale, saleService.registerSale(user.getId(), sale, items));

    }

    @Test(expected = CashAmountException.class)
    public void testRegisterSaleCashLowerThanTotal() throws CashAmountException, DuplicateInstancePropertyException, EmptySaleException,
            InstanceNotFoundException, NoUserRolesException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        // Prepare sale items
        HashSet<SaleItem> items = new HashSet<>();

        Product itemProduct = new Product();
        itemProduct.setId(product.getId());
        items.add(new SaleItem(product.getSalePrice(), 1, itemProduct));

        // Register sale
        Sale sale = new Sale(SALE_BARCODE, LocalDateTime.now(), new BigDecimal(0), new BigDecimal(0));
        saleService.registerSale(user.getId(), sale, items);

    }

    @Test(expected = EmptySaleException.class)
    public void testRegisterSaleEmptyItems() throws CashAmountException, DuplicateInstancePropertyException, EmptySaleException,
            InstanceNotFoundException, NoUserRolesException {

        User user = createUser(USERNAME);

        HashSet<SaleItem> items = new HashSet<>();

        // Register sale
        saleService.registerSale(user.getId(),
                new Sale(SALE_BARCODE, LocalDateTime.now(), new BigDecimal(3), null),
                items);

    }


    @Test(expected = InstanceNotFoundException.class)
    public void testRegisterUserNoExistent() throws CashAmountException, EmptySaleException, InstanceNotFoundException {
        saleService.registerSale(NON_EXISTENT_ID, new Sale(), new HashSet<>());
    }

}
