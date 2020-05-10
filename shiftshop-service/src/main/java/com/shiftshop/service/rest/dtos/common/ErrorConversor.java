package com.shiftshop.service.rest.dtos.common;

import com.shiftshop.service.model.common.exceptions.InstanceException;
import com.shiftshop.service.model.common.exceptions.InstancePropertyException;
import com.shiftshop.service.model.services.CashAmountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class ErrorConversor {

    @Autowired
    private MessageSource messageSource;

    public ErrorsDto toErrorsDtoFromException(String exceptionCode, Locale locale) {

        String errorMessage = messageSource.getMessage(exceptionCode, null, exceptionCode, locale);

        return new ErrorsDto(errorMessage);

    }

    public ErrorsDto toErrorsDtoFromInstanceException(InstanceException exception, String exceptionCode, Locale locale) {

        String name = messageSource.getMessage(exception.getName(), null, exception.getName(), locale);
        String errorMessage = messageSource.getMessage(exceptionCode, new Object[]{name, exception.getKey().toString()},
                exceptionCode, locale);

        return new ErrorsDto(errorMessage);

    }

    public ErrorsDto toErrorsDtoFromInstancePropertyException(InstancePropertyException exception, String exceptionCode, Locale locale) {

        String name = messageSource.getMessage(exception.getName(), null, exception.getName(), locale);
        String property = messageSource.getMessage(exception.getProperty(), null, exception.getProperty(), locale);
        String errorMessage = messageSource.getMessage(exceptionCode, new Object[]{name, property, exception.getKey().toString()},
                exceptionCode, locale);

        return new ErrorsDto(errorMessage);

    }

    public ErrorsDto toErrorsDtoFromCashAmountException(CashAmountException exception, String exceptionCode, Locale locale) {

        String errorMessage = messageSource.getMessage(exceptionCode,
                new Object[] {exception.getCash().toString(), exception.getTotal().toString()},
                exceptionCode, locale);

        return new ErrorsDto(errorMessage);

    }

}
