package com.shiftshop.service.rest.dtos.catalog;

import java.math.BigDecimal;

public class ProductSummaryDto {

    private Long id;
    private String name;
    private BigDecimal salePrice;
    private Long categoryId;

    public ProductSummaryDto() { }

    public ProductSummaryDto(Long id, String name, BigDecimal salePrice, Long categoryId) {

        this.id = id;
        this.name = name;
        this.salePrice = salePrice;
        this.categoryId = categoryId;

    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public BigDecimal getSalePrice() { return salePrice; }

    public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }

    public Long getCategoryId() { return categoryId; }

    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

}
