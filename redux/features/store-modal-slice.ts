import { createSlice } from "@reduxjs/toolkit";


interface StoreModalState {
    isOpen: boolean;
};

const initialState: StoreModalState = {
    isOpen: false,
};

// Store Modal Slice
const storeModalSlice = createSlice({
    name: "storeModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            console.log("Reducer closeModal called, setting isOpen to false")
            state.isOpen = false
        },
    },
});

export const {
    openModal,
    closeModal, 
} = storeModalSlice.actions;

export default storeModalSlice.reducer;