package com.shiftshop.service.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface ProductDao extends PagingAndSortingRepository<Product, Long>, CustomizedProductDao {

    Optional<Product> findByNameIgnoreCase(String name);

    Optional<Product> findByNameIgnoreCaseAndIdIsNot(String name, Long id);

    Optional<Product> findByBarcodeAndIdIsNot(String name, Long id);

}
