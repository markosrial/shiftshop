package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.User;

public interface PermissionChecker {

    public User checkUser(Long userId) throws InstanceNotFoundException;

    public User checkUser(String userName) throws InstancePropertyNotFoundException;

}
