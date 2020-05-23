package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.*;
import com.shiftshop.service.model.entities.Sale.SaleOrderType;
import com.shiftshop.service.model.entities.projections.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
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
    private final BigDecimal PROV_PRICE = new BigDecimal(5.25).setScale(2, RoundingMode.HALF_EVEN);
    private final BigDecimal SALE_PRICE = new BigDecimal(21.95).setScale(2, RoundingMode.HALF_EVEN);
    private final String USERNAME = "user";
    private final String NAME = "User";
    private final String SURNAMES = "Test Tester";
    private final String PASSWORD = "password";
    private final String SALE_BARCODE = "ABCD1234";

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private UserService userService;

    @Autowired
    private SaleDao saleDao;

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
            InstanceNotFoundException, InstancePropertyNotFoundException, NoUserRolesException {

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
        assertEquals(sale, saleService.findSaleByBarcode(sale.getBarcode()));

        // Check correct total
        BigDecimal totalPrice = saleItem1.getTotalPrice().add(saleItem2.getTotalPrice()).subtract(discount);

        assertEquals(totalPrice, sale.getTotal());

        // Check correct cost
        BigDecimal cost =
                product1.getProviderPrice().multiply(new BigDecimal(saleItem1.getQuantity()))
                .add(product2.getProviderPrice().multiply(new BigDecimal(saleItem2.getQuantity())))
                .setScale(2, RoundingMode.HALF_EVEN);

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

    @Test(expected = InstancePropertyNotFoundException.class)
    public void testFindByBarcodeNonExistent() throws InstancePropertyNotFoundException {
        saleService.findSaleByBarcode("");
    }

    @Test
    public void testFindBarcodes() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        // Register sale
        Sale saleA = createBaseSale("AAA" + SALE_BARCODE, product.getId(), user.getId());
        Sale saleB = createBaseSale("AAB" + SALE_BARCODE, product.getId(), user.getId());
        Sale saleC = createBaseSale("ABC" + SALE_BARCODE, product.getId(), user.getId());

        // Find matching all sales
        List<Sale> expectedList = List.of(saleA, saleB, saleC);
        List<Sale> sales = saleService.findFirstSalesByBarcode("A", 3);
        assertEquals(expectedList, sales);

        // Find matching all but skipping last sale
        expectedList = List.of(saleA, saleB);
        sales = saleService.findFirstSalesByBarcode("A", 2);
        assertEquals(expectedList, sales);

        // Find matching 2/3 sales
        expectedList = List.of(saleA, saleB);
        sales = saleService.findFirstSalesByBarcode("AA", 3);
        assertEquals(expectedList, sales);

        // Find matching 1/3 sales
        expectedList = List.of(saleA);
        sales = saleService.findFirstSalesByBarcode("AAA", 3);
        assertEquals(expectedList, sales);

        // Find matching 0/3 sales
        expectedList = List.of();
        sales = saleService.findFirstSalesByBarcode("X", 3);
        assertEquals(expectedList, sales);

    }


    @Test
    public void testFortnightBestSellers() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME+ "2", category.getId());
        User user = createUser(USERNAME);

        LocalDateTime date = LocalDate.now().atStartOfDay().minusDays(1);

        // Register sales
        createBaseSale(SALE_BARCODE + "A", date, 3, product1.getId(), user.getId());
        createBaseSale(SALE_BARCODE + "B", date, 2, product1.getId(), user.getId());
        createBaseSale(SALE_BARCODE + "C", date, 4, product2.getId(), user.getId());
        // This shouldn't count
        createBaseSale(SALE_BARCODE + "D", date.minusDays(15), 20, product2.getId(), user.getId());

        List<ProductSales> bestSelling = saleService.getFortnightTopBestSellingProduct(3);

        assertEquals(2, bestSelling.size());
        assertEquals(product1, bestSelling.get(0).getProduct());
        assertEquals(5, bestSelling.get(0).getQuantity());

    }

    @Test
    public void testFortnightProfitable() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product1 = createProduct(PRODUCT_NAME + "1", category.getId());
        Product product2 = createProduct(PRODUCT_NAME+ "2", category.getId());
        User user = createUser(USERNAME);

        LocalDateTime date = LocalDate.now().atStartOfDay().minusDays(1);
        BigDecimal biggerSalePrice = SALE_PRICE.add(new BigDecimal(10));

        // Register sales
        createSale(SALE_BARCODE + "A", date, new BigDecimal(0), null,
                biggerSalePrice, 2, product1.getId(), user.getId());
        createSale(SALE_BARCODE + "B", date, new BigDecimal(0), null,
                SALE_PRICE, 2, product1.getId(), user.getId());
        createSale(SALE_BARCODE + "C", date, new BigDecimal(0), null,
                SALE_PRICE, 3, product2.getId(), user.getId());
        // This shouldn't count
        createSale(SALE_BARCODE + "D", date.minusDays(15), new BigDecimal(0), null,
                biggerSalePrice, 20, product2.getId(), user.getId());

        List<ProductProfit> profitable = saleService.getFortnightTopProfitableProduct(3);

        assertEquals(2, profitable.size());
        assertEquals(product1, profitable.get(0).getProduct());

        BigDecimal expectedProfit = biggerSalePrice.multiply(new BigDecimal(2))
                .add(SALE_PRICE.multiply(new BigDecimal(2)))
                .subtract(PROV_PRICE.multiply(new BigDecimal(4)));
        assertEquals(expectedProfit, profitable.get(0).getProfit());

    }

    @Test
    public void testMonthCountResume() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        LocalDateTime date = LocalDate.now().atStartOfDay().minusDays(1);

        // Register sales
        createSale(SALE_BARCODE + "A", date, new BigDecimal(0), null,
                SALE_PRICE, 2, product.getId(), user.getId());
        createSale(SALE_BARCODE + "B", date, new BigDecimal(0), null,
                SALE_PRICE, 3, product.getId(), user.getId());
        // This shouldn't count
        createSale(SALE_BARCODE + "C", date.minusDays(30), new BigDecimal(0), null,
                SALE_PRICE, 20, product.getId(), user.getId());

        SalesCountResume monthResume = saleService.getMonthSalesCountResume();

        assertEquals(2, monthResume.getSalesCount());
        assertEquals(5, monthResume.getItemsCount());

    }

    @Test
    public void testMonthFinancialResume() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        LocalDateTime date = LocalDate.now().atStartOfDay().minusDays(1);

        // Register sales
        Sale saleA = createSale(SALE_BARCODE + "A", date, new BigDecimal(0), null,
                SALE_PRICE, 2, product.getId(), user.getId());
        Sale saleB = createSale(SALE_BARCODE + "B", date, new BigDecimal(0), null,
                SALE_PRICE, 3, product.getId(), user.getId());
        // This shouldn't count
        createSale(SALE_BARCODE + "C", date.minusDays(30), new BigDecimal(0), null,
                SALE_PRICE, 20, product.getId(), user.getId());

        SalesTotalAndProfit monthTotalAndProfit = saleService.getMonthSalesTotalAndProfit();

        BigDecimal expectedTotal = saleA.getTotal().add(saleB.getTotal());
        BigDecimal expectedProfit = expectedTotal.subtract(saleA.getCost().add(saleB.getCost()));

        assertEquals(expectedTotal, monthTotalAndProfit.getTotal());
        assertEquals(expectedProfit, monthTotalAndProfit.getProfit());

    }

    @Test
    public void testFinancialResumeFromYear() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        int year = 2000;
        LocalDateTime date = LocalDate.of(year,1,1).atStartOfDay();

        // Register sales
        Sale saleJanA = createSale(SALE_BARCODE + "A", date, new BigDecimal(0), null,
                SALE_PRICE, 1, product.getId(), user.getId());
        Sale saleJanB = createSale(SALE_BARCODE + "B", date, new BigDecimal(0), null,
                SALE_PRICE, 1, product.getId(), user.getId());
        // Skip 2 month
        Sale saleMar = createSale(SALE_BARCODE + "C", date.plusMonths(2), new BigDecimal(0), null,
                SALE_PRICE, 1, product.getId(), user.getId());

        List<MonthSalesTotalAndProfit> yearResume = saleService.getMonthlyTotalsAndProfitsFromYear(year);

        // January
        BigDecimal expectedTotal = saleJanA.getTotal().add(saleJanB.getTotal());
        BigDecimal expectedProfit = expectedTotal.subtract(saleJanA.getCost().add(saleJanB.getCost()));

        assertEquals(1, yearResume.get(0).getMonth());
        assertEquals(expectedTotal, yearResume.get(0).getTotal());
        assertEquals(expectedProfit, yearResume.get(0).getProfit());

        // February

        expectedTotal = saleMar.getTotal();
        expectedProfit = expectedTotal.subtract(saleMar.getCost());

        assertEquals(3, yearResume.get(1).getMonth());
        assertEquals(expectedTotal, yearResume.get(1).getTotal());
        assertEquals(expectedProfit, yearResume.get(1).getProfit());

    }

    @Test
    public void testFinancialResumeCurrentYear() throws DuplicateInstancePropertyException, InstanceNotFoundException,
            NoUserRolesException, CashAmountException, EmptySaleException {

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME, category.getId());
        User user = createUser(USERNAME);

        LocalDateTime date = LocalDate.now().atStartOfDay();

        Sale sale = createSale(SALE_BARCODE + "A", date, new BigDecimal(0), null,
                SALE_PRICE, 1, product.getId(), user.getId());

        List<MonthSalesTotalAndProfit> yearResume = saleService.getMonthlyTotalsAndProfitsFromYear(null);

        BigDecimal expectedTotal = sale.getTotal();
        BigDecimal expectedProfit = expectedTotal.subtract(sale.getCost());

        assertEquals(sale.getDate().getMonth().getValue(), yearResume.get(0).getMonth());
        assertEquals(expectedTotal, yearResume.get(0).getTotal());
        assertEquals(expectedProfit, yearResume.get(0).getProfit());

    }


}
