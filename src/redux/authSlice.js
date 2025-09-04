import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: null,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        clearAuthToken: (state) => {
            state.authToken = null;
        },
    },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;