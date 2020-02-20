package com.shiftshop.service.model.common.exceptions;

public class InstancePropertyException extends InstanceException {

    private String property;

    public InstancePropertyException(String name, String property, Object key) {

        super(name, key);
        this.property = property;

    }

    public String getProperty() {
        return property;
    }

}

