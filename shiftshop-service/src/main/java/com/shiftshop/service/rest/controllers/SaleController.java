package com.shiftshop.service.rest.controllers;


import com.shiftshop.service.model.common.exceptions.InstanceNotFoundException;
import com.shiftshop.service.model.services.CashAmountException;
import com.shiftshop.service.model.services.EmptySaleException;
import com.shiftshop.service.model.services.SaleService;
import com.shiftshop.service.rest.dtos.common.ErrorConversor;
import com.shiftshop.service.rest.dtos.common.ErrorsDto;
import com.shiftshop.service.rest.dtos.sale.InsertSaleParamsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

import static com.shiftshop.service.rest.dtos.sale.SaleConversor.toSale;
import static com.shiftshop.service.rest.dtos.sale.SaleConversor.toSaleItems;

@RestController
@RequestMapping("/sales")
public class SaleController {

    private static final String EMPTY_SALE_EXCEPTION_CODE = "project.exceptions.EmptySaleException";
    private static final String CASH_AMOUNT_EXCEPTION_CODE = "project.exceptions.EmptySaleException";

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

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void registerSale(@Validated @RequestBody InsertSaleParamsDto saleDto)
            throws CashAmountException, EmptySaleException, InstanceNotFoundException {
        saleService.registerSale(saleDto.getSellerId(), toSale(saleDto), toSaleItems(saleDto.getItems()));
    }

}
