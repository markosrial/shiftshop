package com.shiftshop.service.rest.controllers;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.services.CatalogService;
import com.shiftshop.service.rest.dtos.catalog.CategoryDto;
import com.shiftshop.service.rest.dtos.catalog.InsertCategoryParamsDto;
import com.shiftshop.service.rest.dtos.catalog.InsertProductParamsDto;
import com.shiftshop.service.rest.dtos.catalog.ProductInsertedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.RoundingMode;
import java.util.List;

import static com.shiftshop.service.rest.dtos.catalog.CategoryConversor.toCategoryDto;
import static com.shiftshop.service.rest.dtos.catalog.CategoryConversor.toCategoryDtos;

@RestController
@RequestMapping("/catalog")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @PostMapping("/categories")
    public CategoryDto addCategory(@Validated @RequestBody InsertCategoryParamsDto params)
            throws DuplicateInstancePropertyException {
        return toCategoryDto(catalogService.addCategory(params.getName()));
    }

    @GetMapping("/categories/{id}")
    public CategoryDto getCategory(@PathVariable Long id) throws InstanceNotFoundException {
        return toCategoryDto(catalogService.findCategoryById(id));
    }

    @GetMapping("/categories")
    public List<CategoryDto> getCategories() {
        return toCategoryDtos(catalogService.findAllCategories());
    }

    @PutMapping("/categories/{id}")
    public CategoryDto updateCategory(@PathVariable Long id, @Validated @RequestBody InsertCategoryParamsDto params)
            throws DuplicateInstancePropertyException, InstanceNotFoundException {
        return toCategoryDto(catalogService.updateCategory(id, params.getName()));
    }

    @PostMapping("/products")
    public ProductInsertedDto addProduct(@Validated({InsertProductParamsDto.AddValidations.class}) @RequestBody InsertProductParamsDto params)
            throws DuplicateInstancePropertyException, InstanceNotFoundException  {

        Product product = catalogService.addProduct(
                params.getName(),
                params.getProviderPrice().setScale(2, RoundingMode.DOWN),
                params.getSalePrice().setScale(2, RoundingMode.DOWN),
                params.getCategoryId());

        return new ProductInsertedDto(product.getId(), product.getName());

    }
}
