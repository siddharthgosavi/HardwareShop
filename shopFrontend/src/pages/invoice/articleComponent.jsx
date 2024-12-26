import React from "react";
import "./invoice.css";
import moment from "moment-timezone";

function ArticleComponent({ order, productDetails }) {
  return (
    <body>
      <article>
        <table className="firstTable">
          <tr>
            <th className="thtd">
              <span>Invoice No #</span>
            </th>
            <td>
              <span>{order.orderId}</span>
            </td>
          </tr>

          <tr>
            <th className="thtd">
              <span>Customer Name</span>
            </th>
            <td>
              <span>{order.customerInfo.name}</span>
            </td>
          </tr>
          <tr>
            <th className="thtd">
              <span>Customer Address</span>
            </th>
            <td>
              <span>{order.customerInfo.address}</span>
            </td>
          </tr>
          <tr>
            <th className="thtd">
              <span>Date</span>
            </th>
            <td>
              <span>{moment.utc(order.orderDate).tz("Asia/Kolkata").format("DD-MM-YY hh:mm A")}</span>
            </td>
          </tr>
          <tr>
            <th className="thtd">
              <span>{order.paymentMode === "Cash" || order.paymentMode === "Online" ? "Amount Paid " + order.paymentMode : "Amount Due"}</span>
            </th>
            <td>
              <span id="prefix">₹</span>
              <span>{order.total}</span>
            </td>
          </tr>
        </table>

        <table className="secondTable">
          <thead>
            <tr>
              <th className="thtd">
                <span>Sr. No</span>
              </th>
              <th className="thtd">
                <span>Particular</span>
              </th>
              <th className="thtd">
                <span>Quantity</span>
              </th>
              <th className="thtd">
                <span>Rate</span>
              </th>
              <th className="thtd">
                <span>Amount</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => {
              const productDetail = productDetails.find(p => p.product._id === product.product);
              return (
                <tr key={product.product}>
                  <td>{index + 1}</td>
                  <td>{productDetail ? productDetail.product.name : "Loading..."}</td>
                  <td>{product.quantity}</td>
                  <td>₹{productDetail ? productDetail.product.price : "Loading..."}</td>
                  <td>₹{productDetail ? product.quantity * productDetail.product.price : "Loading..."}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="firstTable">
          <tr>
            <th className="thtd">
              <span>Total</span>
            </th>
            <td>
              <span id="prefix">₹</span>
              <span>{order.total}</span>
            </td>
          </tr>
          <tr>
            <th className="thtd">
              <span>Amount Paid</span>
            </th>
            <td>
              <span id="prefix">₹</span>
              <span>{order.paymentMode === "Cash" || order.paymentMode === "Online" ? order.total : "0.00"}</span>
            </td>
          </tr>
          <tr>
            <th className="thtd">
              <span>Balance Due</span>
            </th>
            <td>
              <span id="prefix">₹</span>
              <span>{order.paymentMode === "Unpaid" ? order.total : "0.00"}</span>
            </td>
          </tr>
        </table>
      </article>

      <aside className="signature-section">
        <div className="signature">
          <h4 className="sign">{order.customerInfo.name}'s Sign</h4>
          <div className="signature-line"></div>
        </div>
        <div className="signature">
          <h4 className="sign">Sai Enterprises Sign</h4>
          <div className="signature-line"></div>
        </div>
      </aside>
    </body>
  );
}

export default ArticleComponent;
