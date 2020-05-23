package com.shiftshop.service.rest.dtos.sale;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class InsertSaleParamsDto {

    private String barcode;
    private LocalDateTime date;
    private BigDecimal discount;
    private BigDecimal cash;
    private Set<InsertSaleItemParamsDto> items;
    private Long sellerId;

    public InsertSaleParamsDto() {}

    @NotNull
    @Size(min = 1)
    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    @NotNull
    @JsonSerialize(using = ToStringSerializer.class)
    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Min(0)
    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    @Min(0)
    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    @NotNull
    @Valid
    public Set<InsertSaleItemParamsDto> getItems() {
        return items;
    }

    public void setItems(Set<InsertSaleItemParamsDto> items) {
        this.items = items;
    }

    @NotNull
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

}
