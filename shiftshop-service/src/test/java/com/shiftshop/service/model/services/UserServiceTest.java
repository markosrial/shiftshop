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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.Assert.assertEquals;

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
    public void testGetUsersWithPagination() throws DuplicateInstancePropertyException, NoUserRolesException {

        User user1 = createUser(USERNAME + "1");
        User user2 = createUser(USERNAME + "2");
        User user3 = createUser(USERNAME + "3");

        user3.setActive(false);
        userDao.save(user3);

        Block<User> expectedBlock = new Block<>(Arrays.asList(user1, user2), false);
        assertEquals(expectedBlock, userService.getUsers(true,0, 3));

        expectedBlock = new Block<>(Arrays.asList(user1), true);
        assertEquals(expectedBlock, userService.getUsers(true,0, 1));

        // Get all
        expectedBlock = new Block<>(Arrays.asList(user1, user2, user3), false);
        assertEquals(expectedBlock, userService.getUsers(false,0, 3));

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
        assertEquals(expectedUsers, userService.getUpdatedUsers(user1.getUpdateTimestamp()));

        assertEquals(new ArrayList<>(), userService.getUpdatedUsers(userService.getLastUserUpdatedTimestamp()));

    }

    @Test
    public void testUpdateUser() throws DuplicateInstancePropertyException, InstanceNotFoundException, NoUserRolesException {

        User user = createUser(USERNAME );

        // Update with no changes
        user = userService.updateUser(user.getId(), null, null, null);

        assertEquals(NAME, user.getName());
        assertEquals(SURNAMES, user.getSurnames());

        // Update with all changes except roles
        String newName = NAME + "X";
        String newSurnames = SURNAMES + "X";

        user = userService.updateUser(user.getId(), newName, newSurnames, null);

        assertEquals(newName, user.getName());
        assertEquals(newSurnames, user.getSurnames());

        // Update roles
        Set<RoleType> newRoles = new HashSet<>(Arrays.asList(RoleType.ADMIN));
        user = userService.updateUser(user.getId(), null, null, newRoles);

        assertEquals(newRoles, user.getRoles());

        // Update manager user
        // Add all roles
        user.getRoles().addAll(Arrays.asList(RoleType.MANAGER, RoleType.ADMIN, RoleType.SALESMAN));
        userDao.save(user);

        // Set empty roles
        user = userService.updateUser(user.getId(), null, null, new HashSet<>());

        assertEquals(new HashSet<>(Arrays.asList(RoleType.MANAGER)), user.getRoles());

    }

    @Test(expected = InstanceNotFoundException.class)
    public void testUpdateUserNoExistent() throws NoUserRolesException, InstanceNotFoundException {
        userService.updateUser(NON_EXISTENT_ID, null, null, null);
    }

    @Test(expected = NoUserRolesException.class)
    public void testUpdateUserNoRoles() throws DuplicateInstancePropertyException, InstanceNotFoundException, NoUserRolesException {

        User user = createUser(USERNAME);

        userService.updateUser(user.getId(), NAME + "X", SURNAMES + "X", new HashSet<>(Arrays.asList(RoleType.MANAGER)));

    }

    @Test
    public void testActiveInactiveUser() throws BlockUserException, DuplicateInstancePropertyException,
            InstanceNotFoundException, NoUserRolesException {

        User user = createUser(USERNAME);

        // Block user
        userService.setActiveUser(user.getId(), false);

        assertEquals(false, user.isActive());

        // Unblock user
        userService.setActiveUser(user.getId(), true);

        assertEquals(true, user.isActive());

    }

    @Test(expected = BlockUserException.class)
    public void testBlockManagerUser() throws BlockUserException, DuplicateInstancePropertyException,
            InstanceNotFoundException, NoUserRolesException {

        // Create manager user
        User user = createUser(USERNAME);
        user.getRoles().addAll(Arrays.asList(RoleType.MANAGER, RoleType.ADMIN, RoleType.SALESMAN));
        userDao.save(user);

        // Block user
        userService.setActiveUser(user.getId(), false);

    }

}
