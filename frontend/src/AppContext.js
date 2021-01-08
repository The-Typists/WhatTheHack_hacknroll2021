import React from "react";

export const loggedOut = {
    username:"",
    id:"",
    isLoggedIn:false
}
export const AuthContext = React.createContext(loggedOut);
