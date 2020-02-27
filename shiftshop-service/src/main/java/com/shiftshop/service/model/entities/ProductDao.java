package com.shiftshop.service.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface ProductDao extends PagingAndSortingRepository<Product, Long> {

    Optional<Product> findByNameIgnoreCase(String name);

}
