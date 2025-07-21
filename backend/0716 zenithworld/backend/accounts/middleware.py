import logging
import time
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from rest_framework import status

logger = logging.getLogger(__name__)

class APILoggingMiddleware(MiddlewareMixin):
    """
    API 요청/응답 로깅 미들웨어
    """
    def process_request(self, request):
        request.start_time = time.time()
        
        # API 요청만 로깅
        if request.path.startswith('/api/'):
            logger.info(f"API Request: {request.method} {request.path} - User: {request.user}")
    
    def process_response(self, request, response):
        if hasattr(request, 'start_time') and request.path.startswith('/api/'):
            duration = time.time() - request.start_time
            logger.info(f"API Response: {request.method} {request.path} - Status: {response.status_code} - Duration: {duration:.2f}s")
        
        return response

class SecurityMiddleware(MiddlewareMixin):
    """
    보안 헤더 추가 미들웨어
    """
    def process_response(self, request, response):
        # 보안 헤더 추가
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        return response

class AdminAPIMiddleware(MiddlewareMixin):
    """
    관리자 API 접근 제어 미들웨어
    """
    def process_request(self, request):
        if request.path.startswith('/api/admin/'):
            # 관리자 API는 인증된 사용자만 접근 가능
            if not request.user.is_authenticated:
                return JsonResponse(
                    {'error': '인증이 필요합니다.'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            # 관리자 권한 확인
            if not request.user.is_staff:
                return JsonResponse(
                    {'error': '관리자 권한이 필요합니다.'}, 
                    status=status.HTTP_403_FORBIDDEN
                )
        
        return None 