# Django admin 완전 비활성화
# from django.contrib import admin
# from .models import *
# from django.urls import path
# from django.template.response import TemplateResponse
# from django.utils import timezone
# from django.db.models import Sum, Count
# from accounts.models import User
# products.models에서 Product, Order를 실제 모델명에 맞게 import
# try:
#     from products.models import Product, Order
# except ImportError:
#     Product = None
#     Order = None

# class CustomAdminSite(admin.AdminSite):
#     site_header = "ZenithWorld 관리자"
#     site_title = "ZenithWorld Admin"
#     index_title = "대시보드"
#     site_url = "https://zenithworld.shop"  # 어드민 상단 '사이트 보기' 링크 변경

#     def get_urls(self):
#         urls = super().get_urls()
#         my_urls = [
#             path('', self.admin_view(self.dashboard), name='index'),
#         ]
#         return my_urls + urls[1:]

#     def dashboard(self, request):
#         sales_total = Order.objects.aggregate(total=Sum('total_price'))['total'] if Order else 0
#         order_count = Order.objects.count() if Order else 0
#         order_pending = Order.objects.filter(status='pending').count() if Order else 0
#         order_completed = Order.objects.filter(status='completed').count() if Order else 0
#         popular_products = (
#             Product.objects.annotate(order_num=Count('order')).order_by('-order_num')[:5]
#             if Product else []
#         )
#         week_ago = timezone.now() - timezone.timedelta(days=7)
#         new_users = User.objects.filter(created_at__gte=week_ago).count()
#         context = dict(
#             self.each_context(request),
#             sales_total=sales_total or 0,
#             order_count=order_count,
#             order_pending=order_pending,
#             order_completed=order_completed,
#             popular_products=popular_products,
#             new_users=new_users,
#         )
#         return TemplateResponse(request, "admin/dashboard.html", context)

# custom_admin_site = CustomAdminSite(name='custom_admin')

# # User 등록 custom_admin_site로 옮김
# from django.contrib.auth.admin import UserAdmin
# custom_admin_site.register(User, UserAdmin)

# @admin.register(User)
# class CustomUserAdmin(UserAdmin):
#     list_display = ('no_column', 'username', 'name', 'phone', 'is_staff', 'is_active', 'created_at')
#     list_display_links = ('username',)  # 사용자이름만 링크로!
#     list_filter = ('is_staff', 'is_active', 'gender', 'created_at')
#     search_fields = ('username', 'name', 'phone')
#     ordering = ('-created_at',)  # 최신 가입자가 맨 위로(내림차순)
#     list_per_page = 50  # 50개씩 페이지네이션

#     fieldsets = UserAdmin.fieldsets + (
#         ('추가 정보', {
#             'fields': ('name', 'phone', 'birth_date', 'gender')
#         }),
#     )

#     add_fieldsets = UserAdmin.add_fieldsets + (
#         ('추가 정보', {
#             'fields': ('name', 'phone', 'birth_date', 'gender')
#         }),
#     )

#     def no_column(self, obj):
#         # 전체 가입 순(오래된 순)으로 1번부터 증가
#         qs = User.objects.all().order_by('created_at')
#         pk_list = list(qs.values_list('pk', flat=True))
#         try:
#             idx = pk_list.index(obj.pk)
#         except ValueError:
#             return ''
#         return idx + 1
#     no_column.short_description = 'No.'
#     no_column.admin_order_field = None  # 정렬 비활성화(선택)
#     no_column.allow_tags = False  # 링크 비활성화

#     def changelist_view(self, request, extra_context=None):
#         self._request = request  # no_column에서 request 사용
#         return super().changelist_view(request, extra_context=extra_context)