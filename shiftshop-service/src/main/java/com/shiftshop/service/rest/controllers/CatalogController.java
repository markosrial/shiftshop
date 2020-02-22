package com.shiftshop.service.rest.controllers;

import com.shiftshop.service.model.common.exceptions.DuplicateInstancePropertyException;
import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.services.CatalogService;
import com.shiftshop.service.rest.dtos.catalog.CategoryDto;
import com.shiftshop.service.rest.dtos.catalog.InsertCategoryParamsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.shiftshop.service.rest.dtos.catalog.CategoryConversor.toCategoryDto;
import static com.shiftshop.service.rest.dtos.catalog.CategoryConversor.toCategoryDtos;

@RestController
@RequestMapping("/catalog")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private MessageSource messageSource;

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

}
