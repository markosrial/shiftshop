package com.shiftshop.service.rest.controllers;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.services.Block;
import com.shiftshop.service.model.services.CatalogService;
import com.shiftshop.service.rest.dtos.catalog.*;
import com.shiftshop.service.rest.dtos.common.BlockDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.math.RoundingMode;
import java.util.List;

import static com.shiftshop.service.rest.dtos.catalog.CategoryConversor.toCategoryDto;
import static com.shiftshop.service.rest.dtos.catalog.CategoryConversor.toCategoryDtos;
import static com.shiftshop.service.rest.dtos.catalog.ProductConversor.toProductSummaryDtos;

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

    @GetMapping("/products")
    public BlockDto<ProductSummaryDto> findProducts(
            @RequestParam(required = false) Long categoryId, @RequestParam(required = false) String keywords,
            @RequestParam(required = false) String orderBy, @RequestParam(required = false) String order,
            @RequestParam(defaultValue = "true", required = false) Boolean onlyActive,
            @RequestParam(defaultValue = "0", required = false) @Min(0) int page,
            @RequestParam(defaultValue = "20", required = false) @Min(0) int size) {

        Block<Product> productBlock = catalogService.findProducts(categoryId, keywords, onlyActive, orderBy, order, page, size);

        return new BlockDto<>(toProductSummaryDtos(productBlock.getItems()), productBlock.getExistMoreItems());

    }
}
