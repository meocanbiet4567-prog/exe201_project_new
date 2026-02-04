import React from 'react';
import { Leaf, Heart, Users, Target, Award, Sprout, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

export default function AboutUs({ cartItems = [], setCartItems = () => { } }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeDropdown, setActiveDropdown] = React.useState(null);
    const navigate = useNavigate();

    const teamMembers = [
        {
            name: 'Trần Minh Anh',
            role: 'Nhà sáng lập - Sinh viên năm 3',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
            description: 'Ý tưởng Mầm Xanh bắt nguồn từ bài tập môn học về sản phẩm bền vững. Anh yêu thích thiết kế và môi trường.'
        },
        {
            name: 'Lê Quang Huy',
            role: 'Quản lý Sản phẩm - Sinh viên năm 2',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
            description: 'Huy chịu trách nhiệm kiểm chất lượng sản phẩm và tìm nguồn cung cấp giấy tái chế.'
        },
        {
            name: 'Phạm Thanh Hiền',
            role: 'Kinh doanh & Marketing - Sinh viên năm 3',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
            description: 'Hiền quản lý các kênh bán hàng và xây dựng cộng đồng khách hàng.'
        }
    ];

    const values = [
        {
            icon: <Leaf className="w-12 h-12 text-green-600" />,
            title: 'Bền Vững',
            description: 'Chúng tôi cam kết sử dụng 100% giấy tái chế và hạt giống thực sự có thể mọc.'
        },
        {
            icon: <Heart className="w-12 h-12 text-green-600" />,
            title: 'Chân Thật',
            description: 'Là một startup sinh viên, chúng tôi làm việc với tâm huyết và sự trung thực.'
        },
        {
            icon: <Users className="w-12 h-12 text-green-600" />,
            title: 'Cộng Đồng',
            description: 'Mỗi sản phẩm được làm tay bởi đội ngũ của chúng tôi với yêu thương.'
        },
        {
            icon: <Target className="w-12 h-12 text-green-600" />,
            title: 'Học Hỏi',
            description: 'Chúng tôi liên tục cải tiến và lắng nghe phản hồi từ khách hàng.'
        }
    ];

    const milestones = [
        {
            year: '2023',
            event: 'Ra đời ý tưởng Mầm Xanh từ một bài tập seminar'
        },
        {
            year: '2024 Q1',
            event: 'Tạo prototype đầu tiên và kiểm thử với 50 bạn bè'
        },
        {
            year: '2024 Q2',
            event: 'Bán thử nghiệm trên Instagram, đạt 200 đơn hàng'
        },
        {
            year: '2024 Q3',
            event: 'Xây dựng website và bắt đầu bán hàng chính thức'
        },
        {
            year: '2024 Q4',
            event: 'Mở rộng sản phẩm, đạt 500+ khách hàng'
        },
        {
            year: '2025',
            event: 'Tiếp tục phát triển và hướng tới bền vững'
        }
    ];

    return (
        <div>
            {/* Header */}
            <Header cartItems={cartItems} setCartItems={setCartItems} />

            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 md:px-8 pt-20">
                <div className="max-w-3xl text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Về Mầm Xanh</h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        Mầm Xanh là một dự án khởi nghiệp của sinh viên, ra đời từ ý tưởng đơn giản nhưng đầy ý nghĩa:
                        biến những tờ giấy thông thường thành món quà có thể nảy mầm và tạo ra sự sống mới.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
                            <div className="text-3xl font-bold text-green-600">1</div>
                            <div className="text-gray-600 mt-2">Năm khởi sự</div>
                        </div>
                        <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
                            <div className="text-3xl font-bold text-green-600">3</div>
                            <div className="text-gray-600 mt-2">Sinh viên sáng lập</div>
                        </div>
                        <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
                            <div className="text-3xl font-bold text-green-600">500+</div>
                            <div className="text-gray-600 mt-2">Khách hàng tin tưởng</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
                <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Câu Chuyện Của Chúng Tôi</h2>

                <div className="bg-green-50 rounded-3xl p-8 md:p-12 mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        <span className="font-semibold text-green-700">Mầm Xanh bắt nguồn từ một bài tập trường</span>.
                        Vào giữa năm 2023, khi chúng tôi đang học sinh viên tại ĐH [Tên Trường], một bài tập về "Sản phẩm bền vững"
                        đã truyền cảm hứng cho chúng tôi. Thay vì chỉ làm báo cáo, chúng tôi quyết định thực tế hóa ý tưởng đó.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Những tháng đầu tiên là những thử thách không nhỏ. Chúng tôi tìm hiểu về giấy tái chế,
                        hạt giống, quy trình sản xuất... từ các video YouTube và tư vấn từ các chuyên gia.
                        Prototype đầu tiên được làm bằng tay trong ký túc xá, và chúng tôi kiểm thử với 50 bạn bè.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed">
                        Phản hồi tích cực khiến chúng tôi quyết tâm tiếp tục. Đến Q2 2024, chúng tôi bắt đầu bán thử nghiệm trên Instagram
                        và ngạc nhiên đạt được 200 đơn hàng. Thành công nhỏ này thúc đẩy chúng tôi xây dựng website chính thức
                        và phát triển sản phẩm thêm. Hiện tại, chúng tôi có hơn 500 khách hàng trên khắp đất nước.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/#products')}
                    className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center gap-2 w-fit mx-auto"
                >
                    Khám Phá Sản Phẩm
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Mission & Vision */}
            <div className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 text-green-600" />
                                <h3 className="text-2xl font-bold text-gray-800">Sứ Mệnh</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Tạo ra những sản phẩm giấy hạt giống chất lượng cao, giúp mọi người có cách mới
                                để gửi gắm tình yêu thương đồng thời đóng góp nhỏ bé vào bảo vệ môi trường.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Sprout className="w-8 h-8 text-green-600" />
                                <h3 className="text-2xl font-bold text-gray-800">Tầm Nhìn</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Trở thành một startup bền vững được yêu thích, lan tỏa thông điệp sống xanh
                                đến nhiều người và chứng minh rằng sinh viên có thể tạo ra sự thay đổi tích cực.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
                <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Giá Trị Cốt Lõi</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
                            <div className="mb-4">{value.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Hành Trình Phát Triển</h2>
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-8 items-start">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        {milestone.year.split(' ')[0].slice(-2)}
                                    </div>
                                    {index < milestones.length - 1 && (
                                        <div className="w-1 h-12 bg-green-200 mt-4"></div>
                                    )}
                                </div>
                                <div className="pt-3 pb-8">
                                    <p className="text-sm font-semibold text-green-600">{milestone.year}</p>
                                    <p className="text-lg text-gray-700 mt-2">{milestone.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Đội Ngũ Của Chúng Tôi</h2>
                <p className="text-center text-gray-600 mb-12">Ba sinh viên với đam mê chung: tạo ra sự thay đổi</p>

                <div className="grid md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                            <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-sm text-green-600 font-semibold mt-1">{member.role}</p>
                                <p className="text-gray-600 mt-4 leading-relaxed text-sm">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
                    <p className="text-gray-700 leading-relaxed">
                        ✨ <span className="font-semibold">Chúng tôi tự tay làm mọi thứ</span> - từ thiết kế, sản xuất đến đóng gói.
                        Mỗi sản phẩm Mầm Xanh được làm với tình yêu, không có máy móc công nghiệp phức tạp,
                        chỉ có những bàn tay chăm chỉ của các sinh viên trẻ.
                    </p>
                </div>
            </div>

            {/* Challenges & Learning */}
            <div className="bg-blue-50 py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Những Thách Thức & Bài Học</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Thách Thức</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li>• Tìm nguồn cung giấy tái chế chất lượng cao</li>
                                <li>• Cân bằng học tập và kinh doanh</li>
                                <li>• Giữ giá thành phải chăng khi làm thủ công</li>
                                <li>• Xây dựng lòng tin của khách hàng mới</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Bài Học</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li>• Nghe lời khách hàng là then chốt</li>
                                <li>• Chất lượng - Số lượng</li>
                                <li>• Sự kiên trì là cần thiết hơn tài năng</li>
                                <li>• Cộng đồng là tài sản quý giá nhất</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 py-16 md:py-20">
                <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Hãy Cùng Chúng Tôi Tạo Nên Sự Thay Đổi</h2>
                    <p className="text-green-100 text-lg mb-8 leading-relaxed">
                        Mỗi sản phẩm Mầm Xanh bạn chọn là một bước nhỏ nhưng có ý nghĩa trong hành trình bảo vệ môi trường.
                        Và là một cách để bạn ủng hộ một nhóm sinh viên trẻ đam mê thay đổi.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={() => navigate('/#products')}
                            className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition"
                        >
                            Mua Sản Phẩm
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition"
                        >
                            Liên Hệ Ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}