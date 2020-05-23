package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.User;
import com.shiftshop.service.model.entities.User.RoleType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface UserService {

    User registerUser(User user) throws DuplicateInstancePropertyException, NoUserRolesException;

    User login(String userName, String password) throws IncorrectLoginException, UserNotActiveException;

    User loginFromId(Long id) throws InstanceNotFoundException, UserNotActiveException;

    Block<User> getUsers(boolean onlyActive, int page, int size);

    LocalDateTime getLastUserUpdatedTimestamp();

    List<User> getUpdatedUsers(LocalDateTime lastUpdate);

    User updateUser(Long id, String name, String surnames, Set<RoleType> roles)
            throws InstanceNotFoundException, NoUserRolesException;

    void setActiveUser(Long id, boolean active) throws BlockUserException, InstanceNotFoundException;

    void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException;

}
