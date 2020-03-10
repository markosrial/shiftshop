package com.shiftshop.service.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    Optional<User> findByUserName(String userName);

}
