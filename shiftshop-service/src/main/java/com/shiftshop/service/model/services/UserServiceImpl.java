package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
