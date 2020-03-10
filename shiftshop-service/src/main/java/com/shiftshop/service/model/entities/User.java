package com.shiftshop.service.model.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {

    public enum RoleType {
        MANAGER, ADMIN, SALESMAN
    }

    private Long id;
    private String userName;
    private String password;
    private boolean active;
    private Set<RoleType> roles = new HashSet<>();

    public User() {}

    public User(String userName, String password) {

        this.userName = userName;
        this.password = password;

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @ElementCollection(targetClass = RoleType.class)
    @CollectionTable(name = "UserRole", joinColumns = @JoinColumn(name = "userId"))
    @Column(name = "role")
    public Set<RoleType> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleType> roles) {
        this.roles = roles;
    }

}
