import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from './navbarSlice';
import bookDetailReducer from './book/bookDetailSlice';
import relatedBooksReducer from './book/relatedBooksSlice';
import ratingUpdateReducer from './book/updateRatingSlice';
import storeSearchedBooksReducer from './book/storeBooksSlice';
import userReducer from './user/userSlice';

const store = configureStore({
    reducer: {
        navbarReducer: navbarReducer,
        bookDetailReducer: bookDetailReducer,
        relatedBooksReducer: relatedBooksReducer,
        ratingUpdateReducer: ratingUpdateReducer,
        storeSearchedBooksReducer: storeSearchedBooksReducer,
        userReducer: userReducer,
    }
})

export default store;