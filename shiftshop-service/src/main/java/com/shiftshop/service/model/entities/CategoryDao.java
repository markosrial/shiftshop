package com.shiftshop.service.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface CategoryDao extends PagingAndSortingRepository<Category, Long> {

    Optional<Category> findByNameIgnoreCase(String name);

}
