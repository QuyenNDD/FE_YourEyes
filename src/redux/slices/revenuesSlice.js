import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const revenuesSlice = createSlice({
    name: 'revenues',
    initialState: {
        revenues: [], // Danh sách doanh thu
        loading: false, // Trạng thái loading
        error: null, // Thông báo lỗi
    },
    reducers: {
        fetchRevenuesStart(state) {
            state.loading = true; // Bắt đầu trạng thái loading
            state.error = null; // Xóa lỗi cũ
        },
        fetchRevenuesSuccess(state, action) {
            state.loading = false; // Dừng trạng thái loading
            state.revenues = action.payload; // Lưu dữ liệu vào state
        },
        fetchRevenuesFailure(state, action) {
            state.loading = false; // Dừng trạng thái loading
            state.error = action.payload; // Lưu thông báo lỗi
        },
    },
});

export const {
    fetchRevenuesStart,
    fetchRevenuesSuccess,
    fetchRevenuesFailure,
} = revenuesSlice.actions;

// Hàm để gọi API trực tiếp
export const fetchRevenuesByYear = (year, token) => async (dispatch) => {
    dispatch(fetchRevenuesStart()); // Bắt đầu loading
    try {
        const response = await axios.get(`http://localhost:8080/api/revenues/year/${year}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Đính kèm token vào headers
            },
        });
        dispatch(fetchRevenuesSuccess(response.data)); // Thành công, lưu data
    } catch (error) {
        dispatch(fetchRevenuesFailure(error.message)); // Thất bại, lưu lỗi
    }
};

export default revenuesSlice.reducer;
