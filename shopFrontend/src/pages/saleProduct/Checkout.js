import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import Card from "../../components/card/Card";
import { createCustomer, selectIsLoading as customerIsLoading, getCustomers } from "../../redux/features/customerInfo/customerInfoSlice";
import { createOrder, selectIsLoading as orderIsLoading } from "../../redux/features/orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const Checkout = ({ cartItems, total }) => {
  const dispatch = useDispatch();
  const isCustomerLoading = useSelector(customerIsLoading);
  const isOrderLoading = useSelector(orderIsLoading);
  const [customers, setCustomers] = useState([]);
  const [selectedCustId, setSelectedCustId] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    address: "",
    mobile: ""
  });
  const [errors, setErrors] = useState({});

  const getAllCustomers = async () => {
    const customers = await dispatch(getCustomers());
    setCustomers(customers.payload);
  };

  const handleNameChange = e => {
    setCustomerInfo({ ...customerInfo, name: e.target.value });
    if (e.target.value.length > 0) {
      const filterdArray = customers.filter(cust => cust.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setFiltered(filterdArray);
    } else {
      setFiltered([]);
      setSelectedCustId("");
    }
  };

  const handleListClicked = customer => {
    setSelectedCustId(customer._id);
    setCustomerInfo({ ...customerInfo, name: customer.name, mobile: customer.mobile, address: customer.address });
    setFiltered([]);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    // Validate form data
    const newErrors = validateForm();
    setErrors(newErrors);
    var cust_id = "";
    if (Object.keys(newErrors).length === 0) {
      if (customers.find(cust => cust._id === selectedCustId)) {
        cust_id = selectedCustId;
      } else {
        const customer = await dispatch(createCustomer(customerInfo));
        cust_id = customer.payload._id;
      }

      const placeOrder = {
        customerInfoId: cust_id,
        products: cartItems.map(item => ({
          id: item.product._id,
          quantity: item.quantity
        })),
        total: total
      };

      console.log("place order", placeOrder);

      const order = await dispatch(createOrder(placeOrder));
      console.log("order", order);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate name
    if (!customerInfo.name) {
      errors.name = "Name is required";
    }

    // Validate mobile number
    if (customerInfo.mobile && !/^\d{10}$/.test(customerInfo.mobile)) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(customerInfo.mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    return errors;
  };

  // ... other functions for pagination, etc. ...
  // Calculate the index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page number clicks
  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cartItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="checkout-container">
      {(isCustomerLoading || isOrderLoading) && <Loader />}
      <h2>Checkout</h2>
      <div className="both">
        <div className="cartItems">
          <Card cardClass={"card"}>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>QTY Price</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.product._id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.product.price}</td>
                    <td>₹{item.product.price * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: "bolder" }} colSpan={3}>
                    Total
                  </td>
                  <td style={{ fontWeight: "bolder" }} colSpan={1}>
                    ₹{total}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          <div className="pagination">
            {pageNumbers.map(number => (
              <button key={number} onClick={() => handlePageClick(number)} className={number === currentPage ? "active" : ""}>
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="add-order">
          <Card cardClass={"card"}>
            <form onSubmit={handleSubmit}>
              <label>Customer Name:</label>
              <input type="text" placeholder="Customer name" id="mobile" value={customerInfo.name} onChange={e => handleNameChange(e)} />
              {errors.name && <span className="error">{errors.name}</span>}
              {filtered.length > 0 && (
                <ul className="filteredList">
                  {filtered.map(cust => {
                    return (
                      <li className="filteredListItem" onClick={() => handleListClicked(cust)} key={cust._id}>
                        {cust.name}
                      </li>
                    );
                  })}
                </ul>
              )}

              <label>Customer Mobile Number:</label>
              <input type="number" placeholder="Customer mobile number" id="mobile" value={customerInfo.mobile} onFocus={() => setFiltered([])} onChange={e => setCustomerInfo({ ...customerInfo, mobile: e.target.value })} />
              {errors.mobile && <span className="error">{errors.mobile}</span>}

              <label>Customer Address:</label>
              <input type="text" id="address" onFocus={() => setFiltered([])} placeholder="Customer address" value={customerInfo.address} onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })} />
              {errors.address && <span className="error">{errors.address}</span>}

              <div className="--my">
                <button type="submit" className="--btn --btn-primary">
                  Place order
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
