import { createSlice } from "@reduxjs/toolkit";

interface ProModalState {
    isOpen: boolean;
};

const initialState: ProModalState = {
    isOpen: false,
};


const proModalSlice = createSlice({
    name: "proModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const {
    openModal,
    closeModal,
} = proModalSlice.actions;

export default proModalSlice.reducer;