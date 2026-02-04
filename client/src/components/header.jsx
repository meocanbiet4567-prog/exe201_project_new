import React, { useState } from 'react';
import { Leaf, Search, ChevronDown, User, ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartPopup from './cartPopup';
import { useAuth } from '../context/AuthContext';

export default function Header({
    searchQuery,
    setSearchQuery,
    activeDropdown,
    setActiveDropdown,
    cartItems,
    setCartItems,
}) {
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const { user, logout } = useAuth();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        setShowProfileDropdown(false);
        navigate('/');
    };

    const handleOpenCart = () => {
        if (!user) {
            navigate('/login', { state: { from: '/checkout' } });
        } else {
            setShowCart(true);
        }
    };

    return (
        <>
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <img src="https://res.cloudinary.com/dotom7ksq/image/upload/v1770211558/STICKER.SVG_zowvk3.png" alt="Logo" className="w-20 h-20" />
                            {/* <span className="text-2xl font-bold text-green-800">Mầm</span> */}
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-green-600 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* User & Cart Icons */}
                        <div className="flex items-center gap-4">
                            {/* USER PROFILE / LOGIN */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="p-2 rounded-full hover:bg-green-50 transition flex items-center gap-2"
                                        title={user.name}
                                    >
                                        <User className="w-6 h-6 text-gray-700" />
                                        <ChevronDown className="w-4 h-4 text-gray-700" />
                                    </button>
                                    {showProfileDropdown && (
                                        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="font-medium text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate('/profile');
                                                    setShowProfileDropdown(false);
                                                }}
                                                className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                                            >
                                                Hồ Sơ Cá Nhân
                                            </a>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate('/orders');
                                                    setShowProfileDropdown(false);
                                                }}
                                                className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                                            >
                                                Đơn Hàng Của Tôi
                                            </a>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Đăng Xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="p-2 rounded-full hover:bg-green-50 transition"
                                    title="Đăng nhập"
                                >
                                    <User className="w-6 h-6 text-gray-700" />
                                </button>
                            )}

                            {/* CART */}
                            <button
                                onClick={handleOpenCart}
                                className="p-2 rounded-full hover:bg-green-50 relative transition"
                                title="Giỏ hàng"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Navbar */}
                    <nav className="flex justify-center gap-8 pt-2 border-t border-gray-200">
                        <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/');
                            }}
                            className="text-gray-700 hover:text-green-600 font-medium transition py-2"
                        >
                            Trang Chủ
                        </a>

                        {/* Sản Phẩm Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('products')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                onClick={() => navigate('/#products')}
                                className="text-gray-700 hover:text-green-600 font-medium transition py-2 flex items-center gap-1"
                            >
                                Sản Phẩm
                            </button>
                            {/* {activeDropdown === 'products' && (
                                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/products/thank-you-cards');
                                        }}
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                                    >
                                        Thiệp Cảm Ơn
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/products/birthday-cards');
                                        }}
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                                    >
                                        Thiệp Sinh Nhật
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/products/business-cards');
                                        }}
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                                    >
                                        Thiệp Doanh Nghiệp
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/products/gift-sets');
                                        }}
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                                    >
                                        Bộ Quà Tặng
                                    </a>
                                </div>
                            )} */}
                        </div>

                        {/* Về Chúng Tôi Dropdown */}
                        {/* <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('about')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                onClick={() => navigate('/about')}
                                className="text-gray-700 hover:text-green-600 font-medium transition py-2 flex items-center gap-1"
                            >
                                Về Chúng Tôi
                            </button>
                        </div> */}

                        <a
                            href="/design-card"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/design-card');
                            }}
                            className="text-gray-700 hover:text-green-600 font-medium transition py-2"
                        >
                            Thiết Kế Thiệp
                        </a>

                        <a
                            href="/contact"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/contact');
                            }}
                            className="text-gray-700 hover:text-green-600 font-medium transition py-2"
                        >
                            Liên Hệ
                        </a>
                    </nav>
                </div>
            </header>

            {/* Cart Popup Component */}
            <CartPopup
                showCart={showCart}
                setShowCart={setShowCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        </>
    );
}