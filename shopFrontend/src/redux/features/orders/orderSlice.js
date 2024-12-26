import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

const initialState = {
  order: null,
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// Create New Order
export const createOrder = createAsyncThunk("orders/create", async (formData, thunkAPI) => {
  try {
    return await orderService.createOrder(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Get All Orders
export const getOrders = createAsyncThunk("orders/getAll", async (_, thunkAPI) => {
  try {
    return await orderService.getOrders();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Get a Specific Order
export const getOrder = createAsyncThunk("orders/get", async (id, thunkAPI) => {
  try {
    return await orderService.getOrder(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders.push(action.payload);
        toast.success("Order added successfully", { autoClose: 8000 });
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

export const {} = orderSlice.actions;

export const selectIsLoading = state => state.order.isLoading;
export const selectOrder = state => state.order.order;
export const selectOrders = state => state.order.orders;

export default orderSlice.reducer;
