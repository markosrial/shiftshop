package com.shiftshop.service.rest.dtos.catalog;

import java.math.BigDecimal;

public class POSProductDto {

    private Long id;
    private String name;
    private BigDecimal salePrice;
    private String barcode;
    private boolean active;

    public POSProductDto() {}

    public POSProductDto(Long id, String name, BigDecimal salePrice, String barcode, boolean active) {

        this.id = id;
        this.name = name;
        this.salePrice = salePrice;
        this.barcode = barcode;
        this.active = active;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}
