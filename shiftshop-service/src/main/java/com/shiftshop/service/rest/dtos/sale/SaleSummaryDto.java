package com.shiftshop.service.rest.dtos.sale;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SaleSummaryDto {

    private String barcode;
    private LocalDateTime date;
    private BigDecimal total;
    private String seller;

    public SaleSummaryDto() {}

    public SaleSummaryDto(String barcode, LocalDateTime date, BigDecimal total, String seller) {

        this.barcode = barcode;
        this.date = date;
        this.total = total;
        this.seller = seller;

    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

}
