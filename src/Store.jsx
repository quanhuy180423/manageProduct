// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './redux/ProductSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
    },
});

export default store;
