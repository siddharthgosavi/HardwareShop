import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import orderReducer from "../redux/features/orders/orderSlice";
import customerReducer from "../redux/features/customerInfo/customerInfoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    customer: customerReducer,
    order: orderReducer
  }
});
