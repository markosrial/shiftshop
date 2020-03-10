package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.User.RoleType;
import com.shiftshop.service.model.entities.UserDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {

    private final Long NON_EXISTENT_ID = -1L;
    private final String USERNAME = "user";
    private final String PASSWORD = "password";

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserService userService;

    private Set<RoleType> createRoles() {

        Set<RoleType> roles = new HashSet<>();
        roles.add(RoleType.MANAGER);
        roles.add(RoleType.ADMIN);

        return roles;

    }

    private User createUser(String userName) {

        User user = new User(userName, PASSWORD);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(true);
        user.setRoles(createRoles());

        return userDao.save(user);

    }

    @Test
    public void testLoginFromId() throws InstanceNotFoundException, UserNotActiveException {

        User user = createUser(USERNAME);

        User loggedInUser = userService.loginFromId(user.getId());
        assertEquals(user, loggedInUser);

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testloginFromNonExistentId() throws InstanceNotFoundException, UserNotActiveException {

        userService.loginFromId(NON_EXISTENT_ID);

    }

    @Test(expected = UserNotActiveException.class)
    public void testLoginFromIdNotActive() throws InstanceNotFoundException, UserNotActiveException {

        User user = createUser(USERNAME);
        user.setActive(false);

        userService.loginFromId(user.getId());

    }

    @Test
    public void testLogin() throws IncorrectLoginException, UserNotActiveException {

        User user = createUser(USERNAME);

        User loggedInUser = userService.login(user.getUserName(), PASSWORD);
        assertEquals(user, loggedInUser);

    }

    @Test(expected = IncorrectLoginException.class)
    public void testLoginWithNonExistentUserName() throws IncorrectLoginException, UserNotActiveException {

        userService.login("X", "Y");

    }

    @Test(expected = IncorrectLoginException.class)
    public void testLoginWithIncorrectPassword() throws IncorrectLoginException, UserNotActiveException {

        User user = createUser(USERNAME);

        userService.login(user.getUserName(), 'X' + PASSWORD);

    }

    @Test(expected = UserNotActiveException.class)
    public void testLoginNotActive() throws IncorrectLoginException, UserNotActiveException {

        User user = createUser(USERNAME);

        // Set inactive
        user.setActive(false);
        userDao.save(user);

        userService.login(user.getUserName(), PASSWORD);

    }

}
