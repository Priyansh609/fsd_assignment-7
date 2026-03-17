import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const fetchProducts = async () => {
  const response = await API.get('/products');
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export default API;
