package com.shiftshop.service.rest.dtos.catalog;

import javax.validation.constraints.*;
import java.math.BigDecimal;

public class InsertProductParamsDto {

    public interface AddValidations {}

    public interface UpdateValidations {}

    private String name;
    private BigDecimal providerPrice;
    private BigDecimal salePrice;
    private String barcode;
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

    @Size(min = 8, max = 26, groups = {UpdateValidations.class})
    @Pattern(regexp = "^[a-zA-Z0-9]*$", groups = {UpdateValidations.class},
            message = "{project.entities.patterns.barcode}")
    public String getBarcode() { return barcode; }

    public void setBarcode(String barcode) { this.barcode = barcode; }

    @NotNull(groups = {AddValidations.class})
    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

}
