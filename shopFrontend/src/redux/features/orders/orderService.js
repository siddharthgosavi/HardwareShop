import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ORDER_URL = `${BACKEND_URL}/api/orders/`;

// Create New Order
const createOrder = async formData => {
  const response = await axios.post(ORDER_URL, formData);
  return response.data;
};

// Get all Orders
const getOrders = async () => {
  const response = await axios.get(ORDER_URL);
  return response.data;
};

// Get a Specific Order
const getOrder = async id => {
  const response = await axios.get(ORDER_URL + id);
  return response.data;
};

const orderService = {
  createOrder,
  getOrders,
  getOrder
};

export default orderService;
