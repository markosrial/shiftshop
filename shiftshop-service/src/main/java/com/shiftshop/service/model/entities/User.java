package com.shiftshop.service.model.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private String name;
    private String surnames;
    private boolean active;
    private LocalDateTime creationTimestamp;
    private LocalDateTime updateTimestamp;
    private Set<RoleType> roles = new HashSet<>();

    public User() {}

    public User(String userName, String password, String name, String surnames, Set<RoleType> roles) {

        this.userName = userName;
        this.password = password;
        this.name = name;
        this.surnames = surnames;
        this.roles = roles;

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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @CreationTimestamp
    public LocalDateTime getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(LocalDateTime creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    @UpdateTimestamp
    public LocalDateTime getUpdateTimestamp() {
        return updateTimestamp;
    }

    public void setUpdateTimestamp(LocalDateTime updateTimestamp) {
        this.updateTimestamp = updateTimestamp;
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
