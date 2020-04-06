package com.shiftshop.service.rest.controllers;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.services.*;
import com.shiftshop.service.rest.dtos.user.AuthenticatedUserDto;
import com.shiftshop.service.rest.dtos.user.LoginParamsDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class POSControllerTest {

    private final static String USERNAME = "user";
    private final static String PASSWORD = "password";
    private final String NAME = "User";
    private final String SURNAMES = "Test Tester";
    private final String CATEGORY_NAME = "category";
    private final String PRODUCT_NAME = "product";
    private final BigDecimal PROV_PRICE = new BigDecimal(5.25);
    private final BigDecimal SALE_PRICE = new BigDecimal(21.95);

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private UserController userController;

    private AuthenticatedUserDto createAuthenticatedUser(String userName, Set<User.RoleType> roles)
            throws IncorrectLoginException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = new User(userName, PASSWORD, NAME, SURNAMES, roles);

        userService.registerUser(user);

        LoginParamsDto loginParams = new LoginParamsDto();
        loginParams.setUserName(user.getUserName());
        loginParams.setPassword(PASSWORD);

        return userController.login(loginParams);
    }

    private AuthenticatedUserDto createAuthenticatedSalesmanUser(String userName)
            throws IncorrectLoginException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {
        return createAuthenticatedUser(userName, new HashSet<>(Arrays.asList(User.RoleType.SALESMAN)));
    }

    private Category createCategory(String name) throws DuplicateInstancePropertyException {
        return catalogService.addCategory(name);
    }

    private Product createProduct(String name, Long categoryId)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {

        return catalogService.addProduct(name, PROV_PRICE, SALE_PRICE, categoryId);

    }

    @Test
    public void testGetLastUpdateTimestamp_Ok() throws Exception {

        // Add 1st product
        Category category = createCategory(CATEGORY_NAME);
        createProduct(PRODUCT_NAME + "1", category.getId());

        // Add user and should get his updateTimestamp
        AuthenticatedUserDto authUser = createAuthenticatedSalesmanUser(USERNAME);
        User user = userService.loginFromId(authUser.getUserLoggedDto().getId());

        mockMvc.perform(get("/pos/lastUpdateTimestamp")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(user.getUpdateTimestamp().toString()));

        // Add 2nd product and should get his updateTimestamp
        Product product = createProduct(PRODUCT_NAME + "2", category.getId());

        mockMvc.perform(get("/pos/lastUpdateTimestamp")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(product.getUpdateTimestamp().toString()));

    }

    @Test
    public void testSyncUsers_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(USERNAME + "1");

        mockMvc.perform(get("/pos/syncUsers")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));

        LocalDateTime timestamp = userService.loginFromId(user.getUserLoggedDto().getId()).getUpdateTimestamp();

        createAuthenticatedSalesmanUser(USERNAME + "2");
        createAuthenticatedSalesmanUser(USERNAME + "3");

        mockMvc.perform(get("/pos/syncUsers")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));

        mockMvc.perform(get("/pos/syncUsers?lastUpdate=" + timestamp.toString())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

    }

    @Test
    public void testSyncUsers_Forbidden() throws Exception {

        mockMvc.perform(get("/pos/syncUsers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

    }

    @Test
    public void testSyncProducts_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedSalesmanUser(USERNAME);

        mockMvc.perform(get("/pos/syncProducts")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        Category category = createCategory(CATEGORY_NAME);
        Product product = createProduct(PRODUCT_NAME + "1", category.getId());
        createProduct(PRODUCT_NAME + "2", category.getId());
        createProduct(PRODUCT_NAME + "3", category.getId());

        LocalDateTime timestamp = product.getUpdateTimestamp();

        mockMvc.perform(get("/pos/syncProducts")
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));

        mockMvc.perform(get("/pos/syncProducts?lastUpdate=" + timestamp.toString())
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

    }

    @Test
    public void testSyncProducts_Forbidden() throws Exception {

        mockMvc.perform(get("/pos/syncProducts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

    }

}
