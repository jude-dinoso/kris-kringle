import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const initialState = {
    isLoggedIn: false,
    first_name: null,
    recipient: '',
    secret_santa: '',
    wishlist1: '',
    wishlist2: '',
    wishlist3: '',
    r_wishlist1: '',
    r_wishlist2: '',
    r_wishlist3: '',
    desc: '',
    guess: '',
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
                r_wishlist1: null,
                r_wishlist2: null,
                r_wishlist3: null,
                desc: null,
                guess: null,
                isLoggingIn: true
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                first_name: action.payload.first_name,
                recipient: action.payload.recipient,
                secret_santa: action.payload.secret_santa,
                wishlist1: action.payload.wish_list_1,
                wishlist2: action.payload.wish_list_2,
                wishlist3: action.payload.wish_list_3,
                r_wishlist1: action.payload.r_wish_list_1,
                r_wishlist2: action.payload.r_wish_list_2,
                r_wishlist3: action.payload.r_wish_list_3,
                desc: action.payload.desc,
                guess: action.payload.guess,
                isLoggingIn: false
            };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                first_name: action.payload.first_name,
                recipient: action.payload.recipient,
                secret_santa: action.payload.secret_santa,
                wishlist1: action.payload.wish_list_1,
                wishlist2: action.payload.wish_list_2,
                wishlist3: action.payload.wish_list_3,
                r_wishlist1: action.payload.r_wish_list_1,
                r_wishlist2: action.payload.r_wish_list_2,
                r_wishlist3: action.payload.r_wish_list_3,
                desc: action.payload.desc,
                guess: action.payload.guess,
                isLoggingIn: false
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                ...initialState
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

export async function signIn(dispatch, input) {
    try {
        const flag = await axios
            .post('https://kris-kringle-backend.herokuapp.com/login', null, {
                params: {
                    first_name: input.first_name,
                    password: input.password
                }
            })
            .then(async function (response) {
                const userData = { ...response };
                localStorage.setItem('first_name', JSON.stringify(userData));
                await dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        first_name: input.first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa,
                        wish_list_1: userData.data.wish_list,
                        wish_list_2: userData.data.wish_list_2,
                        wish_list_3: userData.data.wish_list_3,
                        r_wish_list_1: userData.data.r_wl,
                        r_wish_list_2: userData.data.r_wl2,
                        r_wish_list_3: userData.data.r_wl3,
                        desc: userData.data.description,
                        guess: userData.data.guess
                    }
                });
                return true;
            })
            .catch(async function (err) {
                console.error(err);
                alert('Invalid Passcode');
                await dispatch({
                    type: 'LOGIN_FAILURE'
                });
                return false;
            });
        return flag;
    } catch (err) {
        console.error('yo', err);
        return false;
    }
}

export const updateWishList = (dispatch, input, first_name) => {
    try {
        axios
            .post('https://kris-kringle-backend.herokuapp.com/wishlist', null, {
                params: {
                    first_name: first_name,
                    wish_list: input.wishlist1,
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
                        first_name: first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa,
                        wish_list_1: userData.data.wish_list,
                        wish_list_2: userData.data.wish_list_2,
                        wish_list_3: userData.data.wish_list_3,
                        r_wish_list_1: userData.data.r_wl,
                        r_wish_list_2: userData.data.r_wl2,
                        r_wish_list_3: userData.data.r_wl3,
                        desc: userData.data.description,
                        guess: userData.data.guess
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
                localStorage.setItem('first_name', JSON.stringify(userData));
                return dispatch({
                    type: 'UPDATE_SUCCESS',
                    payload: {
                        first_name: first_name,
                        recipient: userData.data.recipient,
                        secret_santa: userData.data.secret_santa,
                        wish_list_1: userData.data.wish_list,
                        wish_list_2: userData.data.wish_list_2,
                        wish_list_3: userData.data.wish_list_3,
                        r_wish_list_1: userData.data.r_wl,
                        r_wish_list_2: userData.data.r_wl2,
                        r_wish_list_3: userData.data.r_wl3,
                        desc: userData.data.description,
                        guess: userData.data.guess
                    }
                });
            })
            .catch((err) => {
                alert(err.data.detail);
            });
    } catch (err) {
        console.error(err);
    }
};

export const updateGuess = (dispatch, input, first_name) => {
    try {
        axios
            .post('https://kris-kringle-backend.herokuapp.com/guess', null, {
                params: {
                    first_name: first_name,
                    guess: input.guess
                }
            })
            .then(function (response) {
                const userData = { ...response };
                localStorage.setItem('first_name', JSON.stringify(userData));
                return dispatch({
                    type: 'UPDATE_SUCCESS',
                    payload: {
                        first_name: first_name,
                        recipient: userData.data.recipient,
                        wish_list_1: userData.data.wish_list,
                        wish_list_2: userData.data.wish_list_2,
                        wish_list_3: userData.data.wish_list_3,
                        r_wish_list_1: userData.data.r_wl,
                        r_wish_list_2: userData.data.r_wl2,
                        r_wish_list_3: userData.data.r_wl3,
                        desc: userData.data.description,
                        guess: userData.data.guess
                    }
                });
            })
            .catch((err) => {
                alert(err.data.detail);
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
        type: 'LOGOUT_SUCCESS'
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
UserProvider.propTypes = { children: PropTypes.arrayOf(PropTypes.element) };
export default UserProvider;
