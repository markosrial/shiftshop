package com.shiftshop.service.model.entities.projections;

import com.shiftshop.service.model.entities.Product;

import java.math.BigDecimal;

public interface ProductProfit {

    Product getProduct();
    BigDecimal getProfit();

}
