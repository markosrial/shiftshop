package com.shiftshop.service.rest.dtos.catalog;

import com.shiftshop.service.model.entities.Product;

import java.util.List;
import java.util.stream.Collectors;

public class ProductConversor {

    private ProductConversor() {}

    public final static ProductSummaryDto toProductSummaryDto(Product product) {
        return new ProductSummaryDto(product.getId(), product.getName(),
                product.getSalePrice(), product.getCategory().getId());
    }

    public final static List<ProductSummaryDto> toProductSummaryDtos(List<Product> products) {
        return products.stream().map(p -> toProductSummaryDto(p)).collect(Collectors.toList());
    }

}
