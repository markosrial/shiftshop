package com.shiftshop.service.model.entities;

import com.shiftshop.service.model.entities.Product.ProductOrderType;
import org.springframework.data.domain.Slice;

public interface CustomizedProductDao {

    Slice<Product> find(Long categoryId, String keywords, boolean onlyActive,
                        ProductOrderType orderType, OrderAscDesc order, int page, int size);

}
