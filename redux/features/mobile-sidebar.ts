import { createSlice } from "@reduxjs/toolkit";


interface MobileSidebarState {
    isOpen: boolean;
};

const initialState: MobileSidebarState = {
    isOpen: false,
};

// Store Modal Slice
const MobileSidebar = createSlice({
    name: "mobileSidebar",
    initialState,
    reducers: {
        openSheet: (state) => {
            state.isOpen = true;
        },
        closeSheet: (state) => {
            state.isOpen = false
        },
    },
});

export const {
    openSheet,
    closeSheet, 
} = MobileSidebar.actions;

export default MobileSidebar.reducer;