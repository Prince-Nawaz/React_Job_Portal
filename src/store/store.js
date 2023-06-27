import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import jobsSlice from './jobs-slice';
import userSlice from './user-slice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        jobs: jobsSlice.reducer,
        users: userSlice.reducer,
    },
});

export default store;
