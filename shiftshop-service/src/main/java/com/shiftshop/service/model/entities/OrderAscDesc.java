package com.shiftshop.service.model.entities;

public enum OrderAscDesc {

    ASC("ASC"),
    DESC("DESC");

    private String order;

    OrderAscDesc(String order) {
        this.order = order;
    }

    public static OrderAscDesc fromString(String value) {

        if (value == null) {
            return ASC;
        }

        switch (value.toUpperCase()) {
            case "DESC":
                return DESC;
            case "ASC":
            default:
                return ASC;
        }
    }

    @Override
    public String toString() {
        return this.order;
    }

}
