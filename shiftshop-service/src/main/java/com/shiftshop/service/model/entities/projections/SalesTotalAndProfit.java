package com.shiftshop.service.model.entities.projections;

import java.math.BigDecimal;

public interface SalesTotalAndProfit {

    BigDecimal getTotal();
    BigDecimal getProfit();

}
