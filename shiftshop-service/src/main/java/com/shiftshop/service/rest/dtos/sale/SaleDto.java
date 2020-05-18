package com.shiftshop.service.rest.dtos.sale;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class SaleDto {

    private Long id;
    private String barcode;
    private LocalDateTime date;
    private BigDecimal total;
    private BigDecimal cost;
    private BigDecimal discount;
    private BigDecimal cash;
    private String seller;
    private List<SaleItemDto> items;

    public SaleDto() { }

    public SaleDto(Long id, String barcode, LocalDateTime date, BigDecimal total, BigDecimal cost,
                   BigDecimal discount, BigDecimal cash, String seller, List<SaleItemDto> items) {

        this.id = id;
        this.barcode = barcode;
        this.date = date;
        this.total = total;
        this.cost = cost;
        this.discount = discount;
        this.cash = cash;
        this.seller = seller;
        this.items = items;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public List<SaleItemDto> getItems() {
        return items;
    }

    public void setItems(List<SaleItemDto> items) {
        this.items = items;
    }

}
