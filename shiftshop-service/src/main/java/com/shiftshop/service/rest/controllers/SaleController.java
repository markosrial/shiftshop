package com.shiftshop.service.rest.controllers;


import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyNotFoundException;
import com.shiftshop.service.model.entities.Sale;
import com.shiftshop.service.model.services.*;
import com.shiftshop.service.rest.dtos.common.BlockDto;
import com.shiftshop.service.rest.dtos.common.ErrorConversor;
import com.shiftshop.service.rest.dtos.common.ErrorsDto;
import com.shiftshop.service.rest.dtos.sale.InsertSaleParamsDto;
import com.shiftshop.service.rest.dtos.sale.SaleDto;
import com.shiftshop.service.rest.dtos.sale.SaleSummaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static com.shiftshop.service.rest.dtos.sale.SaleConversor.*;

@RestController
@RequestMapping("/sales")
public class SaleController {

    private static final String EMPTY_SALE_EXCEPTION_CODE = "project.exceptions.EmptySaleException";
    private static final String CASH_AMOUNT_EXCEPTION_CODE = "project.exceptions.EmptySaleException";
    private static final String INVALID_DATE_RANGE_EXCEPTION_CODE = "project.exceptions.InvalidDateRangeException";

    @Autowired
    private ErrorConversor errorConversor;

    @Autowired
    private SaleService saleService;

    @ExceptionHandler(EmptySaleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleEmptySaleException(EmptySaleException exception, Locale locale) {
        return errorConversor.toErrorsDtoFromException(EMPTY_SALE_EXCEPTION_CODE, locale);
    }

    @ExceptionHandler(CashAmountException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleCashAmountException(CashAmountException exception, Locale locale) {
        return errorConversor.toErrorsDtoFromCashAmountException(exception,
                CASH_AMOUNT_EXCEPTION_CODE, locale);
    }

    @ExceptionHandler(InvalidDateRangeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleEmptySaleException(InvalidDateRangeException exception, Locale locale) {
        return errorConversor.toErrorsDtoFromException(INVALID_DATE_RANGE_EXCEPTION_CODE, locale);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void registerSale(@Validated @RequestBody InsertSaleParamsDto saleDto)
            throws CashAmountException, EmptySaleException, InstanceNotFoundException {
        saleService.registerSale(saleDto.getSellerId(), toSale(saleDto), toSaleItems(saleDto.getItems()));
    }

    @GetMapping
    public BlockDto<SaleSummaryDto> findSale(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate initDate,
                                             @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                             @RequestParam(required = false) String orderBy,
                                             @RequestParam(required = false) String direction,
                                             @RequestParam(defaultValue = "0", required = false) @Min(0) int page,
                                             @RequestParam(defaultValue = "15", required = false) @Min(0) int size)
            throws InvalidDateRangeException {

        Block<Sale> sales = saleService.findSales(initDate, endDate, orderBy, direction, page, size);

        return new BlockDto<>(toSaleSummaryDtos(sales.getItems()),sales.getExistMoreItems());

    }

    @GetMapping("/barcodes/{barcode}")
    public SaleDto findSaleByBarcode(@PathVariable String barcode)
            throws InstancePropertyNotFoundException {
        return toSaleDto(saleService.findSaleByBarcode(barcode));
    }

    @GetMapping("/barcodes")
    public List<String> findFirstExistingSaleBarcodes(
            @RequestParam @NotNull @Size(min = 1) String startingCode,
            @RequestParam(defaultValue = "15", required = false) @Min(0) int size) {
        return saleService.findFirstSalesByBarcode(startingCode.toUpperCase(), size)
                .stream().map(Sale::getBarcode).collect(Collectors.toList());
    }

}
