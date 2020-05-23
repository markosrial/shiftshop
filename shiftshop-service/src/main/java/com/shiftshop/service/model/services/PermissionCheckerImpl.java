package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.common.utils.MessageConstants;
import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.entities.ProductDao;
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
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(Long userId) throws InstanceNotFoundException {

        Optional<User> user = userDao.findById(userId);

        if (!user.isPresent()) {
            throw new InstanceNotFoundException(MessageConstants.ENTITIES_USER, userId);
        }

        return user.get();

    }

    @Override
    public User checkUser(String userName) throws InstancePropertyNotFoundException {

        Optional<User> user = userDao.findByUserName(userName);

        if (!user.isPresent()) {
            throw new InstancePropertyNotFoundException(MessageConstants.ENTITIES_USER,
                    MessageConstants.ENTITIES_PROPS_NAME, userName);
        }

        return user.get();

    }

    @Override
    public Product checkProduct(Long id) throws InstanceNotFoundException {

        Optional<Product> p = productDao.findById(id);

        if (!p.isPresent()) {
            throw new InstanceNotFoundException(MessageConstants.ENTITIES_PRODUCT, id);
        }

        return p.get();

    }

}
