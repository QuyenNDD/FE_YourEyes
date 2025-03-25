import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [], // Danh sách doanh thu
        loading: false, // Trạng thái loading
        error: null, // Thông báo lỗi
    },
    reducers: {
        fetchOrdersStart(state) {
            state.loading = true; // Bắt đầu trạng thái loading
            state.error = null; // Xóa lỗi cũ
        },
        fetchOrdersSuccess(state, action) {
            state.loading = false; // Dừng trạng thái loading
            state.orders = action.payload; // Lưu dữ liệu vào state
        },
        fetchOrdersFailure(state, action) {
            state.loading = false; // Dừng trạng thái loading
            state.error = action.payload; // Lưu thông báo lỗi
        },
    },
});

export const {
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFailure,
} = ordersSlice.actions;

// Hàm để gọi API trực tiếp
export const fetchTotalOrders = (token) => async (dispatch) => {
    dispatch(fetchOrdersStart()); // Bắt đầu loading
    try {
        const response = await axios.get(`http://localhost:8080/api/order/history`, {
            headers: {
                Authorization: `Bearer ${token}`, // Đính kèm token vào headers
            },
        });
        dispatch(fetchOrdersSuccess(response.data)); // Thành công, lưu data
    } catch (error) {
        dispatch(fetchOrdersFailure(error.message)); // Thất bại, lưu lỗi
    }
};

export default ordersSlice.reducer;
