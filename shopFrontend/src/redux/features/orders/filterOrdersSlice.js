import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredOrders: []
};

const filterOrdersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_ORDERS(state, action) {
      const { orders, search } = action.payload;
      const tempOrders = orders.filter(order => order.customerInfo.name.toLowerCase().includes(search.toLowerCase()));

      state.filteredOrders = tempOrders;
    }
  }
});

export const { FILTER_ORDERS } = filterOrdersSlice.actions;

export const selectFilteredOrders = state => state.filter.filteredOrders;

export default filterOrdersSlice.reducer;
