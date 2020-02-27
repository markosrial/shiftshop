package com.shiftshop.service.rest.dtos.catalog;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class InsertProductParamsDto {

    public interface AddValidations {}

    public interface UpdateValidations {}

    private String name;
    private BigDecimal providerPrice;
    private BigDecimal salePrice;
    private Long categoryId;

    @NotNull(groups = {AddValidations.class})
    @Size(min = 1, max = 60, groups = {AddValidations.class, UpdateValidations.class})
    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    @NotNull(groups = {AddValidations.class})
    @DecimalMin(value = "0.00", groups = {AddValidations.class, UpdateValidations.class})
    @DecimalMax(value = "999999999.99", groups = {AddValidations.class, UpdateValidations.class})
    public BigDecimal getProviderPrice() { return providerPrice; }

    public void setProviderPrice(BigDecimal providerPrice) { this.providerPrice = providerPrice; }

    @NotNull(groups = {AddValidations.class})
    @DecimalMin(value = "0.00", groups = {AddValidations.class, UpdateValidations.class})
    @DecimalMax(value = "999999999.99", groups = {AddValidations.class, UpdateValidations.class})
    public BigDecimal getSalePrice() { return salePrice; }

    public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }

    @NotNull(groups = {AddValidations.class})
    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

}
