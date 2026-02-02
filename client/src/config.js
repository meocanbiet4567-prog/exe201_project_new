// API Configuration
// Reads from Vite environment variables, falls back to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    // Users
    LOGIN: `${API_BASE_URL}/api/users/login`,
    REGISTER: `${API_BASE_URL}/api/users/register`,
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/users/change-password`,

    // Products
    PRODUCTS: `${API_BASE_URL}/api/products`,
    PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,

    // Orders
    ORDERS: `${API_BASE_URL}/api/orders`,
    MY_ORDERS: `${API_BASE_URL}/api/orders/myorders`,
};

export default API_BASE_URL;
