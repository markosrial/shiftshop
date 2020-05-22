package com.shiftshop.service.model.entities.projections;

import com.shiftshop.service.model.entities.Product;

public interface ProductSales {

    Product getProduct();
    long getQuantity();

}
