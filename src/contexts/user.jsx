import React, { useReducer, createContext, useEffect } from 'react';
import _get from 'lodash.get';
import UseLocalStorage from 'hooks/UseLocalStorage';
import axios from 'axios';

const initialState = {
    isLoggedIn: false,
    first_name: null,
    recipient: '',
    secret_santa: '',
    wishlist1: '',
    wishlist2: '',
    wishlist3: '',
    desc: '',
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
                wishlist1: null,
                wishlist2: null,
                wishlist3: null,
                desc: null,
                isLoggingIn: true
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                first_name: action.payload.first_name,
                recipient: action.payload.recipient,
                secret_santa: action.payload.secret_santa,
                wishlist1: action.payload.wish_list,
                wishlist2: action.payload.wish_list_2,
                wishlist3: action.payload.wish_list_3,
                desc: action.payload.desc,
                isLoggingIn: false
            };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                first_name: action.payload.first_name,
                recipient: action.payload.recipient,
                secret_santa: action.payload.secret_santa,
                wishlist1: action.payload.wish_list,
                wishlist2: action.payload.wish_list_2,
                wishlist3: action.payload.wish_list_3,
                desc: action.payload.desc,
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
                console.log(userData);
                localStorage.setItem('first_name', JSON.stringify(userData));
                return dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        first_name: input.first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa,
                        wishlist1: userData.data.wish_list,
                        wishlist2: userData.data.wish_list_2,
                        wishlist3: userData.data.wish_list_3,
                        desc: userData.data.description
                    }
                });
            })
            .catch((err) => {
                alert(err.response.data.detail);
            });
    } catch (err) {
        console.error(err);
    }
};

export const updateWishlist = (dispatch, input) => {
    try {
        axios
            .post('https://kris-kringle-backend.herokuapp.com/wishlist', null, {
                params: {
                    first_name: input.first_name,
                    wish_list_1: input.wishlist1,
                    wish_list_2: input.wishlist2,
                    wish_list_3: input.wishlist3
                }
            })
            .then(function (response) {
                const userData = { ...response };
                localStorage.setItem('first_name', JSON.stringify(userData));
                return dispatch({
                    type: 'UPDATE_SUCCESS',
                    payload: {
                        first_name: input.first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa,
                        wishlist1: userData.data.wish_list,
                        wishlist2: userData.data.wish_list_2,
                        wishlist3: userData.data.wish_list_3,
                        desc: userData.data.desc
                    }
                });
            });
    } catch (err) {
        console.error(err);
    }
};

export const updateDescription = (dispatch, input, first_name) => {
    try {
        axios
            .post('https://kris-kringle-backend.herokuapp.com/description', null, {
                params: {
                    first_name: first_name,
                    description: input.desc
                }
            })
            .then(function (response) {
                const userData = { ...response };
                console.log('Hi', response);
                localStorage.setItem('first_name', JSON.stringify(userData));
                return dispatch({
                    type: 'UPDATE_SUCCESS',
                    payload: {
                        first_name: first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa,
                        wishlist1: userData.data.wish_list,
                        wishlist2: userData.data.wish_list_2,
                        wishlist3: userData.data.wish_list_3,
                        desc: userData.data.description
                    }
                });
            })
            .catch((err) => {
                console.log('hello', err);
                alert(err.data.detail);
            });
    } catch (err) {
        console.error('hi', err);
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
