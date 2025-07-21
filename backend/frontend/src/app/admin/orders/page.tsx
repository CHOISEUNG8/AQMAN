'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
  price: number;
  total_price: number;
}

interface Order {
  id: number;
  order_number: string;
  user: string;
  status: string;
  payment_status: string;
  total_price: number;
  shipping_address: string;
  shipping_phone: string;
  shipping_name: string;
  notes: string;
  items: OrderItem[];
  created_at: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/admin/orders/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.results || data);
      } else {
        console.error('주문 목록 로드 실패');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.shipping_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'pending' && order.status === 'pending') ||
                         (filter === 'processing' && order.status === 'processing') ||
                         (filter === 'shipped' && order.status === 'shipped') ||
                         (filter === 'delivered' && order.status === 'delivered') ||
                         (filter === 'cancelled' && order.status === 'cancelled');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: '대기중', color: 'bg-yellow-100 text-yellow-800', icon: EyeIcon },
      processing: { text: '처리중', color: 'bg-blue-100 text-blue-800', icon: PencilIcon },
      shipped: { text: '배송중', color: 'bg-purple-100 text-purple-800', icon: TruckIcon },
      delivered: { text: '배송완료', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      cancelled: { text: '취소됨', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1 h-3 w-3" />
        {config.text}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: '결제대기', color: 'bg-yellow-100 text-yellow-800' },
      paid: { text: '결제완료', color: 'bg-green-100 text-green-800' },
      failed: { text: '결제실패', color: 'bg-red-100 text-red-800' },
      refunded: { text: '환불완료', color: 'bg-gray-100 text-gray-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            시스템의 모든 주문을 관리합니다.
          </p>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="주문 검색..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">모든 주문</option>
              <option value="pending">대기중</option>
              <option value="processing">처리중</option>
              <option value="shipped">배송중</option>
              <option value="delivered">배송완료</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <li key={order.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                        <TruckIcon className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">{order.order_number}</p>
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.payment_status)}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <p>{order.user} • {order.shipping_name}</p>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <p className="font-medium text-gray-900">₩{order.total_price.toLocaleString()}</p>
                        <p className="ml-2">• {order.items.length}개 상품</p>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        주문일: {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* 주문 상품 목록 */}
                <div className="mt-4 ml-16">
                  <div className="text-sm text-gray-500 mb-2">주문 상품:</div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>₩{item.total_price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            {searchTerm || filter !== 'all' ? '검색 결과가 없습니다.' : '등록된 주문이 없습니다.'}
          </div>
        </div>
      )}
    </div>
  );
} 