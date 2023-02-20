// types
import { createSlice } from '@reduxjs/toolkit';
import constants from 'utils/constants';

// initial state
const initialState = {
    isAuth: localStorage.getItem(constants.AUTH.VIETGANGZ_TOKEN),
    userInfo: localStorage.getItem(constants.AUTH.VIETGANGZ_TOKEN) ? JSON.parse(localStorage.getItem(constants.AUTH.VIETGANGZ_USER)) : {}
};

const initUser = {
    username: 'admin',
    fullName: 'Tôi là ADMIN',
    positionStaff: 'NHAN VIEN',
    avatar:'https://www.shutterstock.com/image-illustration/avatar-modern-young-guy-working-600w-2015853839.jpg'
};
// ==============================|| SLICE - MENU ||============================== //

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuth = true;
            state.userInfo = initUser;
            localStorage.setItem(constants.AUTH.VIETGANGZ_TOKEN, 'ABCXYZ');
            localStorage.setItem(constants.AUTH.VIETGANGZ_USER, JSON.stringify(initUser));
        }, 
        logout(state) {
            state.isAuth = false;
            state.userInfo = {};
            localStorage.removeItem(constants.AUTH.VIETGANGZ_TOKEN);
            localStorage.removeItem(constants.AUTH.VIETGANGZ_USER);
        }
    }
});

export default authSlice.reducer;

export const { loginSuccess, logout } = authSlice.actions;
