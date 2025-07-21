from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import AdminRegisterView

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('user-info/', views.user_info_view, name='user-info'),
    path('user/me/', views.user_info_view, name='user-me'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += [
    path('api/admin/register/', AdminRegisterView.as_view(), name='admin-register'),
]