import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isEmployer: false,
        emailId: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.isEmployer = action.payload.isEmployer;
            state.emailId = action.payload.emailId;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isEmployer = null;
            state.emailId = null;
        },
    },
});

export default authSlice;

export const authActions = authSlice.actions;
