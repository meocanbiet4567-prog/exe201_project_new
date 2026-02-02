import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, User, Building, Facebook, Instagram, Music } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.subject && formData.message) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            }, 3000);
        }
    };

    return (
        <>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">

                {/* Header Section */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
                        <p className="text-xl text-green-100">
                            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Thông Tin Liên Hệ
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Hãy liên hệ với chúng tôi qua các kênh dưới đây. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                                </p>
                            </div>

                            {/* Contact Cards Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Address Card */}
                                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-green-600">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-100 p-4 rounded-lg flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Địa Chỉ</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Đại học FPT Hà Nội, Hanoi, Vietnam
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-green-600">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-100 p-4 rounded-lg flex-shrink-0">
                                            <Phone className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Điện Thoại</h3>
                                            <div className="space-y-1 text-gray-600">
                                                <p>Số điện thoại: <span className="font-semibold">089 952 76 68</span></p>
                                                <p>Liên hệ: <span className="font-semibold">Phương Linh</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Card */}
                                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-green-600">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-100 p-4 rounded-lg flex-shrink-0">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                                            <div className="space-y-1">
                                                <p><a href="mailto:mamecogifts@gmail.com" className="text-green-600 hover:text-green-700 font-medium">mamecogifts@gmail.com</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hours Card */}
                                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-blue-600">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-4 rounded-lg flex-shrink-0">
                                            <Facebook className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Facebook</h3>
                                            <a href="https://fb.com/61586838331141" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                                Mơn Mởn Mầm Xanh
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Instagram Card */}
                                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-pink-600">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-pink-100 p-4 rounded-lg flex-shrink-0">
                                            <Instagram className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Instagram</h3>
                                            <a href="https://www.instagram.com/mamgieohatiu" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 font-medium hover:underline">
                                                Mơn Mởn Mầm Xanh
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* TikTok Card */}
                                {/* <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-black">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gray-100 p-4 rounded-lg flex-shrink-0">
                                            <Music className="w-6 h-6 text-black" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">TikTok</h3>
                                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 font-medium hover:underline">
                                                Mơn Mởn Mầm Xanh
                                            </a>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="h-64">
                                    <iframe
                                        title="FPT University Map"
                                        src="https://www.google.com/maps?q=Đại+Học+FPT+Hòa+Lạc&output=embed"
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-lg p-8 md:p-10 border border-green-100">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Gửi Tin Nhắn
                                </h2>
                                <p className="text-gray-600">
                                    Vui lòng điền form bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.
                                </p>
                            </div>

                            {submitted ? (
                                <div className="text-center py-16">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                        <CheckCircle className="w-12 h-12 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        Gửi Thành Công!
                                    </h3>
                                    <p className="text-gray-600 text-lg">
                                        Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong 24 giờ.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {/* Name and Email Row */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm">
                                                Họ và Tên *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition bg-white"
                                                    placeholder="Họ và tên"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm">
                                                Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition bg-white"
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone and Subject Row */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm">
                                                Số Điện Thoại
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition bg-white"
                                                    placeholder="0123 456 789"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm">
                                                Chủ Đề *
                                            </label>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition bg-white"
                                                    placeholder="Chủ đề"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                                            Nội Dung *
                                        </label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition bg-white resize-none"
                                                placeholder="Nội dung tin nhắn của bạn..."
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Gửi Tin Nhắn
                                    </button>

                                    <p className="text-center text-xs text-gray-500 mt-4">
                                        * Bắt buộc
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    );
}