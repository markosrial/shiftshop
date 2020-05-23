package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.entities.User;

public interface PermissionChecker {

    User checkUser(Long userId) throws InstanceNotFoundException;

    User checkUser(String userName) throws InstancePropertyNotFoundException;

    Product checkProduct(Long id) throws InstanceNotFoundException;

}
