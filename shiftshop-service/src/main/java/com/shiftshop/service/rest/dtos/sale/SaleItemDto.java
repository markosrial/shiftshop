package com.shiftshop.service.rest.dtos.sale;

import java.math.BigDecimal;

public class SaleItemDto {

    private Long id;
    private BigDecimal salePrice;
    private BigDecimal cost;
    private int quantity;
    private Long productId;
    private String productName;

    public SaleItemDto() { }

    public SaleItemDto(Long id, BigDecimal salePrice, BigDecimal cost, int quantity, Long productId, String productName) {

        this.id = id;
        this.salePrice = salePrice;
        this.cost = cost;
        this.quantity = quantity;
        this.productId = productId;
        this.productName = productName;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

}
