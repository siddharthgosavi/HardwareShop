import React, { Component } from "react";
import HeaderComponent from "./headerComponent";
import ArticleComponent from "./articleComponent";
import "./invoice.css";

const InvoiceComponent = ({ order, productDetails}) => {
  return (
    <div className="container">
      <div className="invoice-form">
        <HeaderComponent />
        <ArticleComponent order={order} productDetails={productDetails} />
      </div>
    </div>
  );
};

export default InvoiceComponent;
