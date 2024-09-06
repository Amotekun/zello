import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface cardModalState {
    isOpen: boolean;
    cardId?: string;
    listId?: string;

};

const initialState: cardModalState = {
    isOpen: false,
    cardId: undefined,
    listId: undefined,
};

const cardModalSlice = createSlice({
    name: "cardModal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{
            cardId: string;
            listId: string;
        }>) => {
            state.isOpen = true;
            state.cardId = action.payload.cardId;
            state.listId = action.payload.listId;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.cardId = undefined;
            state.listId = undefined;
        },
    },
});

export const {
    openModal,
    closeModal,
} = cardModalSlice.actions;

export default cardModalSlice.reducer;

