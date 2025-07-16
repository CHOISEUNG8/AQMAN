from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def home_view(request):
    return JsonResponse({
        'message': 'Django API Server is running!',
        'endpoints': {
            'api': '/api/',
            'register': '/api/register/',
            'login': '/api/login/',
            'logout': '/api/logout/',
            'profile': '/api/profile/',
            'user-info': '/api/user-info/',
            'token-refresh': '/api/token/refresh/',
            'admin-dashboard': '/api/admin/dashboard/',
            'admin-users': '/api/admin/users/',
            'products': '/api/products/',
            'orders': '/api/orders/',
            'admin-products': '/api/admin/products/',
            'admin-orders': '/api/admin/orders/',
        }
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('api/', include('accounts.api_urls')),
    path('api/', include('products.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)