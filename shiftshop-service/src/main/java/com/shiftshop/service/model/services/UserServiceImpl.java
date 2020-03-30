package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.common.utils.MessageConstants;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.User.RoleType;
import com.shiftshop.service.model.entities.UserDao;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Override
    public User registerUser(User user) throws DuplicateInstancePropertyException, NoUserRolesException {

        try {

            // Check if user with login exists
            permissionChecker.checkUser(user.getUserName());
            throw new DuplicateInstancePropertyException(MessageConstants.ENTITIES_USER,
                    MessageConstants.ENTITIES_PROPS_USERNAME, user.getUserName());

        } catch (InstancePropertyNotFoundException e) {

            // New manager users can not be registered
            user.getRoles().remove(RoleType.MANAGER);

            if (user.getRoles().size() == 0) {
                throw new NoUserRolesException();
            }

            // Set password to login if no password given and encode the selected password
            user.setPassword(passwordEncoder.encode(
                    user.getPassword() == null ? user.getUserName() : user.getPassword()));

            user.setActive(true);

            return userDao.save(user);

        }
    }

    @Override
    @Transactional(readOnly = true)
    public User login(String userName, String password) throws IncorrectLoginException, UserNotActiveException {

        User user;

        try {
            user = permissionChecker.checkUser(userName);
        } catch (InstancePropertyNotFoundException e) {
            throw new IncorrectLoginException();
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IncorrectLoginException();
        }

        // We check if user is active after matching password to secure if some user is trying to
        // discover blocked accounts
        if (!user.isActive()) {
            throw new UserNotActiveException();
        }

        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public User loginFromId(Long id) throws InstanceNotFoundException, UserNotActiveException {

        User user = permissionChecker.checkUser(id);

        if (!user.isActive()) {
            throw new UserNotActiveException();
        }

        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public Block<User> getUsers(int page, int size) {

        Slice<User> slice = userDao.findByActiveIsTrueOrderByUserNameAsc(PageRequest.of(page, size));

        return new Block<>(slice.getContent(), slice.hasNext());
    }


    @Override
    @Transactional(readOnly = true)
    public Block<User> getBlockedUsers(int page, int size) {

        Slice<User> slice = userDao.findByActiveIsFalseOrderByUserNameAsc(PageRequest.of(page, size));

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public LocalDateTime getLastUserUpdatedTimestamp() {

        Optional<LocalDateTime> lastUpdate = userDao.getLastUpdateTimestampDesc();

        if (lastUpdate.isEmpty()) {
            return LocalDateTime.MIN;
        }

        return lastUpdate.get();
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getUpdatedUsers(LocalDateTime lastUpdate) {

        if (lastUpdate != null) {
            return userDao.findByUpdateTimestampIsAfter(lastUpdate);
        } else {
            return userDao.findAllByActiveIsTrueAndRolesContains(RoleType.SALESMAN);
        }
    }
}
