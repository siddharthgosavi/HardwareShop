import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getOrders } from "../../redux/features/orders/orderSlice";
import Orders from "./Orders";

const SaleProduct = () => {
  const location = useLocation();
  const { cartItems, total } = location.state ? location.state : "";

  useRedirectLoggedOutUser("/login");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const { orders, isLoading, isError, message } = useSelector(state => state.order);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getOrders());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return <div>{isLoggedIn && <Orders orders={orders} isLoading={isLoading} />}</div>;
};

export default SaleProduct;
