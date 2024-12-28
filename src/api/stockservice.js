import axios from "axios";

const BASE_URL = "http://localhost:8080/api/stocks";

// Fetch all stocks
export const fetchStocks = () => axios.get(BASE_URL);

// Add a new stock
export const addStock = (stock) => axios.post(BASE_URL, stock);

// Update an existing stock
export const updateStock = (id, stock) => axios.put(`${BASE_URL}/${id}`, stock);

// Delete a stock
export const deleteStock = (id) => axios.delete(`${BASE_URL}/${id}`);

// Get total portfolio value
export const fetchPortfolioValue = () => axios.get(`${BASE_URL}/portfolio-value`);
