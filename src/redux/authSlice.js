import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: null,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const {
                authToken,
                profile: {
                    id,
                    profile_full_name,
                    profile_mobile,
                    selected_account: {
                        account_business_name,
                        business_address
                    }
                }
            } = action.payload;

            state.authToken = authToken;
            state.user = {
                id,
                fullName: profile_full_name,
                mobile: profile_mobile,
                businessName: account_business_name,
                businessAddress: business_address,
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