package com.shiftshop.service.rest.dtos.sale;

public class ProductSalesDto {

    private Long productId;
    private String productName;
    private long quantity;

    public ProductSalesDto(Long productId, String productName, long quantity) {

        this.productId = productId;
        this.productName = productName;
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

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
    
}
