import React, { useEffect, useState } from "react";
import "./CartDrawer.scss";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose, cartItems, deleteCourseFromCartFunction, totalAmountCalculationFunction, setCartItems }) => {
  const [total, setTotal] = useState(totalAmountCalculationFunction);

  useEffect(() => {
    setTotal(totalAmountCalculationFunction);
  }, [cartItems]);

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="close">
        <FaWindowClose size={30} cursor={"pointer"} onClick={onClose} />
      </div>
      <div className={"cart active"}>
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Geek, your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map(item => (
                <li key={item.product._id} className="cart-item">
                  <div>
                    <div className="item-info">
                      <div className="item-image">
                        <img src={item.product.image.filePath} alt={item.product.name} />
                      </div>
                      <div className="item-details">
                        <h3>{item.product.name}</h3>
                        <div className="item-details-sub">
                          <p>Price: ₹{item.product.price}</p>
                          <p>Available QTY: {item.product.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="item-actions">
                        <button className="remove-button" onClick={() => deleteCourseFromCartFunction(item.product)}>
                          Remove Product
                        </button>
                        <div className="quantity">
                          <button
                            style={{ margin: "1%" }}
                            onClick={e => {
                              if (item.quantity < item.product.quantity) {
                                setCartItems(prevCartItems => {
                                  const updatedCart = prevCartItems.map(prevItem => (prevItem.product._id === item.product._id ? { ...prevItem, quantity: item.quantity + 1 } : prevItem));
                                  return updatedCart;
                                });
                              } else {
                                return toast.error("Only " + item.product.quantity + " " + item.product.name + " is available!!!");
                              }
                            }}
                          >
                            +
                          </button>
                          <p className="quant">{item.quantity} </p>
                          <button
                            onClick={e => {
                              if (item.quantity > 1) {
                                setCartItems(prevCartCourses => {
                                  const updatedCart = prevCartCourses.map(prevItem => (prevItem.product._id === item.product._id ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) } : prevItem));
                                  return updatedCart;
                                });
                              } else {
                                return toast.error("Select atleast 1 quantity else remove product");
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="checkout-section">
              <div className="checkout-total">
                <p className="total">Total Amount: ₹{total}</p>
              </div>
              <button className="checkout-button" disabled={cartItems.length === 0 || totalAmountCalculationFunction() === 0}>
                <Link to="/sale-product" state={{ cartItems, total }}>
                  Proceed to Payment
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
