package com.shiftshop.service.rest.dtos.sale;

import java.math.BigDecimal;

public class ProductProfitDto {

    private Long productId;
    private String productName;
    private BigDecimal profit;

    public ProductProfitDto(Long productId, String productName, BigDecimal profit) {

        this.productId = productId;
        this.productName = productName;
        this.profit = profit;

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

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

}
