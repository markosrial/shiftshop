package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PermissionCheckerImpl implements PermissionChecker {

    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(Long userId) throws InstanceNotFoundException {

        Optional<User> user = userDao.findById(userId);

        if (!user.isPresent()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

        return user.get();

    }

    @Override
    public User checkUser(String userName) throws InstancePropertyNotFoundException {

        Optional<User> user = userDao.findByUserName(userName);

        if (!user.isPresent()) {
            throw new InstancePropertyNotFoundException("project.entities.user", "project.entities.props.name", userName);
        }

        return user.get();

    }

}
