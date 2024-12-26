import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerInfoService from "./customerInfoService";
import { toast } from "react-toastify";

const initialState = {
  customer: null,
  customers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// Create New Customer
export const createCustomer = createAsyncThunk("customers/create", async (formData, thunkAPI) => {
  try {
    return await customerInfoService.createCustomerInfo(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get All Customers
export const getCustomers = createAsyncThunk("customers/getAll", async (_, thunkAPI) => {
  try {
    return await customerInfoService.getCustomers();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get a Specific Customer
export const getCustomer = createAsyncThunk("customers/get", async (id, thunkAPI) => {
  try {
    return await customerInfoService.getCustomer(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCustomer.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers.push(action.payload);
        toast.success("Customer added successfully");
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log("action", action);

        toast.error(action.payload);
      })
      .addCase(getCustomers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCustomer.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

export const {} = customerSlice.actions;

export const selectIsLoading = state => state.customer.isLoading;
export const selectCustomer = state => state.customer.customer;
export const selectCustomers = state => state.customer.customers;

export default customerSlice.reducer;
