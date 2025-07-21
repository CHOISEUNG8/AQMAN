from django.urls import path
from .views import (
    # 카테고리
    CategoryListView, CategoryDetailView,
    # 상품
    ProductListView, ProductDetailView,
    # 관리자용 상품
    AdminProductListView, AdminProductDetailView,
    # 주문
    OrderListView, OrderDetailView,
    # 관리자용 주문
    AdminOrderListView, AdminOrderDetailView,
    # 타임세일
    TimeSaleListView, AdminTimeSaleListView, AdminTimeSaleDetailView,
    # 통계
    product_stats_view, order_stats_view,
)

urlpatterns = [
    # 공개 API
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('time-sales/', TimeSaleListView.as_view(), name='time-sale-list'),
    
    # 관리자용 API
    path('admin/products/', AdminProductListView.as_view(), name='admin-product-list'),
    path('admin/products/<int:pk>/', AdminProductDetailView.as_view(), name='admin-product-detail'),
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('admin/orders/<int:pk>/', AdminOrderDetailView.as_view(), name='admin-order-detail'),
    path('admin/time-sales/', AdminTimeSaleListView.as_view(), name='admin-time-sale-list'),
    path('admin/time-sales/<int:pk>/', AdminTimeSaleDetailView.as_view(), name='admin-time-sale-detail'),
    path('admin/product-stats/', product_stats_view, name='admin-product-stats'),
    path('admin/order-stats/', order_stats_view, name='admin-order-stats'),
] 