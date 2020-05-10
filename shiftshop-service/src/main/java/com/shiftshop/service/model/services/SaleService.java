package com.shiftshop.service.model.services;

import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Sale;
import com.shiftshop.service.model.entities.SaleItem;

import java.util.Set;

public interface SaleService {

    Sale registerSale(Long sellerId, Sale newSale, Set<SaleItem> saleItems)
            throws CashAmountException, EmptySaleException, InstanceNotFoundException;

}
