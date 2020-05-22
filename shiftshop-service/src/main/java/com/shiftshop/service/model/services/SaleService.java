package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.Sale;
import com.shiftshop.service.model.entities.SaleItem;
import com.shiftshop.service.model.entities.projections.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface SaleService {

    Sale registerSale(Long sellerId, Sale newSale, Set<SaleItem> saleItems)
            throws CashAmountException, EmptySaleException, InstanceNotFoundException;

    Block<Sale> findSales(LocalDate initDate, LocalDate endDate,
                          String orderBy, String direction, int page, int size)
            throws InvalidDateRangeException;

    Sale findSaleByBarcode(String barcode) throws InstancePropertyNotFoundException;

    List<Sale> findFirstSalesByBarcode(String startingCode, int size);

    List<ProductSales> getFortnightTopBestSellingProduct(int size);

    List<ProductProfit> getFortnightTopProfitableProduct(int size);

    SalesCountResume getMonthSalesCountResume();

    SalesTotalAndProfit getMonthSalesTotalAndProfit();

    List<MonthSalesTotalAndProfit> getMonthlyTotalsAndProfitsFromYear(Integer year);

}
