package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private SaleDao saleDao;

    @Autowired
    private SaleItemDao saleItemDao;

    @Override
    public Sale registerSale(Long sellerId, Sale sale, Set<SaleItem> saleItems)
            throws CashAmountException, EmptySaleException, InstanceNotFoundException {

        User seller = permissionChecker.checkUser(sellerId);

        if (saleItems.isEmpty()) {
            throw new EmptySaleException();
        }

        try {

            // If sale is already present then it was previously inserted,
            // so the record of that sale is return (sales are immutable)
            return getSaleByBarcode(sale.getBarcode());

        } catch (InstancePropertyNotFoundException e) { }

        // Save new sale
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
            saleItem.setProduct(checkProduct(saleItem.getProduct().getId()));
            saleItem.setCost(saleItem.getProductPrice().subtract(saleItem.getProduct().getProviderPrice()));

            // Link saleItem and sale
            sale.addItem(saleItem);
            saleItemDao.save(saleItem);

        }

        // Calculate sale total price and cost
        sale.setTotal(sale.getItems().stream()
                .reduce(new BigDecimal(0), (a, b) -> a.add(b.getTotalPrice()), BigDecimal::add)
                .subtract(sale.getDiscount()));

        if (sale.getCash() != null && sale.getCash().compareTo(sale.getTotal()) == -1) {
            throw new CashAmountException(sale.getCash(), sale.getTotal());
        }

        sale.setCost(sale.getItems().stream()
                .reduce(new BigDecimal(0), (a, b) -> a.add(b.getTotalCost()), BigDecimal::add));

        return sale;

    }

    private Sale getSaleByBarcode(String barcode) throws InstancePropertyNotFoundException {

        Optional<Sale> sale = saleDao.findByBarcode(barcode);

        if (!sale.isPresent()) {
            throw new InstancePropertyNotFoundException("project.entities.sale",
                    "project.entities.props.barcode", barcode);
        }

        return sale.get();

    }

    private Product checkProduct(Long id) throws InstanceNotFoundException {

        Optional<Product> p = productDao.findById(id);

        if (!p.isPresent()) {
            throw new InstanceNotFoundException("project.entities.product", id);
        }

        return p.get();

    }

}
