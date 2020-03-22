package com.shiftshop.service.rest.dtos.user;

public class UserSummaryDto {

    private Long id;
    private String name;
    private String surnames;

    public UserSummaryDto() {}

    public UserSummaryDto(Long id, String name, String surnames) {

        this.id = id;
        this.name = name;
        this.surnames = surnames;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

}

