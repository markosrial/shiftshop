package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.User;

public interface UserService {

    User login(String userName, String password) throws IncorrectLoginException, UserNotActiveException;

    User loginFromId(Long id) throws InstanceNotFoundException, UserNotActiveException;

    Block<User> getUsers(int page, int size);

    Block<User> getBlockedUsers(int page, int size);

}
