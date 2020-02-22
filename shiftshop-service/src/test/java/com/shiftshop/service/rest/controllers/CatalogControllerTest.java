package com.shiftshop.service.rest.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shiftshop.service.model.entities.Category;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.UserDao;
import com.shiftshop.service.model.services.CatalogService;
import com.shiftshop.service.model.services.IncorrectLoginException;
import com.shiftshop.service.model.services.UserNotActiveException;
import com.shiftshop.service.rest.dtos.catalog.InsertCategoryParamsDto;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class CatalogControllerTest {

    private final Long NON_EXISTENT_ID = new Long(-1);
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

}
