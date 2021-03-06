import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_GUEST: "LOGIN_GUEST",
    ALERT_ERROR: "ALERT_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        isGuest: false,
        error: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    isGuest: auth.isGuest,
                    error: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false,
                    error: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: false,
                    error: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    isGuest: false,
                    error: null
                })
            }
            case AuthActionType.LOGIN_GUEST: {
                return setAuth({
                    user: null,
                    loggedIn: true,
                    isGuest: true,
                    error: null
                })
            }
            case AuthActionType.ALERT_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    isGuest: false,
                    error: payload.error
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.errorMessage);
            }
        }
    }

    auth.registerUser = async function(firstName, lastName, userName, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(firstName, lastName, userName, email, password, passwordVerify);      
            if (response.status === 200) {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/login");
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.ALERT_ERROR,
                payload: {
                    error: err.response.data.errorMessage
                }
            })
        }
    }

    auth.loginUser = async function(userName, password) {
        try {
            const response = await api.loginUser(userName, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.ALERT_ERROR,
                payload: {
                    error: err.response.data.errorMessage
                }
            })
        }
    }

    auth.publishError = async function() {
        authReducer({
            type: AuthActionType.ALERT_ERROR,
            payload: {
                error: "One of your published lists already has this name"
            }
        })
    }

    auth.hideCloseModal = async function() {
        authReducer({
            type: AuthActionType.ALERT_ERROR,
            payload: {
                error: null
            }
        })
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        //console.log("user initials: " + initials);
        return initials;
    }

    auth.loginGuest = function() {
        authReducer({
            type: AuthActionType.LOGIN_GUEST,
            payload: null
        })
        history.push("/");
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };