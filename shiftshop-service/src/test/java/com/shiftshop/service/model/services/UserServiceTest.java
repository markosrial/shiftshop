package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
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

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {

    private final Long NON_EXISTENT_ID = -1L;
    private final String USERNAME = "user";
    private final String NAME = "User";
    private final String SURNAMES = "Test Tester";
    private final String PASSWORD = "password";

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserService userService;

    private User createUser(String userName) throws DuplicateInstancePropertyException, NoUserRolesException {

        User user = new User(userName, PASSWORD, NAME, SURNAMES,
                new HashSet<>(Arrays.asList(RoleType.ADMIN, RoleType.SALESMAN)));

        return userService.registerUser(user);

    }

    @Test
    public void testRegisterUserAndLogin() throws IncorrectLoginException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = createUser(USERNAME);

        User loggedInUser = userService.login(user.getUserName(), PASSWORD);
        assertEquals(user, loggedInUser);

    }

    @Test
    public void testRegisterUserNoPasswordAndLogin() throws IncorrectLoginException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = new User(USERNAME, null, NAME, SURNAMES,
                new HashSet<>(Arrays.asList(RoleType.ADMIN, RoleType.SALESMAN)));

        userService.registerUser(user);

        // Login with default password -> username of the new user
        User loggedInUser = userService.login(user.getUserName(), USERNAME);
        assertEquals(user, loggedInUser);

    }

    @Test(expected = DuplicateInstancePropertyException.class)
    public void testRegisterUserDuplicatedUserName() throws DuplicateInstancePropertyException, NoUserRolesException {

        createUser(USERNAME);
        createUser(USERNAME);

    }

    @Test(expected = NoUserRolesException.class)
    public void testRegisterUserNoUserRoles() throws DuplicateInstancePropertyException, NoUserRolesException {

        User user = new User(USERNAME, null, NAME, SURNAMES, new HashSet<>());

        userService.registerUser(user);

    }

    @Test(expected = NoUserRolesException.class)
    public void testRegisterManagerUser() throws DuplicateInstancePropertyException, NoUserRolesException {

        User user = new User(USERNAME, null, NAME, SURNAMES, new HashSet<>(Arrays.asList(RoleType.MANAGER)));

        userService.registerUser(user);

    }

    @Test
    public void testLoginFromId() throws InstanceNotFoundException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = createUser(USERNAME);

        User loggedInUser = userService.loginFromId(user.getId());
        assertEquals(user, loggedInUser);

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testLoginFromNonExistentId() throws InstanceNotFoundException, UserNotActiveException {

        userService.loginFromId(NON_EXISTENT_ID);

    }

    @Test(expected = UserNotActiveException.class)
    public void testLoginFromIdNotActive() throws InstanceNotFoundException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = createUser(USERNAME);
        user.setActive(false);

        userService.loginFromId(user.getId());

    }

    @Test(expected = IncorrectLoginException.class)
    public void testLoginWithNonExistentUserName() throws IncorrectLoginException, UserNotActiveException {

        userService.login("X", "Y");

    }

    @Test(expected = IncorrectLoginException.class)
    public void testLoginWithIncorrectPassword() throws IncorrectLoginException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = createUser(USERNAME);

        userService.login(user.getUserName(), 'X' + PASSWORD);

    }

    @Test(expected = UserNotActiveException.class)
    public void testLoginNotActive() throws IncorrectLoginException, UserNotActiveException,
            DuplicateInstancePropertyException, NoUserRolesException {

        User user = createUser(USERNAME);

        // Set inactive
        user.setActive(false);
        userDao.save(user);

        userService.login(user.getUserName(), PASSWORD);

    }

    @Test
    public void testGetActiveUsersWithPagination() throws DuplicateInstancePropertyException, NoUserRolesException {

        User user1 = createUser(USERNAME + "1");
        User user2 = createUser(USERNAME + "2");
        User user3 = createUser(USERNAME + "3");

        user3.setActive(false);
        userDao.save(user3);

        Block<User> expectedBlock = new Block<>(Arrays.asList(user1, user2), false);
        assertEquals(expectedBlock, userService.getUsers(0, 3));

        expectedBlock = new Block<>(Arrays.asList(user1), true);
        assertEquals(expectedBlock, userService.getUsers(0, 1));

    }

    @Test
    public void testGetBlockedUsersWithPagination() throws DuplicateInstancePropertyException, NoUserRolesException {

        User user1 = createUser(USERNAME + "1");
        User user2 = createUser(USERNAME + "2");
        createUser(USERNAME + "3");

        user1.setActive(false);
        userDao.save(user1);

        user2.setActive(false);
        userDao.save(user2);

        Block<User> expectedBlock = new Block<>(Arrays.asList(user1, user2), false);
        assertEquals(expectedBlock, userService.getBlockedUsers(0, 3));

        expectedBlock = new Block<>(Arrays.asList(user1), true);
        assertEquals(expectedBlock, userService.getBlockedUsers(0, 1));

    }

    @Test
    public void testLastUserUpdates() throws DuplicateInstancePropertyException, NoUserRolesException {

        // Test update timestamp

        assertEquals(LocalDateTime.MIN, userService.getLastUserUpdatedTimestamp());

        User user1 = createUser(USERNAME + "1");

        assertEquals(user1.getUpdateTimestamp(), userService.getLastUserUpdatedTimestamp());

        // Test updated users

        User user2 = createUser(USERNAME + "2");

        List<User> expectedUsers = new ArrayList<>(Arrays.asList(user1, user2));
        assertEquals(expectedUsers, userService.getUpdatedUsers(null));


        expectedUsers = new ArrayList<>(Arrays.asList(user2));
        assertEquals(expectedUsers, userService.getUpdatedUsers(user1.getUpdateTimestamp()));

        assertEquals(new ArrayList<>(), userService.getUpdatedUsers(userService.getLastUserUpdatedTimestamp()));

    }

}
