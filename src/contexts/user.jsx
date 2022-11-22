import React, { useReducer, createContext, useEffect } from 'react';
import _get from 'lodash.get';
import UseLocalStorage from 'hooks/UseLocalStorage';
import axios from 'axios';

const initialState = {
    isLoggedIn: false,
    first_name: null,
    recipient: null,
    secret_santa: null,
    isLoggingIn: false
};

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isLoggedIn: false,
                first_name: null,
                recipient: null,
                secret_santa: null,
                isLoggingIn: true
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                first_name: action.payload.first_name,
                recipient: action.payload.recipient,
                secret_santa: action.payload.secret_santa,
                isLoggingIn: false
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoggedIn: false,
                first_name: null,
                recipient: null,
                secret_santa: null,
                isLoggingIn: false
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                ...initialState
            };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

export const signIn = (dispatch, input) => {
    try {
        axios
            .post('https://kris-kringle-backend.herokuapp.com/login', null, {
                params: {
                    first_name: input.first_name,
                    password: input.password
                }
            })
            .then(function (response) {
                const userData = { ...response };
                console.log(userData, 'hi');
                localStorage.setItem('first_name', JSON.stringify(userData));
                return dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        first_name: input.first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa
                    }
                });
            });
    } catch (err) {
        console.error(err);
    }
};

export const signOut = (dispatch) => {
    localStorage.clear();
    return dispatch({
        type: 'LOGOUT_SUCCESS'
    });
};

export const signInFailure = (dispatch) => {
    localStorage.clear();
    return dispatch({
        type: 'LOGOUT_FAILURE'
    });
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    );
};
export default UserProvider;
