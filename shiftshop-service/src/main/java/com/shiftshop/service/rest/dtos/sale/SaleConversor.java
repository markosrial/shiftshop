package com.shiftshop.service.rest.dtos.sale;

import com.shiftshop.service.model.entities.Product;
import com.shiftshop.service.model.entities.Sale;
import com.shiftshop.service.model.entities.SaleItem;

import java.math.RoundingMode;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class SaleConversor {

    private SaleConversor() {}

    public static final Sale toSale(InsertSaleParamsDto paramsDto) {
        return new Sale(paramsDto.getBarcode(), paramsDto.getDate(),
                paramsDto.getDiscount() != null
                    ? paramsDto.getDiscount().setScale(2, RoundingMode.HALF_EVEN) : null,
                paramsDto.getCash() != null
                    ? paramsDto.getCash().setScale(2, RoundingMode.HALF_EVEN) : null);
    }

    public static final SaleItem toSaleItem(InsertSaleItemParamsDto paramsDto) {

        Product p = new Product();
        p.setId(paramsDto.getProductId());

        return new SaleItem(paramsDto.getSalePrice().setScale(2, RoundingMode.HALF_EVEN),
                paramsDto.getQuantity(), p);

    }

    public static final Set<SaleItem> toSaleItems(Set<InsertSaleItemParamsDto> listDto) {
        return listDto.stream().map(SaleConversor::toSaleItem).collect(Collectors.toSet());
    }

    public static final SaleSummaryDto toSaleSummaryDto(Sale sale) {
        return new SaleSummaryDto(sale.getBarcode(), sale.getDate(), sale.getTotal(),
                sale.getSeller().getUserName());
    }

    public static final List<SaleSummaryDto> toSaleSummaryDtos(List<Sale> sales) {
        return sales.stream().map(SaleConversor::toSaleSummaryDto).collect(Collectors.toList());
    }

    public static final SaleItemDto toSaleItemDto(SaleItem saleItem) {
        return new SaleItemDto(saleItem.getId(), saleItem.getSalePrice(), saleItem.getCost(),
                saleItem.getQuantity(), saleItem.getProduct().getId(), saleItem.getProduct().getName());
    }

    public static final List<SaleItemDto> toSaleItemDtos(Set<SaleItem> saleItems) {
        return saleItems.stream().map(SaleConversor::toSaleItemDto).collect(Collectors.toList());
    }

    public static final SaleDto toSaleDto(Sale sale) {
        return new SaleDto(sale.getId(),sale.getBarcode(), sale.getDate(),
                sale.getTotal(), sale.getCost(), sale.getDiscount(), sale.getCash(),
                sale.getSeller().getUserName(), toSaleItemDtos(sale.getItems()));
    }

}
