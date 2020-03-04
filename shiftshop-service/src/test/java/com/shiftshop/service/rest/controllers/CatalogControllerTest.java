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

    private final static String PASSWORD = "password";

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

        User user = new User(userName, PASSWORD);

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

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

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

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

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

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName("test");

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

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser("salesman");

        this.mockMvc.perform(post("/catalog/categories" )
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    @Test
    public void testGetCategories_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test1");

        mockMvc.perform(get("/catalog/categories/" + category.getId())
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isOk());
        mockMvc.perform(get("/catalog/categories")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isOk());

    }

    @Test
    public void testGetCategoy_NotFound() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

        mockMvc.perform(get("/catalog/categories/-1" )
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isNotFound());

    }

    @Test
    public void testGetCategoy_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

        mockMvc.perform(get("/catalog/categories/a")
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testPutCategories_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test");

        ObjectMapper mapper = new ObjectMapper();

        InsertCategoryParamsDto params = new InsertCategoryParamsDto();
        params.setName("newTest");

        mockMvc.perform(put("/catalog/categories/" + category.getId())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(params)))
                .andExpect(status().isOk());

    }

    @Test
    public void testPutCategories_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test");

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

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category1 = catalogService.addCategory("test1");
        Category category2 = catalogService.addCategory("test2");

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

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser("salesman");
        Category category = catalogService.addCategory("test");

        this.mockMvc.perform(put("/catalog/categories/"+category.getId())
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    /* Test product section from controller */

    @Test
    public void testPostProducts_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test");

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName("product");
        productParams.setProviderPrice(new BigDecimal(0.1));
        productParams.setSalePrice(new BigDecimal(5));
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isOk());

    }

    @Test
    public void testPostProducts_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test");

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName("");
        productParams.setProviderPrice(new BigDecimal(0.1));
        productParams.setSalePrice(new BigDecimal(5));
        productParams.setCategoryId(category.getId());


        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testPostProducts_Conflict() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test");
        catalogService.addProduct("product", new BigDecimal(0.1), new BigDecimal(5), category.getId());

        ObjectMapper mapper = new ObjectMapper();

        InsertProductParamsDto productParams = new InsertProductParamsDto();
        productParams.setName("product");
        productParams.setProviderPrice(new BigDecimal(0.1));
        productParams.setSalePrice(new BigDecimal(5));
        productParams.setCategoryId(category.getId());

        mockMvc.perform(post("/catalog/products")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(productParams)))
                .andExpect(status().isConflict());

    }

    @Test
    public void testPostProducts_Forbidden() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser("salesman");

        this.mockMvc.perform(post("/catalog/products" )
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isForbidden());

    }

    @Test
    public void testGetProduct_Ok() throws Exception {

        AuthenticatedUserDto admin = createAuthenticatedAdminUser("admin");
        AuthenticatedUserDto salesman = createAuthenticatedSalesmanUser("salesman");

        Category category = catalogService.addCategory("test");
        Product product = catalogService.addProduct("product", new BigDecimal(0.1), new BigDecimal(5), category.getId());

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

        AuthenticatedUserDto admin = createAuthenticatedAdminUser("admin");

        mockMvc.perform(get("/catalog/products/0")
                .header("Authorization", "Bearer " + admin.getServiceToken()))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetProducts_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        Category category = catalogService.addCategory("test");
        catalogService.addProduct("product1", new BigDecimal(0.1), new BigDecimal(5), category.getId());
        catalogService.addProduct("product2", new BigDecimal(0.1), new BigDecimal(5), category.getId());
        catalogService.addProduct("product3", new BigDecimal(0.1), new BigDecimal(5), category.getId());

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

}
