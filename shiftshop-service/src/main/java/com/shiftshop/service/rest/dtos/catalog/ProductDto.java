package com.shiftshop.service.rest.dtos.catalog;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductDto {

    private Long id;
    private String name;
    private BigDecimal providerPrice;
    private BigDecimal salePrice;
    private String barcode;
    private LocalDateTime creationDate;
    private boolean active;
    private Long categoryId;

    public ProductDto() { }

    public ProductDto(Long id, String name, BigDecimal providerPrice, BigDecimal salePrice,
                      String barcode, LocalDateTime creationDate, boolean active, Long categoryId) {

        this.id = id;
        this.name = name;
        this.providerPrice = providerPrice;
        this.salePrice = salePrice;
        this.barcode = barcode;
        this.creationDate = creationDate;
        this.active = active;
        this.categoryId = categoryId;

    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public BigDecimal getProviderPrice() { return providerPrice; }

    public void setProviderPrice(BigDecimal providerPrice) { this.providerPrice = providerPrice; }

    public BigDecimal getSalePrice() { return salePrice; }

    public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }

    public String getBarcode() { return barcode; }

    public void setBarcode(String barcode) { this.barcode = barcode; }

    public LocalDateTime getCreationDate() { return creationDate; }

    public void setCreationDate(LocalDateTime creationDate) { this.creationDate = creationDate; }

    public boolean isActive() { return active; }

    public void setActive(boolean active) { this.active = active; }

    public Long getCategoryId() { return categoryId; }

    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

}
