import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: null,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { authToken, profile } = action.payload;

            // This line flexibly handles both login and signup responses
            const accountInfo = profile.selected_account || profile.default_account;

            state.authToken = authToken;
            state.user = {
                id: profile.id,
                fullName: profile.profile_full_name,
                mobile: profile.profile_mobile,
                businessName: accountInfo.account_business_name,
                businessAddress: accountInfo.business_address,
            };
        },
        updateUserProfile: (state, action) => {
            if (state.user) {
                state.user.fullName = action.payload.name;
                state.user.businessName = action.payload.businessName;
                state.user.businessAddress = action.payload.address;
            }
        },
        logOut: (state) => {
            state.authToken = null;
            state.user = null;
        },
    },
});

export const { setCredentials, updateUserProfile, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.authToken;