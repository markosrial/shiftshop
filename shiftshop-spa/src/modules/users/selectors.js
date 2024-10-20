const getModuleState = state => state.users;

export const getUser = state =>
    getModuleState(state).user;

export const isLoggedIn = state =>
    getUser(state) !== null;

export const getRoles = state =>
    getModuleState(state).roles;

export const getRoleName = (roles, id) => {

    if (!roles) {
        return '';
    }

    const role = roles.find(role => role.id === id);

    if (!role) {
        return '';
    }

    return role.name;

};

export const getRoleByName = (roles, name) => {

    if (!roles) {
        return null;
    }

    const role = roles.find(role => role.name === name);

    if (!role) {
        return null;
    }

    return role;

}

export const hasRole = (user, roles) =>
    user.roles.some(role => roles.includes(role));

export const getUsersSearch = state =>
    getModuleState(state).usersSearch;
