import React from "react";

export const loggedOut = {
    username:"",
    id:"",
    isLoggedIn:false
}
export const AppContext = React.createContext(loggedOut);
