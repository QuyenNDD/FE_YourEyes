import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({ name: 'auth', initialState: { loggedIn: false }, reducers: {} });
export default authSlice.reducer;