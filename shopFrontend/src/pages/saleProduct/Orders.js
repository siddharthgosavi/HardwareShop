import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader, { SpinnerImg } from "../../components/loader/Loader";
import Search from "../../components/search/Search";
import { AiFillDelete, AiOutlineEye, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { FILTER_ORDERS, selectFilteredOrders } from "../../redux/features/orders/filterOrdersSlice";
import moment from "moment-timezone";
import OrderDetail from "./OrderDetail";
import "./Orders.scss";

const Orders = ({ orders, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOption, setSearchOption] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const dispatch = useDispatch();

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    if (filteredOrders) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredOrders.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredOrders.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, filteredOrders]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filteredOrders.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_ORDERS({ orders, searchOption, searchValue }));
  }, [orders, searchOption, searchValue, dispatch]);

  useEffect(() => {
    const filtered = orders.filter(order => {
      const matchesName = order.customerInfo.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesMobile = order.customerInfo.mobile.includes(searchValue);
      const matchesDate = moment(order.orderDate).format("DD-MM-YY").includes(searchValue);
      const matchesOrderId = order.orderId.includes(searchValue);

      if (searchOption === "name") return matchesName;
      if (searchOption === "mobile") return matchesMobile;
      if (searchOption === "date") return matchesDate;
      if (searchOption === "orderId") return matchesOrderId;
      return false;
    });
    setFilteredOrders(filtered);
  }, [searchOption, searchValue, orders]);

  const sortOrders = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const aValue = key.split('.').reduce((obj, keyPart) => obj[keyPart], a);
      const bValue = key.split('.').reduce((obj, keyPart) => obj[keyPart], b);

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredOrders(sortedOrders);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />;
    }
    return null;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const closeDetail = () => {
    setSelectedOrder(null);
  };

  // ... other functions for pagination, etc. ...
  // Calculate the index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page number clicks
  const handleOrderPageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="product-list">
        <div className="table">
          <div className="flex-between-column">
            <span>
              <h3 className="--mt">Orders</h3>
            </span>
            <span className="select-container">
              <select value={searchOption} onChange={e => setSearchOption(e.target.value)}>
                <option value="name">Customer Name</option>
                <option value="mobile">Mobile Number</option>
                <option value="date">Date (DD-MM-YY)</option>
                <option value="orderId">Invoice ID</option>
              </select>
            </span>
            <span>
              <Search value={searchValue} placeholder={`Search by ${searchOption}`} onChange={e => setSearchValue(e.target.value)} />
            </span>
          </div>

          {isLoading && <SpinnerImg />}

          <div className="table">
            {!isLoading && orders.length === 0 ? (
              <p>-- No orders found --</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>Order No</th>
                    <th onClick={() => sortOrders('orderId')}>Invoice ID {getSortIcon('orderId')}</th>
                    <th onClick={() => sortOrders('customerInfo.name')}>Customer Name {getSortIcon('customerInfo.name')}</th>
                    <th onClick={() => sortOrders('customerInfo.mobile')}>Customer Mobile {getSortIcon('customerInfo.mobile')}</th>
                    <th onClick={() => sortOrders('customerInfo.address')}>Customer Address {getSortIcon('customerInfo.address')}</th>
                    <th onClick={() => sortOrders('products.length')}>No. of Products {getSortIcon('products.length')}</th>
                    <th onClick={() => sortOrders('total')}>Total Cost {getSortIcon('total')}</th>
                    <th onClick={() => sortOrders('orderDate')}>Order DateTime {getSortIcon('orderDate')}</th>
                    <th onClick={() => sortOrders('paymentMode')}>Paid by {getSortIcon('paymentMode')}</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentOrders.map((orders, index) => {
                    const { _id, orderId, customerInfo, orderDate, products, total, paymentMode } = orders;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{orderId}</td>
                        <td>{shortenText(customerInfo.name, 16)}</td>
                        <td>{customerInfo.mobile}</td>
                        <td>{shortenText(customerInfo.address, 16)}</td>
                        <td>{products.length}</td>
                        <td>
                          {" "}
                          {"₹"}
                          {total}
                        </td>
                        <td>{moment.utc(orderDate).tz("Asia/Kolkata").format("DD-MM-YY hh:mm A")}</td>
                        <td>{paymentMode === "Unpaid" ? <span style={{ fontWeight: "bolder", color: "red" }}>{paymentMode}</span> : paymentMode}</td>
                        <td style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px" }}>
                          <AiOutlineEye color="green" size={25} onClick={() => handleViewOrder(orders)} />
                          <FaEdit color="blue" size={25} />
                          <AiFillDelete color="red" size={25} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="pagination">
            {pageNumbers.map(number => (
              <button key={number} onClick={() => handleOrderPageClick(number)} className={number === currentPage ? "active" : ""}>
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedOrder && <OrderDetail order={selectedOrder} closeDetail={closeDetail} />}
    </div>
  );
};

export default Orders;
