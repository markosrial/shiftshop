package com.shiftshop.service.model.common.exceptions;

@SuppressWarnings("serial")
public class InstancePropertyNotFoundException extends InstancePropertyException {

    public InstancePropertyNotFoundException(String name, String property, Object key) {
        super(name, property, key);
    }

}
