from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    register_view, login_view, logout_view, profile_view, user_info_view,
    token_test_view, token_verify_view,
    # 관리자용 API
    AdminDashboardView, AdminUserListView, AdminUserDetailView,
    AdminUserCreateView, AdminUserUpdateView, AdminUserDeleteView,
    AdminStatsView, AdminOrderListView, AdminProductListView
)
from django.contrib.auth import get_user_model
User = get_user_model()

urlpatterns = [
    # 기존 사용자 API
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('user-info/', user_info_view, name='user-info'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # 토큰 테스트용 API
    path('token/test/', token_test_view, name='token-test'),
    path('token/verify/', token_verify_view, name='token-verify'),
    
    # 관리자용 API
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('admin/users/', AdminUserListView.as_view(), name='admin-users'),
    path('admin/users/create/', AdminUserCreateView.as_view(), name='admin-user-create'),
    path('admin/users/<int:pk>/', AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('admin/users/<int:pk>/update/', AdminUserUpdateView.as_view(), name='admin-user-update'),
    path('admin/users/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-user-delete'),
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-orders'),
    path('admin/products/', AdminProductListView.as_view(), name='admin-products'),
] 