package com.shiftshop.service.rest.dtos.sale;

import java.math.BigDecimal;

public class SalesResumeDto {

    private long salesCount;
    private long itemsCount;
    private BigDecimal total;
    private BigDecimal profit;

    public SalesResumeDto(long salesCount, long itemsCount) {

        this.salesCount = salesCount;
        this.itemsCount = itemsCount;

    }

    public long getSalesCount() {
        return salesCount;
    }

    public void setSalesCount(long salesCount) {
        this.salesCount = salesCount;
    }

    public long getItemsCount() {
        return itemsCount;
    }

    public void setItemsCount(long itemsCount) {
        this.itemsCount = itemsCount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

}
