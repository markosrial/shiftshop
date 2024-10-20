package com.shiftshop.service.model.services;

import java.math.BigDecimal;

@SuppressWarnings("serial")
public class CashAmountException extends Exception {

    private final BigDecimal cash;
    private final BigDecimal total;

    public CashAmountException(BigDecimal cash, BigDecimal total) {

        this.cash = cash;
        this.total = total;

    }

    public BigDecimal getCash() {
        return cash;
    }

    public BigDecimal getTotal() {
        return total;
    }

}
