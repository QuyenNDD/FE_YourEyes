import { configureStore } from '@reduxjs/toolkit';
import catReducer from './slices/catSlice';
export const store = configureStore({ reducer: { cats: catReducer } });