// import React, { useState } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Leaf, Heart, ShoppingCart, Star, Truck, Shield, Package, ChevronLeft, Check, Plus, Minus } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';

export default function ProductDetail({ cartItems = [], setCartItems = () => { } }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    // Thông tin sản phẩm mẫu
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    API_ENDPOINTS.PRODUCT(id)
                );
                setProduct(res.data);
            } catch (err) {
                setError('Không tải được sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await axios.get(API_ENDPOINTS.PRODUCTS);

                // ❌ loại trừ sản phẩm đang xem
                const filtered = res.data.filter(p => p._id !== id);

                // 🔀 random mảng
                const shuffled = filtered.sort(() => 0.5 - Math.random());

                // 🎯 lấy 3 sản phẩm
                setRelatedProducts(shuffled.slice(0, 3));
            } catch (err) {
                console.error('Không tải được sản phẩm liên quan');
            }
        };

        if (id) fetchRelatedProducts();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Đang tải sản phẩm...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }


    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);

        // Check if product already in cart
        const existingItem = cartItems.find(item => item._id === product._id);

        if (existingItem) {
            // If product exists, increase quantity
            setCartItems(cartItems.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            // If product doesn't exist, add it
            setCartItems([...cartItems, {
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.images[0]
            }]);
        }
    };

    const increaseQuantity = () => setQuantity(q => q + 1);
    const decreaseQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1);
    // const product = allProducts.find(p => p.id === Number(id));
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                setShowLoginPopup={setShowLoginPopup}
                setShowCartPopup={setShowCartPopup}
                cartItems={cartItems}
            />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="hover:text-green-600 cursor-pointer">Trang chủ</span>
                    <span>/</span>
                    <span className="hover:text-green-600 cursor-pointer">Sản phẩm</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </div>
            </div>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`rounded-xl overflow-hidden border-2 transition ${selectedImage === idx ? 'border-green-600' : 'border-transparent'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-24 object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-gray-600">
                                        {product.rating} ({product.reviews} đánh giá)
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <Leaf className="w-5 h-5 text-green-600" />
                                <span className="text-green-600 font-medium">{product.seeds}</span>
                            </div>
                        </div>

                        <div className="border-t border-b border-gray-200 py-6">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-bold text-green-600">{product.price.toLocaleString('vi-VN')}đ</span>

                            </div>
                            <p className="text-green-600 mt-2 flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                Còn hàng
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-700 font-medium">Số lượng:</span>
                                <div className="flex items-center border-2 border-gray-300 rounded-full">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="p-3 hover:bg-gray-100 rounded-l-full"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-6 font-semibold">{quantity}</span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="p-3 hover:bg-gray-100 rounded-r-full"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-green-600 text-white py-4 rounded-full font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {addedToCart ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
                                </button>
                                {/* <button className="border-2 border-green-600 p-4 rounded-full hover:bg-green-50 transition">
                                    <Heart className="w-6 h-6 text-green-600" />
                                </button> */}
                            </div>

                            <button className="w-full bg-amber-500 text-white py-4 rounded-full font-semibold hover:bg-amber-600 transition">
                                Mua Ngay
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <div className="text-center p-4 bg-white rounded-xl">
                                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">Miễn phí vận chuyển</p>
                                <p className="text-xs text-gray-500">Đơn từ 200k</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl">
                                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">Đảm bảo chất lượng</p>
                                <p className="text-xs text-gray-500">Hoàn tiền 100%</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl">
                                <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">Đóng gói cẩn thận</p>
                                <p className="text-xs text-gray-500">An toàn khi vận chuyển</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex gap-8 border-b border-gray-200">
                        {['description', 'features', 'specifications'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 font-semibold transition ${activeTab === tab
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                {tab === 'description' && 'Mô tả sản phẩm'}
                                {tab === 'features' && 'Đặc điểm nổi bật'}
                                {tab === 'specifications' && 'Thông số kỹ thuật'}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Sản phẩm này không chỉ là một tờ giấy thông thường, mà còn là một món quà ý nghĩa cho người thân,
                                    bạn bè hoặc đối tác kinh doanh. Sau khi viết lời nhắn, bạn có thể gieo tờ giấy vào đất và chăm sóc
                                    để xem những bông hoa xinh đẹp nở rộ.
                                </p>
                            </div>
                        )}

                        {activeTab === 'features' && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b border-gray-200 pb-3">
                                        <span className="font-medium text-gray-700">{key}</span>
                                        <span className="text-gray-600">{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedProducts.map(item => (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/product/${item._id}`)}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>

                                    <div className="flex items-center gap-1 mb-3">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm text-gray-600">
                                            {item.rating}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-green-600">
                                            {item.price.toLocaleString('vi-VN')}đ
                                        </span>

                                        <button
                                            onClick={() => navigate(`/product/${item._id}`)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition text-sm"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}