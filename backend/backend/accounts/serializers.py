from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import timedelta
from django.core.validators import EmailValidator
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'phone', 'birth_date', 'gender', 'is_active', 'is_staff', 'created_at']
        read_only_fields = ['id', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4, max_length=20)
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'name', 'password', 'confirmPassword', 'phone', 'birth_date', 'gender']

    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("아이디는 3자 이상이어야 합니다.")
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("이미 사용 중인 아이디입니다.")
        return value

    def validate_name(self, value):
        # 한글, 영문, 공백만 허용
        name_pattern = re.compile(r'^[가-힣a-zA-Z\s]+$')
        if not name_pattern.match(value):
            raise serializers.ValidationError("이름은 한글과 영문만 입력 가능합니다.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("이름은 2자 이상이어야 합니다.")
        return value.strip()

    def validate_phone(self, value):
        if value:
            # 전화번호 형식 검증 (010-1234-5678 형식)
            phone_pattern = re.compile(r'^010-\d{3,4}-\d{4}$')
            if not phone_pattern.match(value):
                raise serializers.ValidationError("올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)")
        return value

    def validate_birth_date(self, value):
        if value:
            # 생년월일 형식 검증 (YYYY-MM-DD)
            from datetime import datetime
            try:
                datetime.strptime(str(value), '%Y-%m-%d')
            except ValueError:
                raise serializers.ValidationError("올바른 생년월일 형식을 입력해주세요. (예: 1990-01-01)")
        return value

    def validate_gender(self, value):
        if value and value not in ['male', 'female', 'other']:
            raise serializers.ValidationError("성별은 male, female, other 중 하나를 선택해주세요.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmPassword']:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('잘못된 로그인 정보입니다.')
            if not user.is_active:
                raise serializers.ValidationError('비활성화된 계정입니다.')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('사용자명과 비밀번호를 입력해주세요.')
        
        return attrs

# 관리자용 시리얼라이저
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'phone', 'birth_date', 'gender', 
                 'is_active', 'is_staff', 'is_superuser', 'created_at', 'last_login']
        read_only_fields = ['id', 'created_at', 'last_login']

class AdminUserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4, max_length=20)
    
    class Meta:
        model = User
        fields = ['username', 'name', 'password', 'phone', 'birth_date', 
                 'gender', 'is_active', 'is_staff', 'is_superuser']

    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("아이디는 3자 이상이어야 합니다.")
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("이미 사용 중인 아이디입니다.")
        return value

    def validate_name(self, value):
        # 한글, 영문, 공백만 허용
        name_pattern = re.compile(r'^[가-힣a-zA-Z\s]+$')
        if not name_pattern.match(value):
            raise serializers.ValidationError("이름은 한글과 영문만 입력 가능합니다.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("이름은 2자 이상이어야 합니다.")
        return value.strip()

    def validate_phone(self, value):
        if value:
            # 전화번호 형식 검증 (010-1234-5678 형식)
            phone_pattern = re.compile(r'^010-\d{3,4}-\d{4}$')
            if not phone_pattern.match(value):
                raise serializers.ValidationError("올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)")
        return value

    def validate_birth_date(self, value):
        if value:
            # 생년월일 형식 검증 (YYYY-MM-DD)
            from datetime import datetime
            try:
                datetime.strptime(str(value), '%Y-%m-%d')
            except ValueError:
                raise serializers.ValidationError("올바른 생년월일 형식을 입력해주세요. (예: 1990-01-01)")
        return value

    def validate_gender(self, value):
        if value and value not in ['male', 'female', 'other']:
            raise serializers.ValidationError("성별은 male, female, other 중 하나를 선택해주세요.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'name', 'phone', 'birth_date', 
                 'gender', 'is_active', 'is_staff', 'is_superuser']

    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("아이디는 3자 이상이어야 합니다.")
        return value

    def validate_name(self, value):
        # 한글, 영문, 공백만 허용
        name_pattern = re.compile(r'^[가-힣a-zA-Z\s]+$')
        if not name_pattern.match(value):
            raise serializers.ValidationError("이름은 한글과 영문만 입력 가능합니다.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("이름은 2자 이상이어야 합니다.")
        return value.strip()

    def validate_phone(self, value):
        if value:
            # 전화번호 형식 검증 (010-1234-5678 형식)
            phone_pattern = re.compile(r'^010-\d{3,4}-\d{4}$')
            if not phone_pattern.match(value):
                raise serializers.ValidationError("올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)")
        return value

    def validate_birth_date(self, value):
        if value:
            # 생년월일 형식 검증 (YYYY-MM-DD)
            from datetime import datetime
            try:
                datetime.strptime(str(value), '%Y-%m-%d')
            except ValueError:
                raise serializers.ValidationError("올바른 생년월일 형식을 입력해주세요. (예: 1990-01-01)")
        return value

    def validate_gender(self, value):
        if value and value not in ['male', 'female', 'other']:
            raise serializers.ValidationError("성별은 male, female, other 중 하나를 선택해주세요.")
        return value

class DashboardStatsSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    new_users_this_week = serializers.IntegerField()
    active_users = serializers.IntegerField()
    total_orders = serializers.IntegerField()
    pending_orders = serializers.IntegerField()
    completed_orders = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=10, decimal_places=2)
    weekly_revenue = serializers.DecimalField(max_digits=10, decimal_places=2)