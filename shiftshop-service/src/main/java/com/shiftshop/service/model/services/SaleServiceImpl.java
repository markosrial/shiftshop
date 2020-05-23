package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.common.utils.EntitiesOrder;
import com.shiftshop.service.model.common.utils.MessageConstants;
import com.shiftshop.service.model.entities.*;
import com.shiftshop.service.model.entities.Sale.SaleOrderType;
import com.shiftshop.service.model.entities.projections.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class SaleServiceImpl implements SaleService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private SaleDao saleDao;

    @Autowired
    private SaleItemDao saleItemDao;

    @Override
    @Transactional
    public Sale registerSale(Long sellerId, Sale sale, Set<SaleItem> saleItems)
            throws CashAmountException, EmptySaleException, InstanceNotFoundException {

        User seller = permissionChecker.checkUser(sellerId);

        if (saleItems.isEmpty()) {
            throw new EmptySaleException();
        }

        try {

            // If sale is already present then it was previously inserted,
            // so the record of that sale is return (sales are immutable)
            return findSaleByBarcode(sale.getBarcode());

        } catch (InstancePropertyNotFoundException e) { }

        // Save new sale
        sale.setBarcode(sale.getBarcode().toUpperCase());
        sale.setSeller(seller);
        sale.setTotal(new BigDecimal(0));
        if (sale.getDiscount() == null) {
            sale.setDiscount(new BigDecimal(0));
        }
        sale.setCost(new BigDecimal(0));
        sale.setActive(true);
        saleDao.save(sale);

        // Add sale items
        for (SaleItem saleItem : saleItems) {

            // Link product and calculate unit profit
            saleItem.setProduct(permissionChecker.checkProduct(saleItem.getProduct().getId()));
            saleItem.setCost(saleItem.getProduct().getProviderPrice());

            // Link saleItem and sale
            sale.addItem(saleItem);
            saleItemDao.save(saleItem);

        }

        // Calculate sale total price and cost
        sale.setTotal(sale.getItems().stream()
                .reduce(new BigDecimal(0), (a, b) -> a.add(b.getTotalPrice()), BigDecimal::add)
                .subtract(sale.getDiscount()).setScale(2, RoundingMode.HALF_EVEN));

        if (sale.getCash() != null && sale.getCash().compareTo(sale.getTotal()) < 0) {
            throw new CashAmountException(sale.getCash(), sale.getTotal());
        }

        sale.setCost(sale.getItems().stream()
                .reduce(new BigDecimal(0), (a, b) -> a.add(b.getTotalCost()), BigDecimal::add)
                .setScale(2, RoundingMode.HALF_EVEN));

        return sale;

    }

    @Override
    public Block<Sale> findSales(LocalDate initDate, LocalDate endDate, String orderBy, String direction,
                                 int page, int size)
            throws InvalidDateRangeException {

        if (endDate == null) {
            endDate = initDate;
        }

        if (endDate.isBefore(initDate)) {
            throw new InvalidDateRangeException();
        }

        Slice<Sale> slice = saleDao.findAllByDateBetween(initDate.atStartOfDay(), endDate.atTime(LocalTime.MAX),
                PageRequest.of(page, size,
                        Sort.by(EntitiesOrder.directionFromStringOrDefault(direction),
                                SaleOrderType.fromStringOrDefault(orderBy).name())));

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public Sale findSaleByBarcode(String barcode) throws InstancePropertyNotFoundException {

        Optional<Sale> sale = saleDao.findByBarcode(barcode);

        if (!sale.isPresent()) {
            throw new InstancePropertyNotFoundException(MessageConstants.ENTITIES_SALE,
                    MessageConstants.ENTITIES_PROPS_BARCODE, barcode);
        }

        return sale.get();

    }

    @Override
    public List<Sale> findFirstSalesByBarcode(String startingCode, int size) {
        return saleDao.findByBarcodeStartingWith(startingCode, PageRequest.of(0, size,
                Sort.by(Direction.ASC, SaleOrderType.barcode.name()))).getContent();
    }

    @Override
    public List<ProductSales> getFortnightTopBestSellingProduct(int size) {

        LocalDateTime actual = LocalDate.now().atStartOfDay();

        return saleDao.getTopBestSellingProduct(actual.minusDays(15), actual, PageRequest.of(0, size))
                .getContent();

    }

    @Override
    public List<ProductProfit> getFortnightTopProfitableProduct(int size) {

        LocalDateTime actual = LocalDate.now().atStartOfDay();

        return saleDao.getTopProfitableProduct(actual.minusDays(15), actual, PageRequest.of(0, size))
                .getContent();

    }

    @Override
    public SalesCountResume getMonthSalesCountResume() {

        LocalDateTime actual = LocalDate.now().atStartOfDay();

        return saleDao.getSalesCountSummary(actual.minusDays(30), actual);

    }

    @Override
    public SalesTotalAndProfit getMonthSalesTotalAndProfit() {

        LocalDateTime actual = LocalDate.now().atStartOfDay();

        return saleDao.getSalesTotalAndProfit(actual.minusDays(30), actual);

    }

    @Override
    public List<MonthSalesTotalAndProfit> getMonthlyTotalsAndProfitsFromYear(Integer year) {

        if (year == null) {
            year = LocalDate.now().getYear();
        }

        return saleDao.getMonthlyTotalsAndProfitsFromYear(year);

    }

}
