package com.shiftshop.service.model.entities;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProductDao extends PagingAndSortingRepository<Product, Long>, CustomizedProductDao {

    Optional<Product> findByNameIgnoreCase(String name);

    Optional<Product> findByNameIgnoreCaseAndIdIsNot(String name, Long id);

    Optional<Product> findByBarcodeAndIdIsNot(String name, Long id);

    @Query("SELECT MAX(p.updateTimestamp) FROM Product p")
    Optional<LocalDateTime> getLastUpdateTimestamp();

    List<Product> findByUpdateTimestampIsAfter(LocalDateTime lastUpdate);

    List<Product> findAllByActiveIsTrue();

}
