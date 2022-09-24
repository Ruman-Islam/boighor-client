import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: "navbarSlice",
    initialState: {
        isCategoryToggleOpen: false,
        isCurrencyToggleOpen: false,
        currency: 'BDT',
        mobileMenu: false,
    },

    reducers: {
        // Getting all states
        showNavItems: (state) => state,

        // Toggle category dropdown
        toggleCategory: (state, action) => {
            const isTrue = action.payload;
            state.isCategoryToggleOpen = isTrue;
        },

        // Toggle currency dropdown
        toggleCurrency: (state, action) => {
            const isTrue = action.payload;
            state.isCurrencyToggleOpen = isTrue;
        },

        // Set country currency to every product
        setCurrency: (state, action) => {
            const currency = action.payload;
            state.currency = currency;
        },
        // Toggle mobile side menu
        toggleMobileMenu: (state, action) => {
            const show = action.payload;
            state.mobileMenu = show;
        }
    }
})

export const {
    showNavItems,
    toggleCategory,
    toggleCurrency,
    setCurrency,
    toggleMobileMenu,
} = navbarSlice.actions;

export default navbarSlice.reducer;