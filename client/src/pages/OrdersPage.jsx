import React, { useState, useEffect } from 'react';
import { ShoppingBag, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/header';
import { API_ENDPOINTS } from '../config';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          API_ENDPOINTS.MY_ORDERS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(
          err.response?.data?.message || 'Không thể tải danh sách đơn hàng'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-50 text-blue-800 border-blue-200',
      shipped: 'bg-purple-50 text-purple-800 border-purple-200',
      delivered: 'bg-green-50 text-green-800 border-green-200',
      cancelled: 'bg-red-50 text-red-800 border-red-200',
    };
    return statusColors[status] || 'bg-gray-50 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      shipped: 'Đang vận chuyển',
      delivered: 'Đã giao hàng',
      cancelled: 'Đã hủy',
    };
    return labels[status] || status;
  };

  if (!user) {
    return null;
  }

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">Đơn Hàng Của Tôi</h1>
            </div>
            <p className="text-gray-600">Quản lý và theo dõi đơn hàng của bạn</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-green-600 animate-spin" />
              <p className="ml-3 text-gray-600">Đang tải đơn hàng...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && orders.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Bạn chưa có đơn hàng nào
              </h2>
              <p className="text-gray-600 mb-6">
                Hãy mua sắm ngay và tạo đơn hàng đầu tiên của bạn!
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          )}

          {/* Orders List */}
          {!loading && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Mã đơn hàng</p>
                      <p className="text-lg font-bold text-gray-800">#{order._id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Ngày đặt hàng</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    {/* Order Items */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Sản phẩm
                      </h3>
                      <div className="space-y-2">
                        {order.orderItems && order.orderItems.length > 0 ? (
                          order.orderItems.map((item, index) => {
                            const imgSrc = Array.isArray(item.image)
                              ? item.image[0]
                              : item.image || '';

                            return (
                              <div
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-gray-100"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {imgSrc ? (
                                      <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="text-gray-300">📦</div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Số lượng: {item.qty}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-semibold text-gray-800">
                                  {formatPrice(item.price * item.qty)}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-gray-500">Không có sản phẩm</p>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tổng tiền</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                        <span
                          className={`inline-block px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Địa chỉ giao hàng
                        </p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-800">
                            {order.shippingAddress.fullName || order.shippingAddress.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {order.shippingAddress.address || order.shippingAddress.street}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {order.shippingAddress.city || ''}{order.shippingAddress.postalCode ? (', ' + order.shippingAddress.postalCode) : ''}
                          </p>
                          {order.shippingAddress.country && (
                            <p className="text-gray-600 text-sm">
                              {order.shippingAddress.country}
                            </p>
                          )}
                          {order.shippingAddress.phone && (
                            <p className="text-gray-600 text-sm">
                              ☎️ {order.shippingAddress.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
