export const appRoutes = {
 
//  Public Route

    HOME_PAGE : "/",
    AUTH_LOGIN : "/authLogin",
    USER_SIGNUP : '/signup',

// Protect Route

    ROLE_LIST : "/role",
    USER_LIST : "/user",
    ROLE_FORM : "/role/create",
    USER_FORM : "/user/create",    
    ROLE_EDIT : "/role/[id]",
    USER_EDIT : "/user/[id]",    
}

export const TIME_OUT = 2000