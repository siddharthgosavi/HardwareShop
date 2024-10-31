import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CUSTOMER_INFO_URL = `${BACKEND_URL}/api/customerInfo/`;

// Create New Customer Info
const createCustomerInfo = async formData => {
  const response = await axios.post(CUSTOMER_INFO_URL, formData);
  return response.data;
};

// Get all Customer Info
const getCustomers = async () => {
  const response = await axios.get(CUSTOMER_INFO_URL);
  return response.data;
};

// Get a Customer Info
const getCustomer = async id => {
  const response = await axios.get(CUSTOMER_INFO_URL + id);
  return response.data;
};

const customerInfoService = {
  createCustomerInfo,
  getCustomers,
  getCustomer
};

export default customerInfoService;
