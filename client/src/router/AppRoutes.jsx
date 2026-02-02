
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductDetail from '../pages/ProductDetail';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import ContactPage from "../pages/ContactPage";
import DesignCardPage from "../pages/DesignCardPage.jsx";
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';
import ScrollToTop from "./ScrollToTop";

export default function AppRoutes({ cartItems, setCartItems }) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/design-card" element={<DesignCardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </>
  );
}