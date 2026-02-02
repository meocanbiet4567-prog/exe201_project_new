// import React, { useState } from 'react';
import { Leaf, ArrowLeft, Package, Truck, Shield, Check, CreditCard, Lock } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
// import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';


export default function CheckoutPage({ cartItems = [], setCartItems = () => { } }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        // ❌ Chưa đăng nhập → quay về login
        if (!userInfo) {
            navigate('/login', {
                state: { from: location.pathname }
            });
            return;
        }

        // ✅ Đã đăng nhập → load info
        const user = JSON.parse(userInfo);

        setFormData(prev => ({
            ...prev,
            fullName: user.name || '',
            email: user.email || ''
        }));
    }, [navigate, location.pathname]);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormatCardNumber = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setFormData(prev => ({
            ...prev,
            cardNumber: formattedValue.slice(0, 19)
        }));
    };

    const handleFormatExpiry = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value.length >= 2
            ? `${value.slice(0, 2)}/${value.slice(2, 4)}`
            : value;
        setFormData(prev => ({
            ...prev,
            expiryDate: formattedValue.slice(0, 5)
        }));
    };

    // const handlePlaceOrder = (e) => {
    //     e.preventDefault();
    //     if (cartItems.length === 0) {
    //         alert('Vui lòng thêm sản phẩm vào giỏ hàng!');
    //         return;
    //     }
    //     setOrderPlaced(true);
    //     setTimeout(() => {
    //         setOrderPlaced(false);
    //         navigate('/');
    //     }, 3000);
    // };
    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                })),
                shippingAddress: formData,
                totalPrice: cartTotal,
            };

            await axios.post(
                API_ENDPOINTS.ORDERS,
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ clear cart
            setCartItems([]);
            setOrderPlaced(true);

            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            alert(error.response?.data?.message || 'Đặt hàng thất bại');
        }
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Check className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Đặt Hàng Thành Công!</h2>
                    <p className="text-gray-600 mb-4">Cảm ơn bạn đã mua sắm!</p>
                    <p className="text-sm text-gray-500">Bạn sẽ được chuyển hướng về trang chủ...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 font-medium transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Quay Lại Mua Sắm
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Cart Items */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Package className="w-6 h-6 text-green-600" />
                                Sản Phẩm Trong Giỏ Hàng
                            </h2>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg mb-2">Giỏ hàng của bạn trống</p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="text-green-600 hover:text-green-700 font-medium"
                                    >
                                        Quay lại mua sắm
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                                        >
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-5xl flex-shrink-0 shadow-sm">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-1 text-lg">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-green-600 font-bold">
                                                            {item.price.toLocaleString('vi-VN')}đ
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Số lượng: <span className="font-semibold">{item.quantity}</span>
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-green-600">
                                                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-green-600" />
                                Vận Chuyển
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-700">Giao hàng an toàn, bảo hành 100%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                            {/* Payment Form */}
                            <form onSubmit={handlePlaceOrder} className="space-y-2">
                                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                    Xác Nhận Thông Tin
                                </h3>

                                {/* Personal Info */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-0.5">
                                            Họ Và Tên *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-0.5">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-0.5">
                                        Số Điện Thoại *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                        placeholder="Nhập thông tin tại đây"
                                    />
                                </div>

                                {/* Address Info */}
                                <div className="pt-2 mt-2 border-t border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Địa Chỉ Nhận Hàng</h4>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-0.5">
                                            Địa Chỉ *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                            placeholder="Nhập thông tin tại đây"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-0.5">
                                                Thành Phố *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                                placeholder="Nhập thông tin tại đây"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-0.5">
                                                Mã Bưu Điện *
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                                placeholder="Nhập thông tin tại đây"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Order Summary */}
                            <div className="my-6 py-6 border-y">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Đơn Hàng Của Bạn</h3>
                                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                                    {cartItems.length === 0 ? (
                                        <p className="text-gray-500 text-sm">Giỏ hàng trống</p>
                                    ) : (
                                        cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm text-gray-700">
                                                <span>{item.name} x{item.quantity}</span>
                                                <span className="font-medium text-gray-800">
                                                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600">Tạm tính:</span>
                                    <span className="text-gray-800 font-medium">
                                        {cartTotal.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                                <div className="flex justify-between mb-4 text-sm">
                                    <span className="text-gray-600">Vận chuyển:</span>
                                    <span className="text-green-600 font-medium">Miễn phí</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-200">
                                    <span className="font-bold text-gray-800">Tổng:</span>
                                    <span className="text-2xl font-bold text-green-600">
                                        {cartTotal.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={cartItems.length === 0}
                                className={`w-full py-2.5 rounded-lg font-bold text-white transition ${cartItems.length === 0
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                Xác Nhận Đặt Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
