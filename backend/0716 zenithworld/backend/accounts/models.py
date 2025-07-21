from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator

class User(AbstractUser):
    GENDER_CHOICES = [
        ('male', '남성'),
        ('female', '여성'),
        ('other', '기타'),
    ]
    
    # name 필드 (한글, 영문만 허용)
    name = models.CharField(
        max_length=100,
        validators=[
            RegexValidator(
                regex=r'^[가-힣a-zA-Z\s]+$',
                message="이름은 한글과 영문만 입력 가능합니다."
            ),
            MinLengthValidator(2, message="이름은 2자 이상이어야 합니다.")
        ],
        help_text="한글 또는 영문으로 2자 이상 입력하세요."
    )
    
    # phone 필드 (010-1234-5678 형식)
    phone = models.CharField(
        max_length=20, 
        blank=True, 
        null=True,
        validators=[
            RegexValidator(
                regex=r'^010-\d{3,4}-\d{4}$',
                message="올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)"
            )
        ],
        help_text="010-1234-5678 형식으로 입력하세요."
    )
    
    birth_date = models.DateField(blank=True, null=True, help_text="YYYY-MM-DD 형식으로 입력하세요.")
    gender = models.CharField(
        max_length=10, 
        choices=GENDER_CHOICES, 
        blank=True, 
        null=True,
        help_text="성별을 선택하세요."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # username을 로그인 필드로 사용
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name']
    
    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'auth_user'
        verbose_name = '사용자'
        verbose_name_plural = '사용자들'