package com.shiftshop.service.model.entities;

import com.shiftshop.service.model.entities.User.RoleType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    Optional<User> findByUserName(String userName);

    Slice<User> findByOrderByUserNameAsc(Pageable pageable);

    Slice<User> findByActiveIsTrueOrderByUserNameAsc(Pageable pageable);

    @Query("SELECT MAX(u.updateTimestamp) FROM User u")
    Optional<LocalDateTime> getLastUpdateTimestamp();

    List<User> findByUpdateTimestampIsAfter(LocalDateTime lastUpdate);

    List<User> findAllByActiveIsTrueAndRolesContains(RoleType role);

}
