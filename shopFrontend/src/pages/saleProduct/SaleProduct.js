import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { selectIsLoading } from "../../redux/features/product/productSlice";
import Checkout from "./Checkout";

const SaleProduct = () => {
  const location = useLocation();
  const { cartItems, total } = location.state ? location.state : "";
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Sale Product</h3>
      {cartItems && cartItems.length > 0 && <Checkout cartItems={cartItems} total={total} />}
    </div>
  );
};

export default SaleProduct;
