package com.shiftshop.service.rest.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.UserDao;
import com.shiftshop.service.model.services.CatalogService;
import com.shiftshop.service.model.services.IncorrectLoginException;
import com.shiftshop.service.model.services.UserNotActiveException;
import com.shiftshop.service.rest.dtos.catalog.InsertCategoryParamsDto;
import com.shiftshop.service.rest.dtos.catalog.InsertProductParamsDto;
import com.shiftshop.service.rest.dtos.user.AuthenticatedUserDto;
import com.shiftshop.service.rest.dtos.user.LoginParamsDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class CatalogControllerTest {

    private final static Long NON_EXISTENT_ID = -1L;
    private final static String INVALID_ID = "A";
    private final String CATEGORY_NAME = "category";
    private final String PRODUCT_NAME = "product";
    private final BigDecimal PROV_PRICE = new BigDecimal(5.25);
    private final BigDecimal SALE_PRICE = new BigDecimal(21.95);
    private final String BARCODE = "ABCD1234";
    private final static String ADMIN_LOGIN = "admin";
    private final static String SALESMAN_LOGIN = "salesman";
    private final static String PASSWORD = "password";
    private final String NAME = "User";
    private final String SURNAMES = "Test Tester";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CatalogService catalogService;


    @Autowired
    private UserController userController;

    private AuthenticatedUserDto createAuthenticatedUser(String userName, Set<User.RoleType> roles)
            throws IncorrectLoginException, UserNotActiveException {

        User user = new User(userName, NAME, SURNAMES, PASSWORD);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(roles);
        user.setActive(true);

        userDao.save(user);

        LoginParamsDto loginParams = new LoginParamsDto();
        loginParams.setUserName(user.getUserName());
        loginParams.setPassword(PASSWORD);

        return userController.login(loginParams);
    }

    private AuthenticatedUserDto createAuthenticatedAdminUser(String userName)
            throws IncorrectLoginException, UserNotActiveException {

        Set<User.RoleType> roles = new HashSet<>();
        roles.add(User.RoleType.ADMIN);

        return createAuthenticatedUser(userName, roles);
    }

    private AuthenticatedUserDto createAuthenticatedSalesmanUser(String userName)
            throws IncorrectLoginException, UserNotActiveException {

        Set<User.RoleType> roles = new HashSet<>();
        roles.add(User.RoleType.SALESMAN);

        return createAuthenticatedUser(userName, roles);
    }

    /* Test categories section from controller */

    @Test
    public void testPostCategories_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName("test");

        mockMvc.perform(post("/catalog/categories" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());

    }

    @Test
    public void testPostCategories_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName("");

        this.mockMvc.perform(post("/catalog/categories" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testPostCategories_Conflict() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName(CATEGORY_NAME);

        mockMvc.perform(post("/catalog/categories" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());

        mockMvc.perform(post("/catalog/categories" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isConflict());

    }

    @Test
    public void testPostCategories_Forbidden() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(SALESMAN_LOGIN);

        this.mockMvc.perform(post("/catalog/categories" )
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    @Test
    public void testGetCategories_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);

        mockMvc.perform(get("/catalog/categories/" + category.getId())
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isOk());
        mockMvc.perform(get("/catalog/categories")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isOk());

    }

    @Test
    public void testGetCategoy_NotFound() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);

        mockMvc.perform(get("/catalog/categories/" + NON_EXISTENT_ID)
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isNotFound());

    }

    @Test
    public void testGetCategoy_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);

        mockMvc.perform(get("/catalog/categories/" + INVALID_ID)
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testPutCategories_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName(CATEGORY_NAME + "X");

        mockMvc.perform(put("/catalog/categories/" + category.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());

    }

    @Test
    public void testPutCategories_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName("");

        mockMvc.perform(put("/catalog/categories/" + category.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testPutCategories_Conflict() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category1 = catalogService.addCategory(CATEGORY_NAME + "1");
        Category category2 = catalogService.addCategory(CATEGORY_NAME + "2");

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName(category2.getName());

        mockMvc.perform(put("/catalog/categories/" + category1.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isConflict());

    }

    @Test
    public void testPutCategories_Forbidden() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(SALESMAN_LOGIN);

        this.mockMvc.perform(put("/catalog/categories/" + NON_EXISTENT_ID)
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    /* Test product section from controller */

    @Test
    public void testPostProducts_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName(PRODUCT_NAME);
        productParams.setProviderPrice(PROV_PRICE);
        productParams.setSalePrice(SALE_PRICE);
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isOk());

    }

    @Test
    public void testPostProducts_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName("");
        productParams.setProviderPrice(PROV_PRICE);
        productParams.setSalePrice(SALE_PRICE);
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isBadRequest());

        productParams = new InsertProductParamsDto();
        productParams.setName(PRODUCT_NAME);
        productParams.setProviderPrice(PROV_PRICE.negate());
        productParams.setSalePrice(SALE_PRICE);
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isBadRequest());

        productParams = new InsertProductParamsDto();
        productParams.setName(PRODUCT_NAME);
        productParams.setProviderPrice(PROV_PRICE);
        productParams.setSalePrice(SALE_PRICE.negate());
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testPostProducts_Conflict() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName(PRODUCT_NAME);
        productParams.setProviderPrice(PROV_PRICE);
        productParams.setSalePrice(SALE_PRICE);
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isConflict());

    }

    @Test
    public void testPostProducts_Forbidden() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(SALESMAN_LOGIN);

        this.mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    @Test
    public void testGetProduct_Ok() throws Exception {

        AuthenticatedUserDto admin = createAuthenticatedAdminUser(ADMIN_LOGIN);
        AuthenticatedUserDto salesman = createAuthenticatedSalesmanUser(SALESMAN_LOGIN);

        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product = catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        // Product with providerPrice
        mockMvc.perform(get("/catalog/products/" + product.getId())
                .header("Authorization", "Bearer " + admin.getServiceToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.providerPrice").exists());

        // Product without providerPrice
        mockMvc.perform(get("/catalog/products/" + product.getId())
                .header("Authorization", "Bearer " + salesman.getServiceToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.providerPrice").doesNotExist());
    }

    @Test
    public void testGetProduct_NotFound() throws Exception {

        AuthenticatedUserDto admin = createAuthenticatedAdminUser(ADMIN_LOGIN);

        mockMvc.perform(get("/catalog/products/0")
                .header("Authorization", "Bearer " + admin.getServiceToken()))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetProducts_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        catalogService.addProduct(PRODUCT_NAME + "1", PROV_PRICE, SALE_PRICE, category.getId());
        catalogService.addProduct(PRODUCT_NAME + "2", PROV_PRICE, SALE_PRICE, category.getId());
        catalogService.addProduct(PRODUCT_NAME + "3", PROV_PRICE, SALE_PRICE, category.getId());

        // Get all products setting query params
        mockMvc.perform(get("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .param("categoryId", category.getId().toString())
                .param("keywords","prod")
                .param("onlyActive", "")
                .param("order", "")
                .param("inverse", ""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items.length()").value(3));

        // Get only 1 product
        mockMvc.perform(get("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .param("keywords","1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items.length()").value(1));

        // Get without query params
        mockMvc.perform(get("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isOk());

    }

    @Test
    public void testPutProducts_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product = catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto params = new InsertProductParamsDto();
        params.setProviderPrice(PROV_PRICE.add(new BigDecimal(1)));
        params.setSalePrice(SALE_PRICE.add(new BigDecimal(1)));

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());


        Category newCategory = catalogService.addCategory(CATEGORY_NAME + "X");
        params = new InsertProductParamsDto();
        params.setCategoryId(newCategory.getId());

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());

        params = new InsertProductParamsDto();
        params.setBarcode(BARCODE);

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());

    }

    @Test
    public void testPutProducts_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product = catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto params = new InsertProductParamsDto();
        params.setProviderPrice(new BigDecimal(-1));

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isBadRequest());

        params = new InsertProductParamsDto();
        params.setSalePrice(new BigDecimal(-1));

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isBadRequest());

        params = new InsertProductParamsDto();
        params.setBarcode("");

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isBadRequest());

        params = new InsertProductParamsDto();
        params.setBarcode("            ");

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testPutProducts_NotFound() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product = catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto params = new InsertProductParamsDto();

        mockMvc.perform(put("/catalog/products/" + NON_EXISTENT_ID)
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isNotFound());

        params = new InsertProductParamsDto();
        params.setCategoryId(NON_EXISTENT_ID);

        mockMvc.perform(put("/catalog/products/" +  product.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isNotFound());

    }

    @Test
    public void testPutProducts_Conflict() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product1 = catalogService.addProduct(PRODUCT_NAME + "1", PROV_PRICE, SALE_PRICE, category.getId());
        Product product2 = catalogService.addProduct(PRODUCT_NAME + "2", PROV_PRICE, SALE_PRICE, category.getId());

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName(product2.getName());

        mockMvc.perform(put("/catalog/products/" + product1.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isConflict());

        productParams = new InsertProductParamsDto();
        productParams.setBarcode(product2.getBarcode());

        mockMvc.perform(put("/catalog/products/" + product1.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isConflict());

    }

    @Test
    public void testPutProducts_Forbidden() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(SALESMAN_LOGIN);

        this.mockMvc.perform(put("/catalog/products/" + NON_EXISTENT_ID)
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    @Test
    public void testPutProductsActiveInactive_NoContent() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product = catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        this.mockMvc.perform(put("/catalog/products/" + product.getId() + "/active")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isNoContent());

        this.mockMvc.perform(put("/catalog/products/" + product.getId() + "/inactive")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isNoContent());

    }

    @Test
    public void testPutProductsActiveInactive_NotFound() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser(ADMIN_LOGIN);

        this.mockMvc.perform(put("/catalog/products/" + NON_EXISTENT_ID + "/active")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isNotFound());

        this.mockMvc.perform(put("/catalog/products/" + NON_EXISTENT_ID + "/inactive")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isNotFound());

    }

    @Test
    public void testPutProductsActiveInactive_Forbidden() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(SALESMAN_LOGIN);
        Category category = catalogService.addCategory(CATEGORY_NAME);
        Product product = catalogService.addProduct(PRODUCT_NAME, PROV_PRICE, SALE_PRICE, category.getId());

        this.mockMvc.perform(put("/catalog/products/" + product.getId() + "/active")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

        this.mockMvc.perform(put("/catalog/products/" + product.getId() + "/inactive")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

}
