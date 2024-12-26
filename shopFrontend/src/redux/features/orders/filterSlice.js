import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredOrders: []
};

const ordersFilterSlice = createSlice({
  name: "ordersFilter", // Use a different name to avoid conflicts
  initialState,
  reducers: {
    FILTER_ORDERS(state, action) {
      const { orders, filterBy } = action.payload;
      let filteredOrders = orders;

      // Customize filtering logic based on filterBy property
      switch (filterBy) {
        case "customer_name": // Filter by customer ID
          const { customer_name } = action.payload;
          filteredOrders = orders.filter(order => order.customerInfo.name === customer_name);
          break;
        case "status": // Filter by order status
          const { status } = action.payload;
          filteredOrders = orders.filter(order => order.status === status);
          break;
        case "dateRange": // Filter by date range (more complex logic required)
          const { startDate, endDate } = action.payload;
          filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.createdAt); // Assuming 'createdAt' stores order creation date
            return orderDate >= startDate && orderDate <= endDate;
          });
          break;
        default:
          // Handle default case (no filtering or invalid filterBy)
          filteredOrders = orders;
      }

      state.filteredOrders = filteredOrders;
    }
  }
});

export const { FILTER_ORDERS } = ordersFilterSlice.actions;

export const selectFilteredOrders = state => state.ordersFilter.filteredOrders;

export default ordersFilterSlice.reducer;
