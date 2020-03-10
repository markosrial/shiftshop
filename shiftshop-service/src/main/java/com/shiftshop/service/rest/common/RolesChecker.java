package com.shiftshop.service.rest.common;

import com.shiftshop.service.model.entities.User.RoleType;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

public class RolesChecker {

    private RolesChecker() {}

    public static final List<RoleType> getRolesFromAuthentication(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(auth -> RoleType.valueOf(auth.getAuthority().replace("ROLE_", "")))
                .collect(Collectors.toList());
    }

    public static final boolean isRoleAllowed(List<RoleType> userRoles, RoleType... allowedRoles) {

        for (RoleType role : allowedRoles) {
            if (userRoles.contains(role)) return true;
        }

        return false;

    }

}
