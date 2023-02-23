// types
import { createSlice } from '@reduxjs/toolkit';
import constants from 'utils/constants';
import axios from 'axios';

// initial state
// const initialState = {
//     isLoggedIn: localStorage.getItem(constants.AUTH.TOKEN) ? true :false,
//     userInfo:localStorage.getItem(constants.AUTH.USER_INFO) ? JSON.parse(localStorage.getItem(constants.AUTH.USER_INFO)) : {}
// };

// initial state
const initialState = {
    isLoggedIn: true,
    userInfo: localStorage.getItem(constants.AUTH.USER_INFO) ? JSON.parse(localStorage.getItem(constants.AUTH.USER_INFO)) : {}
};
// ==============================|| SLICE - MENU ||============================== //

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action?.payload?.userInfo
            localStorage.setItem(constants.AUTH.TOKEN, action?.payload?.token);  
            let token = localStorage.getItem(constants.AUTH.TOKEN);
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem(constants.AUTH.USER_INFO, JSON.stringify(action?.payload?.userInfo)); 
        },
        logout(state, action) {
            localStorage.removeItem(constants.AUTH.TOKEN);
            localStorage.removeItem(constants.AUTH.USER_INFO);
            state.isLoggedIn = false;
            state.userInfo={}
        }
    }
});

export default auth.reducer;

export const { loginSuccess, logout } = auth.actions;
