import AppRoutes from "./router/AppRoutes";
import { useState } from "react";
export default function App() {
  const [cartItems, setCartItems] = useState([
    // {
    //   id: 1,
    //   name: 'Thiệp Cảm Ơn Hạt Giống',
    //   price: 45000,
    //   quantity: 2,
    //   image: '🌱'
    // },
    // {
    //   id: 2,
    //   name: 'Thiệp Sinh Nhật Hoa Lavender',
    //   price: 55000,
    //   quantity: 1,
    //   image: '🌸'
    // },
    // {
    //   id: 3,
    //   name: 'Bộ Quà Tặng Sinh Nhật',
    //   price: 120000,
    //   quantity: 1,
    //   image: '🎁'
    // }
  ]);
  
  return <AppRoutes cartItems={cartItems} setCartItems={setCartItems} />;
}