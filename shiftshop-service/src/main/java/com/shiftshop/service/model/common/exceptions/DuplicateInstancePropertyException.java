package com.shiftshop.service.model.common.exceptions;

@SuppressWarnings("serial")
public class DuplicateInstancePropertyException extends InstancePropertyException {

    public DuplicateInstancePropertyException(String name, String property, Object key) {
        super(name, property, key);
    }

}
