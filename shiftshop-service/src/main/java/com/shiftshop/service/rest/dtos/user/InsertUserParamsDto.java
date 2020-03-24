package com.shiftshop.service.rest.dtos.user;

import com.shiftshop.service.model.entities.User.RoleType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

public class InsertUserParamsDto {

    public interface AddValidations {}

    public interface UpdateValidations {}

    private String userName;
    private String password;
    private String name;
    private String surnames;
    private Set<RoleType> roles;

    @NotNull(groups = {AddValidations.class})
    @Size(min=1, max=60, groups={AddValidations.class, UpdateValidations.class})
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Size(min=1, max=60, groups={AddValidations.class, UpdateValidations.class})
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotNull(groups = {AddValidations.class})
    @Size(min=1, max=30, groups={AddValidations.class, UpdateValidations.class})
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull(groups = {AddValidations.class})
    @Size(min=1, max=60, groups={AddValidations.class, UpdateValidations.class})
    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    @NotNull(groups = {AddValidations.class})
    public Set<RoleType> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleType> roles) {
        this.roles = roles;
    }

}
