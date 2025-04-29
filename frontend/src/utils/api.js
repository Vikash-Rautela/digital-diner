import axios from "axios";

// Create an axios instance with defaults
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions for menu items
export const getMenuItems = async () => {
  try {
    const response = await API.get("/menu");
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const getMenuItem = async (id) => {
  try {
    const response = await API.get(`/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu item with id ${id}:`, error);
    throw error;
  }
};

// API functions for orders
export const createOrder = async (orderData) => {
  try {
    const response = await API.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrdersByPhone = async (phoneNumber) => {
  try {
    const response = await API.get(`/orders/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for phone ${phoneNumber}:`, error);
    throw error;
  }
};

export default API;
