import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState = {
    isAuthenticated: false,
    isLoading: true,
} as AuthState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        finishInitialLoad: state => {
            state.isLoading = false;
        },
    },
});

export const {
    setAuth, 
    logout, 
    finishInitialLoad
} = authSlice.actions;

export default authSlice.reducer;