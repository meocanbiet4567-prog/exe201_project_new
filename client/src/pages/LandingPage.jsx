import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import { Leaf, Heart, Gift, Sparkles, Check, ArrowRight, Search, ChevronDown, User, ShoppingCart, Package, Star } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';
import { useLocation } from 'react-router-dom';
export default function LandingPage({ cartItems = [], setCartItems = () => { } }) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    //load dữ liệu
    const [products, setProducts] = useState([]);
    // fetch data từ backend
    useEffect(() => {
        fetch(API_ENDPOINTS.PRODUCTS)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = () => {
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);

        if (existingItem) {
            // Nếu sản phẩm đã có, tăng số lượng
            setCartItems(cartItems.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Nếu sản phẩm chưa có, thêm mới
            // const priceValue = parseInt(product.price.replace(/\D/g, ''));
            setCartItems([...cartItems, {
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0] // Use actual product image
            }]);
        }
    };
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);


    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
            {/* Header */}
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            🌱 Sản phẩm thân thiện môi trường
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Giấy Gieo Mầm
                            <span className="text-green-600"> Xanh Cho Tương Lai</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Thiệp và lịch làm từ giấy gieo mầm - Gửi lời chúc, gieo hạt yêu thương, xem mầm xanh nở rộ.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/#products')} className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-lg flex items-center gap-2">
                                Mua Ngay
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition">
                                Tìm Hiểu Thêm
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 relative overflow-hidden">
                            {/* LỚP PHỦ ĐỂ DỄ ĐỌC CHỮ */}
                            <div className="absolute inset-0 bg-white/40"></div>

                            {/* NỘI DUNG */}
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 space-y-4">
                                <Sparkles className="w-12 h-12 text-green-600" />
                                <h3 className="text-2xl font-bold text-gray-900">100% Tự Nhiên</h3>
                                <p className="text-gray-600">Làm từ giấy tái chế và hạt giống hữu cơ</p>

                                <div className="flex gap-2 flex-wrap">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Hoa cúc</span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Rau thơm</span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Hoa hướng dương</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        Tại Sao Chọn Giấy Gieo Mầm?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Thân Thiện Môi Trường</h3>
                            <p className="text-gray-600">100% phân hủy sinh học, không gây hại cho thiên nhiên</p>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Ý Nghĩa Sâu Sắc</h3>
                            <p className="text-gray-600">Món quà ý nghĩa cho người thân, bạn bè, đối tác</p>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-lg transition">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Dễ Sử Dụng</h3>
                            <p className="text-gray-600">Chỉ cần gieo vào đất, tưới nước và chờ hoa nở</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="#how-it-works" className="py-20 max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Cách Sử Dụng
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { step: '1', title: 'Gửi Lời Chúc', desc: 'Viết lời nhắn ý nghĩa lên thiệp hoặc lịch' },
                        { step: '2', title: 'Xé Nhỏ Giấy', desc: 'Sau khi sử dụng, xé giấy thành các mảnh nhỏ' },
                        { step: '3', title: 'Gieo Xuống Đất', desc: 'Đặt giấy lên đất ẩm và phủ lớp đất mỏng (~5mm)' },
                        { step: '4', title: 'Chăm Sóc', desc: 'Tưới nước đều đặn, sau 7-14 ngày mầm sẽ nảy' }
                    ].map((item, i) => (
                        <div key={i} className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                            {i < 3 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                                    <ArrowRight className="w-6 h-6 text-green-400" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section id="products" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
                        <p className="text-xl text-gray-600">Khám phá bộ sưu tập giấy gieo mầm độc đáo của chúng tôi</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        // src={product.images}
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                        <Star className="w-4 h-4 mr-1" fill="currentColor" />
                                        {product.rating}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 flex items-center">
                                        <Leaf className="w-4 h-4 mr-2 text-green-600" />
                                        {product.seeds[0]}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-green-600">
                                            {product.price.toLocaleString("vi-VN")}đ
                                        </span>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // ⛔ chặn navigate
                                                handleAddToCart(product);
                                            }}
                                            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                                        >
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Footer */}
            <Footer />
        </div>
    );
}