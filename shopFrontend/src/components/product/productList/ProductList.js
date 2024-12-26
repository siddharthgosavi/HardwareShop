import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsCartCheckFill, BsCartPlus } from "react-icons/bs";

import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_PRODUCTS, selectFilteredPoducts } from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts } from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import Icon from "../../../assets/hardware.png";
import { BiCart } from "react-icons/bi";
import CartDrawer from "./CartDrawer";
import Modal from "../../modal/Modal";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const [cartItemIds, setCartItemIds] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  //cart logic
  const [cartItems, setCartItems] = useState([]);

  const addCourseToCartFunction = product => {
    const alreadyCourses = cartItems.find(item => item._id === product._id);
    if (alreadyCourses) {
      const latestCartUpdate = cartItems.map(item =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
      setCartItems(latestCartUpdate);
    } else {
      setCartItems([...cartItems, { product: product, quantity: 1 }]);
      setCartItemIds([...cartItemIds, product._id]);
    }
  };

  const deleteCourseFromCartFunction = product => {
    const updatedCart = cartItems.filter(item => item.product._id !== product._id);
    setCartItemIds(cartItemIds.filter(item => item !== product._id));
    setCartItems(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
    const totalPrice = cartItems.reduce((totall, item) => totall + parseFloat(item.product.price * item.quantity), 0);
    return totalPrice;
  };

  //end og cart logic

  const delProduct = async id => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = id => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id)
        },
        {
          label: "Cancel"
          // onClick: () => alert('Click No')
        }
      ]
    });
  };

  const toggleCart = () => {
    console.log("toggle cart", isCartOpen);

    setIsCartOpen(!isCartOpen);
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-list">
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
      <CartDrawer handleModalOpen={handleModalOpen} isOpen={isCartOpen} cartItems={cartItems} onClose={toggleCart} deleteCourseFromCartFunction={deleteCourseFromCartFunction} totalAmountCalculationFunction={totalAmountCalculationFunction} setCartItems={setCartItems} />
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          {cartItems.length > 0 ? (
            <p className="btn btn-primary" onClick={toggleCart}>
              <BsCartCheckFill size={35} color="green" cursor={"pointer"} /> {cartItems.length}{" "}
            </p>
          ) : (
            <p onClick={toggleCart}>
              <BiCart size={35} color="red" cursor={"pointer"} />
            </p>
          )}
          <span>
            <Search value={search} onChange={e => setSearch(e.target.value)} />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>Product No</th>
                  <th style={{ width: "200px" }}>Porduct Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        {product.image ? (
                          <div className="crop">
                            <img width={"50px"} height={"50px"} src={product.image.filePath} alt="product" />
                          </div>
                        ) : (
                          <div className="crop">
                            <img width={"50px"} height={"50px"} src={Icon} alt="product" />
                          </div>
                        )}
                      </td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"₹"}
                        {price}
                      </td>
                      <td>{parseInt(quantity) === 0 ? <p style={{ color: "red", fontWeight: "bolder" }}>Out of stock</p> : quantity}</td>
                      <td>
                        {"₹"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt size={20} color={"red"} onClick={() => confirmDelete(_id)} />
                        </span>
                        {parseInt(quantity) !== 0 && <span>{cartItemIds.includes(_id) ? <BsCartCheckFill size={20} color={"red"} onClick={() => deleteCourseFromCartFunction(product)} /> : <BsCartPlus size={20} color={"green"} onClick={() => addCourseToCartFunction(product)} />}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate breakLabel="..." nextLabel="Next" onPageChange={handlePageClick} pageRangeDisplayed={3} pageCount={pageCount} previousLabel="Prev" renderOnZeroPageCount={null} containerClassName="pagination1" pageLinkClassName="page-num" previousLinkClassName="page-num" nextLinkClassName="page-num" activeLinkClassName="activePage" />
      </div>
    </div>
  );
};

export default ProductList;
