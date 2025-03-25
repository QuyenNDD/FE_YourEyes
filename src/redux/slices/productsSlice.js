import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo async thunk để gọi API lấy tổng số sản phẩm
export const fetchTotalProducts = createAsyncThunk(
  'products/fetchTotalProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Gọi API với size nhỏ nhất để lấy totalElements
      const response = await axios.get('http://localhost:8080/api/products/getAll');
      return response.data.totalElements; // Trả về tổng số sản phẩm
    } catch (error) {
      return rejectWithValue(error.response.data); // Xử lý lỗi
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    totalProducts: 0, // Tổng số sản phẩm
    status: 'idle',   // Trạng thái (idle, loading, succeeded, failed)
    error: null,      // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalProducts.pending, (state) => {
        state.status = 'loading'; // Đang tải
      })
      .addCase(fetchTotalProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Thành công
        state.totalProducts = action.payload; // Cập nhật tổng số sản phẩm
      })
      .addCase(fetchTotalProducts.rejected, (state, action) => {
        state.status = 'failed'; // Thất bại
        state.error = action.payload; // Lưu lỗi
      });
  },
});

export default productsSlice.reducer;
