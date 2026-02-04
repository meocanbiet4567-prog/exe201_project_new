import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartPopup({ showCart, setShowCart, cartItems, setCartItems }) {
    const navigate = useNavigate();
    const updateQuantity = (_id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item._id === _id
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const removeItem = (_id) => {
        setCartItems(items => items.filter(item => item._id !== _id));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);



    if (!showCart) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowCart(false)}
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Giỏ Hàng <span className="text-green-600">({cartItems.length})</span>
                    </h2>
                    <button
                        onClick={() => setShowCart(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ShoppingCart className="w-16 h-16 mb-4" />
                            <p className="text-lg">Giỏ hàng trống</p>
                            <p className="text-sm mt-2">Hãy thêm sản phẩm vào giỏ hàng!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl shadow-sm">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800 mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-green-600 font-semibold mb-3">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item._id, -1)}
                                                className="p-1.5 bg-white rounded border border-gray-200 hover:bg-gray-50 hover:border-green-600 transition"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-semibold w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item._id, 1)}
                                                className="p-1.5 bg-white rounded border border-gray-200 hover:bg-gray-50 hover:border-green-600 transition"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item._id)}
                                                className="ml-auto p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                                                title="Xóa sản phẩm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <span className="text-lg font-medium text-gray-700">
                                Tổng cộng:
                            </span>
                            <span className="text-2xl font-bold text-green-600">
                                {totalPrice.toLocaleString('vi-VN')}₫
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                // Check if user is logged in
                                const token = localStorage.getItem('token');
                                setShowCart(false);

                                if (!token) {
                                    // Not logged in - redirect to login with return path
                                    navigate('/login', {
                                        state: { from: '/checkout' }
                                    });
                                } else {
                                    // Logged in - go to checkout
                                    navigate('/checkout');
                                }
                            }}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
                        >
                            Thanh Toán
                        </button>
                        <button
                            onClick={() => setShowCart(false)}
                            className="w-full mt-2 bg-white text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition border border-gray-200"
                        >
                            Tiếp Tục Mua Hàng
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}