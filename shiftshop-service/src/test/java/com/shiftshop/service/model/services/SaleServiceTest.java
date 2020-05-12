package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.*;
import com.shiftshop.service.model.entities.Sale.SaleOrderType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

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

    private Sale createSale(String barcode, LocalDateTime date, BigDecimal discount, BigDecimal cash,
                            BigDecimal salePrice, int quantity, Long productId, Long userId)
            throws EmptySaleException, InstanceNotFoundException, CashAmountException {

        Sale sale = new Sale(barcode, date, discount, cash);

        Set<SaleItem> saleItems = new HashSet<>();

        Product product = new Product();
        product.setId(productId);
        saleItems.add(new SaleItem(salePrice, quantity, product));

        return saleService.registerSale(userId, sale, saleItems);

    }

    private Sale createBaseSale(String barcode, LocalDateTime date, int quantity, Long productId, Long userId)
            throws EmptySaleException, InstanceNotFoundException, CashAmountException {
        return createSale(barcode, date, null, null, SALE_PRICE, quantity, productId, userId);
    }

    private Sale createBaseSale(String barcode, Long productId, Long userId)
            throws EmptySaleException, InstanceNotFoundException, CashAmountException {
        return createSale(barcode, LocalDateTime.now(), null, null, SALE_PRICE, 1, productId, userId);
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


        // Sale item 2 -> Product sold with sale price bigger than actual product price
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

        // Register sale
        Sale sale = createBaseSale(SALE_BARCODE, product.getId(), user.getId());

        // Check repeat register sale
        assertEquals(sale, saleService.registerSale(user.getId(), sale, sale.getItems()));

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
        createSale(SALE_BARCODE, LocalDateTime.now(), new BigDecimal(0), new BigDecimal(0), product.getSalePrice(), 1,
                product.getId(), user.getId());

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

    @Test(expected = InstanceNotFoundException.class)
    public void testRegisterProductNoExistent() throws CashAmountException, DuplicateInstancePropertyException,
            EmptySaleException, InstanceNotFoundException, NoUserRolesException {

        User user = createUser(USERNAME);

        // Prepare sale items
        HashSet<SaleItem> items = new HashSet<>();

        Product itemProduct = new Product();
        itemProduct.setId(NON_EXISTENT_ID);
        items.add(new SaleItem(SALE_PRICE, 1, itemProduct));

        // Register sale
        Sale sale = new Sale(SALE_BARCODE, LocalDateTime.now(), new BigDecimal(0), null);
        saleService.registerSale(user.getId(), sale, items);
    }

    @Test
    public void testGetSalesWithOrderAndPagination() throws CashAmountException, DuplicateInstancePropertyException,
            EmptySaleException, InstanceNotFoundException, InvalidDateRangeException, NoUserRolesException {

        User user = createUser(USERNAME);
        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());

        LocalDateTime date = LocalDate.now().atStartOfDay();

        Sale sale1 = createBaseSale(SALE_BARCODE + "1", date.plusHours(1), 1, product.getId(), user.getId());
        Sale sale2 = createBaseSale(SALE_BARCODE + "2", date.plusHours(2), 2, product.getId(), user.getId());
        Sale sale3 = createBaseSale(SALE_BARCODE + "3", date.plusHours(3), 3, product.getId(), user.getId());

        // Order by name
        Block<Sale> expectedBlock = new Block<>(Arrays.asList(sale1, sale2, sale3), false);
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate(), null,
                SaleOrderType.barcode.name(), Direction.ASC.name(), 0, 3));

        // Try different page and desc
        expectedBlock = new Block<>(Arrays.asList(sale3, sale2), true);
        assertEquals(expectedBlock, saleService.findSales(sale1.getDate().toLocalDate(), null,
                SaleOrderType.barcode.name(), Direction.DESC.name(), 0, 2));

        // Try different page and size
        expectedBlock = new Block<>(Arrays.asList(sale2), true);
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate(), null,
                SaleOrderType.barcode.name(), Direction.ASC.name(), 1, 1));

        // No sales -> try with next day
        expectedBlock = new Block<>(Arrays.asList(), false);
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate().plusDays(1), null,
                SaleOrderType.barcode.name(), Direction.ASC.name(), 0, 3));

        // Try order by total asc
        expectedBlock = new Block<>(Arrays.asList(sale1, sale2, sale3), false);
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate(), null,
                SaleOrderType.total.name(), Direction.ASC.name(), 0, 3));

        // Try order by date desc
        expectedBlock = new Block<>(Arrays.asList(sale3, sale2, sale1), false);
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate(), null,
                SaleOrderType.date.name(), Direction.DESC.name(), 0, 3));

        // Try default order (default orderBy = date & default direction = asc)
        expectedBlock = new Block<>(Arrays.asList(sale1, sale2, sale3), false);
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate(), null,
                null, null, 0, 3));
        assertEquals(expectedBlock, saleService.findSales(date.toLocalDate(), null,
                "", "", 0, 3));

    }

    @Test(expected = InvalidDateRangeException.class)
    public void testGetSalesInvalidDateRange() throws InvalidDateRangeException {
        saleService.findSales(LocalDate.now(), LocalDate.now().minusDays(1), null, null, 0, 1);
    }

}
