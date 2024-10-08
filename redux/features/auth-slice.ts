import { 
    PayloadAction, 
    createSlice 
} from "@reduxjs/toolkit";


/* const token = localStorage.getItem('userToken') || null; */
interface AuthStateTypes {
    userToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

const initialAuthState: AuthStateTypes = {
    userToken: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setAuth: (state, action: PayloadAction<{userToken: string}>) => {
            state.userToken = action.payload.userToken;
            state.isAuthenticated = !!action.payload.userToken // Update based on token presense 
        },
        logout: (state) => {
            state.userToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userToken'); // clears token from local storage
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