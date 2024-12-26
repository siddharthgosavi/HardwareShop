import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products/';

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

const getProducts = async (ids) => {
  const products = [];
  for (const id of ids) {
    const product = await getProduct(id);
    products.push(product);
    // Add a delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return products;
};

export { getProduct, getProducts };
