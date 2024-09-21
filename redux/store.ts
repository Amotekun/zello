import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authReducer from './features/auth-slice';
import storeModalReducer from './features/store-modal-slice';
import MobileSidebarReducer from './features/mobile-sidebar';  
import cardModalReducer from './features/card-modal-slice';
import proModalReducer from './features/pro-modal-slice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer, 
        storeModal: storeModalReducer,
        MobileSidebar: MobileSidebarReducer,
        cardModal: cardModalReducer,
        proModal: proModalReducer,


    },
    middleware: getDefaultMiddleware=> 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<(typeof store.getState)>;
export type AppDispatch = (typeof store.dispatch);