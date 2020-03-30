package com.shiftshop.service.rest.dtos.user;

public class POSUserDto {

    private Long id;
    private String userName;
    private String password;
    private String name;
    private boolean active;
    private boolean salesman;

    public POSUserDto() {}

    public POSUserDto(Long id, String userName, String password, String name, boolean active, boolean salesman) {

        this.id = id;
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.active = active;
        this.salesman = salesman;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isSalesman() {
        return salesman;
    }

    public void setSalesman(boolean salesman) {
        this.salesman = salesman;
    }
}
