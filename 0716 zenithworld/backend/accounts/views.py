# your_app/views.py
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, Sum, Q
import logging
from .models import User
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    AdminUserSerializer, AdminUserCreateSerializer, AdminUserUpdateSerializer,
    DashboardStatsSerializer
)
from .permissions import IsAdminUser, IsSuperUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password

# 로거 설정
logger = logging.getLogger(__name__)

# 기존 뷰들
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    try:
        logger.info(f"회원가입 요청 받음: {request.data}")
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            logger.info(f"회원가입 성공: {user.username}")
            return Response({
                'message': '회원가입이 완료되었습니다.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"회원가입 검증 실패: {serializer.errors}")
            return Response({
                'error': '입력 정보를 확인해주세요.',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"회원가입 중 오류 발생: {str(e)}")
        return Response({
            'error': '회원가입 중 오류가 발생했습니다.',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    try:
        logger.info(f"로그인 요청 받음: {request.data}")
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            logger.info(f"로그인 성공: {user.username}, 토큰 발급 완료")
            
            return Response({
                'message': '로그인 성공',
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user': UserSerializer(user).data
            })
        else:
            logger.error(f"로그인 검증 실패: {serializer.errors}")
            return Response({
                'error': '로그인 정보를 확인해주세요.',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"로그인 중 오류 발생: {str(e)}")
        return Response({
            'error': '로그인 중 오류가 발생했습니다.',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh_token')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': '로그아웃 성공'})
    except Exception:
        return Response({'message': '로그아웃 성공'})

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info_view(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def token_test_view(request):
    """토큰 테스트용 뷰"""
    return Response({
        'message': '토큰이 필요하지 않은 엔드포인트입니다.',
        'status': 'success'
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def token_verify_view(request):
    """토큰 검증용 뷰"""
    return Response({
        'message': '토큰이 유효합니다.',
        'user': UserSerializer(request.user).data,
        'status': 'success'
    })

# 관리자용 뷰들
class AdminDashboardView(generics.GenericAPIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        """관리자 대시보드 데이터"""
        now = timezone.now()
        week_ago = now - timedelta(days=7)
        
        # 사용자 통계
        total_users = User.objects.count()
        new_users_this_week = User.objects.filter(created_at__gte=week_ago).count()
        active_users = User.objects.filter(last_login__gte=week_ago).count()
        
        # 주문 통계 (실제 Order 모델 사용)
        try:
            from products.models import Order
            total_orders = Order.objects.count()
            pending_orders = Order.objects.filter(status='pending').count()
            completed_orders = Order.objects.filter(status='delivered').count()
            total_revenue = Order.objects.filter(payment_status='paid').aggregate(
                total=Sum('total_price')
            )['total'] or 0
            weekly_revenue = Order.objects.filter(
                payment_status='paid',
                created_at__gte=week_ago
            ).aggregate(total=Sum('total_price'))['total'] or 0
        except ImportError:
            # products 앱이 없는 경우 임시 데이터
            total_orders = 0
            pending_orders = 0
            completed_orders = 0
            total_revenue = 0
            weekly_revenue = 0
        
        data = {
            'total_users': total_users,
            'new_users_this_week': new_users_this_week,
            'active_users': active_users,
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'completed_orders': completed_orders,
            'total_revenue': total_revenue,
            'weekly_revenue': weekly_revenue,
        }
        
        serializer = DashboardStatsSerializer(data)
        return Response(serializer.data)

class AdminUserListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all().order_by('-created_at')

class AdminUserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()

class AdminUserCreateView(generics.CreateAPIView):
    permission_classes = [IsSuperUser]
    serializer_class = AdminUserCreateSerializer

class AdminUserUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserUpdateSerializer
    queryset = User.objects.all()

class AdminUserPasswordChangeView(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    
    def put(self, request, *args, **kwargs):
        user = self.get_object()
        new_password = request.data.get('password')
        
        if not new_password:
            return Response(
                {'error': '새 비밀번호를 입력해주세요.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(new_password) < 4 or len(new_password) > 20:
            return Response(
                {'error': '비밀번호는 4 이상 20자 이하로 입력해주세요.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 비밀번호 변경
        user.password = make_password(new_password)
        user.save()
        
        return Response({
           'message': '비밀번호가 성공적으로 변경되었습니다.',
          'success': True
        })

class AdminUserDeleteView(generics.DestroyAPIView):
    permission_classes = [IsSuperUser]
    queryset = User.objects.all()
    
    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if user == request.user:
            return Response(
                {'error': '자신의 계정은 삭제할 수 없습니다.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user.delete()
        return Response({'message': '사용자가 삭제되었습니다.'})

class AdminStatsView(generics.GenericAPIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        """상세 통계 데이터"""
        now = timezone.now()
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)
        
        # 사용자 통계
        users_by_gender = User.objects.values('gender').annotate(count=Count('id'))
        users_by_month = User.objects.filter(
            created_at__gte=month_ago
        ).extra(
            select={'month': "strftime('%%Y-%%m', created_at)"}
        ).values('month').annotate(count=Count('id')).order_by('month')
        
        # 최근 가입자
        recent_users = User.objects.order_by('-created_at')[:10]
        
        data = {
            'users_by_gender': list(users_by_gender),
            'users_by_month': list(users_by_month),
            'recent_users': AdminUserSerializer(recent_users, many=True).data,
        }
        
        return Response(data)

class AdminOrderListView(generics.GenericAPIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        """주문 목록 (실제 Order 모델 사용)"""
        try:
            from products.models import Order
            from products.serializers import OrderSerializer
            
            orders = Order.objects.select_related('user').prefetch_related('items__product').all().order_by('-created_at')
            serializer = OrderSerializer(orders, many=True)
            return Response({'orders': serializer.data})
        except ImportError:
            # products 앱이 없는 경우 임시 데이터
            return Response({'orders': []})

class AdminProductListView(generics.GenericAPIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        """상품 목록 (실제 Product 모델 사용)"""
        try:
            from products.models import Product
            from products.serializers import ProductSerializer
            
            products = Product.objects.select_related('category').all().order_by('-created_at')
            serializer = ProductSerializer(products, many=True)
            return Response({'products': serializer.data})
        except ImportError:
            # products 앱이 없는 경우 임시 데이터
            return Response({'products': []})

class AdminRegisterView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('username')
        name = data.get('name')
        password = data.get('password')
        role = data.get('role')
        if not (username and name and password and role):
            return Response({'error': '모든 항목을 입력해주세요.'}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({'error': '이미 존재하는 아이디입니다.'}, status=400)
        user = User.objects.create(
            username=username,
            name=name,
            password=make_password(password),
            role=role,
            is_staff=True,  # 관리자 권한
            is_superuser=(role == "Admin")  # 최고관리자만 superuser
        )
        return Response({'success': True})
