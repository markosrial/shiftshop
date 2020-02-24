package com.shiftshop.service.rest.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.User.RoleType;
import com.shiftshop.service.model.entities.UserDao;
import com.shiftshop.service.model.services.IncorrectLoginException;
import com.shiftshop.service.model.services.UserNotActiveException;
import com.shiftshop.service.rest.common.JwtGenerator;
import com.shiftshop.service.rest.common.JwtInfo;
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

import java.util.HashSet;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class UserControllerTest {


    private final Long NON_EXISTENT_ID = new Long(-1);
    private final static String PASSWORD = "password";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserController userController;

    private AuthenticatedUserDto createAuthenticatedUser(String userName, Set<RoleType> roles)
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

        Set<RoleType> roles = new HashSet<>();
        roles.add(RoleType.ADMIN);

        return createAuthenticatedUser(userName, roles);
    }

    @Test
    public void testPostLogin_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        ObjectMapper mapper = new ObjectMapper();

        LoginParamsDto loginParams = new LoginParamsDto();
        loginParams.setUserName(user.getUserDto().getUserName());
        loginParams.setPassword(PASSWORD);

        mockMvc.perform(post("/users/login" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(loginParams)))
                .andExpect(status().isOk());
    }

    @Test
    public void testPostLogin_NotFound() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");
        ObjectMapper mapper = new ObjectMapper();

        // Incorrect username

        LoginParamsDto loginParams = new LoginParamsDto();
        loginParams.setUserName("_" + user.getUserDto().getUserName());
        loginParams.setPassword(PASSWORD);

        mockMvc.perform(post("/users/login" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(loginParams)))
                .andExpect(status().isNotFound());

        // Incorrect password

        loginParams = new LoginParamsDto();
        loginParams.setUserName(user.getUserDto().getUserName());
        loginParams.setPassword("_" + PASSWORD);

        mockMvc.perform(post("/users/login" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(loginParams)))
                .andExpect(status().isNotFound());

        // Not active user

        User userInserted = userDao.findByUserName(user.getUserDto().getUserName()).get();
        userInserted.setActive(false);
        userDao.save(userInserted);

        loginParams = new LoginParamsDto();
        loginParams.setUserName(user.getUserDto().getUserName());
        loginParams.setPassword(PASSWORD);

        mockMvc.perform(post("/users/login" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(loginParams)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testPostLogin_BadRequest() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

        // Without loginParams

        mockMvc.perform(post("/users/login" )
                .header("Authorization", "Bearer " + user.getServiceToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testPostLoginFromServiceToken_Ok() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

        mockMvc.perform(post("/users/loginFromServiceToken" )
                .header("Authorization", "Bearer " + user.getServiceToken()))
                .andExpect(status().isOk());
    }

    @Test
    public void testPostLoginFromServiceToken_NotFound() throws Exception {

        AuthenticatedUserDto user = createAuthenticatedAdminUser("admin");

        String tokenWithNoExistentId = jwtGenerator.generate(
                new JwtInfo(NON_EXISTENT_ID, user.getUserDto().getUserName(), user.getUserDto().getRoles()));

        mockMvc.perform(post("/users/loginFromServiceToken" )
                .header("Authorization", "Bearer " + tokenWithNoExistentId))
                .andExpect(status().isNotFound());
    }

}
