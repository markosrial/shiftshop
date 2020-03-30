package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.User;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    User registerUser(User user) throws DuplicateInstancePropertyException, NoUserRolesException;

    User login(String userName, String password) throws IncorrectLoginException, UserNotActiveException;

    User loginFromId(Long id) throws InstanceNotFoundException, UserNotActiveException;

    Block<User> getUsers(int page, int size);

    Block<User> getBlockedUsers(int page, int size);

    LocalDateTime getLastUserUpdatedTimestamp();

    List<User> getUpdatedUsers(LocalDateTime lastUpdate);

}
