from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta
from .models import Category, Product, Order, OrderItem, TimeSale
from .serializers import (
    CategorySerializer, ProductSerializer, ProductCreateSerializer, ProductUpdateSerializer,
    OrderSerializer, OrderCreateSerializer, OrderUpdateSerializer,
    TimeSaleSerializer, TimeSaleCreateSerializer, TimeSaleUpdateSerializer
)
from accounts.permissions import IsAdminUser

# 카테고리 뷰
class CategoryListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class CategoryDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

# 상품 뷰
class ProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.select_related('category').all()
        
        # 필터링
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category_id=category)
        
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        featured = self.request.query_params.get('featured', None)
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # 검색
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        return queryset.order_by('-created_at')

class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.select_related('category')

# 관리자용 상품 뷰
class AdminProductListView(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductSerializer
    
    def get_queryset(self):
        return Product.objects.select_related('category').all().order_by('-created_at')

class AdminProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.select_related('category')
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductUpdateSerializer
        return ProductSerializer

# 주문 뷰
class OrderListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderSerializer
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.select_related('user').prefetch_related('items__product').all()
        return Order.objects.select_related('user').prefetch_related('items__product').filter(user=self.request.user)

class OrderDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.select_related('user').prefetch_related('items__product')
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return OrderUpdateSerializer
        return OrderSerializer
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.select_related('user').prefetch_related('items__product').all()
        return Order.objects.select_related('user').prefetch_related('items__product').filter(user=self.request.user)

# 관리자용 주문 뷰
class AdminOrderListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = OrderSerializer
    queryset = Order.objects.select_related('user').prefetch_related('items__product').all().order_by('-created_at')

class AdminOrderDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = OrderSerializer
    queryset = Order.objects.select_related('user').prefetch_related('items__product').all()
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return OrderUpdateSerializer
        return OrderSerializer

# 타임세일 뷰
class TimeSaleListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = TimeSaleSerializer
    queryset = TimeSale.objects.select_related('product').filter(is_active=True)

class AdminTimeSaleListView(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = TimeSaleSerializer
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TimeSaleCreateSerializer
        return TimeSaleSerializer
    
    def get_queryset(self):
        return TimeSale.objects.select_related('product').all().order_by('-created_at')

class AdminTimeSaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = TimeSaleSerializer
    queryset = TimeSale.objects.select_related('product').all()
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return TimeSaleUpdateSerializer
        return TimeSaleSerializer

# 통계 뷰
@api_view(['GET'])
@permission_classes([IsAdminUser])
def product_stats_view(request):
    """상품 통계"""
    total_products = Product.objects.count()
    active_products = Product.objects.filter(status='active').count()
    out_of_stock_products = Product.objects.filter(status='out_of_stock').count()
    featured_products = Product.objects.filter(is_featured=True).count()
    
    # 카테고리별 상품 수
    category_stats = Category.objects.annotate(
        product_count=Count('products')
    ).values('name', 'product_count')
    
    data = {
        'total_products': total_products,
        'active_products': active_products,
        'out_of_stock_products': out_of_stock_products,
        'featured_products': featured_products,
        'category_stats': list(category_stats),
    }
    
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def order_stats_view(request):
    """주문 통계"""
    now = timezone.now()
    week_ago = now - timedelta(days=7)
    month_ago = now - timedelta(days=30)
    
    total_orders = Order.objects.count()
    pending_orders = Order.objects.filter(status='pending').count()
    completed_orders = Order.objects.filter(status='delivered').count()
    weekly_orders = Order.objects.filter(created_at__gte=week_ago).count()
    monthly_orders = Order.objects.filter(created_at__gte=month_ago).count()
    
    total_revenue = Order.objects.filter(payment_status='paid').aggregate(
        total=Sum('total_price')
    )['total'] or 0
    
    weekly_revenue = Order.objects.filter(
        payment_status='paid',
        created_at__gte=week_ago
    ).aggregate(total=Sum('total_price'))['total'] or 0
    
    monthly_revenue = Order.objects.filter(
        payment_status='paid',
        created_at__gte=month_ago
    ).aggregate(total=Sum('total_price'))['total'] or 0
    
    # 상태별 주문 수
    status_stats = Order.objects.values('status').annotate(
        count=Count('id')
    ).values('status', 'count')
    
    data = {
        'total_orders': total_orders,
        'pending_orders': pending_orders,
        'completed_orders': completed_orders,
        'weekly_orders': weekly_orders,
        'monthly_orders': monthly_orders,
        'total_revenue': total_revenue,
        'weekly_revenue': weekly_revenue,
        'monthly_revenue': monthly_revenue,
        'status_stats': list(status_stats),
    }
    
    return Response(data)
