import { configureStore } from '@reduxjs/toolkit';
import catReducer from './slices/catSlice';
import productReducer from './slices/productsSlice';
import discountsReducer from './slices/discountsSlice';
import revenuesReducer from './slices/revenuesSlice';
import ordersReducer from './slices/orderSlice';
// export const store = configureStore({ reducer: { cats: catReducer } });

export const store = configureStore({
    reducer: {
        products: productReducer, // Thêm slice products vào store
    },
    reducer: { cats: catReducer },
    reducer: {
        discounts: discountsReducer,
    },
    reducer: {
        revenues: revenuesReducer,
    },
    reducer: {
        orders: ordersReducer,
    },
});