package com.shiftshop.service.model.entities;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    Optional<User> findByUserName(String userName);

    Slice<User> findByActiveIsTrueOrderByUserNameAsc(Pageable pageable);

    Slice<User> findByActiveIsFalseOrderByUserNameAsc(Pageable pageable);

}
