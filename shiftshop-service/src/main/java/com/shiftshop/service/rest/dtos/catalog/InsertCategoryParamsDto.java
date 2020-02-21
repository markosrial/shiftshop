package com.shiftshop.service.rest.dtos.catalog;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class InsertCategoryParamsDto {


    private String name;

    @NotNull
    @Size(min=1, max=30)
    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

}
