package com.shiftshop.service.rest.dtos.catalog;

import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.entities.User;

import java.util.List;
import java.util.stream.Collectors;

import static com.shiftshop.service.rest.common.RolesChecker.isRoleAllowed;

public class ProductConversor {

    private ProductConversor() {}

    public static final ProductSummaryDto toProductSummaryDto(Product product) {
        return new ProductSummaryDto(product.getId(), product.getName(),
                product.getSalePrice(), product.getCategory().getId());
    }

    public static final List<ProductSummaryDto> toProductSummaryDtos(List<Product> products) {
        return products.stream().map(p -> toProductSummaryDto(p)).collect(Collectors.toList());
    }

    public static final ProductDto toProductDto(Product product, List<User.RoleType> roles) {
        return new ProductDto(
                product.getId(), product.getName(),
                isRoleAllowed(roles, User.RoleType.MANAGER, User.RoleType.ADMIN) ? product.getProviderPrice() : null,
                product.getSalePrice(), product.getBarcode(), product.getCreationTimestamp().withNano(0),
                product.isActive(), product.getCategory().getId());
    }

}
