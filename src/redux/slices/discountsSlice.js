import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk để gọi API
export const fetchAvailableDiscounts = createAsyncThunk(
  'discounts/fetchAvailableDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/discount/available');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching discounts');
    }
  }
);

// Slice
const discountsSlice = createSlice({
  name: 'discounts',
  initialState: {
    discounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchAvailableDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default discountsSlice.reducer;
