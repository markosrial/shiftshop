package com.shiftshop.service.model.common.utils;

import org.springframework.data.domain.Sort.Direction;

public class EntitiesOrder {

    private EntitiesOrder() {}

    public static Direction directionFromStringOrDefault(String value) {

        try {
            return Direction.fromString(value.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            return getDefaultDirection();
        }

    }

    public static Direction getDefaultDirection() {
        return Direction.ASC;
    }
}
