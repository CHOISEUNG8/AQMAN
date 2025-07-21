from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('no_column', 'username', 'name', 'phone', 'is_staff', 'is_active', 'created_at')
    list_display_links = ('username',)  # 사용자이름만 링크로!
    list_filter = ('is_staff', 'is_active', 'gender', 'created_at')
    search_fields = ('username', 'name', 'phone')
    ordering = ('-created_at',)  # 최신 가입자가 맨 위로(내림차순)
    list_per_page = 50  # 50개씩 페이지네이션

    fieldsets = UserAdmin.fieldsets + (
        ('추가 정보', {
            'fields': ('name', 'phone', 'birth_date', 'gender')
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('추가 정보', {
            'fields': ('name', 'phone', 'birth_date', 'gender')
        }),
    )

    def no_column(self, obj):
        # 전체 가입 순(오래된 순)으로 1번부터 증가
        qs = User.objects.all().order_by('created_at')
        pk_list = list(qs.values_list('pk', flat=True))
        try:
            idx = pk_list.index(obj.pk)
        except ValueError:
            return ''
        return idx + 1
    no_column.short_description = 'No.'
    no_column.admin_order_field = None  # 정렬 비활성화(선택)
    no_column.allow_tags = False  # 링크 비활성화

    def changelist_view(self, request, extra_context=None):
        self._request = request  # no_column에서 request 사용
        return super().changelist_view(request, extra_context=extra_context)