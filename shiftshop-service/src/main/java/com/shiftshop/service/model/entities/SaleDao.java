package com.shiftshop.service.model.entities;

import com.shiftshop.service.model.entities.projections.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SaleDao extends PagingAndSortingRepository<Sale, Long> {

    Optional<Sale> findByBarcode(String barcode);

    Slice<Sale> findByBarcodeStartingWith(String code, Pageable page);

    Slice<Sale> findAllByDateBetween(LocalDateTime initDate, LocalDateTime endDate, Pageable page);

    @Query("SELECT si.product AS product, SUM(si.quantity) AS quantity " +
            "FROM SaleItem si WHERE si.sale.date BETWEEN ?1 AND ?2 GROUP BY si.product.id ORDER BY quantity DESC")
    Slice<ProductSales> getTopBestSellingProduct(LocalDateTime initDate, LocalDateTime endDate, Pageable page);

    @Query("SELECT si.product AS product, SUM((si.salePrice - si.cost) * si.quantity) AS profit " +
            "FROM SaleItem si WHERE si.sale.date BETWEEN ?1 AND ?2 GROUP BY si.product.id ORDER BY profit DESC")
    Slice<ProductProfit> getTopProfitableProduct(LocalDateTime initDate, LocalDateTime endDate, Pageable page);

    @Query("SELECT COUNT(distinct s.id) AS salesCount, COALESCE(SUM(si.quantity), 0) AS itemsCount " +
            "FROM Sale s JOIN SaleItem si ON s.id = si.sale.id AND s.date BETWEEN ?1 AND ?2")
    SalesCountResume getSalesCountSummary(LocalDateTime initDate, LocalDateTime endDate);

    @Query("SELECT COALESCE(SUM(s.total), 0) AS total, COALESCE(SUM(s.total - s.cost), 0) AS profit " +
            "FROM Sale s WHERE s.date BETWEEN ?1 AND ?2")
    SalesTotalAndProfit getSalesTotalAndProfit(LocalDateTime initDate, LocalDateTime endDate);

    @Query("SELECT COALESCE(SUM(s.total), 0) AS total, COALESCE(SUM(s.total - s.cost), 0) AS profit, MONTH(s.date) AS month " +
            "FROM Sale s WHERE YEAR(s.date) = ?1 GROUP BY MONTH(s.date) ORDER BY month")
    List<MonthSalesTotalAndProfit> getMonthlyTotalsAndProfitsFromYear(int year);

}
